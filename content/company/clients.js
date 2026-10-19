// Auto-composed from the approved design
// `Edstellar-New-Lanch SETUP/clients 3.html`. Local content, so `/clients`
// renders fully static. Field names follow the CMS's snake_case convention
// (TASTE.md §5.4); the 121-client directory is the design's own data.
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
    "lede": "121 organizations across 16 sectors build workforce capability with Edstellar, from Microsoft, KPMG and Visa to universities, government agencies and non-profits. See who they are, the sectors they work in and why organizations choose Edstellar for training, consulting, assessments and coaching.",
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
        "value": "121",
        "label": "organizations featured"
      },
      {
        "value": "16",
        "label": "sectors"
      },
      {
        "value": "100",
        "label": "countries served"
      }
    ],
    "mosaic": [
      {
        "name": "Microsoft",
        "logo": "https://media.edstellar.com/client_logo/Microsoft.webp",
        "off": false
      },
      {
        "name": "KPMG",
        "logo": "https://media.edstellar.com/client_logo/KPMG.webp",
        "off": true
      },
      {
        "name": "Visa",
        "logo": "https://media.edstellar.com/client_logo/visa.webp",
        "off": false
      },
      {
        "name": "Johnson & Johnson",
        "logo": "https://media.edstellar.com/client_logo/JohnsonJohnson_1.webp",
        "off": true
      },
      {
        "name": "Nike",
        "logo": "https://media.edstellar.com/client_logo/Nike.webp",
        "off": false
      },
      {
        "name": "Bechtel",
        "logo": "https://media.edstellar.com/client_logo/Bechtel.webp",
        "off": true
      },
      {
        "name": "Boston Consulting Group",
        "logo": "https://media.edstellar.com/client_logo/Boston_consulting_group.webp",
        "off": false
      },
      {
        "name": "ABB",
        "logo": "https://media.edstellar.com/client_logo/Abb.webp",
        "off": true
      },
      {
        "name": "Amazon",
        "logo": "https://media.edstellar.com/client_logo/Amazon.webp",
        "off": false
      },
      {
        "name": "S&P Global",
        "logo": "https://media.edstellar.com/client_logo/SP_Global_Inc.webp",
        "off": true
      }
    ],
    "mosaic_card": [
      {
        "value": "121",
        "label": "clients featured"
      },
      {
        "value": "16",
        "label": "sectors"
      }
    ]
  },
  "glance": [
    {
      "value": "100",
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
    "links": [
      {
        "label": "Clients",
        "href": "#clients"
      },
      {
        "label": "Regions",
        "href": "#regions"
      },
      {
        "label": "Sectors",
        "href": "#sectors"
      },
      {
        "label": "Why Edstellar",
        "href": "#why"
      },
      {
        "label": "FAQ",
        "href": "#faq"
      },
      {
        "label": "Contact",
        "href": "#contact"
      }
    ],
    "cta": {
      "label": "Talk to an expert",
      "href": "#contact"
    }
  },
  "explorer": {
    "heading": "Every Edstellar client, <span>sorted by sector.</span>",
    "lede": "Filter by sector or search by name. Select a client to see what the organization does and to find others in the same sector.",
    "total": 121,
    "regions": [
      {
        "key": "apac",
        "label": "Asia Pacific",
        "count": 61
      },
      {
        "key": "amer",
        "label": "Americas",
        "count": 39
      },
      {
        "key": "eura",
        "label": "Europe and Africa",
        "count": 15
      },
      {
        "key": "mena",
        "label": "Middle East and North Africa",
        "count": 6
      }
    ],
    "sectors": [
      {
        "key": "tech",
        "label": "Technology, software and telecom",
        "count": 23
      },
      {
        "key": "mfg",
        "label": "Manufacturing and industrial",
        "count": 14
      },
      {
        "key": "pro",
        "label": "Professional and business services",
        "count": 11
      },
      {
        "key": "bfsi",
        "label": "Banking, financial services and insurance",
        "count": 9
      },
      {
        "key": "consumer",
        "label": "Consumer goods, retail and hospitality",
        "count": 9
      },
      {
        "key": "health",
        "label": "Pharma, biotech and healthcare",
        "count": 9
      },
      {
        "key": "auto",
        "label": "Automotive, aviation and mobility",
        "count": 8
      },
      {
        "key": "re",
        "label": "Real estate and construction",
        "count": 6
      },
      {
        "key": "edu",
        "label": "Education",
        "count": 5
      },
      {
        "key": "energy",
        "label": "Energy and natural resources",
        "count": 5
      },
      {
        "key": "public",
        "label": "Government, public sector and non-profit",
        "count": 5
      },
      {
        "key": "agri",
        "label": "Agriculture and agritech",
        "count": 4
      },
      {
        "key": "log",
        "label": "Logistics and supply chain",
        "count": 4
      },
      {
        "key": "media",
        "label": "Media, entertainment and publishing",
        "count": 4
      },
      {
        "key": "chem",
        "label": "Chemicals and materials",
        "count": 3
      },
      {
        "key": "group",
        "label": "Diversified business groups",
        "count": 2
      }
    ],
    "clients": [
      {
        "name": "Microsoft",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "M",
        "logo": "https://media.edstellar.com/client_logo/Microsoft.webp",
        "description": "Software, cloud computing and technology solutions. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "KPMG",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "eura",
        "initials": "K",
        "logo": "https://media.edstellar.com/client_logo/KPMG.webp",
        "description": "Professional services. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Visa",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "amer",
        "initials": "V",
        "logo": "https://media.edstellar.com/client_logo/visa.webp",
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
        "logo": "https://media.edstellar.com/client_logo/JohnsonJohnson_1.webp",
        "description": "Pharmaceuticals and healthcare products. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Nike",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "amer",
        "initials": "N",
        "logo": "https://media.edstellar.com/client_logo/Nike.webp",
        "description": "Athletic footwear, apparel and equipment. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Bechtel",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "B",
        "logo": "https://media.edstellar.com/client_logo/Bechtel.webp",
        "description": "Engineering, construction and project management. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Boston Consulting Group",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "amer",
        "initials": "BC",
        "logo": "https://media.edstellar.com/client_logo/Boston_consulting_group.webp",
        "description": "Business strategy consulting. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "ABB",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "A",
        "logo": "https://media.edstellar.com/client_logo/Abb.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Amazon.webp",
        "description": "Cloud services, e-commerce and retail. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "S&P Global",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "amer",
        "initials": "SP",
        "logo": "https://media.edstellar.com/client_logo/SP_Global_Inc.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Adobe.webp",
        "description": "Digital media and creative software. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Uber",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "U",
        "logo": "https://media.edstellar.com/client_logo/Uber.svg",
        "description": "Ride-hailing and mobility. Headquartered in Americas.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "ADB SAFEGATE",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "eura",
        "initials": "AS",
        "logo": "https://media.edstellar.com/client_logo/ADB_SAFE_Gate.svg",
        "description": "Airport and airside technology. Headquartered in Europe and Africa.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Aditya Birla Group",
        "sector": "group",
        "sector_label": "Diversified business groups",
        "region": "apac",
        "initials": "AB",
        "logo": "https://media.edstellar.com/client_logo/Aditya_Birla_Group.webp",
        "description": "A business group operating across many sectors. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Agratas",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "apac",
        "initials": "A",
        "logo": "https://media.edstellar.com/client_logo/Agratas.webp",
        "description": "Battery technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "AMPIN Energy Transition",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "apac",
        "initials": "AE",
        "logo": "https://media.edstellar.com/client_logo/AMPIN_Energy_Transition.webp",
        "description": "Renewable energy for commercial, industrial and utility customers. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Artha Bharat",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "AB",
        "logo": "https://media.edstellar.com/client_logo/Artha_Bharath.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Assetz_Soho__Sky.webp",
        "description": "Residential and commercial real estate. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Auro",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "apac",
        "initials": "A",
        "logo": "https://media.edstellar.com/client_logo/Auro.webp",
        "description": "Real estate. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Autodesk",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "A",
        "logo": "https://media.edstellar.com/client_logo/AutoDesk.webp",
        "description": "Design and engineering software. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "BluSmart Mobility",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "apac",
        "initials": "BM",
        "logo": "https://media.edstellar.com/client_logo/Blu_Smart_Mobility.webp",
        "description": "Electric vehicles and mobility. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Bombay Metrics",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "apac",
        "initials": "BM",
        "logo": "https://media.edstellar.com/client_logo/Bombay_Metrics.webp",
        "description": "Supply chain analytics. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Brevo",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "B",
        "logo": "https://media.edstellar.com/client_logo/Brevo.webp",
        "description": "Marketing and customer communication software. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Bry-Air",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "BA",
        "logo": "https://media.edstellar.com/client_logo/Bry-Air.webp",
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
        "logo": "https://media.edstellar.com/client_logo/ByNaric.webp",
        "description": "Software and technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "C.I.P.S",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "amer",
        "initials": "CI",
        "logo": "https://media.edstellar.com/client_logo/CIPS.svg",
        "description": "Indigenous-owned consulting and engagement. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Can Fin Homes",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "CF",
        "logo": "https://media.edstellar.com/client_logo/CanFinHomes_Ltd.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Cenovus.webp",
        "description": "Oil production and refining. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Circle K",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "amer",
        "initials": "CK",
        "logo": "https://media.edstellar.com/client_logo/Circle_K.webp",
        "description": "Convenience retail. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Cloudify",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "mena",
        "initials": "C",
        "logo": "https://media.edstellar.com/client_logo/cloudify.svg",
        "description": "Multi-cloud and edge orchestration. Headquartered in Middle East and North Africa.",
        "industry": null
      },
      {
        "name": "Cloyes",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "C",
        "logo": "https://media.edstellar.com/client_logo/Cloyes.webp",
        "description": "Timing drive systems and automotive components. Headquartered in Americas.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Coromandel",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "apac",
        "initials": "C",
        "logo": "https://media.edstellar.com/client_logo/Coromandel.webp",
        "description": "Agriculture inputs and crop chemicals. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Cummins",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "C",
        "logo": "https://media.edstellar.com/client_logo/Cummins_logo.svg_1.png",
        "description": "Engines, power systems and zero-emission technology. Headquartered in Americas.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Currax Pharmaceuticals",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "CP",
        "logo": "https://media.edstellar.com/client_logo/Currax.webp",
        "description": "Pharmaceuticals. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Datawrkz",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "D",
        "logo": "https://media.edstellar.com/client_logo/Datawrkz.svg",
        "description": "Digital advertising and ad technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Daund Sugar",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "apac",
        "initials": "DS",
        "logo": "https://media.edstellar.com/client_logo/Daund_Sugar_Limited.webp",
        "description": "Sugar and agro-based products. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Dayforce",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "D",
        "logo": "https://media.edstellar.com/client_logo/Dayforce.webp",
        "description": "Human capital management software. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "DB Corp",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "apac",
        "initials": "DC",
        "logo": "https://media.edstellar.com/client_logo/D_B_Corp_Ltd.webp",
        "description": "Print and digital media. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Deriv",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "mena",
        "initials": "D",
        "logo": "https://media.edstellar.com/client_logo/DERIV_LOGO_COL_RGB-1_1.png",
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
        "logo": "https://media.edstellar.com/client_logo/Dev_on.webp",
        "description": "IT services and consulting. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Devstringx",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "D",
        "logo": "https://media.edstellar.com/client_logo/devstring.webp",
        "description": "Software development and technology services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "eClinical Solutions",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "ES",
        "logo": "https://media.edstellar.com/client_logo/eClinical_Solutions.webp",
        "description": "Clinical research data solutions. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Ecozen",
        "sector": "agri",
        "sector_label": "Agriculture and agritech",
        "region": "apac",
        "initials": "E",
        "logo": "https://media.edstellar.com/client_logo/Ecozen.webp",
        "description": "Solar-powered cold storage and irrigation. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Edifecs",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "E",
        "logo": "https://media.edstellar.com/client_logo/edifecs.webp",
        "description": "Healthcare technology. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Emerson",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "amer",
        "initials": "E",
        "logo": "https://media.edstellar.com/client_logo/Emerson.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Emiza_Inc.webp",
        "description": "Logistics and fulfillment. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Endeavor",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "amer",
        "initials": "E",
        "logo": "https://media.edstellar.com/client_logo/Endeavor_.webp",
        "description": "Media and entertainment. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "EPL Global",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "EG",
        "logo": "https://media.edstellar.com/client_logo/EPL_Global.webp",
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
        "logo": "https://media.edstellar.com/client_logo/ERGO_Technology__Services.webp",
        "description": "Technology and digital services. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "ETP International",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "EI",
        "logo": "https://media.edstellar.com/client_logo/ETP_International.webp",
        "description": "Unified commerce software. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Excitel",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "E",
        "logo": "https://media.edstellar.com/client_logo/Excitel.webp",
        "description": "Broadband and telecommunications. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Garware Technical Fibres",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "GT",
        "logo": "https://media.edstellar.com/client_logo/Garware_Technical_Fibres.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Global_North.webp",
        "description": "Investment advisory for citizenship and residency. Headquartered in Middle East and North Africa.",
        "industry": null
      },
      {
        "name": "Go Digit Life Insurance",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "apac",
        "initials": "GD",
        "logo": "https://media.edstellar.com/client_logo/digit_life_insurance.svg",
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
        "logo": "https://media.edstellar.com/client_logo/godrej.webp",
        "description": "Consumer goods and FMCG. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "GreenCell Mobility",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "apac",
        "initials": "GM",
        "logo": "https://media.edstellar.com/client_logo/GreenCell_Mobility.webp",
        "description": "Electric public transport. Headquartered in Asia Pacific.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Greystar",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "G",
        "logo": "https://media.edstellar.com/client_logo/Greystar.webp",
        "description": "Rental housing investment, development and management. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "HALCON",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "mena",
        "initials": "H",
        "logo": "https://media.edstellar.com/client_logo/HALCON.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Hudson_Link.webp",
        "description": "Non-profit for higher education in prisons and reentry. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Ideal Solutions",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "IS",
        "logo": "https://media.edstellar.com/client_logo/Ideal_Solutions.webp",
        "description": "Smart solutions and services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "India Hospitality Mart",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "IH",
        "logo": "https://media.edstellar.com/client_logo/Indian_Hospitality_Mart.webp",
        "description": "Hospitality services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "IndoBevs",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "I",
        "logo": "https://media.edstellar.com/client_logo/Indobevs.webp",
        "description": "Beverage manufacturing and distribution. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "IndustryARC",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "I",
        "logo": "https://media.edstellar.com/client_logo/industryarc.webp",
        "description": "Market research and consulting. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Intel",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "I",
        "logo": "https://media.edstellar.com/client_logo/Intel2.webp",
        "description": "Semiconductors and computing technology. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "International Solar Alliance",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "IS",
        "logo": "https://media.edstellar.com/client_logo/International_Solar_Alliance_Secretariat.webp",
        "description": "International organization advancing solar energy adoption. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Japan International Cooperation Agency (JICA)",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "JI",
        "logo": "https://media.edstellar.com/client_logo/JICA__Japan_International_Cooperation_Agency_.webp",
        "description": "Government agency for international development cooperation. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Jet Parts Engineering",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "JP",
        "logo": "https://media.edstellar.com/client_logo/Jet_parts.svg",
        "description": "Aerospace aftermarket parts and repair. Headquartered in Americas.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "Kellogg's",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "amer",
        "initials": "K",
        "logo": "https://media.edstellar.com/client_logo/Kelloggs.webp",
        "description": "Food and beverages. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Khazana Jewellery",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "KJ",
        "logo": "https://media.edstellar.com/client_logo/khazana_jewellery.webp",
        "description": "Fine jewelry. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "KIET Group of Institutions",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "KG",
        "logo": "https://media.edstellar.com/client_logo/KIET_Group_of_Institution.webp",
        "description": "Technical higher education institution. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "KMK Ventures",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "KV",
        "logo": "https://media.edstellar.com/client_logo/KMK_Ventures.webp",
        "description": "Outsourced accounting and tax services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "KNS Express",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "apac",
        "initials": "KE",
        "logo": "https://media.edstellar.com/client_logo/KNS_Logistics_Service.webp",
        "description": "Delivery and shipping. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Littelfuse",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "amer",
        "initials": "L",
        "logo": "https://media.edstellar.com/client_logo/littlefuse.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Maharana_Pratap_Group_of_Institutions.webp",
        "description": "Higher education institution. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Majestic Asset Management",
        "sector": "re",
        "sector_label": "Real estate and construction",
        "region": "amer",
        "initials": "MA",
        "logo": "https://media.edstellar.com/client_logo/Majestic_Asset_Management_Inc_Management_Team.webp",
        "description": "Real estate investment and property management. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Mankiewicz",
        "sector": "chem",
        "sector_label": "Chemicals and materials",
        "region": "eura",
        "initials": "M",
        "logo": "https://media.edstellar.com/client_logo/Mankiewicz_India_Private_Limited.webp",
        "description": "Coating systems for industry, aviation and automotive. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Market99",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "M",
        "logo": "https://media.edstellar.com/client_logo/Market99.webp",
        "description": "Home and lifestyle retail. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "MediaTek",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "M",
        "logo": "https://media.edstellar.com/client_logo/MediaTek.webp",
        "description": "Semiconductor and chipset solutions. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Medsynaptic",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "apac",
        "initials": "M",
        "logo": "https://media.edstellar.com/client_logo/Medsynaptic_Pvt._Ltd.webp",
        "description": "Medical imaging technology. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Mio Amore",
        "sector": "consumer",
        "sector_label": "Consumer goods, retail and hospitality",
        "region": "apac",
        "initials": "MA",
        "logo": "https://media.edstellar.com/client_logo/Mio_amore.webp",
        "description": "Food and beverages. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Motorq",
        "sector": "auto",
        "sector_label": "Automotive, aviation and mobility",
        "region": "amer",
        "initials": "M",
        "logo": "https://media.edstellar.com/client_logo/Motorq.webp",
        "description": "Connected-vehicle data and insights software. Headquartered in Americas.",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "name": "National Remote Sensing Centre (NRSC)",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "NR",
        "logo": "https://media.edstellar.com/client_logo/nrsc.webp",
        "description": "Government scientific research in remote sensing. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Neovia",
        "sector": "log",
        "sector_label": "Logistics and supply chain",
        "region": "amer",
        "initials": "N",
        "logo": "https://media.edstellar.com/client_logo/Neovia.webp",
        "description": "Logistics. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Oswaal Books",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "OB",
        "logo": "https://media.edstellar.com/client_logo/Oswaal_Books_and_Learning_.webp",
        "description": "Educational publishing. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Pierian Services",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "PS",
        "logo": "https://media.edstellar.com/client_logo/PIE.svg",
        "description": "Business services and consulting. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Pollution Control Association of the Philippines (PCAPI)",
        "sector": "public",
        "sector_label": "Government, public sector and non-profit",
        "region": "apac",
        "initials": "PC",
        "logo": "https://media.edstellar.com/client_logo/PCAPI_Region_4A_Chapter_.webp",
        "description": "Non-profit for environmental protection and compliance. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "QuadGen",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "Q",
        "logo": "https://media.edstellar.com/client_logo/QuadGen.webp",
        "description": "Telecommunications and network services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Regeneron",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "amer",
        "initials": "R",
        "logo": "https://media.edstellar.com/client_logo/Regeneron_Science_to_Medicine.webp",
        "description": "Biotechnology. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Renishaw",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "R",
        "logo": "https://media.edstellar.com/client_logo/Renishaw_Technologies.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Sandvik_Coromant.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Sangam.svg",
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
        "logo": "https://media.edstellar.com/client_logo/Fito.svg",
        "description": "Seed breeding and agricultural innovation. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "ShanMukha",
        "sector": "health",
        "sector_label": "Pharma, biotech and healthcare",
        "region": "apac",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/shanmukha.webp",
        "description": "Biotechnology and diagnostics. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Shravas Technologies",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "apac",
        "initials": "ST",
        "logo": "https://media.edstellar.com/client_logo/Shravas_Technologies.webp",
        "description": "Software testing and quality assurance. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Silverline",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/Silverline_IT_Solutions.webp",
        "description": "Cloud and digital transformation consulting. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "SIS",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/SIS.webp",
        "description": "Security and facility services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Smarsh",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "amer",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/Smarsh.webp",
        "description": "Digital communications compliance and archiving. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Social Discovery Group",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "SD",
        "logo": "https://media.edstellar.com/client_logo/Social_Discovery_group.webp",
        "description": "Social discovery and online entertainment. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Solflare",
        "sector": "tech",
        "sector_label": "Technology, software and telecom",
        "region": "eura",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/Solflare.webp",
        "description": "Digital wallet for the Solana blockchain. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "Spartan",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "apac",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/spartan.webp",
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
        "logo": "https://media.edstellar.com/client_logo/SPI_Pharma.webp",
        "description": "Pharmaceutical ingredients and manufacturing. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Sportskeeda",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "apac",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/Sportskeeda_1.webp",
        "description": "Sports and entertainment content. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "SRF Limited",
        "sector": "chem",
        "sector_label": "Chemicals and materials",
        "region": "apac",
        "initials": "SL",
        "logo": "https://media.edstellar.com/client_logo/SRF_Limited.webp",
        "description": "Chemicals, technical textiles and packaging. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Sunstone",
        "sector": "edu",
        "sector_label": "Education",
        "region": "apac",
        "initials": "S",
        "logo": "https://media.edstellar.com/client_logo/Sunstone.webp",
        "description": "Industry-aligned higher education services. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Tadmur Holding",
        "sector": "group",
        "sector_label": "Diversified business groups",
        "region": "mena",
        "initials": "TH",
        "logo": "https://media.edstellar.com/client_logo/Tadmur_Holding.webp",
        "description": "A business group operating across several industries. Headquartered in Middle East and North Africa.",
        "industry": null
      },
      {
        "name": "Tata Chemicals",
        "sector": "chem",
        "sector_label": "Chemicals and materials",
        "region": "apac",
        "initials": "TC",
        "logo": "https://media.edstellar.com/client_logo/Tata_Chemicals.webp",
        "description": "Chemicals and materials. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Taylor & Francis",
        "sector": "media",
        "sector_label": "Media, entertainment and publishing",
        "region": "eura",
        "initials": "TF",
        "logo": "https://media.edstellar.com/client_logo/Taylor__Francis_Group.webp",
        "description": "Academic publishing. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "The National Bank of Iraq",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "mena",
        "initials": "TN",
        "logo": "https://media.edstellar.com/client_logo/national_Bank_of_Iraq.svg",
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
        "logo": "https://media.edstellar.com/client_logo/Thryve.webp",
        "description": "Healthcare. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Total",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "eura",
        "initials": "T",
        "logo": "https://media.edstellar.com/client_logo/Total.webp",
        "description": "Energy and petroleum. Headquartered in Europe and Africa.",
        "industry": null
      },
      {
        "name": "TransUnion",
        "sector": "bfsi",
        "sector_label": "Banking, financial services and insurance",
        "region": "amer",
        "initials": "T",
        "logo": "https://media.edstellar.com/client_logo/Transunion.webp",
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
        "logo": "https://media.edstellar.com/client_logo/TVS.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Ujjivan_Small_Finance_Bank.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Uplers.webp",
        "description": "Hiring for product and engineering talent. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "UWorld",
        "sector": "edu",
        "sector_label": "Education",
        "region": "amer",
        "initials": "U",
        "logo": "https://media.edstellar.com/client_logo/Uworld.webp",
        "description": "Education and test preparation. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "Vedanta",
        "sector": "energy",
        "sector_label": "Energy and natural resources",
        "region": "apac",
        "initials": "V",
        "logo": "https://media.edstellar.com/client_logo/Vedanta.webp",
        "description": "Mining, metals, oil and gas. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "Vesuvius",
        "sector": "mfg",
        "sector_label": "Manufacturing and industrial",
        "region": "eura",
        "initials": "V",
        "logo": "https://media.edstellar.com/client_logo/Vesuvius.webp",
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
        "logo": "https://media.edstellar.com/client_logo/Royalquot.webp",
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
        "logo": "https://media.edstellar.com/client_logo/WiredScore.webp",
        "description": "Digital connectivity certification for buildings. Headquartered in Americas.",
        "industry": null
      },
      {
        "name": "YCP",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "apac",
        "initials": "Y",
        "logo": "https://media.edstellar.com/client_logo/ycp_.webp",
        "description": "Management consulting and principal investment. Headquartered in Asia Pacific.",
        "industry": null
      },
      {
        "name": "ZS Associates",
        "sector": "pro",
        "sector_label": "Professional and business services",
        "region": "amer",
        "initials": "ZA",
        "logo": "https://media.edstellar.com/client_logo/ZS_Associates.webp",
        "description": "Management consulting and technology. Headquartered in Americas.",
        "industry": null
      }
    ]
  },
  "regions": {
    "heading": "Edstellar clients across <span>four regions.</span>",
    "lede": "Organizations headquartered in the Americas, Europe and Africa, the Middle East and North Africa, and Asia Pacific work with Edstellar, with delivery in 100 countries.",
    "total": 121,
    "segments": [
      {
        "key": "apac",
        "label": "Asia Pacific",
        "count": 61,
        "percent": 50,
        "bar": 100,
        "names": "Aditya Birla Group, Agratas, AMPIN Energy Transition, Artha Bharat and 57 more"
      },
      {
        "key": "amer",
        "label": "Americas",
        "count": 39,
        "percent": 32,
        "bar": 63.9,
        "names": "Microsoft, Visa, Johnson & Johnson, Nike and 35 more"
      },
      {
        "key": "eura",
        "label": "Europe and Africa",
        "count": 15,
        "percent": 12,
        "bar": 24.6,
        "names": "KPMG, ABB, ADB SAFEGATE, Brevo and 11 more"
      },
      {
        "key": "mena",
        "label": "Middle East and North Africa",
        "count": 6,
        "percent": 5,
        "bar": 9.8,
        "names": "Cloudify, Deriv, Global North, HALCON and 2 more"
      }
    ],
    "basis": "Regions reflect where each client is headquartered."
  },
  "sectors": {
    "heading": "Edstellar clients across <span>16 sectors.</span>",
    "lede": "Technology, manufacturing and professional services firms make up the largest groups, with clients in every sector from banking and healthcare to education and government.",
    "rows": [
      {
        "key": "tech",
        "label": "Technology, software and telecom",
        "count": 23,
        "percent": 100,
        "names": "Microsoft, Amazon, Adobe, Autodesk and 19 more",
        "industry": null
      },
      {
        "key": "mfg",
        "label": "Manufacturing and industrial",
        "count": 14,
        "percent": 60.9,
        "names": "ABB, Bry-Air, Emerson, EPL Global and 10 more",
        "industry": {
          "href": "/industries/manufacturing",
          "label": "Edstellar for manufacturing"
        }
      },
      {
        "key": "pro",
        "label": "Professional and business services",
        "count": 11,
        "percent": 47.8,
        "names": "KPMG, Boston Consulting Group, C.I.P.S, Global North and 7 more",
        "industry": null
      },
      {
        "key": "bfsi",
        "label": "Banking, financial services and insurance",
        "count": 9,
        "percent": 39.1,
        "names": "Visa, S&P Global, Artha Bharat, Can Fin Homes and 5 more",
        "industry": {
          "href": "/industries/banking",
          "label": "Edstellar for banking"
        }
      },
      {
        "key": "consumer",
        "label": "Consumer goods, retail and hospitality",
        "count": 9,
        "percent": 39.1,
        "names": "Nike, Circle K, Godrej, India Hospitality Mart and 5 more",
        "industry": null
      },
      {
        "key": "health",
        "label": "Pharma, biotech and healthcare",
        "count": 9,
        "percent": 39.1,
        "names": "Johnson & Johnson, Currax Pharmaceuticals, eClinical Solutions, Edifecs and 5 more",
        "industry": null
      },
      {
        "key": "auto",
        "label": "Automotive, aviation and mobility",
        "count": 8,
        "percent": 34.8,
        "names": "Uber, ADB SAFEGATE, BluSmart Mobility, Cloyes and 4 more",
        "industry": {
          "href": "/industries/automotive",
          "label": "Edstellar for automotive"
        }
      },
      {
        "key": "re",
        "label": "Real estate and construction",
        "count": 6,
        "percent": 26.1,
        "names": "Bechtel, Assetz Property Group, Auro, Greystar and 2 more",
        "industry": null
      },
      {
        "key": "edu",
        "label": "Education",
        "count": 5,
        "percent": 21.7,
        "names": "KIET Group of Institutions, Maharana Pratap Group of Institutions, Oswaal Books, Sunstone and 1 more",
        "industry": null
      },
      {
        "key": "energy",
        "label": "Energy and natural resources",
        "count": 5,
        "percent": 21.7,
        "names": "Agratas, AMPIN Energy Transition, Cenovus Energy, Total and 1 more",
        "industry": null
      },
      {
        "key": "public",
        "label": "Government, public sector and non-profit",
        "count": 5,
        "percent": 21.7,
        "names": "Hudson Link, International Solar Alliance, Japan International Cooperation Agency (JICA), National Remote Sensing Centre (NRSC) and 1 more",
        "industry": null
      },
      {
        "key": "agri",
        "label": "Agriculture and agritech",
        "count": 4,
        "percent": 17.4,
        "names": "Coromandel, Daund Sugar, Ecozen and Semillas Fitó",
        "industry": null
      },
      {
        "key": "log",
        "label": "Logistics and supply chain",
        "count": 4,
        "percent": 17.4,
        "names": "Bombay Metrics, Emiza, KNS Express and Neovia",
        "industry": null
      },
      {
        "key": "media",
        "label": "Media, entertainment and publishing",
        "count": 4,
        "percent": 17.4,
        "names": "DB Corp, Endeavor, Sportskeeda and Taylor & Francis",
        "industry": null
      },
      {
        "key": "chem",
        "label": "Chemicals and materials",
        "count": 3,
        "percent": 13,
        "names": "Mankiewicz, SRF Limited and Tata Chemicals",
        "industry": null
      },
      {
        "key": "group",
        "label": "Diversified business groups",
        "count": 2,
        "percent": 8.7,
        "names": "Aditya Birla Group and Tadmur Holding",
        "industry": null
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
        "href": "https://www.edstellar.com/request-for-proposal",
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
        "value": "100",
        "label": "Countries",
        "desc": "Programs delivered across regions and time zones, in more than 10 languages."
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
          "href": "https://www.edstellar.com/corporate-training-courses"
        },
        {
          "label": "Learning and development consulting",
          "href": "https://www.edstellar.com/learning-development-consulting-services"
        },
        {
          "label": "Organizational development",
          "href": "https://www.edstellar.com/organizational-development-consulting"
        },
        {
          "label": "Training needs analysis",
          "href": "https://www.edstellar.com/training-needs-analysis-solutions"
        },
        {
          "label": "Talent assessments",
          "href": "https://www.edstellar.com/talent-assessment-services"
        },
        {
          "label": "Coaching",
          "href": "https://www.edstellar.com/coaching-solutions"
        },
        {
          "label": "Managed training services",
          "href": "https://www.edstellar.com/managed-training-services"
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
        "href": "https://www.edstellar.com/who-we-serve"
      },
      {
        "icon": "heart",
        "tag": "Experience",
        "title": "The Edstellar client experience",
        "desc": "One client success manager per account, matched trainers and every program detail handled from brief to results.",
        "cta": "Explore",
        "href": "https://www.edstellar.com/exceptional-customer-experience"
      },
      {
        "icon": "star",
        "tag": "Stories",
        "title": "Edstellar success stories",
        "desc": "Accounts of how organizations planned and delivered capability programs with Edstellar.",
        "cta": "Read",
        "href": "https://www.edstellar.com/success-stories"
      },
      {
        "icon": "doc",
        "tag": "Procurement",
        "title": "Request for proposal",
        "desc": "Send your RFP or tender and receive one complete Edstellar proposal within 15 working days.",
        "cta": "Submit",
        "href": "https://www.edstellar.com/request-for-proposal"
      }
    ]
  },
  "faqs": {
    "heading": "Edstellar clients <span>FAQs.</span>",
    "items": [
      {
        "q": "Which companies work with Edstellar?",
        "a": "Edstellar's clients include Microsoft, Amazon, KPMG, Boston Consulting Group, Visa, Johnson & Johnson, Nike, Bechtel, ABB and S&P Global, alongside mid-sized companies, start-ups, universities, government agencies and non-profits. This page features 121 of them across 16 sectors."
      },
      {
        "q": "Which industries do Edstellar's clients come from?",
        "a": "Edstellar's clients span 16 sectors. The largest groups are technology, software and telecom (23 clients), manufacturing and industrial (14) and professional and business services (11), followed by banking and financial services, healthcare, consumer goods, automotive and mobility, real estate, energy, education and the public sector."
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
        "a": "Edstellar's clients are headquartered in 4 regions: Asia Pacific (61 clients), Americas (39 clients), Europe and Africa (15 clients), Middle East and North Africa (6 clients). Edstellar delivers training in 100 countries and more than 10 languages, so programs reach teams well beyond each client's headquarters."
      },
      {
        "q": "Can Edstellar train teams in several countries at once?",
        "a": "Yes. Edstellar delivers in 100 countries and more than 10 languages, in virtual, onsite and blended formats, and coordinates schedules across cohorts, locations and time zones."
      },
      {
        "q": "Which Edstellar services do clients use?",
        "a": "Clients work with Edstellar for corporate training programs across 75 domains, learning and development consulting, organizational development consulting, training needs analysis, talent assessments, coaching and managed training services."
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
