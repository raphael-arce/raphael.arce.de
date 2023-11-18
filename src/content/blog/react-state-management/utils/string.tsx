export function RenderingInfo({ count }: { count: number }) {
  return (
    <>
      (has been rendered <b>{count}</b> {count > 1 ? "times" : "time"})
    </>
  );
}
