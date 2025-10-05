export default function Rating({ value }) {
  const v = Number.isFinite(value) ? value.toFixed(1) : '0.0';
  return <div className="meta">{v}/5 ★</div>;
}