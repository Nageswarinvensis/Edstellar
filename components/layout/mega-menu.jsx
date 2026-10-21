"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { MEGA_NAV, MEGA_STAGES } from "@/lib/nav-data";

const ROOT_ID = "mega-menu-root";

function Chevron({ className }) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Arrow({ className }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" className="size-4 flex-none">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const firstLinkHref = (item) => item.groups[0].links[0].href;
/* Unique per-link identity: several links can now share one href (e.g. a few
 * AI courses point at the AI domain), so the active-dot highlight keys on this,
 * not the href — otherwise hovering one lights every link that shares its URL. */
const linkKey = (link) => `${link.href}::${link.label}`;

function PanelLink({ link, divider, active, onNavigate, onPreview }) {
  return (
    <li className={divider ? "mb-1.5 border-b border-dashed border-ink/12 pb-1.5" : undefined}>
      <Link
        href={link.href}
        title={`Click Here to View ${link.label}`}
        onClick={onNavigate}
        onMouseEnter={() => onPreview(link)}
        onFocus={() => onPreview(link)}
        className={`group/mi flex items-center gap-2.5 py-[5px] text-[14px] leading-snug text-navy transition-transform duration-200 hover:translate-x-[3px] hover:underline hover:underline-offset-4 ${
          link.main ? "font-semibold" : ""
        }`}
      >
        {!link.main && (
          <span
            aria-hidden="true"
            className={`size-[5px] flex-none rounded-full border transition-transform duration-200 ${
              active ? "scale-[1.3] border-navy bg-navy" : "border-ink/22 group-hover/mi:scale-110"
            }`}
          />
        )}
        <span className="min-w-0">{link.label}</span>
        {link.main && <Arrow className="size-3.5 flex-none" />}
      </Link>
    </li>
  );
}

function PanelGroup({ group, first, activeKey, onNavigate, onPreview }) {
  const lastMainIdx = group.links.reduce((acc, link, i) => (link.main ? i : acc), -1);
  const headingId = `mega-${group.heading.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <Box className={first ? "min-w-0" : "min-w-0 border-l border-ink/12 pl-8 max-[1439px]:pl-6"}>
      <Text as="p" id={headingId} className="mb-2 flex items-baseline gap-2.5 border-b border-ink/12 pb-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink-muted">
        <span aria-hidden="true" className="font-medium text-navy">{group.num}</span>
        {group.heading}
      </Text>
      {group.intro && (
        <Text as="p" className="mb-2 text-[14px] leading-relaxed text-ink-muted">{group.intro}</Text>
      )}
      <Box as="ul" aria-labelledby={headingId} className="list-none">
        {group.links.map((link, i) => (
          <PanelLink
            key={link.href + link.label}
            link={link}
            active={linkKey(link) === activeKey}
            divider={link.main && i === lastMainIdx && i < group.links.length - 1}
            onNavigate={onNavigate}
            onPreview={onPreview}
          />
        ))}
      </Box>
      {group.more && (
        <Link
          href={group.more.href}
          title={`Click Here to View ${group.more.label}`}
          onClick={onNavigate}
          className="mt-3.5 inline-flex w-fit max-w-full items-center gap-2 py-1 text-[14px] leading-[1.45] font-semibold text-navy transition-transform duration-200 hover:translate-x-[3px] hover:underline hover:underline-offset-4"
        >
          {group.more.label}
          <Arrow className="size-4 flex-none" />
        </Link>
      )}
    </Box>
  );
}

/* Right-hand preview pane: reflects the hovered/focused item. */
function Preview({ pv, ctaHref }) {
  return (
    <Box className="flex min-w-0 flex-col gap-2.5 self-start border-l border-ink/12 pl-8 max-[1439px]:pl-6">
      <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{pv.c}</Text>
      <Text as="p" className="font-display text-[18px] font-semibold leading-tight tracking-[-0.01em] text-navy">{pv.t}</Text>
      <Text as="p" className="text-[14px] leading-relaxed text-ink-muted">{pv.d}</Text>
      {pv.s?.length > 0 && (
        <Text as="p" className="self-start rounded-full bg-lime-soft px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-navy">
          5A · {pv.s.join(" · ")}
        </Text>
      )}
      {pv.m && <Text as="p" className="-mt-1 text-[12px] leading-normal text-ink-muted">{pv.m}</Text>}
      <Box className="mt-0.5 border-t border-ink/12 pt-3.5">
        <Link
          href={ctaHref}
          title={`Click Here to View ${pv.t || pv.b || "Page"}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy px-3.5 py-2 text-[13px] font-semibold leading-none text-navy whitespace-nowrap transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(10,22,40,0.07),0_4px_12px_rgba(10,22,40,0.07)]"
        >
          {pv.b || "View page"}
          <Arrow className="size-3.5" />
        </Link>
      </Box>
    </Box>
  );
}

