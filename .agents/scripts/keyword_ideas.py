# -*- coding: utf-8 -*-
"""
Investigación de keywords a escala contra la API de Google Ads.

Hace lo mismo que el Planificador de palabras clave de la interfaz, pero con
cientos de semillas por corrida en vez de 8 a mano. Devuelve volumen mensual,
competencia y rango de pujas, en CSV.

REQUISITO: el developer token tiene que tener Basic Access CON el uso permitido
"Researching keywords and recommendations". Con "Reporting" solamente, este
script devuelve DEVELOPER_TOKEN_NOT_APPROVED. Verificar en Centro de la API.

USO
    # semillas de texto (una por línea en el archivo)
    python keyword_ideas.py --keywords semillas.txt --out resultado.csv

    # todo el sitio de un competidor (equivale a "Empezar con un sitio web")
    python keyword_ideas.py --site https://maxirest.com --out maxirest.csv

    # una sola página de un competidor
    python keyword_ideas.py --url https://toteat.com/es-AR --out toteat.csv

    # semillas + sitio combinados
    python keyword_ideas.py --keywords semillas.txt --url https://fu.do --out mix.csv

CREDENCIALES (variables de entorno, nunca hardcodeadas — este archivo va al repo)
    GOOGLE_ADS_DEVELOPER_TOKEN
    GOOGLE_ADS_CLIENT_ID
    GOOGLE_ADS_CLIENT_SECRET
    GOOGLE_ADS_REFRESH_TOKEN
    GOOGLE_ADS_CUSTOMER_ID        p.ej. 5348043664  (cuenta de anuncios, sin guiones)
    GOOGLE_ADS_LOGIN_CUSTOMER_ID  p.ej. 7145808015  (MCC, sin guiones)
"""

import argparse
import csv
import os
import sys
import time

import requests

API_VERSION = "v25"          # v21 quedó deprecada y bloqueada (ago-2026)
GEO_ARGENTINA = "2032"
LANG_SPANISH = "1003"

# La doc no publica un tope de keywords por request; el límite real que importa
# es 1 QPS. Se agrupa de a 20 para hacer pocas requests grandes en vez de muchas
# chicas. Subilo si querés, no hay un máximo documentado que respetar.
CHUNK = 20

# GenerateKeywordIdeas está limitado a 1 request por segundo por CID. Pasarse
# devuelve RESOURCE_EXHAUSTED. Se deja un margen sobre el segundo exacto.
QPS_SLEEP = 1.2

COMPETITION_ES = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta",
    "UNSPECIFIED": "",
    "UNKNOWN": "",
}


def env(name):
    v = os.environ.get(name)
    if not v:
        sys.exit(
            f"Falta la variable de entorno {name}.\n"
            "Ver el encabezado de este archivo para la lista completa."
        )
    return v


def get_access_token():
    r = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id": env("GOOGLE_ADS_CLIENT_ID"),
            "client_secret": env("GOOGLE_ADS_CLIENT_SECRET"),
            "refresh_token": env("GOOGLE_ADS_REFRESH_TOKEN"),
            "grant_type": "refresh_token",
        },
        timeout=30,
    )
    if r.status_code != 200:
        sys.exit(f"No se pudo refrescar el token OAuth: {r.status_code} {r.text[:300]}")
    return r.json()["access_token"]


def explain_error(resp):
    """Traduce los errores que realmente aparecen, en vez de tirar el JSON crudo."""
    try:
        err = resp.json()["error"]["details"][0]["errors"][0]
        code = err.get("errorCode", {})
        msg = err.get("message", "")
    except Exception:
        return f"HTTP {resp.status_code}: {resp.text[:300]}"

    if code.get("authorizationError") == "DEVELOPER_TOKEN_NOT_APPROVED":
        return (
            "DEVELOPER_TOKEN_NOT_APPROVED — el token sigue en nivel Test, o tiene\n"
            "  Basic Access pero SIN el uso permitido 'Researching keywords and\n"
            "  recommendations'. Revisar en Google Ads > Centro de la API."
        )
    if code.get("requestError") == "UNSUPPORTED_VERSION":
        return f"La versión {API_VERSION} de la API ya no se acepta. Actualizar API_VERSION."
    if code.get("quotaError") or resp.status_code == 429:
        return "RESOURCE_EXHAUSTED — se superó el límite de 1 QPS. Subir QPS_SLEEP."
    return f"{code} — {msg}"


