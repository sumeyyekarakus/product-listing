const LABELS={yellow:'Yellow Gold',white:'White Gold',rose:'Rose Gold'};
const BG={yellow:'var(--metal-yellow)',white:'var(--metal-white)',rose:'var(--metal-rose)'};
const ORDER=['yellow','white','rose'];

export default function ColorPicker({colors=[],selected,onChange}) {
  const ordered=ORDER.filter(c=>colors.includes(c));
  const label=(LABELS[selected]??selected)||'';
  return(
    <div className="color-picker">
      <div className="color-chips">
        {ordered.map(c=>(
          <button
            key={c}
            className={`chip ${selected===c?'active':''}`}
            style={{'--chip-bg':BG[c]}}
            aria-label={LABELS[c]||c}
            onClick={()=>onChange(c)}
          />
        ))}
      </div>
      {label && <div className="color-caption">{label}</div>}
    </div>
  );
}
