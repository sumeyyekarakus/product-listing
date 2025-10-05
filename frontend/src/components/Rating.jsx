export default function Rating({ value }) {
  // value: 0.0–5.0 (1 ondalık)
  return <div aria-label={`Rating ${value}/5`}>{value.toFixed(1)} / 5 ★</div>;
}
