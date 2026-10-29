"use client";

/**
 * Thin client wrapper for TopicCard: intercepts the click, fires a custom
 * event that Program listens for, and scrolls the catalog into view.
 * Renders as an <li> (replacing the one inside TopicCard) with a full-size
 * button inside so keyboard users can trigger it too.
 */
export default function TopicCardLink({ name, children }) {
  function handleClick() {
    window.dispatchEvent(
      new CustomEvent("domain:filter-topic", { detail: name })
    );
    document.getElementById("by-topic")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="block h-full w-full cursor-pointer text-left"
        aria-label={`Filter by topic: ${name}`}
      >
        {children}
      </button>
    </li>
  );
}
