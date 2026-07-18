export interface IntegrationsData {
  heading: string
  body: string
  tools: string[]
}

export function IndustryIntegrations({ heading, body, tools }: IntegrationsData) {
  return (
    <section className="py-16 bg-fondo-suave">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">{heading}</h2>
          <p className="text-base text-texto-sec leading-relaxed mb-6">{body}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map(tool => (
              <span key={tool} className="px-4 py-2 rounded-full bg-white border border-borde text-sm font-medium text-carbon">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
