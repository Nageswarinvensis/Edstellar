"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

// Cards shown before "Show more clients".
const PAGE = 30;
const PAGE_PHONE = 12;

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px] shrink-0 text-ink-muted">
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
 * The client explorer — the grid of client cards. Every card is rendered on
 * the server (this leaf is still server-rendered into the HTML), so all names
 * and descriptions are in the initial markup for crawlers. Cards past the
 * first 30 (12 on phones) are only hidden with CSS until "Show more clients"
 * is pressed; the directive powers that toggle and the expandable detail
 * panel.
 */
export default function ClientsExplorer({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [openName, setOpenName] = useState(null);

  const clients = data.clients;
  const collapsed = !expanded;
  const hasMore = collapsed && clients.length > PAGE;

  return (
    <Section id="clients" aria-labelledby="clients-h" className="scroll-mt-16 bg-paper">
      <Box className="max-w-[640px]">
        <RichHeading
          as="h2"
          id="clients-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
          {data.lede}
        </Text>
      </Box>

      <Box as="ul" className="mt-8 grid list-none grid-cols-5 gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {clients.map((client, i) => (
          <ClientCard
            key={client.name}
            client={client}
            className={!collapsed ? undefined : i >= PAGE ? "hidden" : i >= PAGE_PHONE ? "max-sm:hidden" : undefined}
            open={openName === client.name}
            onOpen={() => setOpenName(client.name)}
            onClose={() => setOpenName(null)}
          />
        ))}
      </Box>

      {hasMore && (
        <Box className="mt-8 flex justify-center">
          <CtaButton variant="secondary" color="navy" onClick={() => setExpanded(true)}>
            Show more clients
          </CtaButton>
        </Box>
      )}
    </Section>
  );
}

function ClientCard({ client, className, open, onOpen, onClose }) {
  const detailId = `client-${client.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <Box as="li" className={cn("relative min-h-[188px]", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={onOpen}
        className="flex h-full min-h-[188px] w-full flex-col items-stretch gap-3 rounded-[14px] border border-ink/12 bg-white p-4 text-left shadow-rest transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <Box className="flex flex-[0_0_88px] items-center justify-center border-b border-ink/12 pb-3">
          <Image src={client.logo} alt={`${client.name} logo`} width={150} height={56} className="h-14 w-full max-w-[150px] object-contain" />
        </Box>
        <Box className="flex items-start justify-between gap-2 leading-[1.35]">
          <Box>
            <Text as="span" className="block font-body text-sm font-semibold text-ink">
              {client.name}
            </Text>
            <Text as="span" className="mt-1 block text-xs leading-[1.4] text-ink-muted">
              {client.sector_label}
            </Text>
          </Box>
          <InfoIcon />
        </Box>
        <Text as="span" className="sr-only">, show details</Text>
      </button>

      {/* Always rendered — `hidden` until opened — so every client's
          description and links are in the server HTML. */}
      <Box
        id={detailId}
        hidden={!open}
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
          {/* No link to `/industries/{slug}` until those pages exist. */}
          {client.industry && !client.industry.href?.startsWith("/industries/") && (
            <Link
              href={client.industry.href}
              className="min-h-6 py-1 text-[13px] font-semibold text-paper underline underline-offset-[3px] hover:text-lime"
            >
              {client.industry.label}
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}
