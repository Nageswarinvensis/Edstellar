import { format } from "date-fns";
import Link from "next/link";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { SocialIcon } from "@/components/blog/common/social-icon";

export default function BlogDetailHero({
  category,
  categorySlug,
  title,
  excerpt,
  authorName,
  authorSlug,
  authorAvatar,
  authorLinkedin,
  authorDesignation,
  authorVerifiedExpert,
  publishedAt,
  readMinutes,
  showsWhatsNew,
  layoutVariant,
}) {
  const publishedLabel = publishedAt
    ? format(new Date(publishedAt), "MMM d, yyyy")
    : null;

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#284bb3] via-[#3f48c9] to-[#5145e8] px-5 py-20 text-white">
      <Box className="pointer-events-none absolute inset-0">
        <img
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/672af632823a23f66a00034a_Rectangle%2028584.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </Box>

      <Box className="relative mx-auto max-w-4xl text-center">
        {category && (
          <Reveal className="mb-6 inline-flex rounded-full bg-white/10 px-5 py-1 transition-colors hover:bg-white/20">
            {categorySlug ? (
              <Link
                href={`/blog/category/${categorySlug}`}
                title={`Click Here to View ${category} Related Articles`}
                className="cursor-pointer"
              >
                <Text
                  as="span"
                  className="text-[12px] font-semibold leading-none text-white"
                >
                  {category}
                </Text>
              </Link>
            ) : (
              <Text
                as="span"
                className="text-[12px] font-semibold leading-none text-white"
              >
                {category}
              </Text>
            )}
          </Reveal>
        )}

        <Reveal delay={1}>
          <Text as="h1" className="mb-6 text-white">
            {title}
          </Text>
        </Reveal>

        {excerpt && layoutVariant && (
          <Reveal delay={2}>
            <Text
              as="p"
              className="mx-auto mt-6 max-w-3xl text-[16px] font-normal leading-[1.7] text-white/90"
            >
              {excerpt}
            </Text>
          </Reveal>
        )}

        {(authorName || publishedLabel) && (
          <Reveal delay={2}>
            <Box className="mx-auto mt-6 h-px max-w-2xl bg-white/20" />

            <Box className="mx-auto mt-5 flex max-w-2xl items-center justify-center gap-4">
              {authorAvatar && (
                <Box className="h-12 w-12 overflow-hidden rounded-full bg-white/20">
                  <img
                    src={authorAvatar}
                    alt={authorName || ""}
                    title={authorName || undefined}
                    className="h-full w-full object-cover"
                  />
                </Box>
              )}

              <Box className="text-left">
                {authorName && (
                  <Text
                    as="p"
                    className="flex items-center gap-1.5 text-[14px] font-medium leading-[1.3] text-white"
                  >
                    by{" "}
                    {authorSlug ? (
                      <Link
                        href={`/blog/author/${authorSlug}`}
                        title={authorName}
                        className="cursor-pointer underline-offset-2 hover:underline"
                      >
                        {authorName}
                      </Link>
                    ) : (
                      authorName
                    )}
                    {authorLinkedin && (
                      <Link
                        href={authorLinkedin}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title={`${authorName} on LinkedIn`}
                        aria-label={`${authorName} on LinkedIn`}
                        className="inline-flex flex-none cursor-pointer items-center text-white/70 transition-colors hover:text-white"
                      >
                        <SocialIcon
                          platform="linkedin"
                          className="size-[18px]"
                        />
                      </Link>
                    )}
                  </Text>
                )}

                {publishedLabel && (
                  <Text
                    as="p"
                    className="mt-1 text-[12px] leading-[1.3] text-white/90"
                  >
                    Updated On {publishedLabel}
                  </Text>
                )}
              </Box>
            </Box>
          </Reveal>
        )}

        {authorVerifiedExpert && (
          <Reveal delay={3} className="mx-auto mt-3 max-w-2xl text-center">
            {authorDesignation && (
              <Text as="p" className="text-[13px] font-medium text-white/80">
                {authorDesignation}
              </Text>
            )}

            <Box className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-2 py-1">
              <Check
                size={13}
                strokeWidth={2.5}
                className="text-white"
                aria-hidden="true"
              />
              <Text as="span" className="text-[10px] font-semibold text-white">
                Edstellar Verified SME
              </Text>
            </Box>
          </Reveal>
        )}

        {readMinutes && (
          <Reveal delay={3}>
            <Box className="mx-auto mt-5 h-px max-w-2xl bg-white/20" />

            <Text as="p" className="mt-4 text-[12px] font-normal text-white/90">
              {readMinutes} mins read
            </Text>
          </Reveal>
        )}

        {showsWhatsNew && (
          <Reveal delay={4} className="what-new-content-block mt-4 flex justify-center">
            <Box className="whats-new-hub flex items-center gap-2">
              <img
                src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/677ce8a12145f61e722f6d46_Ripple%401x-2.5s-200px-200px%20(3).svg"
                alt=""
                className="h-5 w-5"
              />

              <a
                href="#whats-new"
                title="Click Here to Check Whats New"
                className="inline-flex cursor-pointer items-center gap-1.5 text-[12px] font-normal text-white/90 transition-colors hover:text-white"
              >
                <Text
                  as="span"
                  className="text-[12px] leading-none text-inherit"
                >
                  What&apos;s New
                </Text>

                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9.99985 7.6863C9.99923 8.29969 9.7553 8.88778 9.32158 9.32154C8.88787 9.7553 8.29979 9.9993 7.68638 10H2.31347C1.70009 9.99922 1.11206 9.7552 0.678356 9.32146C0.244656 8.88771 0.000700516 8.29967 0 7.6863V2.31385C0.000700668 1.70051 0.244666 1.11249 0.678374 0.678796C1.11208 0.2451 1.70012 0.00114188 2.31347 0.000441231H4.20279C4.26605 -0.00230436 4.32922 0.00778528 4.38848 0.0301022C4.44774 0.0524192 4.50187 0.0865016 4.54761 0.130296C4.59334 0.17409 4.62974 0.22669 4.65461 0.284926C4.67947 0.343163 4.69229 0.40583 4.69229 0.469152C4.69229 0.532475 4.67947 0.595142 4.65461 0.653378C4.62974 0.711615 4.59334 0.764214 4.54761 0.808009C4.50187 0.851803 4.44774 0.885885 4.38848 0.908202C4.32922 0.930519 4.26605 0.940609 4.20279 0.937863H2.31347C1.94868 0.938253 1.59894 1.08336 1.34101 1.34133C1.08309 1.5993 0.938055 1.94906 0.937743 2.31385V7.6863C0.938133 8.05096 1.08317 8.40057 1.34103 8.65842C1.59889 8.91628 1.94851 9.06131 2.31318 9.0617H7.68638C8.05105 9.06131 8.40067 8.91628 8.65853 8.65842C8.91639 8.40057 9.06143 8.05096 9.06182 7.6863V5.79851C9.06025 5.73594 9.07122 5.67368 9.09409 5.6154C9.11695 5.55713 9.15125 5.50402 9.19496 5.45921C9.23866 5.41439 9.2909 5.37878 9.34858 5.35446C9.40627 5.33014 9.46823 5.31762 9.53083 5.31762C9.59344 5.31762 9.6554 5.33014 9.71309 5.35446C9.77077 5.37878 9.823 5.41439 9.86671 5.45921C9.91042 5.50402 9.94472 5.55713 9.96758 5.6154C9.99045 5.67368 10.0014 5.73594 9.99985 5.79851V7.6863ZM9.93285 3.46152C9.9235 3.57953 9.87001 3.68969 9.78306 3.77002C9.6961 3.85035 9.58207 3.89497 9.46368 3.89497C9.3453 3.89497 9.23126 3.85035 9.1443 3.77002C9.05735 3.68969 9.00387 3.57953 8.99451 3.46152V1.66904L5.25884 5.40461C5.17067 5.49217 5.05145 5.54132 4.92718 5.54132C4.80292 5.54132 4.6837 5.49217 4.59553 5.40461C4.55196 5.36107 4.5174 5.30937 4.49381 5.25246C4.47023 5.19556 4.45809 5.13456 4.45809 5.07296C4.45809 5.01137 4.47023 4.95037 4.49381 4.89347C4.5174 4.83656 4.55196 4.78486 4.59553 4.74132L8.33121 1.00575H6.54515C6.48222 1.00599 6.41986 0.993783 6.36166 0.969845C6.30346 0.945907 6.25057 0.910705 6.20601 0.866262C6.16146 0.82182 6.12613 0.769013 6.10205 0.710874C6.07796 0.652736 6.06561 0.590412 6.06568 0.527484C6.06814 0.404458 6.11869 0.287289 6.2065 0.20108C6.2943 0.114871 6.41238 0.0664795 6.53544 0.0662733H9.45103C9.51437 0.0662347 9.57709 0.078676 9.63562 0.102886C9.69414 0.127096 9.74733 0.162601 9.79213 0.207371C9.83692 0.252142 9.87246 0.305301 9.89671 0.36381C9.92095 0.42232 9.93344 0.485033 9.93344 0.548368L9.93285 3.46152Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </Box>
          </Reveal>
        )}
      </Box>
    </section>
  );
}
