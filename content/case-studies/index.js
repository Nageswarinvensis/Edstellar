/**
 * Case studies — local content until the CMS models them (it has no
 * `case-studies` or `case-study/{slug}` site page yet).
 *
 * `CASE_STUDIES` is keyed by slug and is the enumeration source for
 * `generateStaticParams`, the listing and `sitemap.js`. Slugs match the live
 * site's `/case-study/{slug}` URLs exactly — never rename one without a
 * permanent redirect (TASTE.md §1.1).
 *
 * Headings mark their accent phrase with `<span>`, the same convention as CMS
 * headings, so they render through `RichHeading`. In `body`, a `p` block's
 * `text` may wrap a phrase in `<em>` for inline emphasis.
 *
 * Designs: `Edstellar-New-Lanch SETUP/case-studies.html` (listing) and
 * `…/invensis-technologies-uses-edstellar-to-streamline-training-process.html`
 * (detail).
 */


/** The dark newsletter band that closes both pages. */
const NEWSLETTER_CTA = {
  heading: "Industry insights you won’t delete. <span>Delivered to your inbox weekly.</span>",
  description:
    "Updates, tutorials, resources, and insights. Read practical tips and food for thoughtful action for readers at all levels.",
};

export const CASE_STUDIES_PAGE = {
  seo: {
    title: "Corporate Training Case Studies & Results",
    description:
      "Explore Edstellar's corporate training case studies to see how organizations address workforce challenges through managed delivery and skills development.",
    path: "/case-studies",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: null },
  ],
  hero: {
    heading: "Case <span>Studies</span>",
    description:
      "Edstellar enables teams to do more through its unparalleled training delivery. Witness here the classic cases of why Edstellar is chosen by organizations globally for their workforce development.",
  },
  cta: {
    ...NEWSLETTER_CTA,
    primary_cta: { label: "Enquire Now", href: "/enquiry-now" },
  },
};

