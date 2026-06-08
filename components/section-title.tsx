type SectionTitleProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-stone-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">{text}</p>
    </div>
  );
}
