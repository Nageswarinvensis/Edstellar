// Auto-composed from the approved design
// `Edstellar-New-Lanch SETUP/edstellar-homepage 51.html`. Local content, so
// the home page renders fully static (ISR). Field names follow the CMS's
// snake_case convention (TASTE.md §5.4).
//
// Logos load from the Webflow CDN whitelisted in next.config.mjs
// (`cdn.prod.website-files.com`); trainer photos from `media.edstellar.com`.
// Pillar illustrations are static assets in `public/home/`.

export const HOME = {
  "seo": {
    "title": "Corporate Training and Consulting",
    "description": "Edstellar is the capability transformation partner for organizations in 100+ countries — consulting, talent assessments, coaching and training working as one system, measured on the Capability Intelligence Platform.",
    "path": "/"
  },
  "hero": {
    "heading": "The science of <span>capability,</span> delivered with precision.",
    "sub": "Edstellar is the capability transformation partner for organizations in 100+ countries. Consulting, talent assessments, coaching and training work as one system, measured on the Capability Intelligence Platform.",
    "actions": [
      {
        "label": "Talk to us",
        "href": "#contact",
        "variant": "primary",
        "arrow": true
      },
      {
        "label": "Explore the Platform",
        "href": "#platform",
        "variant": "ghost"
      }
    ],
    "people": {
      "note_strong": "5,000+ trainers and coaches",
      "note": " across 100+ countries",
      "trainers": [
        {
          "photo": "https://media.edstellar.com/trainer_profile/tamer-cairo-egypt.webp"
        },
        {
          "photo": "https://media.edstellar.com/trainer_profile/nibedita-bangalore-india.webp"
        },
        {
          "photo": "https://media.edstellar.com/trainer_profile/simon-ubud-indonesia.webp"
        },
        {
          "photo": "https://media.edstellar.com/trainer_profile/roberta-al-wajba-qatar.webp"
        },
        {
          "photo": "https://media.edstellar.com/trainer_profile/harshil-ahmedabad-india.webp"
        }
      ]
    },
    "panel": {
      "label": "Capability Map · By Function",
      "live": "Illustrative",
      "title": "Every role, modelled across <span>capability</span> x function.",
      "cols": [
        "Eng",
        "Ops",
        "Cml",
        "Fin",
        "Risk",
        "Data",
        "Lead",
        "PM"
      ],
      "rows": [
        {
          "label": "AI Fluency",
          "cells": [
            3,
            1,
            1,
            2,
            1,
            4,
            2,
            2
          ],
          "gaps": [
            1
          ]
        },
        {
          "label": "Exec Comms",
          "cells": [
            2,
            2,
            3,
            3,
            2,
            1,
            4,
            3
          ],
          "gaps": [
            5
          ]
        },
        {
          "label": "Cross-Func Delivery",
          "cells": [
            3,
            3,
            2,
            2,
            2,
            2,
            3,
            4
          ],
          "gaps": []
        },
        {
          "label": "Risk & Regulatory",
          "cells": [
            1,
            2,
            1,
            3,
            4,
            1,
            2,
            2
          ],
          "gaps": []
        },
        {
          "label": "Commercial Acumen",
          "cells": [
            1,
            2,
            4,
            2,
            2,
            1,
            3,
            2
          ],
          "gaps": []
        }
      ],
      "legend": "Capability Intelligence Platform"
    },
    "methodology": {
      "label": "The Edstellar 5A Methodology",
      "live": "Assess to Advance",
      "steps": [
        {
          "n": "01",
          "name": "Assess"
        },
        {
          "n": "02",
          "name": "Analyze"
        },
        {
          "n": "03",
          "name": "Architect"
        },
        {
          "n": "04",
          "name": "Activate"
        },
        {
          "n": "05",
          "name": "Advance"
        }
      ]
    }
  },
  "stats": [
    {
      "value": "1,200",
      "suffix": "+",
      "label": "Enterprise Clients"
    },
    {
      "value": "100",
      "suffix": "+",
      "label": "Countries · Live Delivery"
    },
    {
      "value": "5,000",
      "suffix": "+",
      "label": "Vetted Subject Experts"
    },
    {
      "value": "500",
      "suffix": "K+",
      "label": "Training Hours Delivered"
    }
  ],
  "clients": {
    "heading": "Trusted by teams at organizations worldwide",
    "see": {
      "label": "See all clients",
      "href": "/clients"
    },
    "logos": [
      {
        "name": "Microsoft",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b5873a89529b86f470b686_Microsoft.webp"
      },
      {
        "name": "Amazon",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/698469c6a91cef644870febe_Amazon%201%20(1).webp"
      },
      {
        "name": "Intel",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b587b637a6028400026a71_Intel2.webp"
      },
      {
        "name": "Adobe",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b587f256c7ca56ef383708_Adobe.webp"
      },
      {
        "name": "MediaTek",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b588572d0fd67c6424af0a_MediaTek.webp"
      },
      {
        "name": "Visa",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b9218334a6bbb7e0046a57_visa.webp"
      },
      {
        "name": "KPMG",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b697f9217d054cf887a6d2_KPMG.webp"
      },
      {
        "name": "Boston Consulting Group",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6adaa6930e7fcdb2f60a5_Boston%20consulting%20group.webp"
      },
      {
        "name": "Johnson & Johnson",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/69846266b0acf082e648fdb0_Johnson%26Johnson%201.webp"
      },
      {
        "name": "Godrej",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a94748156eb2b452d94e_godrej.webp"
      },
      {
        "name": "Tata Chemicals",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b5887637a6028400031b44_Tata_Chemicals.webp"
      },
      {
        "name": "ABB",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9c115c2a0faf78d5187_Abb.webp"
      },
      {
        "name": "Emerson",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9d8e0dd2f35457d1311_Emerson.webp"
      },
      {
        "name": "Aditya Birla Group",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aa7c4dc52f902b965f86_Aditya%20Birla%20Group.webp"
      },
      {
        "name": "Bechtel",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b697ba0e503093b25852dd_Bechtel.webp"
      },
      {
        "name": "Regeneron",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b69770b06f3b861a29e479_Regeneron%20Science%20to%20Medicine.webp"
      },
      {
        "name": "Uber",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/6915869cdab78133f5efe19d_Uber.svg"
      },
      {
        "name": "Autodesk",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aa97d7f1555ba95b5394_AutoDesk.webp"
      },
      {
        "name": "Cummins",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/690d7e851806fc8beeda2a35_Cummins_logo.svg%201.png"
      },
      {
        "name": "Kellogg's",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aab9cd873260637e0cd0_Kellogg%27s.webp"
      },
      {
        "name": "Sandvik",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6ad6a25828ad600e00916_Sandvik%20Coromant.webp"
      },
      {
        "name": "Dayforce",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b697cc182f0ea9428a9a52_Dayforce.webp"
      },
      {
        "name": "Circle K",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6988c1066bcaedfdd4fd4_Circle%20K.webp"
      },
      {
        "name": "Littelfuse",
        "src": "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6ad0d46b637354ab74a8b_littlefuse.webp"
      }
    ],
    "sr_text": "Clients include Microsoft, Amazon, Intel, Adobe, MediaTek, Visa, KPMG, Boston Consulting Group, Johnson & Johnson, Godrej, Tata Chemicals, ABB, Emerson, Aditya Birla Group, Bechtel, Regeneron, Uber, Autodesk, Cummins, Kellogg's, Sandvik, Dayforce, Circle K and Littelfuse.",
    "certs": [
      {
        "code": "9001",
        "title": "ISO 9001:2015",
        "label": "Quality management"
      },
      {
        "code": "27001",
        "title": "ISO 27001:2022",
        "label": "Information security"
      }
    ],
    "cert_line": "Certified for quality management and information security"
  },
  "pillars": {
    "heading": "Four pillars, <span>one operating system</span> for capability.",
    "lede": "From C-suite coaching to enterprise-wide skills intelligence, Edstellar's practices are designed to interlock: so the strategy your CHRO sets becomes the behaviour your business sees, on the ground, in measurable weeks.",
    "items": [
      {
        "img": "/home/pillar-consulting.svg",
        "title": "L&OD <span>Consulting</span>",
        "desc": "Edstellar diagnoses the structure and redesigns the system. We benchmark, model, and rebuild your learning function: strategy, capability frameworks, governance.",
        "cta": "Engage advisory",
        "href": "/learning-development-consulting-services"
      },
      {
        "img": "/home/pillar-platform.svg",
        "id": "platform",
        "badge": "Platform",
        "title": "Capability Intelligence <span>Platform</span>",
        "desc": "One canonical view of capability across your workforce: gap analysis, role taxonomies, learning ROI: wired into your HRIS in days, not quarters.",
        "cta": "See the platform",
        "href": "/who-we-serve"
      },
      {
        "img": "/home/pillar-coaching.svg",
        "title": "Coaching <span>Solutions</span>",
        "desc": "1:1 and cohort coaching for senior leaders, calibrated to your succession plan. Certified coaches, signal-rich diagnostics, board-ready outcomes.",
        "cta": "Engage a coach",
        "href": "/coaching-solutions"
      },
      {
        "img": "/home/pillar-training.svg",
        "title": "Corporate <span>Training</span>",
        "desc": "Outcome-first training programmes across 2,000+ skill areas: instructor-led, virtual, blended: delivered in your languages, your time zones, your standards.",
        "cta": "Explore programmes",
        "href": "/corporate-training"
      }
    ]
  },
  "taxonomy": {
    "heading": "How we model <span>capability,</span> end to end.",
    "lede": "Every Edstellar engagement breaks capability down the same way, from function and role to the capabilities, skills and proficiency behind them, so your CHRO, CFO and line managers share one language.",
    "steps": [
      {
        "layer": "Layer 01",
        "kind": "Function",
        "title": "Business <span>Function</span>",
        "items": [
          "Engineering",
          "Operations",
          "Commercial",
          "Risk & Compliance"
        ],
        "active": 1
      },
      {
        "layer": "Layer 02",
        "kind": "Role",
        "title": "Role <span>Family</span>",
        "items": [
          "Reliability Engineer",
          "Operations Director",
          "Sales Manager",
          "Compliance Lead"
        ],
        "active": 1
      },
      {
        "layer": "Layer 03",
        "kind": "Capability",
        "title": "Capability <span>Area</span>",
        "items": [
          "Operational AI",
          "Cross-functional Delivery",
          "Customer Value",
          "Regulatory Judgment"
        ],
        "active": 1
      },
      {
        "layer": "Layer 04",
        "kind": "Skill",
        "title": "Discrete <span>Skill</span>",
        "items": [
          "Forecast modeling",
          "Conflict resolution",
          "Value-based negotiation",
          "Scenario planning"
        ],
        "active": 1
      },
      {
        "layer": "Layer 05",
        "kind": "Proficiency",
        "title": "<span>Proficiency</span>",
        "items": [
          "L1: Aware",
          "L2: Applied",
          "L3: Proficient",
          "L4: Expert"
        ],
        "active": 2
      }
    ]
  },
  "method": {
    "heading": "The Edstellar 5A methodology, repeated <span>with discipline.</span>",
    "lede": "Every Edstellar engagement runs the same five steps: Assess, Analyze, Architect, Activate and Advance. Organizations can start at any step, and each cycle builds on the one before it.",
    "steps": [
      {
        "n": "01",
        "name": "Assess",
        "title": "Define the <span>capability need.</span>",
        "desc": [
          "Define the capability your strategy and roles need, and map where it stands today."
        ],
        "output": "Capability brief",
        "tag": "1 to 2 weeks",
        "mark": "Mapped"
      },
      {
        "n": "02",
        "name": "Analyze",
        "title": "Find the <span>priority gaps.</span>",
        "desc": [
          "Analyze the skill gaps through ",
          {
            "text": "training needs analysis",
            "href": "/training-needs-analysis-solutions"
          },
          " and ",
          {
            "text": "talent assessments",
            "href": "/talent-assessment-services"
          },
          ", ranked by business impact."
        ],
        "output": "Skills-gap report",
        "tag": "2 to 3 weeks"
      },
      {
        "n": "03",
        "name": "Architect",
        "title": "Design the <span>solution.</span>",
        "desc": [
          "Architect the programs, coaching, content and governance that close the priority gaps."
        ],
        "output": "Strategy and roadmap",
        "tag": "3 to 5 weeks"
      },
      {
        "n": "04",
        "name": "Activate",
        "title": "Deliver at <span>scale.</span>",
        "desc": [
          "Activate training and coaching across teams, locations and languages, virtual, onsite or blended."
        ],
        "output": "Live programs",
        "tag": "6 to 12 weeks"
      },
      {
        "n": "05",
        "name": "Advance",
        "title": "Measure and <span>advance.</span>",
        "desc": [
          "Measure the change, re-map capability and plan the next cycle, so each one builds on the last."
        ],
        "output": "Impact dashboard",
        "tag": "Ongoing",
        "mark": "Re-mapped"
      }
    ]
  },
  "why": {
    "heading": "Built for the <span>seriousness</span> of enterprise change.",
    "lede": "Three commitments separate Edstellar from every commodity training vendor your team has already met: and they are the reason Fortune-listed buyers stay for the second renewal.",
    "items": [
      {
        "num": "i.",
        "title": "Outcomes, <span>not enrolments.</span>",
        "desc": "Every engagement is scoped against a measurable behaviour change and a board-line metric. Edstellar signs for the result, not the seat count: and your CFO sees the throughline."
      },
      {
        "num": "ii.",
        "title": "One operating <span>system,</span> four practices.",
        "desc": "Consulting, coaching, training and the Capability Intelligence Platform are not partners: they are the same firm. One contract, one taxonomy, one source of truth on your workforce capability."
      },
      {
        "num": "iii.",
        "title": "Global delivery, <span>local fluency.</span>",
        "desc": "5,000+ vetted subject experts across 100+ countries. Programmes run in your languages, against your compliance posture, on your delivery calendar: without exception."
      }
    ],
    "experts": {
      "note": "Some of the experts behind Edstellar programs",
      "link": {
        "label": "Meet the expert network",
        "href": "/trainer-platform"
      },
      "trainers": [
        {
          "name": "Tamer",
          "slug": "tamer-cairo-egypt",
          "role": "Cost Reduction in Procurement",
          "location": "Cairo, Egypt",
          "since": "2007",
          "photo": "https://media.edstellar.com/trainer_profile/tamer-cairo-egypt.webp",
          "href": "/trainer/tamer-cairo-egypt"
        },
        {
          "name": "Nibedita",
          "slug": "nibedita-bangalore-india",
          "role": "Motivational Skills",
          "location": "Bangalore, India",
          "since": "2017",
          "photo": "https://media.edstellar.com/trainer_profile/nibedita-bangalore-india.webp",
          "href": "/trainer/nibedita-bangalore-india"
        },
        {
          "name": "Simon",
          "slug": "simon-ubud-indonesia",
          "role": "Self Awareness",
          "location": "Ubud, Indonesia",
          "since": "2017",
          "photo": "https://media.edstellar.com/trainer_profile/simon-ubud-indonesia.webp",
          "href": "/trainer/simon-ubud-indonesia"
        },
        {
          "name": "Roberta",
          "slug": "roberta-al-wajba-qatar",
          "role": "Self Awareness and Leadership",
          "location": "Al Wajba, Qatar",
          "since": "2015",
          "photo": "https://media.edstellar.com/trainer_profile/roberta-al-wajba-qatar.webp",
          "href": "/trainer/roberta-al-wajba-qatar"
        },
        {
          "name": "Harshil",
          "slug": "harshil-ahmedabad-india",
          "role": "First Aid and CPR",
          "location": "Ahmedabad, India",
          "since": "2016",
          "photo": "https://media.edstellar.com/trainer_profile/harshil-ahmedabad-india.webp",
          "href": "/trainer/harshil-ahmedabad-india"
        }
      ]
    }
  },
  "cta": {
    "heading": "Bring us your <span>hardest capability problem.</span>",
    "sub": "A 30-minute briefing with an Edstellar consultant. Bring your CHRO, CLO or Head of L&D, and Edstellar will shape the conversation around your goals.",
    "actions": [
      {
        "label": "Schedule a briefing",
        "href": "mailto:contact@edstellar.com?subject=Capability%20Briefing%20Request",
        "variant": "primary",
        "arrow": true
      },
      {
        "label": "Explore Edstellar services",
        "href": "#pillars",
        "variant": "ghost"
      }
    ]
  }
};
