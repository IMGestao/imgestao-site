export default function CategoryPills({ categories = [], activeCategory = "", onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect("")}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          !activeCategory
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
        }`}
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            activeCategory === category
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
