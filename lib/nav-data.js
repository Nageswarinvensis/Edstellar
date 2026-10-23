/**
 * Mega-menu dataset for SiteHeader, generated from the launch menu design.
 * One entry per top-level tab; each opens a full-width panel with numbered link
 * groups, a live preview pane and the Edstellar 5A methodology rail.
 *
 * Per link, `pv` is the preview payload shown on hover/focus:
 *   t  title            c  breadcrumb         d  short description
 *   s  5A stages lit    f  facts (unused)     m  meta line          b  CTA label
 * Per panel, `stages` are the stages lit by default and `first` is the preview
 * shown when the panel opens.
 *
 * Hrefs mirror the design verbatim (same destinations as the live site) as
 * app-relative paths. Some targets are pages not shipped yet and 404 until they
 * land — kept by design so the menu is complete the day they do.
 *
 * A link with `href: null` has no page yet (the Platforms tab): the menus show
 * it as static text, with its preview but no link. `sub` is an optional second
 * line under the label.
 */
export const MEGA_NAV = [
  {
    "id": "consulting",
    "tab": "Consulting",
    "stages": [
      "Analyze",
      "Architect"
    ],
    "first": {
      "t": "Training needs analysis services",
      "c": "Consulting · L&D consulting",
      "d": "Skill-gap matrices and training roadmaps, built with the TNA/TNI Engine.",
      "s": [
        "Analyze"
      ],
      "f": [
        [
          "5,000+",
          "Verified trainers and experts"
        ],
        [
          "Fit first",
          "Vendor-neutral advice for your context"
        ]
      ],
      "m": "Vendor-neutral · 5,000+ verified trainers and experts",
      "b": "View service"
    },
    "groups": [
      {
        "num": "01",
        "heading": "L&D consulting",
        "links": [
          {
            "label": "Training needs analysis services",
            "href": "/training-needs-analysis-solutions",
            "main": true,
            "pv": {
              "t": "Training needs analysis services",
              "c": "Consulting · L&D consulting",
              "d": "Skill-gap matrices and training roadmaps, built with the TNA/TNI Engine.",
              "s": [
                "Analyze"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "L&D consulting services",
            "href": "/learning-development-consulting-services",
            "main": true,
            "pv": {
              "t": "L&D consulting services",
              "c": "Consulting · L&D consulting",
              "d": "Edstellar's learning and development consulting practice, from needs analysis to content and technology.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "Explore practice"
            }
          },
          {
            "label": "Learning strategy and design",
            "href": "/learning-development-consulting-services/learning-strategy-design",
            "main": false,
            "pv": {
              "t": "Learning strategy and design",
              "c": "Consulting · L&D consulting",
              "d": "How learning is planned, sequenced and governed across your organization.",
              "s": [
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Learning content development",
            "href": "/learning-development-consulting-services/learning-content-development",
            "main": false,
            "pv": {
              "t": "Learning content development",
              "c": "Consulting · L&D consulting",
              "d": "Courses, modules and materials built around your roles and goals.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Learning technology consulting",
            "href": "/learning-development-consulting-services/learning-technology",
            "main": false,
            "pv": {
              "t": "Learning technology consulting",
              "c": "Consulting · L&D consulting",
              "d": "Choosing, configuring and connecting the systems your learning runs on.",
              "s": [
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          }
        ]
      },
      {
        "num": "02",
        "heading": "OD consulting",
        "links": [
          {
            "label": "OD consulting services",
            "href": "/organizational-development-consulting",
            "main": true,
            "pv": {
              "t": "OD consulting services",
              "c": "Consulting · OD consulting",
              "d": "Edstellar's organizational development practice, from structure and leadership to culture.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "Explore practice"
            }
          },
          {
            "label": "Change management",
            "href": "/organizational-development-consulting/change-management",
            "main": false,
            "pv": {
              "t": "Change management",
              "c": "Consulting · OD consulting",
              "d": "Planning and leading the people side of organizational change.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Leadership effectiveness",
            "href": "/organizational-development-consulting/leadership-effectiveness-planning",
            "main": false,
            "pv": {
              "t": "Leadership effectiveness",
              "c": "Consulting · OD consulting",
              "d": "Strengthening how leaders lead, decide and develop their teams.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Organization design",
            "href": "/organizational-development-consulting/organization-design",
            "main": false,
            "pv": {
              "t": "Organization design",
              "c": "Consulting · OD consulting",
              "d": "Structures, roles and reporting lines designed around your strategy.",
              "s": [
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Succession planning",
            "href": "/organizational-development-consulting/succession-planning",
            "main": false,
            "pv": {
              "t": "Succession planning",
              "c": "Consulting · OD consulting",
              "d": "Building the pipeline of people ready for critical roles.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Performance management",
            "href": "/organizational-development-consulting/performance-management",
            "main": false,
            "pv": {
              "t": "Performance management",
              "c": "Consulting · OD consulting",
              "d": "How goals are set, performance is reviewed and growth is supported.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Employee engagement",
            "href": "/organizational-development-consulting/employee-engagement",
            "main": false,
            "pv": {
              "t": "Employee engagement",
              "c": "Consulting · OD consulting",
              "d": "Understanding and improving how engaged your people are.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Culture transformation",
            "href": "/organizational-development-consulting/cultural-transformation",
            "main": false,
            "pv": {
              "t": "Culture transformation",
              "c": "Consulting · OD consulting",
              "d": "Shaping the behaviors and norms your strategy depends on.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "Strategic workforce planning",
            "href": "/organizational-development-consulting/strategic-workforce-planning",
            "main": false,
            "pv": {
              "t": "Strategic workforce planning",
              "c": "Consulting · OD consulting",
              "d": "Planning the skills and roles your organization will need next.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          },
          {
            "label": "DEI consulting",
            "href": "/organizational-development-consulting/diversity-equity-inclusion",
            "main": false,
            "pv": {
              "t": "DEI consulting",
              "c": "Consulting · OD consulting",
              "d": "Diversity, equity and inclusion programs designed for your workforce.",
              "s": [
                "Analyze",
                "Architect"
              ],
              "f": [
                [
                  "5,000+",
                  "Verified trainers and experts"
                ],
                [
                  "Fit first",
                  "Vendor-neutral advice for your context"
                ]
              ],
              "m": "Vendor-neutral · 5,000+ verified trainers and experts",
              "b": "View service"
            }
          }
        ]
      },
      {
        "num": "03",
        "heading": "Talent assessment services",
        "links": [
          {
            "label": "Talent assessment services",
            "href": "/talent-assessment-services",
            "main": true,
            "pv": {
              "t": "Talent assessment services",
              "c": "Consulting · Talent assessment services",
              "d": "Edstellar's assessment practice: 13 assessment types, with the Capability Intelligence Platform bringing results into one view.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "Explore assessments"
            }
          },
          {
            "label": "Pre-employment assessment",
            "href": "/talent-assessment-services/pre-employment-assessment",
            "main": false,
            "pv": {
              "t": "Pre-employment assessment",
              "c": "Consulting · Talent assessment services",
              "d": "Evidence on candidates before you make a hiring decision.",
              "s": [
                "Assess"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Psychometric assessment",
            "href": "/talent-assessment-services/psychometric-assessment",
            "main": false,
            "pv": {
              "t": "Psychometric assessment",
              "c": "Consulting · Talent assessment services",
              "d": "Validated measures of personality, motivation and work style.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "360-degree feedback",
            "href": "/talent-assessment-services/360-degree-feedback",
            "main": false,
            "pv": {
              "t": "360-degree feedback",
              "c": "Consulting · Talent assessment services",
              "d": "Structured input from managers, peers and reports, gathered with Orbit.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Leadership assessment",
            "href": "/talent-assessment-services/leadership-assessment",
            "main": false,
            "pv": {
              "t": "Leadership assessment",
              "c": "Consulting · Talent assessment services",
              "d": "Selection, succession and development decisions, run on Zenith, Edstellar's leadership assessment.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Employee engagement survey",
            "href": "/talent-assessment-services/employee-engagement-survey",
            "main": false,
            "pv": {
              "t": "Employee engagement survey",
              "c": "Consulting · Talent assessment services",
              "d": "A structured read on engagement across teams and locations.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Skill proficiency",
            "href": "/talent-assessment-services/skill-gap-competency-assessment",
            "main": false,
            "pv": {
              "t": "Skill proficiency",
              "c": "Consulting · Talent assessment services",
              "d": "Where skills stand today against the levels each role needs.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Cognitive ability",
            "href": "/talent-assessment-services/cognitive-ability-assessment",
            "main": false,
            "pv": {
              "t": "Cognitive ability",
              "c": "Consulting · Talent assessment services",
              "d": "Reasoning and problem-solving ability, measured consistently.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Behavioral assessment",
            "href": "/talent-assessment-services/behavioral-psychological-profiling",
            "main": false,
            "pv": {
              "t": "Behavioral assessment",
              "c": "Consulting · Talent assessment services",
              "d": "How people tend to act and respond in workplace situations.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Assessment and development centers",
            "href": "/talent-assessment-services/assessment-development-centers",
            "main": false,
            "pv": {
              "t": "Assessment and development centers",
              "c": "Consulting · Talent assessment services",
              "d": "Exercises and observed tasks that show how people perform in role.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Emotional intelligence",
            "href": "/talent-assessment-services/emotional-intelligence-assessment",
            "main": false,
            "pv": {
              "t": "Emotional intelligence",
              "c": "Consulting · Talent assessment services",
              "d": "How people read and manage emotions at work.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Team effectiveness",
            "href": "/talent-assessment-services/team-effectiveness-assessment",
            "main": false,
            "pv": {
              "t": "Team effectiveness",
              "c": "Consulting · Talent assessment services",
              "d": "How a team works together, understood and strengthened with Polaris.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "Culture assessment",
            "href": "/talent-assessment-services/culture-assessment",
            "main": false,
            "pv": {
              "t": "Culture assessment",
              "c": "Consulting · Talent assessment services",
              "d": "The culture your people experience, compared with the one you intend.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          },
          {
            "label": "English proficiency",
            "href": "/talent-assessment-services/language-proficiency-assessment",
            "main": false,
            "pv": {
              "t": "English proficiency",
              "c": "Consulting · Talent assessment services",
              "d": "Workplace English measured across reading, writing, listening and speaking.",
              "s": [
                "Assess",
                "Analyze"
              ],
              "f": [
                [
                  "3",
                  "Edstellar assessment tools: Zenith, Orbit, Polaris"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "13 assessment types · Zenith, Orbit and Polaris",
              "b": "View assessment"
            }
          }
        ]
      }
    ],
    "foot": null
  },
  {
    "id": "training",
    "tab": "Corporate training",
    "stages": [
      "Activate"
    ],
    "first": {
      "t": "Artificial intelligence",
      "c": "Corporate training · Domains",
      "d": "AI programs for technical teams, managers and leaders, from GenAI to governance.",
      "s": [
        "Activate"
      ],
      "f": [
        [
          "2,000+",
          "Instructor-led programs"
        ],
        [
          "77",
          "Training domains"
        ]
      ],
      "m": "Part of 77 training domains · 2,000+ programs",
      "b": "Explore domain"
    },
    "groups": [
      {
        "num": "01",
        "heading": "Domains",
        "more": {
          "label": "View all 77 domains",
          "href": "/corporate-training"
        },
        "links": [
          {
            "label": "Artificial intelligence",
            "href": "/corporate-training/ai",
            "main": false,
            "pv": {
              "t": "Artificial intelligence",
              "c": "Corporate training · Domains",
              "d": "AI programs for technical teams, managers and leaders, from GenAI to governance.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Cybersecurity",
            "href": "/corporate-training/cybersecurity",
            "main": false,
            "pv": {
              "t": "Cybersecurity",
              "c": "Corporate training · Domains",
              "d": "Security programs from everyday awareness to specialist skills.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Strategic leadership",
            "href": "/corporate-training/leadership",
            "main": false,
            "pv": {
              "t": "Strategic leadership",
              "c": "Corporate training · Domains",
              "d": "Programs for leaders setting direction and leading change.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Soft skills",
            "href": "/corporate-training/soft-skills",
            "main": false,
            "pv": {
              "t": "Soft skills",
              "c": "Corporate training · Domains",
              "d": "Communication, collaboration and the everyday skills of good work.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Data analysis",
            "href": "/corporate-training",
            "main": false,
            "pv": {
              "t": "Data analysis",
              "c": "Corporate training · Domains",
              "d": "Turning data into decisions with the tools your teams already use.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Cloud infrastructure",
            "href": "/corporate-training",
            "main": false,
            "pv": {
              "t": "Cloud infrastructure",
              "c": "Corporate training · Domains",
              "d": "Building and running workloads on AWS, Azure and Google Cloud.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Agile",
            "href": "/corporate-training/agile",
            "main": false,
            "pv": {
              "t": "Agile",
              "c": "Corporate training · Domains",
              "d": "Agile ways of working for delivery teams and their managers.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Risk management",
            "href": "/corporate-training/risk-management",
            "main": false,
            "pv": {
              "t": "Risk management",
              "c": "Corporate training · Domains",
              "d": "Identifying, assessing and managing risk across the business.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Product management",
            "href": "/corporate-training/product-management",
            "main": false,
            "pv": {
              "t": "Product management",
              "c": "Corporate training · Domains",
              "d": "Programs for product managers and the teams around them.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          },
          {
            "label": "Environmental sustainability",
            "href": "/corporate-training",
            "main": false,
            "pv": {
              "t": "Environmental sustainability",
              "c": "Corporate training · Domains",
              "d": "Sustainability programs for operations, strategy and reporting teams.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Part of 77 training domains · 2,000+ programs",
              "b": "Explore domain"
            }
          }
        ]
      },
      {
        "num": "02",
        "heading": "Popular courses",
        "more": {
          "label": "View all 2,000+ instructor-led training courses",
          "href": "/corporate-training-catalog"
        },
        "links": [
          {
            "label": "Generative AI",
            "href": "/corporate-training/ai/generative-ai-course",
            "main": false,
            "pv": {
              "t": "Generative AI",
              "c": "Corporate training · Popular courses",
              "d": "How generative AI works and where it fits in your teams' daily work.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Agentic AI",
            "href": "/corporate-training/ai/agentic-ai-course",
            "main": false,
            "pv": {
              "t": "Agentic AI",
              "c": "Corporate training · Popular courses",
              "d": "Designing and governing AI agents that carry out multi-step tasks.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "ChatGPT prompt engineering",
            "href": "/corporate-training/ai/prompt-context-engineering-for-enterprise-teams-course",
            "main": false,
            "pv": {
              "t": "ChatGPT prompt engineering",
              "c": "Corporate training · Popular courses",
              "d": "Writing prompts that get reliable, useful results from ChatGPT.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "AI governance",
            "href": "/corporate-training/ai/ai-governance-course",
            "main": false,
            "pv": {
              "t": "AI governance",
              "c": "Corporate training · Popular courses",
              "d": "Policies, controls and accountability for using AI responsibly.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Leadership in the age of AI",
            "href": "/corporate-training/leadership/leadership-in-the-age-of-ai-course",
            "main": false,
            "pv": {
              "t": "Leadership in the age of AI",
              "c": "Corporate training · Popular courses",
              "d": "Leading people and decisions as AI changes how work gets done.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Emotional intelligence in leadership",
            "href": "/corporate-training/leadership/emotional-intelligence-for-leaders-course",
            "main": false,
            "pv": {
              "t": "Emotional intelligence in leadership",
              "c": "Corporate training · Popular courses",
              "d": "Self-awareness and empathy as everyday leadership skills.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Transformational leadership",
            "href": "/corporate-training/leadership/transformational-leadership-course",
            "main": false,
            "pv": {
              "t": "Transformational leadership",
              "c": "Corporate training · Popular courses",
              "d": "Leading teams through change with a clear, shared purpose.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Change management for GenAI adoption",
            "href": "/corporate-training/ai/ai-change-management-workforce-transformation-course",
            "main": false,
            "pv": {
              "t": "Change management for GenAI adoption",
              "c": "Corporate training · Popular courses",
              "d": "Bringing people along as generative AI tools are rolled out.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Influential communication",
            "href": "/corporate-training/leadership/executive-communication-influence-course",
            "main": false,
            "pv": {
              "t": "Influential communication",
              "c": "Corporate training · Popular courses",
              "d": "Communicating so that ideas are heard, trusted and acted on.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          },
          {
            "label": "Collaboration skills",
            "href": "/corporate-training/soft-skills/collaboration-in-hybrid-ai-augmented-teams-course",
            "main": false,
            "pv": {
              "t": "Collaboration skills",
              "c": "Corporate training · Popular courses",
              "d": "Working well across teams, functions and locations.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Instructor-led · On-site, virtual or blended",
              "b": "View program"
            }
          }
        ]
      },
      {
        "num": "03",
        "heading": "Plan your training",
        "links": [
          {
            "label": "Training catalog",
            "href": "/corporate-training-catalog",
            "main": false,
            "pv": {
              "t": "Training catalog",
              "c": "Corporate training · Plan your training",
              "d": "The full catalog of Edstellar programs, ready to browse by domain.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "2,000+ instructor-led programs across 77 domains",
              "b": "Browse the catalog"
            }
          },
          {
            "label": "Pricing",
            "href": "/corporate-training-pricing",
            "main": false,
            "pv": {
              "t": "Pricing",
              "c": "Corporate training · Plan your training",
              "d": "How Edstellar prices corporate training programs.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "2,000+ instructor-led programs across 77 domains",
              "b": "See pricing"
            }
          },
          {
            "label": "Submit your RFP",
            "href": "/request-for-proposal",
            "main": false,
            "pv": {
              "t": "Submit your RFP",
              "c": "Corporate training · Plan your training",
              "d": "Share your requirements and Edstellar prepares a formal proposal.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "2,000+",
                  "Instructor-led programs"
                ],
                [
                  "77",
                  "Training domains"
                ]
              ],
              "m": "Proposals within 15 working days after clarifications",
              "b": "Send your RFP"
            }
          }
        ]
      }
    ],
    "foot": {
      "label": "Browse all corporate training",
      "href": "/corporate-training"
    }
  },
  {
    "id": "coaching",
    "tab": "Coaching",
    "stages": [
      "Activate"
    ],
    "first": {
      "t": "Coaching solutions",
      "c": "Coaching · Edstellar coaching",
      "d": "Edstellar coaching, with Meridian connecting leaders and certified coaches.",
      "s": [
        "Activate"
      ],
      "f": [
        [
          "ICF · ICC · EMCC",
          "Certified coaches"
        ],
        [
          "Meridian",
          "Virtual one-on-one coaching"
        ]
      ],
      "m": "Meridian connects leaders with certified coaches",
      "b": "Explore coaching"
    },
    "groups": [
      {
        "num": "01",
        "heading": "Edstellar coaching",
        "links": [
          {
            "label": "Coaching solutions",
            "href": "/coaching-solutions",
            "main": true,
            "pv": {
              "t": "Coaching solutions",
              "c": "Coaching · Edstellar coaching",
              "d": "Edstellar coaching, with Meridian connecting leaders and certified coaches.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Meridian connects leaders with certified coaches",
              "b": "Explore coaching"
            }
          }
        ],
        "intro": "One-on-one and team coaching with certified coaches, matched to each leader's goals."
      },
      {
        "num": "02",
        "heading": "Coaching for leaders",
        "links": [
          {
            "label": "Executive coaching",
            "href": "/coaching-solutions/executive-coaching",
            "main": false,
            "pv": {
              "t": "Executive coaching",
              "c": "Coaching · Coaching for leaders",
              "d": "One-on-one coaching for senior executives.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Coaches certified by ICF, ICC or EMCC",
              "b": "View coaching"
            }
          },
          {
            "label": "Leadership coaching",
            "href": "/coaching-solutions/leadership-coaching",
            "main": false,
            "pv": {
              "t": "Leadership coaching",
              "c": "Coaching · Coaching for leaders",
              "d": "Coaching that develops leaders at every level.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Coaches certified by ICF, ICC or EMCC",
              "b": "View coaching"
            }
          },
          {
            "label": "First-time manager coaching",
            "href": "/coaching-solutions/first-time-manager-coaching",
            "main": false,
            "pv": {
              "t": "First-time manager coaching",
              "c": "Coaching · Coaching for leaders",
              "d": "Support for people stepping into their first management role.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Coaches certified by ICF, ICC or EMCC",
              "b": "View coaching"
            }
          }
        ]
      },
      {
        "num": "03",
        "heading": "Change and performance",
        "links": [
          {
            "label": "Career transition coaching",
            "href": "/coaching-solutions/career-transition-coaching",
            "main": false,
            "pv": {
              "t": "Career transition coaching",
              "c": "Coaching · Change and performance",
              "d": "Coaching through a move into a new role, function or stage.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Coaches certified by ICF, ICC or EMCC",
              "b": "View coaching"
            }
          },
          {
            "label": "Performance coaching",
            "href": "/coaching-solutions/performance-coaching",
            "main": false,
            "pv": {
              "t": "Performance coaching",
              "c": "Coaching · Change and performance",
              "d": "Coaching focused on specific performance goals.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Coaches certified by ICF, ICC or EMCC",
              "b": "View coaching"
            }
          },
          {
            "label": "Team coaching",
            "href": "/coaching-solutions/team-coaching",
            "main": false,
            "pv": {
              "t": "Team coaching",
              "c": "Coaching · Change and performance",
              "d": "Coaching a team together on how it works and decides.",
              "s": [
                "Activate"
              ],
              "f": [
                [
                  "ICF · ICC · EMCC",
                  "Certified coaches"
                ],
                [
                  "Meridian",
                  "Virtual one-on-one coaching"
                ]
              ],
              "m": "Coaches certified by ICF, ICC or EMCC",
              "b": "View coaching"
            }
          }
        ]
      }
    ],
    "foot": null
  },
  {
    "id": "managed",
    "tab": "Managed learning",
    "stages": [
      "Activate",
      "Advance"
    ],
    "first": {
      "t": "Managed learning services",
      "c": "Managed learning · L&D outsourcing",
      "d": "L&D outsourcing: your learning operations run end to end by Edstellar, from planning to reporting.",
      "s": [
        "Activate",
        "Advance"
      ],
      "f": [
        [
          "1",
          "Dedicated client success manager per account"
        ],
        [
          "ISO 9001:2015",
          "Quality management"
        ]
      ],
      "m": "One dedicated client success manager per account",
      "b": "Explore managed learning"
    },
    "groups": [
      {
        "num": "01",
        "heading": "L&D outsourcing",
        "links": [
          {
            "label": "Managed learning services",
            "href": "/managed-learning-services",
            "main": true,
            "pv": {
              "t": "Managed learning services",
              "c": "Managed learning · L&D outsourcing",
              "d": "L&D outsourcing: your learning operations run end to end by Edstellar, from planning to reporting.",
              "s": [
                "Activate",
                "Advance"
              ],
              "f": [
                [
                  "1",
                  "Dedicated client success manager per account"
                ],
                [
                  "ISO 9001:2015",
                  "Quality management"
                ]
              ],
              "m": "One dedicated client success manager per account",
              "b": "Explore managed learning"
            }
          }
        ],
        "intro": "L&D outsourcing: Edstellar runs your learning operations end to end, from planning and vendors to delivery and reporting."
      },
      {
        "num": "02",
        "heading": "Managed training",
        "links": [
          {
            "label": "Managed training services",
            "href": "/managed-learning-services/managed-training",
            "main": true,
            "pv": {
              "t": "Managed training services",
              "c": "Managed learning · Managed training",
              "d": "Edstellar runs your training operations, from calendar to reporting.",
              "s": [
                "Activate",
                "Advance"
              ],
              "f": [
                [
                  "1",
                  "Dedicated client success manager per account"
                ],
                [
                  "ISO 9001:2015",
                  "Quality management"
                ]
              ],
              "m": "One dedicated client success manager per account",
              "b": "View service"
            }
          }
        ]
      },
      {
        "num": "03",
        "heading": "Working with Edstellar",
        "links": [
          {
            "label": "Client experience",
            "href": "/exceptional-customer-experience",
            "main": false,
            "pv": {
              "t": "Client experience",
              "c": "Managed learning · Working with Edstellar",
              "d": "One partner from brief to results, with a dedicated client success manager.",
              "s": [
                "Activate",
                "Advance"
              ],
              "f": [
                [
                  "1",
                  "Dedicated client success manager per account"
                ],
                [
                  "ISO 9001:2015",
                  "Quality management"
                ]
              ],
              "m": "One dedicated client success manager per account",
              "b": "See the experience"
            }
          },
          {
            "label": "Success stories",
            "href": "/success-stories",
            "main": false,
            "pv": {
              "t": "Success stories",
              "c": "Managed learning · Working with Edstellar",
              "d": "Client engagements and what changed.",
              "s": [
                "Activate",
                "Advance"
              ],
              "f": [
                [
                  "1",
                  "Dedicated client success manager per account"
                ],
                [
                  "ISO 9001:2015",
                  "Quality management"
                ]
              ],
              "m": "One dedicated client success manager per account",
              "b": "Read the stories"
            }
          },
          {
            "label": "Submit your RFP",
            "href": "/request-for-proposal",
            "main": false,
            "pv": {
              "t": "Submit your RFP",
              "c": "Managed learning · Working with Edstellar",
              "d": "Share your requirements and Edstellar prepares a formal proposal.",
              "s": [
                "Activate",
                "Advance"
              ],
              "f": [
                [
                  "1",
                  "Dedicated client success manager per account"
                ],
                [
                  "ISO 9001:2015",
                  "Quality management"
                ]
              ],
              "m": "Proposals within 15 working days after clarifications",
              "b": "Send your RFP"
            }
          }
        ]
      }
    ],
    "foot": null
  },
  {
    "id": "tools",
    "tab": "Platforms",
    "stages": [],
    "first": {
      "t": "Spectra LMS",
      "c": "Platform · For the whole organization",
      "d": "Hosts, delivers and tracks learning across the organization.",
      "s": [],
      "f": [],
      "m": "",
      "b": "Explore Spectra LMS"
    },
    "groups": [
      {
        "num": "01",
        "heading": "Platforms and tools",
        "intro": "Platforms for the whole organization and tools for selected leaders, teams and employees, from the first diagnostic to the measured result.",
        "links": [
          {
            "label": "Edstellar Platforms and Tools",
            "href": null,
            "main": true,
            "pv": {
              "t": "Edstellar Platforms and Tools",
              "c": "Platforms · Edstellar",
              "d": "Platforms for the whole organization and tools for selected leaders, teams and employees.",
              "s": [],
              "f": [],
              "m": "",
              "b": ""
            }
          }
        ]
      },
      {
        "num": "02",
        "heading": "Platforms",
        "links": [
          {
            "label": "Spectra LMS",
            "href": null,
            "main": false,
            "sub": "Learning management",
            "pv": {
              "t": "Spectra LMS",
              "c": "Platform · For the whole organization",
              "d": "Hosts, delivers and tracks learning across the organization.",
              "s": [],
              "f": [],
              "m": "",
              "b": "Explore Spectra LMS"
            }
          },
          {
            "label": "Capability Intelligence Platform",
            "href": null,
            "main": false,
            "sub": "Capability analytics",
            "pv": {
              "t": "Capability Intelligence Platform",
              "c": "Platform · For the whole organization",
              "d": "One live view of workforce capability from assessment and psychometric results.",
              "s": [
                "Assess",
                "Analyze",
                "Advance"
              ],
              "f": [],
              "m": "",
              "b": "Explore CIP"
            }
          },
          {
            "label": "TNA/TNI Engine",
            "href": null,
            "main": false,
            "sub": "Skill-gap analysis",
            "pv": {
              "t": "TNA/TNI Engine",
              "c": "Platform · For the whole organization",
              "d": "Turns employee, job-description and skills data into skill-gap matrices and training roadmaps.",
              "s": [
                "Analyze"
              ],
              "f": [],
              "m": "",
              "b": "Explore the TNA/TNI Engine"
            }
          }
        ]
      },
      {
        "num": "03",
        "heading": "Tools",
        "links": [
          {
            "label": "Zenith",
            "href": null,
            "main": false,
            "sub": "Leadership assessment",
            "pv": {
              "t": "Zenith",
              "c": "Tool · For selected leaders, teams and employees",
              "d": "Edstellar's own leadership assessment for selection, succession and development decisions.",
              "s": [
                "Analyze"
              ],
              "f": [],
              "m": "",
              "b": "Explore Zenith"
            }
          },
          {
            "label": "Orbit",
            "href": null,
            "main": false,
            "sub": "360-degree feedback",
            "pv": {
              "t": "Orbit",
              "c": "Tool · For selected leaders, teams and employees",
              "d": "Edstellar's 360-degree feedback tool, gathering structured input from managers, peers and reports.",
              "s": [
                "Analyze"
              ],
              "f": [],
              "m": "",
              "b": "Explore Orbit"
            }
          },
          {
            "label": "Polaris",
            "href": null,
            "main": false,
            "sub": "Team effectiveness",
            "pv": {
              "t": "Polaris",
              "c": "Tool · For selected leaders, teams and employees",
              "d": "Edstellar's team intervention tool for understanding and strengthening how teams work together.",
              "s": [
                "Analyze",
                "Activate"
              ],
              "f": [],
              "m": "",
              "b": "Explore Polaris"
            }
          },
          {
            "label": "Meridian",
            "href": null,
            "main": false,
            "sub": "Virtual coaching",
            "pv": {
              "t": "Meridian",
              "c": "Tool · For selected leaders, teams and employees",
              "d": "AI-assisted virtual one-on-one coaching that connects leaders with certified coaches.",
              "s": [
                "Activate"
              ],
              "f": [],
              "m": "",
              "b": "Explore Meridian"
            }
          }
        ]
      }
    ],
    "foot": null
  },
  {
    "id": "company",
    "tab": "Company",
    "full": true,
    "stages": [],
    "first": {
      "t": "About us",
      "c": "Company · About Edstellar",
      "d": "Who Edstellar is and how it works with clients.",
      "s": [],
      "f": [
        [
          "ISO 9001:2015",
          "Quality management"
        ],
        [
          "ISO 27001:2022",
          "Information security"
        ]
      ],
      "m": "ISO 9001:2015 and ISO 27001:2022 certified",
      "b": "About Edstellar"
    },
    "groups": [
      {
        "num": "01",
        "heading": "About Edstellar",
        "links": [
          {
            "label": "About us",
            "href": "/about-us",
            "main": false,
            "pv": {
              "t": "About us",
              "c": "Company · About Edstellar",
              "d": "Who Edstellar is and how it works with clients.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "About Edstellar"
            }
          },
          {
            "label": "Clients",
            "href": "/clients",
            "main": false,
            "pv": {
              "t": "Clients",
              "c": "Company · About Edstellar",
              "d": "The organizations Edstellar works with.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "See clients"
            }
          },
          {
            "label": "Success stories",
            "href": "/success-stories",
            "main": false,
            "pv": {
              "t": "Success stories",
              "c": "Company · About Edstellar",
              "d": "Client engagements and what changed.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "Read the stories"
            }
          },
          {
            "label": "Client experience",
            "href": "/exceptional-customer-experience",
            "main": false,
            "pv": {
              "t": "Client experience",
              "c": "Company · About Edstellar",
              "d": "What working with Edstellar is like, from brief to results.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "See the experience"
            }
          },
          {
            "label": "Leadership retreats",
            "href": "/leadership-retreats",
            "main": false,
            "pv": {
              "t": "Leadership retreats",
              "c": "Company · About Edstellar",
              "d": "Invite-only retreats for CXOs and senior leaders, designed around each group by Imperium by Edstellar.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "By invitation · Imperium by Edstellar",
              "b": "Explore leadership retreats"
            }
          }
        ]
      },
      {
        "num": "02",
        "heading": "Who we serve",
        "links": [
          {
            "label": "Who we serve",
            "href": "/who-we-serve",
            "main": false,
            "pv": {
              "t": "Who we serve",
              "c": "Company · Who we serve",
              "d": "The organizations Edstellar works with, and how each engagement is shaped.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "See who we serve"
            }
          },
          {
            "label": "Enterprises",
            "href": "/who-we-serve",
            "main": false,
            "pv": {
              "t": "Enterprises",
              "c": "Company · Who we serve",
              "d": "Training and capability programs for large organizations.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "View sector"
            }
          },
          {
            "label": "Universities",
            "href": "/training-for-universities",
            "main": false,
            "pv": {
              "t": "Universities",
              "c": "Company · Who we serve",
              "d": "Programs for universities, faculty and students.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "View sector"
            }
          },
          {
            "label": "Government",
            "href": "/government-employees-training-courses",
            "main": false,
            "pv": {
              "t": "Government",
              "c": "Company · Who we serve",
              "d": "Training for government departments and public-sector employees.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "View sector"
            }
          },
          {
            "label": "Manufacturing",
            "href": "/who-we-serve",
            "main": false,
            "pv": {
              "t": "Manufacturing",
              "c": "Company · Who we serve",
              "d": "Capability programs for manufacturing organizations.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "View industry"
            }
          },
          {
            "label": "Automotive",
            "href": "/who-we-serve",
            "main": false,
            "pv": {
              "t": "Automotive",
              "c": "Company · Who we serve",
              "d": "Capability programs for automotive organizations.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "View industry"
            }
          },
          {
            "label": "Banking",
            "href": "/who-we-serve",
            "main": false,
            "pv": {
              "t": "Banking",
              "c": "Company · Who we serve",
              "d": "Capability programs for banks and financial institutions.",
              "s": [],
              "f": [
                [
                  "100+",
                  "Countries"
                ],
                [
                  "10+",
                  "Languages"
                ]
              ],
              "m": "100+ countries · 10+ languages",
              "b": "View industry"
            }
          }
        ]
      },
      {
        "num": "03",
        "heading": "Work with Edstellar",
        "links": [
          {
            "label": "Partner with Edstellar",
            "href": "/partner-program",
            "main": false,
            "pv": {
              "t": "Partner with Edstellar",
              "c": "Company · Work with Edstellar",
              "d": "Join the Edstellar partner program.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "Become a partner"
            }
          },
          {
            "label": "Become a trainer",
            "href": "/trainer-platform",
            "main": false,
            "pv": {
              "t": "Become a trainer",
              "c": "Company · Work with Edstellar",
              "d": "Join Edstellar's network of trainers and experts.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "View page"
            }
          },
          {
            "label": "Careers",
            "href": "/careers",
            "main": false,
            "pv": {
              "t": "Careers",
              "c": "Company · Work with Edstellar",
              "d": "Open roles at Edstellar.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "See open roles"
            }
          },
          {
            "label": "Submit your RFP",
            "href": "/request-for-proposal",
            "main": false,
            "pv": {
              "t": "Submit your RFP",
              "c": "Company · Work with Edstellar",
              "d": "Send your RFP to Edstellar.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "Proposals within 15 working days after clarifications",
              "b": "Send your RFP"
            }
          },
          {
            "label": "Contact us",
            "href": "/contact-us",
            "main": false,
            "pv": {
              "t": "Contact us",
              "c": "Company · Work with Edstellar",
              "d": "Reach the Edstellar team.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "Contact Edstellar"
            }
          }
        ]
      },
      {
        "num": "04",
        "heading": "Resources",
        "links": [
          {
            "label": "L&D resources",
            "href": "/learning-development-resources",
            "main": true,
            "pv": {
              "t": "L&D resources",
              "c": "Company · Resources",
              "d": "Edstellar's library of guides, recordings and tools for L&D teams.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "Explore practice"
            }
          },
          {
            "label": "Blog",
            "href": "/blog",
            "main": false,
            "pv": {
              "t": "Blog",
              "c": "Company · Resources",
              "d": "Articles on learning, development and workforce capability.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "Read the blog"
            }
          },
          {
            "label": "Case studies",
            "href": "/case-studies",
            "main": false,
            "pv": {
              "t": "Case studies",
              "c": "Company · Resources",
              "d": "How enterprises built capability with Edstellar.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "View case studies"
            }
          },
          {
            "label": "L&D templates",
            "href": "/learning-development-templates",
            "main": false,
            "pv": {
              "t": "L&D templates",
              "c": "Company · Resources",
              "d": "Ready-to-use templates for planning and running learning.",
              "s": [],
              "f": [
                [
                  "ISO 9001:2015",
                  "Quality management"
                ],
                [
                  "ISO 27001:2022",
                  "Information security"
                ]
              ],
              "m": "ISO 9001:2015 and ISO 27001:2022 certified",
              "b": "View page"
            }
          }
        ]
      }
    ],
    "foot": null
  }
];

/** The Edstellar 5A methodology, shown as the panel rail. */
export const MEGA_STAGES = [
  {
    "num": "01",
    "name": "Assess"
  },
  {
    "num": "02",
    "name": "Analyze"
  },
  {
    "num": "03",
    "name": "Architect"
  },
  {
    "num": "04",
    "name": "Activate"
  },
  {
    "num": "05",
    "name": "Advance"
  }
];

/** "Build your brief" composer: the sentence slots and their options. */
export const BRIEF = {
  "slots": [
    {
      "k": "service",
      "label": "Service",
      "ph": "a service",
      "options": [
        {
          "v": "tna",
          "label": "a training needs analysis"
        },
        {
          "v": "training",
          "label": "corporate training"
        },
        {
          "v": "assess",
          "label": "talent assessments"
        },
        {
          "v": "coaching",
          "label": "coaching"
        },
        {
          "v": "ld",
          "label": "L&D consulting"
        },
        {
          "v": "od",
          "label": "organizational development"
        },
        {
          "v": "managed",
          "label": "managed training"
        }
      ]
    },
    {
      "k": "who",
      "label": "Who it is for",
      "ph": "our people",
      "options": [
        {
          "v": "leaders",
          "label": "our senior leaders"
        },
        {
          "v": "managers",
          "label": "first-time managers"
        },
        {
          "v": "team",
          "label": "a specific team"
        },
        {
          "v": "sales",
          "label": "our sales teams"
        },
        {
          "v": "tech",
          "label": "our technology teams"
        },
        {
          "v": "all",
          "label": "the whole workforce"
        },
        {
          "v": "uni",
          "label": "a university"
        },
        {
          "v": "gov",
          "label": "a government department"
        }
      ]
    },
    {
      "k": "where",
      "label": "Where",
      "ph": "a location",
      "options": [
        {
          "v": "one",
          "label": "one location"
        },
        {
          "v": "several",
          "label": "several locations"
        },
        {
          "v": "countries",
          "label": "several countries"
        },
        {
          "v": "virtual",
          "label": "virtual sessions"
        }
      ]
    }
  ],
  "privacyHref": "/privacy-policy"
};
