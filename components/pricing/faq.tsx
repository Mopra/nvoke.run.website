const FAQ = [
  {
    q: 'What counts as an execution?',
    a: 'One invocation of one function. A function that calls itself is still one execution. HTTP 4xx from your code counts; a 500 from our runner does not.'
  },
  {
    q: 'What happens if I hit my limit?',
    a: 'Invocations start returning 429. Your functions stay, your keys stay, your code stays. Upgrade or wait for the month to roll over.'
  },
  {
    q: 'Can I change plans mid-month?',
    a: 'Yes. Upgrades take effect immediately with a prorated charge. Downgrades take effect at the next billing cycle.'
  },
  {
    q: 'Do unused executions roll over?',
    a: 'No. Each month starts at zero.'
  }
];

export function PricingFaq() {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-6">
      <h2 className="text-foreground text-2xl font-semibold tracking-tight">Questions</h2>
      <div className="mt-8 space-y-8">
        {FAQ.map((item) => (
          <div key={item.q}>
            <h3 className="text-foreground font-semibold">{item.q}</h3>
            <p className="text-muted-foreground mt-2">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
