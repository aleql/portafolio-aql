import type { CSSProperties } from 'react';

interface RivetProps {
  pos: CSSProperties;
  style?: CSSProperties;
  className?: string;
}

export default function Rivet({ pos, style, className = '' }: RivetProps) {
  return <span className={`rivet ${className}`} style={{ ...pos, ...style }} />;
}
