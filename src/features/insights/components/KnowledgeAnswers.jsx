import { Link } from "react-router-dom";
import { termPath } from "../data/knowledge.js";

export default function KnowledgeAnswers({ answers = [], terms = [] }) {
  if (!answers.length && !terms.length) return null;
  return <section className="my-9 border-t border-slate-200 pt-8" aria-labelledby="knowledge-answers">
    <h2 id="knowledge-answers" className="text-2xl font-semibold text-[#0b2038]">Perguntas e respostas</h2>
    <dl className="mt-5 space-y-6">{answers.map(([question, answer]) => <div key={question} className="border-b border-slate-200 pb-5"><dt className="text-lg font-semibold text-[#0b2038]">{question}</dt><dd className="mt-2 text-base leading-8 text-slate-700">{answer}</dd></div>)}</dl>
    {terms.length > 0 && <div className="mt-6"><h3 className="text-lg font-semibold text-[#0b2038]">Conceitos relacionados</h3><ul className="mt-3 flex flex-wrap gap-2">{terms.map(term => <li key={term.slug}><a href={termPath(term)} className="inline-block border border-slate-200 px-3 py-2 text-sm font-medium text-[#174b78] hover:underline">{term.name}</a></li>)}</ul><Link to="/glossario" className="rd-text-link mt-4 inline-block">Consultar glossário</Link></div>}
  </section>;
}
