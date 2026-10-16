import PricingHero from "@/components/sections/pricing/pricing-hero";
import PricingClients from "@/components/sections/pricing/pricing-clients";
import HowPricingWorks from "@/components/sections/pricing/how-pricing-works";
import PricingTable from "@/components/sections/pricing/pricing-table";
import IconCardSection from "@/components/sections/pricing/icon-card-section";
import PricingOptions from "@/components/sections/pricing/pricing-options";
import DeliveryCompare from "@/components/sections/pricing/delivery-compare";
import RegionalPricing from "@/components/sections/pricing/regional-pricing";
import PackageIncludes from "@/components/sections/pricing/package-includes";
import PricingFaq from "@/components/sections/pricing/pricing-faq";

/**
 * Corporate Training Pricing (`/corporate-training-pricing`). Takes the page
 * record from `getPricingPage()` and lays out its sections in the design's
 * order.
 *
 * Design: `corporate-training-pricing-v2.html`.
 */
export default function PricingPage({ page }) {
  return (
    <>
      <PricingHero data={page.hero} />
      <PricingClients data={page.clients} />
      <HowPricingWorks data={page.how_it_works} />
      <PricingTable data={page.plans} quoteId={page.quote?.id} />
      <IconCardSection id="price-factors" data={page.price_factors} columns={3} />
      <PricingOptions data={page.options} />
      <DeliveryCompare data={page.delivery} />
      <RegionalPricing data={page.regions} />
      <PackageIncludes data={page.included} />
      <IconCardSection id="benefits" data={page.benefits} columns={4} underline />
      <PricingFaq faqs={page.faqs} quote={page.quote} />
    </>
  );
}
