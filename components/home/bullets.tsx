const BULLETS = [
  {
    title: 'Write it in your browser.',
    body: 'Monaco editor, syntax highlighting, no local setup.'
  },
  {
    title: 'Get a real endpoint.',
    body: 'Every function gets an HTTPS URL and an API key.'
  },
  {
    title: 'Runs in 30 seconds or less.',
    body: 'Hard timeout, 128 MB heap, no surprises.'
  }
];

export function Bullets() {
  return (
    <section className="mx-auto mt-12 max-w-3xl px-6">
      <ul className="grid gap-8 sm:grid-cols-3">
        {BULLETS.map((b) => (
          <li key={b.title}>
            <h3 className="text-foreground font-semibold">{b.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{b.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
