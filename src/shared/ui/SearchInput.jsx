export default function SearchInput({ value, onChange, placeholder = "Buscar" }) {
  return (
    <label className="block w-full">
      <span className="sr-only">Buscar</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
      />
    </label>
  );
}
