import { useEffect, useState } from 'react';
import { api } from './api/client';
import ProductCard from './components/ProductCard';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try{
        const { data } = await api.get('/products');
        setItems(data.products || []);
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  if (loading) return <div className="container">Loading…</div>;

  return (
    <div className="container">
      <div className="grid">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
export default App;
