export type PropDef = {
  name: string;
  type: string;
  default?: string;
};

type PropsTableProps = {
  rows: PropDef[];
};

export function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg hairline border-current/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="hairline-b border-current/10 text-neutral-600 dark:text-neutral-400">
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="not-last:hairline-b border-current/10">
              <td className="px-4 py-2.5 font-mono text-[0.8125rem]">{row.name}</td>
              <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-neutral-600 dark:text-neutral-400">
                {row.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-neutral-600 dark:text-neutral-400">
                {row.default ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
