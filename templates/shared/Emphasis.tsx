// Resalta las partes de un texto escritas entre *asteriscos* (desde el
// config, sin escribir HTML): "No habrá *recepción*" → No habrá <strong>.
export default function Emphasis({ text, className = "font-bold" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={className}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
