import type { ReactNode } from 'react';

export function SectionHead({
  kicker,
  title,
  copy,
  id,
}: {
  kicker: string;
  title: ReactNode;
  copy?: string;
  id?: string;
}) {
  return (
    <div className="section-head">
      <span className="kicker">{kicker}</span>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}
