export function ArticleProse({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-2xl mx-auto px-6 py-4
        [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-carbon [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-[-0.01em]
        [&>p]:text-base [&>p]:text-carbon [&>p]:leading-relaxed [&>p]:mb-5
        [&_a]:text-azul-accion [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-azul-nucleo
        [&_strong]:font-bold"
    >
      {children}
    </div>
  )
}
