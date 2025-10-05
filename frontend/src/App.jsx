
import { useEffect, useState } from 'react';
import { api } from './api/client';
import ProductsCarousel from "./components/ProductCarousel"; 

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/products');
        setItems(data.products || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container">Loading…</div>;

  return (
    <div className="container">
      <h1 className="page-title">Product List</h1>
      <ProductsCarousel items={items} />
    </div>
  );
}
export default App;
