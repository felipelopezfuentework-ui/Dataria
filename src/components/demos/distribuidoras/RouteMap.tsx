'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ClienteDist } from '@/data/distribuidoras'

function makeIcon(label: string, active: boolean) {
  return L.divIcon({
    html: `
      <div style="
        width:32px; height:32px;
        background: ${active ? '#1B5BC1' : '#DCE5E9'};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 2px 8px rgba(27,91,193,0.3);
        border: 2px solid white;
      ">
        <span style="transform:rotate(45deg); color:${active ? 'white' : '#5A6871'}; font-size:11px; font-weight:700">
          ${label}
        </span>
      </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
    className: '',
  })
}

interface RouteMapProps {
  allClients: ClienteDist[]
  selectedIds: string[]
}

export default function RouteMap({ allClients, selectedIds }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  // Create map once, destroy on unmount
  useEffect(() => {
    if (!containerRef.current) return

    mapRef.current = L.map(containerRef.current, {
      center: [-31.413, -64.19],
      zoom: 10,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current)

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  // Update markers and polylines when selection changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Remove all layers except the tile layer
    map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) map.removeLayer(layer)
    })

    const positions: [number, number][] = selectedIds
      .map((id) => allClients.find((c) => c.id === id))
      .filter(Boolean)
      .map((c) => [c!.lat, c!.lng])

    if (positions.length > 1) {
      L.polyline(positions, { color: '#1B5BC1', weight: 3, dashArray: '6 4', opacity: 0.8 }).addTo(map)
    }

    allClients.forEach((client) => {
      const isSelected = selectedIds.includes(client.id)
      const orderIdx = selectedIds.indexOf(client.id) + 1

      L.marker([client.lat, client.lng], {
        icon: makeIcon(isSelected ? String(orderIdx) : '·', isSelected),
      })
        .bindPopup(`
          <div style="font-size:14px">
            <p style="font-weight:700;margin:0">${client.nombre}</p>
            <p style="font-size:12px;color:#6b7280;margin:4px 0 0">${client.direccion}</p>
            ${isSelected ? `<p style="font-size:12px;color:#2563eb;font-weight:600;margin:4px 0 0">Parada #${orderIdx}</p>` : ''}
          </div>
        `)
        .addTo(map)
    })

    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [40, 40], maxZoom: 13 })
    } else if (positions.length === 1) {
      map.setView(positions[0], 13)
    }
  }, [allClients, selectedIds])

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%', minHeight: 320, borderRadius: 8 }}
    />
  )
}
