import type { CookieTableRow } from "@/types/legal";

interface CookieTableProps {
  title: string;
  columns: { name: string; purpose: string; duration: string; category: string };
  rows: CookieTableRow[];
}

export function CookieTable({ title, columns, rows }: CookieTableProps) {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-2xl font-bold text-navy md:text-[28px]">{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-stone bg-white">
        <table className="w-full min-w-135 text-left text-sm md:text-[15px]">
          <thead className="bg-surface text-[#7A756B]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">{columns.name}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{columns.purpose}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{columns.duration}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{columns.category}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-stone align-top">
                <th scope="row" className="px-4 py-3 font-mono text-[13px] font-semibold text-navy">{row.name}</th>
                <td className="px-4 py-3 text-[#2C2A26]">{row.purpose}</td>
                <td className="px-4 py-3 whitespace-nowrap text-[#2C2A26]">{row.duration}</td>
                <td className="px-4 py-3 text-[#2C2A26]">{row.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
