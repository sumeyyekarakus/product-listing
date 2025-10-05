import { useMemo, useState } from 'react';
import ColorPicker from './ColorPicker';
import RatingStars from './RatingStars';

export default function ProductCard({ p }) {
  const colors = useMemo(() => Object.keys(p.images || {}), [p.images]);
  const initialColor = colors[0] || 'yellow';
  const [color, setColor] = useState(initialColor);
  const currentImage = p.images?.[color] || Object.values(p.images || {})[0];

  return (
    <div className="card">
      <div className="media">
        <div className="media">
          <div className="media-inner">
            <img src={currentImage} alt={p.name} />
          </div>
        </div>

      </div>

      <div className="content">
        <h3 className="title">{p.name}</h3>
        <div className="price">${p.priceUsd?.toFixed(2)} USD</div>
        <ColorPicker colors={colors} selected={color} onChange={setColor} />
        <RatingStars value={Number(p.rating5 || 0)} />
      </div>
    </div>
  );
}
