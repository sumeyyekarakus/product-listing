import { useState, useMemo } from 'react';
import Rating from './Rating';
import ColorPicker from './ColorPicker';
import ProductCarousel from './ProductCarousel';

export default function ProductCard({ p }) {
  const initialColor = (p.colors && p.colors[0]) || 'yellow';
  const [color, setColor] = useState(initialColor);

  const currentImage = useMemo(()=>{
    // Eğer her renk için tek görsel varsa:
    return p.images?.[color] || Object.values(p.images || {})[0];
  }, [p, color]);

  return (
    <div className="card">
      <div className="media">
        {/* Tek görsel gösterilecekse carousel yerine direkt img de olur */}
        <ProductCarousel images={[currentImage]} />
      </div>

      <div className="content">
        <h3 className="title">{p.name}</h3>
        <div className="price ui">${p.priceUsd?.toFixed(2)}</div>
        <Rating value={Number(p.rating5 || 0)} />

        {p.colors?.length > 0 &&
          <div style={{ marginTop: 8 }}>
            <ColorPicker colors={p.colors} selected={color} onChange={setColor} />
          </div>
        }
      </div>
    </div>
  );
}