/* The navy 5A methodology rail pinned to the bottom of each panel. */
function Rail({ lit, onOpenBrief }) {
  return (
    <Box className="flex-none bg-navy text-paper/60">
      <Box className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-5 gap-y-3 px-10 py-2.5">
        <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.12em] text-lime">
          Edstellar 5A methodology
        </Text>
        <Box as="ol" aria-label="Edstellar 5A methodology stages" className="flex list-none flex-wrap gap-1">
          {MEGA_STAGES.map((stage) => {
            const on = lit.includes(stage.name);
            return (
              <li
                key={stage.name}
                className={`flex gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] ${
                  on ? "bg-lime font-medium text-navy" : "text-paper/60"
                }`}
              >
                <span aria-hidden="true" className={on ? "opacity-100" : "opacity-60"}>{stage.num}</span>
                {stage.name}
              </li>
            );
          })}
        </Box>
        <Box
          as="button"
          type="button"
          onClick={onOpenBrief}
          className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-paper whitespace-nowrap transition-transform duration-200 hover:translate-x-[3px]"
        >
          Not sure where to start? <span className="font-semibold text-lime">Build your brief</span>
          <Spark />
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Desktop mega menu — five tabs, each opening a full-width panel with numbered
 * link groups, a live preview pane and the 5A methodology rail. Client
 * Component: owns open/hover and preview state. Panels stay in the DOM (hidden
 * only visually) so every link is crawlable; `invisible` keeps closed panels
 * out of the tab order.
 */
export default function MegaMenu({ onOpenBrief }) {
  const [openId, setOpenId] = useState(null);
  const [pv, setPv] = useState(null);
  const [activeHref, setActiveHref] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const hoverT = useRef(null);
  const leaveT = useRef(null);

  const clearTimers = () => {
    clearTimeout(hoverT.current);
    clearTimeout(leaveT.current);
  };

  const open = (id) => {
    const item = MEGA_NAV.find((n) => n.id === id);
    const firstLink = item ? item.groups[0].links[0] : null;
    setOpenId(id);
    setPv(item ? item.first : null);
    setActiveHref(firstLink ? firstLink.href : null);
    setActiveKey(firstLink ? linkKey(firstLink) : null);
  };

  const close = () => {
    clearTimers();
    setOpenId(null);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (!openId) return undefined;
    const onKey = (ev) => {
      if (ev.key === "Escape") close();
    };
    const onDocClick = (ev) => {
      const root = document.getElementById(ROOT_ID);
      if (root && !root.contains(ev.target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDocClick);
    };
  }, [openId]);

  const onTabClick = (id) => {
    clearTimers();
    if (openId === id) close();
    else open(id);
  };

  const onTabEnter = (id) => {
    clearTimeout(leaveT.current);
    clearTimeout(hoverT.current);
    if (openId && openId !== id) open(id);
    else if (!openId) hoverT.current = setTimeout(() => open(id), 140);
  };

  const onPreview = (link) => {
    setPv(link.pv);
    setActiveHref(link.href);
    setActiveKey(linkKey(link));
  };

  const onRootLeave = () => {
    clearTimeout(hoverT.current);
    leaveT.current = setTimeout(() => setOpenId(null), 300);
  };
  const onRootEnter = () => clearTimeout(leaveT.current);

  return (
    <Box
      id={ROOT_ID}
      onMouseLeave={onRootLeave}
      onMouseEnter={onRootEnter}
      className="flex min-w-0 flex-1 items-stretch justify-end max-nav:hidden"
    >
      <Box as="nav" aria-label="Main" className="flex items-center">
        <Box as="ul" className="flex list-none items-center">
          {MEGA_NAV.map((item) => {
            const isOpen = openId === item.id;
            return (
              <li key={item.id} className="flex">
                <Box
                  as="button"
                  type="button"
                  id={`mega-tab-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`mega-panel-${item.id}`}
                  onClick={() => onTabClick(item.id)}
                  onMouseEnter={() => onTabEnter(item.id)}
                  onMouseLeave={clearTimers}
                  className="group/tab relative inline-flex cursor-pointer items-center gap-1 whitespace-nowrap px-2 py-[22px] font-body text-[14px] font-medium text-navy max-[1279px]:px-1.5"
                >
                  {item.tab}
                  <Chevron className={`size-3 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2 -bottom-px h-[2px] origin-left bg-navy transition-transform duration-200 ${
                      isOpen ? "scale-x-100" : "scale-x-0 group-hover/tab:scale-x-[0.35]"
                    }`}
                  />
                </Box>
              </li>
            );
          })}
        </Box>
      </Box>

      {MEGA_NAV.map((item) => {
        const isOpen = openId === item.id;
        const shownPv = isOpen ? pv || item.first : item.first;
        const lit = shownPv?.s?.length ? shownPv.s : item.stages;
        const ctaHref = isOpen ? activeHref || firstLinkHref(item) : firstLinkHref(item);
        return (
          <Box
            key={item.id}
            id={`mega-panel-${item.id}`}
            role="region"
            aria-labelledby={`mega-tab-${item.id}`}
            aria-hidden={!isOpen}
            className={`absolute inset-x-0 top-full z-20 flex max-h-[calc(100vh-72px)] flex-col border-b border-ink/12 bg-white shadow-[0_12px_32px_rgba(10,22,40,0.10)] transition-[opacity,transform,visibility] duration-200 ${
              isOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1.5 opacity-0"
            }`}
          >
            <Box className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <Box className="mx-auto max-w-[1360px] px-10 pt-7 pb-6">
                <Box
                  className={
                    item.full
                      ? "grid"
                      : "grid grid-cols-[minmax(0,1fr)_340px] gap-10 max-[1439px]:grid-cols-[minmax(0,1fr)_300px] max-[1439px]:gap-8"
                  }
                >
                  <Box
                    className="grid gap-8 max-[1439px]:gap-6"
                    style={{ gridTemplateColumns: `repeat(${item.groups.length}, minmax(0, 1fr))` }}
                  >
                    {item.groups.map((group, i) => (
                      <PanelGroup
                        key={group.heading}
                        group={group}
                        first={i === 0}
                        activeKey={isOpen ? activeKey : null}
                        onNavigate={close}
                        onPreview={onPreview}
                      />
                    ))}
                  </Box>
                  {/* A `full` panel (Company) has no preview pane: its groups take the width. */}
                  {shownPv && !item.full && <Preview pv={shownPv} ctaHref={ctaHref} />}
                </Box>
                {item.foot && (
                  <Box className="mt-6 border-t border-ink/12 pt-4">
                    <Link
                      href={item.foot.href}
                      title={`Click Here to View ${item.foot.label}`}
                      onClick={close}
                      className="inline-flex items-center gap-2 text-[14px] font-semibold text-navy transition-transform duration-200 hover:translate-x-[3px] hover:underline hover:underline-offset-4"
                    >
                      {item.foot.label}
                      <Arrow className="size-4" />
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
            <Rail
              lit={lit}
              onOpenBrief={() => {
                close();
                onOpenBrief();
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
