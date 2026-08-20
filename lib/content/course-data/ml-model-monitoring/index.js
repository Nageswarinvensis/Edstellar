/**
 * index.js — assembles all ML Model Monitoring section data into one object.
 *
 * Usage (server component / page):
 *   import { courseData } from "@/lib/content/course-data/ml-model-monitoring";
 *
 * Each key maps to the component that consumes it.
 */

import { hero, breadcrumbs }  from "./hero.js";
import { proof }              from "./proof.js";
import { clientLogos }        from "./client-logos.js";
import { about }              from "./about.js";
import { toc, stickyNav }     from "./toc.js";
import { whyNow }             from "./why-now.js";
import { lifecycle }          from "./lifecycle.js";
import { skills }             from "./skills.js";
import { outcomes }           from "./outcomes.js";
import { curriculum }         from "./curriculum.js";
import { audience }           from "./audience.js";
import { certificate }        from "./certificate.js";
import { deliveryModes }      from "./delivery-modes.js";
import { trainers }           from "./trainers.js";
import { faqs }               from "./faqs.js";
import { testimonials }       from "./testimonials.js";
import { whyUs }              from "./why-us.js";
import { approach }           from "./approach.js";
import { groupQuote }         from "./group-quote.js";
import { leadForm }           from "./lead-form.js";
import { stickyFooter }       from "./sticky-footer.js";

export const courseData = {
  // Navigation / chrome
  breadcrumbs,
  toc,
  stickyNav,
  stickyFooter,

  // Above the fold
  hero,
  proof,
  clientLogos,

  // About / positioning
  about,
  whyNow,

  // Curriculum content
  lifecycle,
  skills,
  outcomes,
  curriculum,
  audience,
  certificate,

  // Delivery & team
  deliveryModes,
  trainers,

  // Social proof & FAQs
  testimonials,
  faqs,

  // Why Edstellar / next steps
  whyUs,
  approach,

  // Conversion
  groupQuote,
  leadForm,
};
