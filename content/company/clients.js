// Auto-composed from the approved design
// `Edstellar-New-Lanch SETUP/clients 9.html`. Local content, so `/clients`
// renders fully static. Field names follow the CMS's snake_case convention
// (TASTE.md §5.4); the client directory is the design's own data.
//
// Logos are served from `media.edstellar.com`, whitelisted in next.config.mjs.

export const CLIENTS = {
  "seo": {
    "title": "Our Clients Across Industries",
    "description": "Explore Edstellar's clients across industries and regions, from global enterprises to universities and public institutions building workforce capability.",
    "path": "/clients"
  },
  "breadcrumbs": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Clients",
      "href": null
    }
  ],
  "hero": {
    "heading": "Edstellar clients, <span>from global enterprises to public institutions.</span>",
    "lede": "Here are some of the organizations that build workforce capability with Edstellar, from Microsoft, KPMG and Visa to universities, government agencies and non-profits. See who they are, the sectors they work in and why organizations choose Edstellar for training, consulting, assessments and coaching.",
    "actions": [
      {
        "label": "Talk to an Edstellar expert",
        "href": "#contact",
        "variant": "primary",
        "arrow": true
      },
      {
        "label": "Explore clients by sector",
        "href": "#clients",
        "variant": "secondary",
        "arrow": true
      }
    ],
    "facts": [
      {
        "value": "16",
        "label": "sectors"
      },
      {
        "value": "4",
        "label": "regions"
      },
      {
        "value": "100+",
        "label": "countries served"
      }
    ],
    "mosaic": [
      { "id": "microsoft", "off": false },
      { "id": "kpmg", "off": true },
      { "id": "visa", "off": false },
      { "id": "johnson-johnson", "off": true },
      { "id": "nike", "off": false },
      { "id": "bechtel", "off": true },
      { "id": "boston-consulting-group", "off": false },
      { "id": "abb", "off": true },
      { "id": "amazon", "off": false },
      { "id": "s-p-global", "off": true },
      { "id": "adobe", "off": false },
      { "id": "intel", "off": true }
    ]
  },
  "glance": [
    {
      "value": "100+",
      "label": "countries"
    },
    {
      "value": "10+",
      "label": "languages"
    },
    {
      "value": "2,000+",
      "label": "instructor-led programs"
    },
    {
      "value": "ISO 9001:2015",
      "label": "quality management"
    },
    {
      "value": "ISO 27001:2022",
      "label": "information security"
    }
  ],
  "section_nav": {
    "items": [
      {
        "id": "clients",
        "label": "Clients"
      },
      {
        "id": "sectors",
        "label": "Sectors"
      },
      {
        "id": "why",
        "label": "Why Edstellar"
      },
      {
        "id": "faq",
        "label": "FAQ"
      },
      {
        "id": "contact",
        "label": "Contact"
      }
    ],
    "cta": {
      "label": "Talk to an expert",
      "href": "#contact"
    }
  },
  "explorer": {
    "heading": "Some of Edstellar's <span>clients.</span>",
    "lede": "A selection of the organizations Edstellar works with. Select a client to see what the organization does.",
    "sectors": [
      {
        "key": "tech",
        "label": "Technology, software and telecom"
      },
      {
        "key": "mfg",
        "label": "Manufacturing and industrial"
      },
      {
        "key": "pro",
        "label": "Professional and business services"
      },
      {
        "key": "bfsi",
        "label": "Banking, financial services and insurance"
      },
      {
        "key": "consumer",
        "label": "Consumer goods, retail and hospitality"
      },
      {
        "key": "health",
        "label": "Pharma, biotech and healthcare"
      },
      {
        "key": "auto",
        "label": "Automotive, aviation and mobility"
      },
      {
        "key": "re",
        "label": "Real estate and construction"
      },
      {
        "key": "edu",
        "label": "Education"
      },
      {
        "key": "energy",
        "label": "Energy and natural resources"
      },
      {
        "key": "public",
        "label": "Government, public sector and non-profit"
      },
      {
        "key": "agri",
        "label": "Agriculture and agritech"
      },
      {
        "key": "log",
        "label": "Logistics and supply chain"
      },
      {
        "key": "media",
        "label": "Media, entertainment and publishing"
      },
      {
        "key": "chem",
        "label": "Chemicals and materials"
      },
      {
        "key": "group",
        "label": "Diversified business groups"
      }
    ],
    "clients": [
      {
        "name": "Microsoft",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "M",
        "id": "microsoft",
        "description": "Software, cloud computing and technology solutions. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "KPMG",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "eura",
        "initials": "K",
        "id": "kpmg",
        "description": "Professional services. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Visa",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "amer",
        "initials": "V",
        "id": "visa",
        "description": "Digital payments technology. Headquartered in Americas.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Johnson & Johnson",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "JJ",
        "id": "johnson-johnson",
        "description": "Pharmaceuticals and healthcare products. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Nike",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "amer",
        "initials": "N",
        "id": "nike",
        "description": "Athletic footwear, apparel and equipment. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Bechtel",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "B",
        "id": "bechtel",
        "description": "Engineering, construction and project management. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Boston Consulting Group",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "amer",
        "initials": "BC",
        "id": "boston-consulting-group",
        "description": "Business strategy consulting. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "ABB",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "A",
        "id": "abb",
        "description": "Industrial automation and electrical equipment. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Amazon",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "A",
        "id": "amazon",
        "description": "Cloud services, e-commerce and retail. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "S&P Global",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "amer",
        "initials": "SP",
        "id": "s-p-global",
        "description": "Financial data, analytics and market intelligence. Headquartered in Americas.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Adobe",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "A",
        "id": "adobe",
        "description": "Digital media and creative software. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Uber",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "U",
        "id": "uber",
        "description": "Ride-hailing and mobility. Headquartered in Americas.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "ADB SAFEGATE",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "eura",
        "initials": "AS",
        "id": "adb-safegate",
        "description": "Airport and airside technology. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Aditya Birla Group",
        "sector": "group",
        "sector_label": "Diversified business groups",
        "region": "apac",
        "initials": "AB",
        "id": "aditya-birla-group",
        "description": "A business group operating across many sectors. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Agratas",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "apac",
        "initials": "A",
        "id": "agratas",
        "description": "Battery technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "AMPIN Energy Transition",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "apac",
        "initials": "AE",
        "id": "ampin-energy-transition",
        "description": "Renewable energy for commercial, industrial and utility customers. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Artha Bharat",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "AB",
        "id": "artha-bharat",
        "description": "Investment in infrastructure and development. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Assetz Property Group",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "apac",
        "initials": "AP",
        "id": "assetz-property-group",
        "description": "Residential and commercial real estate. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Auro",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "apac",
        "initials": "A",
        "id": "auro",
        "description": "Real estate. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Autodesk",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "A",
        "id": "autodesk",
        "description": "Design and engineering software. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "BluSmart Mobility",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "apac",
        "initials": "BM",
        "id": "blusmart-mobility",
        "description": "Electric vehicles and mobility. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Bombay Metrics",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "apac",
        "initials": "BM",
        "id": "bombay-metrics",
        "description": "Supply chain analytics. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Brevo",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "B",
        "id": "brevo",
        "description": "Marketing and customer communication software. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Bry-Air",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "BA",
        "id": "bry-air",
        "description": "Dehumidification and environmental control. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "ByNaric",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "B",
        "id": "bynaric",
        "description": "Software and technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "C.I.P.S",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "amer",
        "initials": "CI",
        "id": "c-i-p-s",
        "description": "Indigenous-owned consulting and engagement. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Can Fin Homes",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "CF",
        "id": "can-fin-homes",
        "description": "Housing finance. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Cenovus Energy",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "amer",
        "initials": "CE",
        "id": "cenovus-energy",
        "description": "Oil production and refining. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Circle K",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "amer",
        "initials": "CK",
        "id": "circle-k",
        "description": "Convenience retail. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Cloudify",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "mena",
        "initials": "C",
        "id": "cloudify",
        "description": "Multi-cloud and edge orchestration. Headquartered in Middle East and North Africa.",
        "industry": null
      },
      {
        "name": "Cloyes",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "C",
        "id": "cloyes",
        "description": "Timing drive systems and automotive components. Headquartered in Americas.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Coromandel",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "apac",
        "initials": "C",
        "id": "coromandel",
        "description": "Agriculture inputs and crop chemicals. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Cummins",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "C",
        "id": "cummins",
        "description": "Engines, power systems and zero-emission technology. Headquartered in Americas.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Currax Pharmaceuticals",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "CP",
        "id": "currax-pharmaceuticals",
        "description": "Pharmaceuticals. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Datawrkz",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "D",
        "id": "datawrkz",
        "description": "Digital advertising and ad technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Daund Sugar",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "apac",
        "initials": "DS",
        "id": "daund-sugar",
        "description": "Sugar and agro-based products. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Dayforce",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "D",
        "id": "dayforce",
        "description": "Human capital management software. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "DB Corp",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "apac",
        "initials": "DC",
        "id": "db-corp",
        "description": "Print and digital media. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Deriv",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "mena",
        "initials": "D",
        "id": "deriv",
        "description": "Online trading and brokerage. Headquartered in Middle East and North Africa.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Devon",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "D",
        "id": "devon",
        "description": "IT services and consulting. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Devstringx",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "D",
        "id": "devstringx",
        "description": "Software development and technology services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "eClinical Solutions",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "ES",
        "id": "eclinical-solutions",
        "description": "Clinical research data solutions. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Ecozen",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "apac",
        "initials": "E",
        "id": "ecozen",
        "description": "Solar-powered cold storage and irrigation. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Edifecs",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "E",
        "id": "edifecs",
        "description": "Healthcare technology. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Emerson",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "amer",
        "initials": "E",
        "id": "emerson",
        "description": "Industrial automation and climate technologies. Headquartered in Americas.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Emiza",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "apac",
        "initials": "E",
        "id": "emiza",
        "description": "Logistics and fulfillment. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Endeavor",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "amer",
        "initials": "E",
        "id": "endeavor",
        "description": "Media and entertainment. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "EPL Global",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "EG",
        "id": "epl-global",
        "description": "Specialty packaging for consumer brands. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "ERGO Technology & Services",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "ET",
        "id": "ergo-technology-services",
        "description": "Technology and digital services. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "ETP International",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "EI",
        "id": "etp-international",
        "description": "Unified commerce software. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Excitel",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "E",
        "id": "excitel",
        "description": "Broadband and telecommunications. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Garware Technical Fibres",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "GT",
        "id": "garware-technical-fibres",
        "description": "Technical textiles. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Global North",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "mena",
        "initials": "GN",
        "id": "global-north",
        "description": "Investment advisory for citizenship and residency. Headquartered in Middle East and North Africa.",
        "industry": null
      },
      {
        "name": "Go Digit Life Insurance",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "GD",
        "id": "go-digit-life-insurance",
        "description": "Digital-first life insurance. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Godrej",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "G",
        "id": "godrej",
        "description": "Consumer goods and FMCG. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "GreenCell Mobility",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "apac",
        "initials": "GM",
        "id": "greencell-mobility",
        "description": "Electric public transport. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Greystar",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "G",
        "id": "greystar",
        "description": "Rental housing investment, development and management. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "HALCON",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "mena",
        "initials": "H",
        "id": "halcon",
        "description": "Systems manufacturing. Headquartered in Middle East and North Africa.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Hudson Link",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "amer",
        "initials": "HL",
        "id": "hudson-link",
        "description": "Non-profit for higher education in prisons and reentry. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Ideal Solutions",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "IS",
        "id": "ideal-solutions",
        "description": "Smart solutions and services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "India Hospitality Mart",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "IH",
        "id": "india-hospitality-mart",
        "description": "Hospitality services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "IndoBevs",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "I",
        "id": "indobevs",
        "description": "Beverage manufacturing and distribution. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "IndustryARC",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "I",
        "id": "industryarc",
        "description": "Market research and consulting. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Intel",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "I",
        "id": "intel",
        "description": "Semiconductors and computing technology. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "International Solar Alliance",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "IS",
        "id": "international-solar-alliance",
        "description": "International organization advancing solar energy adoption. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Japan International Cooperation Agency (JICA)",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "JI",
        "id": "jica",
        "description": "Government agency for international development cooperation. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Jet Parts Engineering",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "JP",
        "id": "jet-parts-engineering",
        "description": "Aerospace aftermarket parts and repair. Headquartered in Americas.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Kellogg's",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "amer",
        "initials": "K",
        "id": "kelloggs",
        "description": "Food and beverages. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Khazana Jewellery",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "KJ",
        "id": "khazana-jewellery",
        "description": "Fine jewelry. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "KIET Group of Institutions",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "KG",
        "id": "kiet-group-of-institutions",
        "description": "Technical higher education institution. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "KMK Ventures",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "KV",
        "id": "kmk-ventures",
        "description": "Outsourced accounting and tax services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "KNS Express",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "apac",
        "initials": "KE",
        "id": "kns-express",
        "description": "Delivery and shipping. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Littelfuse",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "amer",
        "initials": "L",
        "id": "littelfuse",
        "description": "Circuit protection and electronic components. Headquartered in Americas.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Maharana Pratap Group of Institutions",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "MP",
        "id": "maharana-pratap-group-of-institutions",
        "description": "Higher education institution. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Majestic Asset Management",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "MA",
        "id": "majestic-asset-management",
        "description": "Real estate investment and property management. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Mankiewicz",
        "sector": "chem",
        "sector_label": "Chemicals and materials",
        "region": "eura",
        "initials": "M",
        "id": "mankiewicz",
        "description": "Coating systems for industry, aviation and automotive. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Market99",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "M",
        "id": "market99",
        "description": "Home and lifestyle retail. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "MediaTek",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "M",
        "id": "mediatek",
        "description": "Semiconductor and chipset solutions. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Medsynaptic",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "apac",
        "initials": "M",
        "id": "medsynaptic",
        "description": "Medical imaging technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Mio Amore",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "MA",
        "id": "mio-amore",
        "description": "Food and beverages. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Motorq",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "M",
        "id": "motorq",
        "description": "Connected-vehicle data and insights software. Headquartered in Americas.",
        "industry": {
          "href": "/corporate-training/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "National Remote Sensing Centre (NRSC)",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "NR",
        "id": "nrsc",
        "description": "Government scientific research in remote sensing. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Neovia",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "amer",
        "initials": "N",
        "id": "neovia",
        "description": "Logistics. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Oswaal Books",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "OB",
        "id": "oswaal-books",
        "description": "Educational publishing. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Pierian Services",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "PS",
        "id": "pierian-services",
        "description": "Business services and consulting. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Pollution Control Association of the Philippines (PCAPI)",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "PC",
        "id": "pcapi",
        "description": "Non-profit for environmental protection and compliance. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "QuadGen",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "Q",
        "id": "quadgen",
        "description": "Telecommunications and network services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Regeneron",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "R",
        "id": "regeneron",
        "description": "Biotechnology. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Renishaw",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "R",
        "id": "renishaw",
        "description": "Precision measurement and healthcare technology. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Sandvik",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "S",
        "id": "sandvik",
        "description": "Engineering, tooling and manufacturing. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Sangam Group",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "SG",
        "id": "sangam-group",
        "description": "Integrated textile manufacturing and export. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Semillas Fitó",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "eura",
        "initials": "SF",
        "id": "semillas-fito",
        "description": "Seed breeding and agricultural innovation. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "ShanMukha",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "apac",
        "initials": "S",
        "id": "shanmukha",
        "description": "Biotechnology and diagnostics. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Shravas Technologies",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "ST",
        "id": "shravas-technologies",
        "description": "Software testing and quality assurance. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Silverline",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "S",
        "id": "silverline",
        "description": "Cloud and digital transformation consulting. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "SIS",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "S",
        "id": "sis",
        "description": "Security and facility services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Smarsh",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "S",
        "id": "smarsh",
        "description": "Digital communications compliance and archiving. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Social Discovery Group",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "SD",
        "id": "social-discovery-group",
        "description": "Social discovery and online entertainment. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Solflare",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "S",
        "id": "solflare",
        "description": "Digital wallet for the Solana blockchain. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Spartan",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "S",
        "id": "spartan",
        "description": "Manufacturing. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "SPI Pharma",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "SP",
        "id": "spi-pharma",
        "description": "Pharmaceutical ingredients and manufacturing. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Sportskeeda",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "apac",
        "initials": "S",
        "id": "sportskeeda",
        "description": "Sports and entertainment content. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "SRF Limited",
        "sector": "chem",
        "sector_label": "Chemicals and materials",
        "region": "apac",
        "initials": "SL",
        "id": "srf-limited",
        "description": "Chemicals, technical textiles and packaging. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Sunstone",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "S",
        "id": "sunstone",
        "description": "Industry-aligned higher education services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Tadmur Holding",
        "sector": "group",
        "sector_label": "Diversified business groups",
        "region": "mena",
        "initials": "TH",
        "id": "tadmur-holding",
        "description": "A business group operating across several industries. Headquartered in Middle East and North Africa.",
        "industry": null
      },
      {
        "name": "Tata Chemicals",
        "sector": "chem",
        "sector_label": "Chemicals and materials",
        "region": "apac",
        "initials": "TC",
        "id": "tata-chemicals",
        "description": "Chemicals and materials. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Taylor & Francis",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "eura",
        "initials": "TF",
        "id": "taylor-francis",
        "description": "Academic publishing. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "The National Bank of Iraq",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "mena",
        "initials": "TN",
        "id": "the-national-bank-of-iraq",
        "description": "Full-service regional banking. Headquartered in Middle East and North Africa.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Thryve",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "apac",
        "initials": "T",
        "id": "thryve",
        "description": "Healthcare. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Total",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "eura",
        "initials": "T",
        "id": "totalenergies",
        "description": "Energy and petroleum. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "TransUnion",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "amer",
        "initials": "T",
        "id": "transunion",
        "description": "Credit information and risk management. Headquartered in Americas.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "TVS Electronics",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "TE",
        "id": "tvs-electronics",
        "description": "Electronics manufacturing and supply chain. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "Ujjivan Small Finance Bank",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "US",
        "id": "ujjivan-small-finance-bank",
        "description": "Small finance banking. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "name": "Uplers",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "U",
        "id": "uplers",
        "description": "Hiring for product and engineering talent. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "UWorld",
        "sector": "edu",
        "sector_label": "Education",
        "region": "amer",
        "initials": "U",
        "id": "uworld",
        "description": "Education and test preparation. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Vedanta",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "apac",
        "initials": "V",
        "id": "vedanta",
        "description": "Mining, metals, oil and gas. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Vesuvius",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "V",
        "id": "vesuvius",
        "description": "Molten metal flow engineering for steel and foundry. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "West African Ceramics",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "WA",
        "id": "west-african-ceramics",
        "description": "Ceramic tiles, sold under the Royal brand. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "name": "WiredScore",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "W",
        "id": "wiredscore",
        "description": "Digital connectivity certification for buildings. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "YCP",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "Y",
        "id": "ycp",
        "description": "Management consulting and principal investment. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "ZS Associates",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "amer",
        "initials": "ZA",
        "id": "zs-associates",
        "description": "Management consulting and technology. Headquartered in Americas.",
        "industry": null
      }
    ]
  },
  "regions": {
    "heading": "Some of Edstellar's clients <span>across four regions.</span>",
    "lede": "A selection of the organizations headquartered in the Americas, Europe and Africa, the Middle East and North Africa, and Asia Pacific that work with Edstellar, with delivery in 100+ countries.",
    "cards": [
      {
        "key": "amer",
        "label": "Americas",
        "logos_label": "Sample clients headquartered in the Americas",
        "logos": [
          { "id": "microsoft" },
          { "id": "visa" },
          { "id": "johnson-johnson" },
          { "id": "nike" },
          { "id": "boston-consulting-group" },
          { "id": "intel" }
        ]
      },
      {
        "key": "eura",
        "label": "Europe and Africa",
        "logos_label": "Sample clients headquartered in Europe and Africa",
        "logos": [
          { "id": "kpmg" },
          { "id": "abb" },
          { "id": "renishaw" },
          { "id": "totalenergies" },
          { "id": "taylor-francis" },
          { "id": "sandvik" }
        ]
      },
      {
        "key": "mena",
        "label": "Middle East and North Africa",
        "logos_label": "Sample clients headquartered in the Middle East and North Africa",
        "logos": [
          { "id": "the-national-bank-of-iraq" },
          { "id": "deriv" },
          { "id": "cloudify" },
          { "id": "halcon" },
          { "id": "global-north" },
          { "id": "tadmur-holding" }
        ]
      },
      {
        "key": "apac",
        "label": "Asia Pacific",
        "logos_label": "Sample clients headquartered in Asia Pacific",
        "logos": [
          { "id": "aditya-birla-group" },
          { "id": "godrej" },
          { "id": "tata-chemicals" },
          { "id": "mediatek" },
          { "id": "vedanta" },
          { "id": "jica" }
        ]
      }
    ],
    "basis": "Regions reflect where each client is headquartered."
  },
  "sectors": {
    "heading": "Sectors Edstellar works with, <span>from technology to government.</span>",
    "lede": "Edstellar builds workforce capability for organizations in 16 sectors, from technology, manufacturing and professional services to banking, healthcare, education and the public sector.",
    "rows": [
      {
        "key": "tech",
        "label": "Technology, software and telecom",
        "summary": "Including Microsoft, Amazon and Adobe."
      },
      {
        "key": "mfg",
        "label": "Manufacturing and industrial",
        "summary": "Including ABB, Bry-Air and Emerson."
      },
      {
        "key": "pro",
        "label": "Professional and business services",
        "summary": "Including KPMG, Boston Consulting Group and C.I.P.S."
      },
      {
        "key": "bfsi",
        "label": "Banking, financial services and insurance",
        "summary": "Including Visa, S&P Global and Artha Bharat."
      },
      {
        "key": "consumer",
        "label": "Consumer goods, retail and hospitality",
        "summary": "Including Nike, Circle K and Godrej."
      },
      {
        "key": "health",
        "label": "Pharma, biotech and healthcare",
        "summary": "Including Johnson & Johnson, Currax Pharmaceuticals and eClinical Solutions."
      },
      {
        "key": "auto",
        "label": "Automotive, aviation and mobility",
        "summary": "Including Uber, ADB SAFEGATE and BluSmart Mobility."
      },
      {
        "key": "re",
        "label": "Real estate and construction",
        "summary": "Including Bechtel, Assetz Property Group and Auro."
      },
      {
        "key": "edu",
        "label": "Education",
        "summary": "Including KIET Group of Institutions, Maharana Pratap Group of Institutions and Oswaal Books."
      },
      {
        "key": "energy",
        "label": "Energy and natural resources",
        "summary": "Including Agratas, AMPIN Energy Transition and Cenovus Energy."
      },
      {
        "key": "public",
        "label": "Government, public sector and non-profit",
        "summary": "Including Hudson Link, International Solar Alliance and Japan International Cooperation Agency (JICA)."
      },
      {
        "key": "agri",
        "label": "Agriculture and agritech",
        "summary": "Including Coromandel, Daund Sugar and Ecozen."
      },
      {
        "key": "log",
        "label": "Logistics and supply chain",
        "summary": "Including Bombay Metrics, Emiza and KNS Express."
      },
      {
        "key": "media",
        "label": "Media, entertainment and publishing",
        "summary": "Including DB Corp, Endeavor and Sportskeeda."
      },
      {
        "key": "chem",
        "label": "Chemicals and materials",
        "summary": "Including Mankiewicz, SRF Limited and Tata Chemicals."
      },
      {
        "key": "group",
        "label": "Diversified business groups",
        "summary": "Including Aditya Birla Group and Tadmur Holding."
      }
    ]
  },
  "cta_band": {
    "heading": "Build capability the way these organizations do, <span>with Edstellar.</span>",
    "actions": [
      {
        "label": "Talk to an Edstellar expert",
        "href": "#contact",
        "variant": "primary",
        "arrow": true
      },
      {
        "label": "Send your RFP",
        "href": "/request-for-proposal",
        "variant": "secondary",
        "arrow": true
      }
    ]
  },
  "why": {
    "heading": "Why organizations choose <span>Edstellar.</span>",
    "lede": "The same strengths stand behind every Edstellar client account, whatever the sector or size of the organization.",
    "stats": [
      {
        "value": "Fit first",
        "label": "Vendor-neutral by design",
        "desc": "Programs, trainers and assessment instruments are chosen for each organization's need, not tied to a single publisher."
      },
      {
        "value": "75",
        "label": "Training domains",
        "desc": "More than 2,000 instructor-led programs, from technical and AI skills to leadership and compliance."
      },
      {
        "value": "100+",
        "label": "Countries",
        "desc": "Programs delivered across regions and time zones, in 10+ languages."
      },
      {
        "value": "1",
        "label": "Client success manager per account",
        "desc": "One point of contact across every program, from the first brief to the review after delivery."
      },
      {
        "value": "3",
        "label": "Delivery modes",
        "desc": "Virtual, onsite and blended delivery, matched to how each team works."
      },
      {
        "value": "2",
        "label": "ISO certifications",
        "desc": "ISO 9001:2015 for quality management and ISO 27001:2022 for information security."
      }
    ],
    "ways": {
      "heading": "Ways clients work with Edstellar",
      "items": [
        {
          "label": "Corporate training programs",
          "href": "/corporate-training-catalog"
        },
        {
          "label": "Learning and development consulting",
          "href": "/learning-development-consulting-services"
        },
        {
          "label": "Organizational development",
          "href": "/organizational-development-consulting"
        },
        {
          "label": "Training needs analysis",
          "href": "/training-needs-analysis-services"
        },
        {
          "label": "Talent assessments",
          "href": "/talent-assessment-services"
        },
        {
          "label": "Coaching",
          "href": "/coaching-solutions"
        },
        {
          "label": "Managed training services",
          "href": "/managed-learning-services/managed-training"
        }
      ]
    }
  },
  "related": {
    "heading": "More from <span>Edstellar.</span>",
    "items": [
      {
        "icon": "people",
        "tag": "Organizations",
        "title": "Who Edstellar serves",
        "desc": "How Edstellar works with enterprises, mid-market firms, start-ups, governments, educational institutions and non-profits.",
        "cta": "Explore",
        "href": "/who-we-serve"
      },
      {
        "icon": "heart",
        "tag": "Experience",
        "title": "The Edstellar client experience",
        "desc": "One client success manager per account, matched trainers and every program detail handled from brief to results.",
        "cta": "Explore",
        "href": "/exceptional-customer-experience"
      },
      {
        "icon": "star",
        "tag": "Stories",
        "title": "Edstellar success stories",
        "desc": "Accounts of how organizations planned and delivered capability programs with Edstellar.",
        "cta": "Read",
        "href": "/success-stories"
      },
      {
        "icon": "doc",
        "tag": "Procurement",
        "title": "Request for proposal",
        "desc": "Send your RFP or tender and receive one complete Edstellar proposal within 15 working days.",
        "cta": "Submit",
        "href": "/request-for-proposal"
      }
    ]
  },
  "faqs": {
    "heading": "Edstellar clients <span>FAQs.</span>",
    "items": [
      {
        "q": "Which companies work with Edstellar?",
        "a": "Edstellar's clients include Microsoft, Amazon, KPMG, Boston Consulting Group, Visa, Johnson & Johnson, Nike, Bechtel, ABB and S&P Global, alongside mid-sized companies, start-ups, universities, government agencies and non-profits. This page features a selection of them across 16 sectors."
      },
      {
        "q": "Which industries do Edstellar's clients come from?",
        "a": "Edstellar works with clients in 16 sectors: technology, software and telecom; manufacturing and industrial; professional and business services; banking, financial services and insurance; consumer goods, retail and hospitality; pharma, biotech and healthcare; automotive, aviation and mobility; real estate and construction; education; energy and natural resources; government, public sector and non-profit; agriculture and agritech; logistics and supply chain; media, entertainment and publishing; chemicals and materials; and diversified business groups."
      },
      {
        "q": "Does Edstellar work with government and public sector organizations?",
        "a": "Yes. Public sector clients include the National Remote Sensing Centre (NRSC), the Japan International Cooperation Agency (JICA) and the International Solar Alliance. Edstellar also responds to government tenders and procurement portals."
      },
      {
        "q": "Does Edstellar work with educational institutions and non-profits?",
        "a": "Yes. Education clients include KIET Group of Institutions, Maharana Pratap Group of Institutions, Sunstone and UWorld, and non-profit clients include Hudson Link and the Pollution Control Association of the Philippines."
      },
      {
        "q": "Where are Edstellar's clients headquartered?",
        "a": "Edstellar's clients are headquartered across four regions: the Americas, Europe and Africa, the Middle East and North Africa, and Asia Pacific. Edstellar delivers training in 100+ countries and 10+ languages, so programs reach teams well beyond each client's headquarters."
      },
      {
        "q": "Can Edstellar train teams in several countries at once?",
        "a": "Yes. Edstellar delivers in 100+ countries and 10+ languages, in virtual, onsite and blended formats, and coordinates schedules across cohorts, locations and time zones."
      },
      {
        "q": "Which Edstellar services do clients use?",
        "a": "Clients work with Edstellar for corporate training programs across 76 domains, learning and development consulting, organizational development consulting, training needs analysis, talent assessments, coaching and managed training services."
      },
      {
        "q": "How does Edstellar support each client account?",
        "a": "Every Edstellar account has one dedicated client success manager, who stays the single point of contact across all of the account's programs."
      },
      {
        "q": "How can my organization become an Edstellar client?",
        "a": "Talk to an Edstellar expert through the form on this page, or send your RFP or tender through Edstellar's request for proposal page. An Edstellar expert will reply to discuss your goals and the next step."
      },
      {
        "q": "How can a client update its logo or details on this page?",
        "a": "Contact Edstellar through the form on this page with the change you need, and the logo, name or description will be updated or removed."
      }
    ]
  },
  "contact": {
    "heading": "Talk to an <span>Edstellar expert.</span>",
    "lede": "Tell Edstellar about your teams and goals, and an Edstellar expert will reply to plan the next step.",
    "form": {
      "heading": "Talk to an Edstellar expert",
      "submit_label": "Talk to an Edstellar expert"
    }
  }
};
