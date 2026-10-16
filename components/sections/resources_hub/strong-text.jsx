/** Content text with `**bold**` runs rendered as `<strong>` in ink. */
export default function StrongText({ text }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, index) =>
    index % 2 ? (
      <strong key={index} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