export const CASE_STUDIES = {
  "invensis-technologies-uses-edstellar-to-streamline-training-process": {
    slug: "invensis-technologies-uses-edstellar-to-streamline-training-process",
    title: "Invensis Technologies Uses Edstellar to Streamline Training Process",
    seo: {
      title: "Invensis Training Case Study",
      description:
        "See how Invensis Technologies worked with Edstellar to streamline training processes, coordinate vendors and standardize delivery in this client case study.",
    },
    industry: "IT-BPO",
    card: {
      image: {
        src: "https://media.edstellar.com/website/6486c0b425fd30c156dd130e_Group_1000001901.webp",
        width: 391,
        height: 423,
      },
      stats: [
        { value: "60", label: "training projects in a standardized format within two months" },
        { value: "90%", label: "of the time saved in shortlisting training vendors" },
        { value: "5X", label: "increase in training session numbers" },
      ],
    },
    hero: {
      eyebrow: "Case Study",
      image: {
        src: "https://media.edstellar.com/website/Group_1000001896_.webp",
        width: 819,
        height: 518,
      },
    },
    body: [
      { type: "h2", text: "The Challenge" },
      {
        type: "p",
        text: "The internal training team at Invensis, a 5000-member BPO company, wanted to deliver a wide range of training to upskill their teams across the organization. As a result, Invensis had to train close to 2000 employees for 48 courses at different locations with several training requirements in the shortest possible duration. Out of the many challenges, one critical challenge was to onboard multiple training vendors for different courses across technical, behavioral, and Management training programs.",
      },
      {
        type: "p",
        text: "The process of selecting training vendors, verifying their training competencies, aligning them with the training projects, and negotiating with them on training projects was a mammoth task. Since there were multiple vendors, it resulted in unstructured communication, and the training process needed to be standardized.",
      },
      {
        type: "p",
        text: "The challenge for Invensis was to standardize the vendor management process and learning outcome, besides saving time for the training team.",
      },
      { type: "h2", text: "The Result" },
      {
        type: "p",
        text: "With the help of Edstellar, an integrated managed training services platform, Invensis Technologies could complete as many as 60 training projects in a standardized format within two months.",
      },
      {
        type: "p",
        text: "As a result, the company saved 90% of the time previously invested in shortlisting the training vendors and selecting them as the best option for the training projects.",
      },
      { type: "h2", text: "Company Introduction" },
      {
        type: "p",
        text: "Invensis Technologies Pvt. Ltd is a leading provider of information technology, business process, and knowledge process services, with a 5000-employee team across multiple locations. As the company continued to grow and expand its operations, it recognized the need to provide ongoing training and development opportunities for its employees to ensure they had the skills and knowledge needed to succeed in their roles.",
      },
      {
        type: "facts",
        items: [
          { label: "Headquarters:", value: "India" },
          { label: "Website:", value: "invensis.net" },
          { label: "Established:", value: "2000" },
          { label: "Company Size:", value: "3000+" },
          { label: "Training Team Size:", value: "2000+" },
          {
            label: "Courses Trained:",
            value:
              "PMP, Agile Scrum, Communication Skills, Thought Leadership, Business Writing, Microsoft Azure Fundamentals, Scrum Master, and Others",
          },
          { label: "Industry:", value: "IT-BPO" },
        ],
      },
      { type: "h2", text: "Finalizing Training Vendors - A Mammoth Task" },
      {
        type: "p",
        text: "Invensis Technologies, a BPO, has a huge team with ever-rising training requirements and reskill the employees for various services. Managing the training needs and executing the training for such a large team has always been challenging until the introduction of Edstellar.",
      },
      {
        type: "p",
        text: "Before being introduced to the managed training services provider, i.e., Edstellar, Internal Training team had to spend days seeking suitable vendors to shortlist trainers as per the training needs, training cost negotiation to final execution of the training.",
      },
      {
        type: "p",
        text: "“Our main challenge was to invest as long as one week for finalizing the vendors, where we have to run after vendors and negotiate with them on the training requirements,” specifies Aakrithi, Training Manager, Invensis Technologies Pvt Ltd., even as she adds, “Finding the right trainer was a wearisome effort which usually involved contacting multiple trainers and vendors to check for availability.”",
      },
      {
        type: "p",
        text: "Additionally, for every new training, the exercises had to be started repeatedly. Edstellar, coming up with their integrated platform, managed this exercise so smoothly that Invensis Technologies would never waste time on ‘choosing the right trainer.’.",
      },
      {
        type: "quote",
        text: "“We needed a better way to efficiently and affordably train our employees, so we turned to Edstellar for a solution.”",
      },
      { type: "h2", text: "Standardized Training Management Process" },
      {
        type: "p",
        text: "Invensis Technologies had to seek different vendors for different training requirements; therefore, with every new training, a new vendor and new trainers were onboarded. This led to disorder in the vendor training management process, raising the need for vendor standardization.",
      },
      {
        type: "p",
        text: "A standardized vendor management process would ensure that the Training resources do not end up with atypical instructions for every vendor they seek and shortlisted trainers.",
      },
      {
        type: "p",
        text: "“A platform with standard operating procedures for end-to-end training is what we were seeking,” recalls Jose, Training Head at Invensis Technologies.",
      },
      {
        type: "p",
        text: "The standardized SaaS platform of Edstellar allowed Invensis to create tailored training programs based on the specific needs and goals of the employees, ensuring that each employee receives the systematized training and development they need to succeed.",
      },
      {
        type: "quote",
        text: "“Before implementing Edstellar, we struggled to provide targeted and effective training to our employees. The platform has helped us deliver personalized and tailored training experiences that meet each employee's specific needs and goals in a standardized format, resulting in improved organizational skills and knowledge.”",
      },
      { type: "h2", text: "Standardize Learning Outcome" },
      {
        type: "p",
        text: "Speaking of the standardized vendor management process, Invensis Technologies also needed a standardized learning outcome, even as measuring the impact of the training was challenging. With hundreds of employees getting trained at a time, the organization was interested in receiving real-time training reports and results to make necessary adjustments.",
      },
      {
        type: "p",
        text: "“It was frustrating to invest time and resources into training without being able to see the results and measure the impact on our employees and our business,” recognizes Kirthi, Training Manager at Invensis Technologies.",
      },
      {
        type: "p",
        text: "Edstellar provided training analytics and reporting capabilities to track and measure the impact of the training programs, allowing Invensis to see the training results in real time and take the necessary action call for their different employees and functions.",
      },
      {
        type: "quote",
        text: "“We had limited visibility into the impact of our training programs, making it difficult to track and measure the results of the training and make any necessary adjustments.”",
      },
      { type: "h2", text: "Increasing Training Resource Utilization" },
      {
        type: "p",
        text: "With Edstellar in the picture, Invensis saved as much as 90% of their Training resources’ time. “We can now execute the training in almost two days, whereas it used to take more than a week to start the training. Edstellar TMS is a ‘<em>time-savior</em>’ for us,” exclaims Aakrithi, Invensis Technologies’ Training Manager, even as she adds, “We are utilizing this saved time for organizing other training. Our training session numbers have increased almost 5X with Edstellar as we can organize 30 training monthly with Edstellar.”",
      },
      { type: "h2", text: "The Way Up" },
      {
        type: "p",
        text: "Invensis Technologies Pvt Ltd. has planned to utilize Edstellar’s Training Management Software for its ongoing and future and on-going Training needs. Courses with Edstellar’s verified, certified trainers help upskill and achieve better outcomes to ensure the expected outcomes of different projects.",
      },
      {
        type: "p",
        text: "Invensis sees Edstellar as of strategic importance for bulk-training requirements. Edstellar has a pool of trainers for every course, so Invensis saves time choosing training vendors. Once the business alignment call is finalized between the clients and the trainer to understand the training requirements, the training gets executed.",
      },
      { type: "h2", text: "Edstellar Revolutionizing Training Industry" },
      {
        type: "p",
        text: "Edstellar, with its integrated training platform, helps Invensis with a training platform to schedule annual training, which brings all the training at one window with different teams and participants. Further, Edstellar provides a dedicated coordinator for the required support during the training, which eases the training process. Invensis can now get their employees trained for various courses, customized as per the training needs, with Edstellar’s verified expert trainers appropriate for the training course. Not only this, but Invensis can also track the performance of their employees using advanced analytics and BI Tools using Edstellar’s managed training services.",
      },
    ],
    promo: {
      heading: "Discover the power of managed training <span>services</span>",
      description:
        "Let Edstellar handle your organization's training needs. Focus on your business while we support your growth.",
      button: { label: "Enquire Now", href: "/enquiry-now" },
    },
    // `items` is filled in by the page from the CMS (`getLatestCourses`).
    courses: {
      heading: "Explore our Latest Corporate Training <span>Courses</span>",
    },
    cta: {
      ...NEWSLETTER_CTA,
      primary_cta: { label: "Enquire Now", href: "/enquiry-now" },
    },
  },
};
