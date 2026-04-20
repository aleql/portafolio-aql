import type { ReactNode } from 'react';

interface SectionHeadProps {
  tag: string;
  title: ReactNode;
  subtitle?: string;
}

export default function SectionHead({ tag, title, subtitle }: SectionHeadProps) {
  return (
    <>
      <div className="section-title-row">
        <div>
          <div className="label-strip">{tag}</div>
          <h2 style={{ marginTop: 10 }}>{title}</h2>
        </div>
        <div className="bar" />
      </div>
      {subtitle && <div className="section-subtitle">▸ {subtitle}</div>}
    </>
  );
}
