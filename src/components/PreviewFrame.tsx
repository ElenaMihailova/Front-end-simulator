type PreviewFrameProps = {
  className: string;
  document: string;
  title: string;
};

export function PreviewFrame({
  className,
  document,
  title,
}: PreviewFrameProps) {
  return (
    <iframe className={className} sandbox="" srcDoc={document} title={title} />
  );
}
