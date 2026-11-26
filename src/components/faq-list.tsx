type Faq = { id?: string; question: string; answer: string };

/** Answers are always visible, including before JavaScript loads. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="grid gap-4" data-faq-list>
      {items.map((item) => (
        <article key={item.id ?? item.question} className="rounded-2xl border border-border bg-surface p-5 sm:p-6" data-faq-item>
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">{item.question}</h3>
          <div className="mt-3 space-y-3 text-base leading-7 text-muted">
            {item.answer.split("\n").filter(line => line.trim()).map((line, index) => <p key={index}>{line}</p>)}
          </div>
        </article>
      ))}
    </div>
  );
}
