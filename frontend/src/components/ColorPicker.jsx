export default function ColorPicker({ colors, selected, onChange }) {
  const map = {
    yellow: 'var(--metal-yellow)',
    white: 'var(--metal-white)',
    rose:  'var(--metal-rose)'
  };
  return (
    <div style={{ display:'flex', gap:8 }}>
      {colors?.map(c => (
        <button key={c}
          onClick={()=>onChange(c)}
          aria-label={c}
          style={{
            width:20, height:20, borderRadius:'50%',
            border: selected===c ? '2px solid black':'1px solid #aaa',
            background: map[c] || '#ccc', cursor:'pointer'
          }} />
      ))}
    </div>
  );
}