def generate_ideas(token, seed_body):
    customer = env("GOOGLE_ADS_CUSTOMER_ID")
    headers = {
        "Authorization": f"Bearer {token}",
        "developer-token": env("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "login-customer-id": env("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
        "Content-Type": "application/json",
    }
    body = {
        "language": f"languageConstants/{LANG_SPANISH}",
        "geoTargetConstants": [f"geoTargetConstants/{GEO_ARGENTINA}"],
        "keywordPlanNetwork": "GOOGLE_SEARCH",   # sin partners: es como corre la campaña
        "includeAdultKeywords": False,
    }
    body.update(seed_body)

    url = (
        f"https://googleads.googleapis.com/{API_VERSION}"
        f"/customers/{customer}:generateKeywordIdeas"
    )
    r = requests.post(url, headers=headers, json=body, timeout=120)
    if r.status_code != 200:
        sys.exit("Error de la API:\n  " + explain_error(r))
    return r.json().get("results", [])


def parse_results(results, into):
    for item in results:
        text = item.get("text", "")
        m = item.get("keywordIdeaMetrics", {}) or {}
        vol = m.get("avgMonthlySearches")
        prev = into.get(text)
        # si la keyword ya apareció por otra semilla, nos quedamos con el volumen conocido
        if prev and prev["volumen"] not in ("", None):
            continue
        into[text] = {
            "keyword": text,
            "volumen": int(vol) if vol is not None else "",
            "competencia": COMPETITION_ES.get(m.get("competition", ""), m.get("competition", "")),
            "indice_competencia": m.get("competitionIndex", ""),
            "puja_baja": _micros(m.get("lowTopOfPageBidMicros")),
            "puja_alta": _micros(m.get("highTopOfPageBidMicros")),
        }


def _micros(v):
    """La API devuelve importes en millonésimas de la moneda de la cuenta."""
    if v is None:
        return ""
    return round(int(v) / 1_000_000)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--keywords", help="archivo de texto con una semilla por línea")
    p.add_argument("--site", help="dominio de un competidor (todo el sitio)")
    p.add_argument("--url", help="una página puntual de un competidor")
    p.add_argument("--out", required=True, help="archivo CSV de salida")
    p.add_argument("--min-vol", type=int, default=0, help="descartar keywords bajo este volumen")
    args = p.parse_args()

    if not any([args.keywords, args.site, args.url]):
        p.error("hace falta al menos --keywords, --site o --url")
    if args.site and args.url:
        p.error("--site y --url son excluyentes: uno es el sitio entero, el otro una página")

    seeds = []
    if args.keywords:
        with open(args.keywords, encoding="utf-8") as fh:
            seeds = [l.strip() for l in fh if l.strip() and not l.startswith("#")]
        if not seeds:
            sys.exit(f"{args.keywords} no tiene semillas.")

    token = get_access_token()
    found = {}
    requests_made = 0

    # La API exige exactamente un tipo de semilla por request. Con keywords + url
    # se usa keywordAndUrlSeed; con --site va siteSeed (el sitio entero).
    if seeds and args.url:
        batches = [{"keywordAndUrlSeed": {"url": args.url, "keywords": seeds[i:i + CHUNK]}}
                   for i in range(0, len(seeds), CHUNK)]
    elif seeds:
        batches = [{"keywordSeed": {"keywords": seeds[i:i + CHUNK]}}
                   for i in range(0, len(seeds), CHUNK)]
    elif args.site:
        batches = [{"siteSeed": {"site": args.site}}]
    else:
        batches = [{"urlSeed": {"url": args.url}}]

    for i, seed_body in enumerate(batches, 1):
        if requests_made:
            time.sleep(QPS_SLEEP)          # 1 QPS por CID
        res = generate_ideas(token, seed_body)
        requests_made += 1
        parse_results(res, found)
        print(f"  [{i}/{len(batches)}] +{len(res)} ideas · {len(found)} únicas acumuladas")

    rows = [r for r in found.values()
            if args.min_vol == 0 or (r["volumen"] or 0) >= args.min_vol]
    rows.sort(key=lambda r: (r["volumen"] or 0), reverse=True)

    with open(args.out, "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=[
            "keyword", "volumen", "competencia", "indice_competencia", "puja_baja", "puja_alta"])
        w.writeheader()
        w.writerows(rows)

    print(f"\n{len(rows)} keywords -> {args.out}  ({requests_made} requests)")
    if rows:
        print("\nTop 15 por volumen:")
        for r in rows[:15]:
            print(f"  {str(r['volumen']):>6}  {r['competencia']:<6} {r['keyword']}")
    print(
        "\nOjo al leer: Google redondea los volúmenes. '50' es el cajón 10-100, no un dato fino.\n"
        "Y volumen no es intención: antes de cargar una keyword, preguntá qué busca de verdad\n"
        "quien la escribe. El mercado de Dataria tiene mucho volumen vecino que no es su producto."
    )


if __name__ == "__main__":
    main()
