import { useId } from "react";

export default function RatingStars({
  value = 0,
  size = 18,
  color = "#E6CA97",   
  empty = "#E5E5E5",   
}) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const uid = useId();

  return (
    <div className="stars" aria-label={`${v.toFixed(1)}/5`}>
      <div style={{ display: "flex", gap: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fillPct = Math.max(0, Math.min(1, v - i)); 
          const gradId = `${uid}-g${i}`;

          return (
            <svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
                  <stop offset={`${fillPct * 100}%`} stopColor={color} />
                  <stop offset={`${fillPct * 100}%`} stopColor={empty} />
                </linearGradient>
              </defs>

              {}
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                fill={empty}
              />
              {}
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                fill={`url(#${gradId})`}
              />
            </svg>
          );
        })}
      </div>
      <span className="stars-text" style={{ marginLeft: 8 }}>
        {v.toFixed(1)}/5
      </span>
    </div>
  );
}
