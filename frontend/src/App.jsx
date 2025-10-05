import { useEffect, useState } from 'react';
import { api } from './api/client';
import ProductsCarousel from './components/ProductsCarousel';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProductsDirect() {
    const r = await fetch('https://product-listing-opm7.onrender.com/api/products');
    const j = await r.json();
    const arr = Array.isArray(j) ? j : (j?.products || []);
    return arr.map((p, i) => ({
      id: p.id ?? i,
      name: p.name,
      images: p.images,
      weight: p.weight,
      popularityScore: p.popularityScore,
      rating5: p.rating5,
      priceUsd: p.priceUsd,
    }));
  }

  useEffect(() => {
    (async () => {
      try {
        
        const { data } = await api.get('/products'); // → .../api/products
        const arr = Array.isArray(data) ? data : (data?.products || []);
        const normalized = arr.map((p, i) => ({
          id: p.id ?? i,
          name: p.name,
          images: p.images,
          weight: p.weight,
          popularityScore: p.popularityScore,
          rating5: p.rating5,
          priceUsd: p.priceUsd,
        }));
        if (normalized.length === 0) throw new Error('Empty list');
        setItems(normalized);
      } catch (e) {
        console.warn('API via env failed, trying direct URL…', e);
        try {
          
          const normalized = await fetchProductsDirect();
          setItems(normalized);
        } catch (err) {
          console.error('Direct fetch failed', err);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container">Loading…</div>;
  if (!items.length) {
    return (
      <div className="container">
        No products fetched. Check VITE_API_URL and /api route.
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Product List</h1>
      <ProductsCarousel items={items} />
    </div>
  );
}

export default App;
