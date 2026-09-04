// Server Component — no interactivity, pure CSS animation

const COUNT = 8;
const LABEL = "Corporate clients only";

function Track({ className }) {
  return (
    <span
      className={`flex whitespace-nowrap font-mono text-[10.5px] tracking-[.22em] uppercase py-[9px] ${className ?? ""}`}
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <span key={i}>
          {LABEL}
          <i className="not-italic opacity-45 px-[22px]">&bull;</i>
        </span>
      ))}
    </span>
  );
}

export default function TickerBar() {
  return (
    <div
      aria-hidden="true"
      className="
        bg-navy text-lime border-b border-paper/10 overflow-hidden
        [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]
        motion-reduce:[mask-image:none]
        motion-reduce:[-webkit-mask-image:none]
      "
    >
      <div className="flex w-max animate-[logoSlide_34s_linear_infinite] motion-reduce:animate-none motion-reduce:w-full motion-reduce:justify-center">
        <Track />
        <Track className="motion-reduce:hidden" />
      </div>
    </div>
  );
}
