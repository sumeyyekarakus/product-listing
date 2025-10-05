import { useEffect, useState } from 'react';
import { api } from './api/client';
import ProductsCarousel from './components/ProductsCarousel';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDirect() {
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
        const { data } = await api.get('/products'); // -> .../api/products
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
        if (normalized.length === 0) throw new Error('empty');
        setItems(normalized);
        console.log('Fetched via env:', normalized.length);
      } catch (e) {
        console.warn('Env BASE failed, trying direct URL…', e);
        try {
          const normalized = await fetchDirect();
          setItems(normalized);
          console.log('Fetched via direct URL:', normalized.length);
        } catch (err) {
          console.error('Direct fetch failed', err);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container">Loading…</div>;
  if (!items.length) return <div className="container">No products fetched. Check API config.</div>;

  return (
    <div className="container">
      <h1 className="page-title">Product List</h1>
      <ProductsCarousel items={items} />
    </div>
  );
}

export default App;
