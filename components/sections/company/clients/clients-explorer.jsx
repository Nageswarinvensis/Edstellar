"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px] shrink-0 text-ink/40">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * The client explorer — search, region filter, sector chips and the grid of
 * 121 client cards. Every card is rendered on the server (this leaf is still
 * server-rendered into the HTML), so all 121 names and descriptions are in the
 * initial markup for crawlers; the directive only powers filtering and the
 * expandable detail panel.
 *
 * Sibling sections (Regions, Sectors) and each card's own "See all …" button
 * drive this filter by carrying a `data-go-sector` attribute; a single
 * document-level listener reads it, sets the sector and scrolls here — the same
 * contract the original design's vanilla JS used, which keeps those sections
 * pure Server Components.
 */
export default function ClientsExplorer({ data }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [sector, setSector] = useState("all");
  const [openName, setOpenName] = useState(null);

  const sectorLabel = useMemo(() => {
    const map = { all: "all sectors" };
    data.sectors.forEach((s) => (map[s.key] = s.label));
    return map;
  }, [data.sectors]);

  useEffect(() => {
    function onClick(event) {
      const trigger = event.target.closest?.("[data-go-sector]");
      if (!trigger) return;
      // Ignore any trigger inside the explorer itself; those handle state directly.
      if (trigger.closest("#clients")) return;
      const next = trigger.getAttribute("data-go-sector");
      if (!next) return;
      setSector(next);
      setRegion("all");
      setQuery("");
      setOpenName(null);
      document.getElementById("clients")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.clients.filter((c) => {
      if (sector !== "all" && c.sector !== sector) return false;
      if (region !== "all" && c.region !== region) return false;
      if (q && !c.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data.clients, sector, region, query]);

  function goToSector(next) {
    setSector(next);
    setRegion("all");
    setQuery("");
    setOpenName(null);
    document.getElementById("clients")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Section id="clients" aria-labelledby="clients-h" className="scroll-mt-16 bg-paper">
      <Box className="max-w-[640px]">
        <RichHeading
          as="h2"
          id="clients-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
          {data.lede}
        </Text>
      </Box>

      {/* Controls */}
      <Box className="mb-6 mt-8 flex flex-col gap-4">
        <Box className="flex flex-wrap items-center gap-4">
          <Box className="relative max-w-[420px] flex-[1_1_320px]">
            <Text as="label" htmlFor="client-search" className="sr-only">
              Find a client
            </Text>
            <Box className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40">
              <SearchIcon />
            </Box>
            <input
              id="client-search"
              type="search"
              autoComplete="off"
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-[10px] border border-ink/22 bg-white py-3 pl-11 pr-4 font-body text-base text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            />
          </Box>

          <Box className="flex-[0_1_260px]">
            <Text as="label" htmlFor="client-region" className="sr-only">
              Region
            </Text>
            <select
              id="client-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-[10px] border border-ink/22 bg-white px-4 py-3 font-body text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <option value="all">All regions</option>
              {data.regions.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label} ({r.count})
                </option>
              ))}
            </select>
          </Box>
        </Box>

        {/* Sector chips */}
        <Box role="group" aria-label="Filter clients by sector" className="flex flex-wrap gap-2">
          <Chip label="All sectors" count={data.total} active={sector === "all"} onClick={() => setSector("all")} />
          {data.sectors.map((s) => (
            <Chip key={s.key} label={s.label} count={s.count} active={sector === s.key} onClick={() => setSector(s.key)} />
          ))}
        </Box>
      </Box>

      <Text as="p" role="status" aria-live="polite" className="mb-6 text-sm text-ink/60">
        Showing {visible.length} {visible.length === 1 ? "client" : "clients"}
        {sector !== "all" ? ` in ${sectorLabel[sector]}` : ""}.
      </Text>

      {visible.length === 0 ? (
        <Text as="p" className="rounded-[14px] border border-dashed border-ink/22 bg-white px-6 py-10 text-center text-ink/60">
          No clients match those filters. Try clearing the search or choosing a different sector.
        </Text>
      ) : (
        <Box as="ul" className="grid list-none grid-cols-5 gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {visible.map((client) => (
            <ClientCard
              key={client.name}
              client={client}
              open={openName === client.name}
              onOpen={() => setOpenName(client.name)}
              onClose={() => setOpenName(null)}
              onGoSector={() => goToSector(client.sector)}
            />
          ))}
        </Box>
      )}
    </Section>
  );
}

function Chip({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
        active
          ? "border-navy bg-navy text-paper"
          : "border-ink/22 bg-white text-ink hover:border-navy"
      }`}
    >
      {label}
      <Text as="span" className={`font-mono text-xs ${active ? "text-paper/70" : "text-ink/60"}`}>
        {count}
      </Text>
    </button>
  );
}

function ClientCard({ client, open, onOpen, onClose, onGoSector }) {
  const detailId = `client-${client.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <Box as="li" className="relative min-h-[188px]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={onOpen}
        className="flex h-full min-h-[188px] w-full flex-col items-stretch gap-3 rounded-[14px] border border-ink/12 bg-white p-4 text-left shadow-rest transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <Box className="flex flex-[0_0_88px] items-center justify-center border-b border-ink/12 pb-3">
          <Image src={client.logo} alt="" width={150} height={56} className="h-14 w-full max-w-[150px] object-contain" />
        </Box>
        <Box className="flex items-start justify-between gap-2 leading-[1.35]">
          <Box>
            <Text as="span" className="block font-body text-sm font-semibold text-ink">
              {client.name}
            </Text>
            <Text as="span" className="mt-1 block text-xs leading-[1.4] text-ink/60">
              {client.sector_label}
            </Text>
          </Box>
          <InfoIcon />
        </Box>
        <Text as="span" className="sr-only">, show details</Text>
      </button>

      {open && (
        <Box
          id={detailId}
          className="absolute inset-0 z-[2] flex flex-col gap-2 rounded-[14px] bg-navy p-4 text-paper shadow-lift"
        >
          <button
            type="button"
            aria-label={`Close details for ${client.name}`}
            onClick={onClose}
            className="absolute right-3 top-3 text-paper/80 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <CloseIcon />
          </button>
          <Text as="h3" className="pr-8 font-body text-sm font-semibold text-paper">
            {client.name}
          </Text>
          <Text as="span" className="font-mono text-[11px] uppercase leading-[1.4] tracking-[0.12em] text-lime">
            {client.sector_label}
          </Text>
          <Text as="p" className="text-sm leading-[1.5] text-paper">
            {client.description}
          </Text>
          <Box className="mt-auto flex flex-col items-start gap-1 pt-2">
            <button
              type="button"
              onClick={onGoSector}
              className="min-h-6 py-1 text-[13px] font-semibold text-paper underline underline-offset-[3px] hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              See all {client.sector_label.toLowerCase()} clients
            </button>
            {client.industry && (
              <Link
                href={client.industry.href}
                className="min-h-6 py-1 text-[13px] font-semibold text-paper underline underline-offset-[3px] hover:text-lime"
              >
                {client.industry.label}
              </Link>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
