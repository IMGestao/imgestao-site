export default function EditorialVisual({ article }) {
  if (article.cover) return <img src={article.cover} alt="" loading="lazy" />;
  const tema = String(article.categoria || "").toLowerCase();
  const kind = tema.includes("transform") ? 1 : tema.includes("govern") ? 2 : tema.includes("estrat") ? 3 : 0;
  const palette = [["#d9e3ea","#183f5c","#397da5"],["#0b2038","#91c8df","#3988ab"],["#cddfe2","#204e62","#4f8391"],["#172e4a","#b8c8da","#6a9eb9"]][kind];
  return (
    <svg className="rd-editorial-svg" viewBox="0 0 600 310" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="310" fill={palette[0]} />
      {kind === 0 && <g fill="none" stroke={palette[1]} strokeWidth="3"><path d="M-25 290L145 100 260 185 400 40 630 230"/><path d="M-25 312L145 122 260 207 400 62 630 252"/><path d="M145 100V310M260 185V310M400 40V310" strokeDasharray="5 8"/><circle cx="400" cy="40" r="10" fill={palette[2]}/><path d="M-20 260H620M-20 225H620" opacity=".25"/></g>}
      {kind === 1 && <g fill="none" stroke={palette[1]} strokeWidth="2">{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${i*32-30} 310Q${160+i*28} 80 640 ${i*27-40}`} opacity={0.4+i*0.07}/>)}<circle cx="300" cy="149" r="67" stroke={palette[2]} strokeWidth="28" opacity=".7"/><circle cx="300" cy="149" r="34" fill={palette[2]}/></g>}
      {kind === 2 && <g fill="none" stroke={palette[1]} strokeWidth="2">{[0,1,2,3].map(i=><rect key={i} x={60+i*42} y={30+i*27} width={480-i*84} height={250-i*54} />)}<path d="M60 30L300 155 540 30M60 280L300 155 540 280"/><rect x="280" y="135" width="40" height="40" fill={palette[2]}/></g>}
      {kind === 3 && <g fill="none" stroke={palette[1]} strokeWidth="2">{[0,1,2,3,4,5].map(i=><path key={i} d={`M${30+i*45} 310L300 ${10+i*34} ${570-i*45} 310`} />)}<circle cx="300" cy="10" r="9" fill={palette[2]}/><path d="M300 15V310" strokeDasharray="5 8"/></g>}
    </svg>
  );
}
