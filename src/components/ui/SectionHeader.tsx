interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  dark?: boolean;
  action?: React.ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  dark = false,
  action,
}: SectionHeaderProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className="flex items-end justify-between mb-8 gap-4">
      <div>
        <p
          className={`text-xs font-bold uppercase tracking-[3px] mb-2 ${
            dark ? 'text-neutral-on-dark' : 'text-cta'
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`font-heading font-semibold text-h2 leading-tight ${
            dark ? 'text-white' : 'text-neutral-text'
          }`}
        >
          {highlight ? (
            <>
              {parts[0]}
              <span className={dark ? 'text-white' : 'text-primary'}>{highlight}</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
