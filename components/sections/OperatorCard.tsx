interface OperatorCardProps {
  title: string;
  name: string;
  rows: { label: string; value: string; href?: string }[];
}

export function OperatorCard({ title, name, rows }: OperatorCardProps) {
  return (
    <div className="mt-8 rounded-2xl border border-stone bg-white p-6 md:p-8">
      <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{title}</h2>
      <p className="mt-2 font-serif text-xl font-bold text-navy">{name}</p>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 text-[15px] sm:grid-cols-[auto_1fr]">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="font-semibold text-[#7A756B]">{row.label}</dt>
            <dd className="text-[#2C2A26]">
              {row.href ? (
                <a href={row.href} className="underline underline-offset-2 hover:text-navy">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
