import Link from 'next/link'

/**
 * Aviso del art. 6 de la Ley 25.326: finalidad, destinatarios, carácter
 * obligatorio o facultativo de las respuestas, consecuencias de no responder y
 * derechos de acceso, rectificación y supresión.
 */
export default function AvisoDatosPersonales({
  camposObligatorios = 'Nombre, email y teléfono',
  className = '',
}: {
  camposObligatorios?: string
  className?: string
}) {
  return (
    <p className={`text-xs text-texto-sec leading-relaxed ${className}`}>
      Los datos que dejás acá los trata <strong className="font-semibold">Dataria</strong> (Provincia de Buenos Aires,
      Argentina) con la única finalidad de responder tu consulta y coordinarte una reunión o una propuesta. Los recibe
      nuestro correo a través de Web3Forms, que procesa el envío por nuestra cuenta, y quedan registrados mientras dure
      la relación comercial y hasta 5 años después del último contacto.{' '}
      <strong className="font-semibold">{camposObligatorios}</strong> son obligatorios: sin esos datos no podemos
      responderte. Los demás campos son opcionales y solo nos ayudan a preparar mejor la respuesta; no completarlos no
      tiene ninguna consecuencia. No vendemos ni cedemos estos datos a terceros con fines publicitarios. Podés ejercer
      en cualquier momento los derechos de acceso, rectificación y supresión escribiendo a{' '}
      <a
        href="mailto:datariaai@gmail.com"
        className="text-azul-accion underline underline-offset-2 hover:no-underline"
      >
        datariaai@gmail.com
      </a>
      . Más detalle en la{' '}
      <Link href="/privacidad" className="text-azul-accion underline underline-offset-2 hover:no-underline">
        Política de Privacidad
      </Link>
      .
    </p>
  )
}
