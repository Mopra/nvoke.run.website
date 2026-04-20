export type ComparisonRow = {
  criterion: string;
  nvoke: string;
  other: string;
};

type ComparisonTableProps = {
  otherLabel: string;
  rows: readonly ComparisonRow[];
};

export function ComparisonTable({ otherLabel, rows }: ComparisonTableProps) {
  return (
    <section className="mx-auto mt-12 max-w-4xl px-6">
      <div className="border-border/60 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border/60 bg-muted/30 border-b">
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">Criterion</th>
              <th className="text-foreground px-4 py-3 text-left font-semibold">nvoke</th>
              <th className="text-muted-foreground px-4 py-3 text-left font-medium">
                {otherLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.criterion} className="border-border/40 border-b last:border-b-0">
                <td className="text-foreground px-4 py-3 font-medium">{row.criterion}</td>
                <td className="text-muted-foreground px-4 py-3 leading-relaxed">{row.nvoke}</td>
                <td className="text-muted-foreground px-4 py-3 leading-relaxed">{row.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
