import type { CSSProperties } from 'react';

type PreviewFrameProps = {
  className: string;
  document: string;
  style?: CSSProperties;
  title: string;
};

export function PreviewFrame({
  className,
  document,
  style,
  title,
}: PreviewFrameProps) {
  return (
    <iframe
      className={className}
      sandbox=""
      srcDoc={document}
      style={style}
      title={title}
    />
  );
}
