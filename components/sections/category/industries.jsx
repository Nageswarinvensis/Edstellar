"use client";

import { useState, useMemo, useRef } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";

function IconRenderer({ name }) {
  const icons = {
    flask: (
      <svg className="h-4 w-4 text-[#C8EF3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.60 15.12a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 00-.586 1.414V20a2 2 0 002 2h14a2 2 0 002-2v-1.751a2 2 0 00-.586-1.414l-1.168-1.168zM12 2v10" />
      </svg>
    ),
    shield: (
      <svg className="h-4 w-4 text-[#C8EF3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bank: (
      <svg className="h-4 w-4 text-[#C8EF3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    plus: (
      <svg className="h-4 w-4 text-[#1A202C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    key: (
      <svg className="h-4 w-4 text-[#1A202C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    file: (
      <svg className="h-4 w-4 text-[#1A202C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  };

  return icons[name] || icons.flask;
}

export default function Industries({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogPageIndex, setCatalogPageIndex] = useState(0);
  const [proposedPageIndex, setProposedPageIndex] = useState(0);

  const catalogRef = useRef(null);
  const proposedRef = useRef(null);

  if (!data) return null;

  const catalogSectors = data.catalogSectors || [];
  const proposedSectors = data.proposedSectors || [];

  const filteredCatalog = useMemo(() => {
    if (!searchTerm.trim()) return catalogSectors;
    const q = searchTerm.toLowerCase();
    return catalogSectors.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.cohort?.toLowerCase().includes(q) ||
        item.builds?.toLowerCase().includes(q)
    );
  }, [searchTerm, catalogSectors]);

  const filteredProposed = useMemo(() => {
    if (!searchTerm.trim()) return proposedSectors;
    const q = searchTerm.toLowerCase();
    return proposedSectors.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.cohort?.toLowerCase().includes(q) ||
        item.scope?.toLowerCase().includes(q)
    );
  }, [searchTerm, proposedSectors]);

  const handleScroll = (ref, setIndex, direction) => {
    if (ref.current) {
      const scrollAmount = 386;
      ref.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
      setTimeout(() => {
        const newIndex = Math.round(ref.current.scrollLeft / scrollAmount);
        setIndex(newIndex);
      }, 200);
    }
  };

  return (
    <Section className="bg-paper-warm font-sans text-[#1A202C]">
      <Box>
        {/* HEADER */}
        {data.title && (
          <Text as="h2" className="text-[32px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-1px] text-[#0F172A]">
            {data.title.main}{" "}
            <Text as="span" className="italic font-serif font-normal">{data.title.italic}</Text>{" "}
            {data.title.suffix}
          </Text>
        )}

        {data.subtitle && (
          <Text as="p" className="mt-4 max-w-[720px] text-[13px] leading-[1.7] text-[#526176]">
            {data.subtitle}
          </Text>
        )}

        {/* INFO BOXES */}
        {data.infoBoxes && (
          <Box className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {data.infoBoxes.left && (
              <Box className="lg:col-span-7 rounded-[8px] border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm">
                <Text as="span" className="font-mono text-[9px] font-medium tracking-[1px] uppercase text-[#718096]">
                  {data.infoBoxes.left.label}
                </Text>
                <ul className="mt-4 space-y-2.5 text-[12px] leading-[1.6] text-[#4A5568]">
                  {data.infoBoxes.left.points?.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Box as="span" className="mt-1.5 h-[3px] w-[3px] rounded-full bg-[#718096] shrink-0" />
                      <Text as="span">
                        {p.text}{" "}
                        {p.bold && <strong className="font-semibold text-[#1A202C]">{p.bold}</strong>}{" "}
                        {p.suffix}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {data.infoBoxes.right && (
              <Box className="lg:col-span-5 rounded-[8px] border border-dashed border-[#CBD5E0] bg-transparent p-6">
                <Text as="span" className="font-mono text-[9px] font-medium tracking-[1px] uppercase text-[#718096]">
                  {data.infoBoxes.right.label}
                </Text>
                <ul className="mt-4 space-y-2.5 text-[12px] leading-[1.6] text-[#4A5568]">
                  {data.infoBoxes.right.points?.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Box as="span" className="mt-1.5 h-[3px] w-[3px] rounded-full bg-[#718096] shrink-0" />
                      <Text as="span">
                        {p.text}{" "}
                        {p.bold && <strong className="font-semibold text-[#1A202C]">{p.bold}</strong>}{" "}
                        {p.suffix}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        )}

        {/* SEARCH BAR */}
        <Box className="mt-8 flex items-center gap-3">
          <Text as="span" className="font-mono text-[9px] font-medium uppercase tracking-[1px] text-[#718096]">
            FIND YOUR SECTOR
          </Text>
          <Box className="relative">
            <input
              type="text"
              placeholder="Try banking, hospital, factory, alerts, forecasting"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCatalogPageIndex(0);
                setProposedPageIndex(0);
              }}
              className="h-[34px] w-[280px] sm:w-[340px] rounded-[6px] border border-[#CBD5E0] bg-[#FFFFFF] px-3 font-mono text-[11px] text-[#1A202C] placeholder-[#A0AEC0] outline-none focus:border-[#4A5568]"
            />
          </Box>
          <Text as="span" className="font-mono text-[9px] font-medium uppercase tracking-[1px] text-[#718096]">
            {catalogSectors.length + proposedSectors.length} SECTORS
          </Text>
        </Box>

        {/* CATALOG CARDS SECTION */}
        <Box className="mt-12">
          <Box className="flex items-center justify-between pb-3">
            <Text as="span" className="font-mono text-[9px] font-medium uppercase tracking-[1px] text-[#718096]">
              SECTORS WITH A PROGRAM IN THE CATALOG
            </Text>

            <Box className="flex items-center gap-2">
              <button
                onClick={() => handleScroll(catalogRef, setCatalogPageIndex, "prev")}
                disabled={catalogPageIndex === 0}
                className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-[#CBD5E0] text-[10px] text-[#4A5568] disabled:opacity-40"
              >
                ←
              </button>
              <button
                onClick={() => handleScroll(catalogRef, setCatalogPageIndex, "next")}
                disabled={catalogPageIndex >= filteredCatalog.length - 1}
                className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-[#CBD5E0] text-[10px] text-[#4A5568] disabled:opacity-40"
              >
                →
              </button>
              <Text as="span" className="ml-1 font-mono text-[10px] text-[#718096]">
                {filteredCatalog.length > 0 ? catalogPageIndex + 1 : 0} / {filteredCatalog.length}
              </Text>
            </Box>
          </Box>

          <Box
            ref={catalogRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
          >
            {filteredCatalog.map((card) => (
              <Box
                key={card.id || card.title}
                className="w-[395px] shrink-0 rounded-[8px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-sm flex flex-col justify-between"
              >
                <Box>
                  <Box className="flex items-center gap-3">
                    <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[#0B1628]">
                      <IconRenderer name={card.icon} />
                    </Box>
                    <Text as="h3" className="text-[14px] font-semibold text-[#0F172A] leading-tight">
                      {card.title}
                    </Text>
                  </Box>

                  <Text as="p" className="mt-3 text-[11px] leading-[1.6] text-[#718096]">
                    {card.description}
                  </Text>

                  <Box className="mt-5 space-y-3 font-mono text-[10px] text-[#1A202C]">
                    <Box className="grid grid-cols-[60px_1fr] gap-2 items-start">
                      <Text as="span" className="font-bold uppercase tracking-[0.5px]">COHORT</Text>
                      <Text as="span" className="text-[#4A5568] font-sans text-[11px] leading-normal">
                        {card.cohort}
                      </Text>
                    </Box>
                    <Box className="grid grid-cols-[60px_1fr] gap-2 items-start">
                      <Text as="span" className="font-bold uppercase tracking-[0.5px]">BUILDS</Text>
                      <Text as="span" className="text-[#4A5568] font-sans text-[11px] leading-normal">
                        {card.builds}
                      </Text>
                    </Box>
                  </Box>
                </Box>

                <Box className="mt-5 pt-3 border-t border-[#E2E8F0]">
                  <button className="rounded-lg bg-[#F1F5F9] px-3 py-1.5 font-mono text-[10px] font-medium text-[#1A202C] transition hover:bg-[#0B1628] hover:text-[#C8EF3B]">
                    {card.btnText}
                  </button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* PROPOSED CARDS SECTION */}
        <Box className="mt-12">
          <Box className="flex items-center justify-between pb-3">
            <Text as="span" className="font-mono text-[9px] font-medium uppercase tracking-[1px] text-[#718096]">
              SECTORS WHERE THE BOTTLENECK IS REAL AND THE PROGRAM IS NOT BUILT YET
            </Text>

            <Box className="flex items-center gap-2">
              <button
                onClick={() => handleScroll(proposedRef, setProposedPageIndex, "prev")}
                disabled={proposedPageIndex === 0}
                className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-[#CBD5E0] text-[10px] text-[#4A5568] disabled:opacity-40"
              >
                ←
              </button>
              <button
                onClick={() => handleScroll(proposedRef, setProposedPageIndex, "next")}
                disabled={proposedPageIndex >= filteredProposed.length - 1}
                className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-[#CBD5E0] text-[10px] text-[#4A5568] disabled:opacity-40"
              >
                →
              </button>
              <Text as="span" className="ml-1 font-mono text-[10px] text-[#718096]">
                {filteredProposed.length > 0 ? proposedPageIndex + 1 : 0} / {filteredProposed.length}
              </Text>
            </Box>
          </Box>

          <Box
            ref={proposedRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
          >
            {filteredProposed.map((card) => (
              <Box
                key={card.id || card.title}
                className="w-[395px] shrink-0 rounded-[8px] border border-dashed border-[#CBD5E0] bg-transparent p-5 flex flex-col justify-between"
              >
                <Box>
                  <Box className="flex items-center gap-3">
                    <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-dashed border-[#CBD5E0]">
                      <IconRenderer name={card.icon} />
                    </Box>
                    <Text as="h3" className="text-[14px] font-semibold text-[#0F172A] leading-tight">
                      {card.title}
                    </Text>
                  </Box>

                  <Text as="p" className="mt-3 text-[11px] leading-[1.6] text-[#718096]">
                    {card.description}
                  </Text>

                  <Box className="mt-5 space-y-3 font-mono text-[10px] text-[#1A202C]">
                    <Box className="grid grid-cols-[60px_1fr] gap-2 items-start">
                      <Text as="span" className="font-bold uppercase tracking-[0.5px]">COHORT</Text>
                      <Text as="span" className="text-[#4A5568] font-sans text-[11px] leading-normal">
                        {card.cohort}
                      </Text>
                    </Box>
                    <Box className="grid grid-cols-[60px_1fr] gap-2 items-start">
                      <Text as="span" className="font-bold uppercase tracking-[0.5px]">SCOPE</Text>
                      <Text as="span" className="text-[#4A5568] font-sans text-[11px] leading-normal">
                        {card.scope}
                      </Text>
                    </Box>
                  </Box>
                </Box>

                <Box className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center gap-2">
                  <Text as="span" className="shrink-0 rounded-[3px] bg-[#C8EF3B] px-1.5 py-1 font-mono text-[8px] font-bold tracking-[0.5px] text-[#1A202C]">
                    {card.badge || "NO PROGRAM YET"}
                  </Text>
                  <button className="rounded-lg bg-[#F1F5F9] px-3 py-1.5 font-mono text-[10px] font-medium text-[#1A202C] transition hover:bg-[#0B1628] hover:text-[#C8EF3B]">
                    {card.btnText}
                  </button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}