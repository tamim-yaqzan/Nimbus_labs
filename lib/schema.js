'use strict';

/**
 * Site content schema v2.
 *
 * v2 is additive: every v1 key (meta, products[], services[], homepage{}) is
 * preserved untouched, and the new sections (site, pages) are layered on top.
 * migrate() deep-merges the defaults into existing content so an old
 * site-content.json gains the new keys without losing a single edited value.
 */

const SCHEMA_VERSION = 2;

// Fields that hold authored HTML. They are sanitized on save and rendered
// with the |safe filter.
const RICH_TEXT_PATHS = [
  'pages.explore.closing.title',
  'pages.audit.hero.title',
  'pages.audit.contact.heading',
  'pages.home.hero.title',
  'services'
];

function defaultContent() {
  return {
    schemaVersion: SCHEMA_VERSION,

    meta: {
      kicker: 'FIELD CATALOGUE — 2026',
      titleLineOne: 'SOLUTIONS',
      titleLineTwo: 'TAILORED FOR PROBLEM SOLVING',
      lead: 'Do not pay for the whole software, pay for your problem.',
      productsCount: 5,
      servicesCount: 5,
      note: 'Verified catalogue'
    },

    // Shared across every page: navigation, footer and contact details.
    site: {
      brand: 'AI Labs by Nimbus',

      // Header chrome repeated on every page (logo, nav, CTA, mobile menu).
      header: {
        logoImage: './assets/logo_tight.png',
        logoAlt: 'AI Labs by Nimbus',
        logoText: 'NIMBUS',
        logoSub: '/ AI LABS',
        logoHref: './',
        logoAriaLabel: 'AI Labs by Nimbus — Home',
        navAriaLabel: 'Main Navigation',
        mobileNavAriaLabel: 'Mobile Navigation',
        contactBtnText: 'Book Audit',
        menuBtnLabel: 'Open mobile menu',
        preloaderLogo: './assets/logo_tight.png',
        preloaderLogoAlt: 'AI Labs by Nimbus',
        // `active` maps a page key to the state of the item on that page, so
        // one shared list can highlight its own entry per page.
        nav: [
          { id: 'products', label: 'Products', href: './explore', active: { home: false, explore: true, audit: false } },
          { id: 'services', label: 'Audits and services', href: './services', active: { home: false, explore: false, audit: true } }
        ]
      },

      // Static asset links shared by every page.
      assets: {
        manifest: './manifest.webmanifest',
        favicon: './assets/logo_tight.png',
        appleTouchIcon: './assets/icon-192.png',
        appleAppTitle: 'Nimbus Labs',
        ogImage: './assets/logo.png'
      },
      footerGroups: [
        {
          "title": "EXPLORE",
          "links": [
            {
              "label": "Products",
              "href": "#products"
            },
            {
              "label": "Audits & Services",
              "href": "./services"
            },
            {
              "label": "Home",
              "href": "./"
            }
          ]
        },
        {
          "title": "COMPANY",
          "links": [
            {
              "label": "What We Do",
              "href": "./#dapper"
            },
            {
              "label": "Book Audit",
              "href": "./services#contact"
            },
            {
              "label": "Contact",
              "href": "mailto:contact@ailabsnimbus.com",
              "external": true
            }
          ]
        }
      ],
      footer: {
        "brandTitle": "AI Labs by Nimbus",
        "brandDesc": "Enterprise AI, custom AI software, cloud and self-hosted AI, and OSINT & SOCMINT solutions, built around how your team works.",
        "brandLogo": "./assets/logo_tight.png",
        "copyrightYear": 2026,
        "copyrightText": "© 2026 AI Labs by Nimbus. All rights reserved.",
        "copyrightSuffix": "· Enterprise AI, Software & Intelligence Solutions.",
        "talkHeading": "Let’s build what you actually need.",
        "ctaText": "Book Diagnostic Audit",
        "email": "contact@ailabsnimbus.com",
        "emailHref": "mailto:contact@ailabsnimbus.com",
        "note": "Talk directly to the engineers who will build your system.",
        "locationBadge": "Our Office",
        "locationCity": "Dhaka, Bangladesh",
        "locationAddressLine1": "Gulshan 2, Dhaka 1212",
        "locationAddressLine2": "Bangladesh",
        "navAriaLabel": "Footer Nav",
        "legal": [],
        "statusText": "All Global Nimbus Clusters Operational",
        "tel": "+1 (415) 890-AI-LABS · Sovereign Consultations",
        "telHref": "tel:+14158902452",
        "nav": [
          {
            "label": "Solutions",
            "href": "./explore"
          },
          {
            "label": "Services & Audit",
            "href": "./services"
          },
          {
            "label": "Methodology",
            "href": "#methodology"
          },
          {
            "label": "Industries",
            "href": "#services-industries"
          },
          {
            "label": "What We Do",
            "href": "./#dapper"
          }
        ],
        "locationAddress": "Gulshan 2, Dhaka 1212\nBangladesh"
      }
    },

    products: [
      {
        id: 'product-01',
        label: 'Nimbus Horizon',
        badge: 'Flagship Architecture',
        category: 'Autonomous Systems & Infrastructure',
        status: 'Active Programme',
        summary: 'Frontier computational foundation and autonomous problem-solving architecture.',
        description: 'Nimbus Horizon delivers dedicated, mission-critical autonomous intelligence. Rather than paying enterprise licenses for bloated generic software suites, Horizon isolates the core bottleneck and runs precision agents targeted exclusively at solving that problem.',
        features: [
          'Autonomous task decomposition & dependency resolution',
          'Real-time neural synthesis & deterministic verification',
          'Direct problem-targeted compute allocation',
          'Self-healing orchestration workflows'
        ],
        link: '#contact',
        image: './assets/explore/supercomputer.jpg',
        theme: 'plum',
        bg: '#2f122e',
        contrast: 'dark',
        visual: {
          palette: ['#6459e8', '#5eead4', '#f43f5e'],
          pattern: 'orbit',
          glyph: 'HORIZON'
        }
      },
      {
        id: 'product-02',
        label: 'Frontier Reasoning Core',
        badge: 'Cognitive Engine',
        category: 'Synthetic Intelligence & Reasoning Engines',
        status: 'Active Programme',
        summary: 'Deep logical synthesis engine engineered for complex operational decisions.',
        description: 'Bypasses standard pattern prediction in favor of continuous step-by-step cognitive deduction. Solves domain-specific analytical problems where off-the-shelf LLMs hallucinate or fail.',
        features: [
          'Formal symbolic verification & proof loops',
          'Multi-hop causal reasoning trees',
          'Zero-hallucination domain guardrails',
          'Deterministic structured execution'
        ],
        link: '#contact',
        image: './assets/explore/neural.jpg',
        theme: 'rose',
        bg: '#e25c80',
        contrast: 'dark',
        visual: {
          palette: ['#5eead4', '#6459e8', '#2f122e'],
          pattern: 'contour',
          glyph: 'REASONING'
        }
      },
      {
        id: 'product-03',
        label: 'Autonomous Swarm Fabric',
        badge: 'Distributed Systems',
        category: 'Decentralized Multi-Agent Systems',
        status: 'In Deployment',
        summary: 'Cooperative multi-agent mesh delivering coordinated task execution at scale.',
        description: 'Enables hundreds of specialized agents to negotiate, distribute tasks, and solve complex business operations concurrently with consensus-driven output.',
        features: [
          'Decentralized peer-to-peer agent consensus',
          'Dynamic load-balancing & role handoffs',
          'Fault-tolerant state checkpoints',
          'Sub-second inter-agent messaging'
        ],
        link: '#contact',
        image: './assets/explore/server.jpg',
        theme: 'violet',
        bg: '#6459e8',
        contrast: 'dark',
        visual: {
          palette: ['#e25c80', '#a855f7', '#020016'],
          pattern: 'aurora',
          glyph: 'SWARMS'
        }
      },
      {
        id: 'product-04',
        label: 'Synthetic Intelligence Matrix',
        badge: 'Enterprise Platform',
        category: 'Enterprise Cognitive Deployment',
        status: 'In Design',
        summary: 'On-premise secure cognitive layer directly mapped to your private operational data.',
        description: 'Integrates natively into your private infrastructure to analyze, model, and automate proprietary workflows without sending internal data to public multi-tenant clouds.',
        features: [
          'Zero-leak air-gapped deployment architecture',
          'Native integration with legacy data stores',
          'Custom specialized fine-tuned adapter weights',
          'Audit-grade compliance & telemetry'
        ],
        link: '#contact',
        image: './assets/explore/technology.jpg',
        theme: 'cognition',
        bg: '#fcf7f8',
        contrast: 'light',
        visual: {
          palette: ['#7c72ff', '#5eead4', '#05021a'],
          pattern: 'grid',
          glyph: 'MATRIX'
        }
      },
      {
        id: 'product-05',
        label: 'Quantum-Edge Protocol',
        badge: 'Low-Latency Compute',
        category: 'Edge & Accelerated Infrastructure',
        status: 'Exploration',
        summary: 'Ultra-low latency micro-models engineered for sub-millisecond edge execution.',
        description: 'Stripped-down, quantized neural runtimes designed for edge devices, embedded controllers, and instant sub-millisecond response loops.',
        features: [
          '4-bit & 2-bit quantized neural weights',
          'Direct hardware accelerator kernel compilation',
          'Sub-5ms inference turnaround',
          'Offline-first sovereign edge autonomy'
        ],
        link: '#contact',
        image: './assets/explore/abstract.jpg',
        theme: 'midnight',
        bg: '#020016',
        contrast: 'dark',
        visual: {
          palette: ['#f8b4c4', '#e25c80', '#6459e8'],
          pattern: 'pulse',
          glyph: 'EDGE-AI'
        }
      }
    ],

    // Services carry both the catalogue fields used by /explore and the
    // richer card fields used by the services & audit page.
    services: [
      {
        "id": "service-01",
        "label": "Service 01",
        "kicker": "01 / ENTERPRISE AI",
        "title": "Enterprise AI Solutions",
        "summary": "AI built into your operations: workflow automation, copilots and decision support for your teams.",
        "detail": "We study how your teams work, find the tasks where AI saves the most time or money, and build it into the tools they already use.",
        "text": "We start by learning how your teams actually work. Then we find the processes where AI will make a real difference, such as answering customer questions, processing documents or preparing reports, and build assistants and automations that fit into the tools your people already use.",
        "features": [
          "Workflow automation",
          "Team copilots & assistants",
          "Decision support & reporting"
        ],
        "capabilities": [
          "Workflow Automation",
          "Internal Knowledge Assistants",
          "Document Processing",
          "Customer Support Copilots",
          "Reporting & Decision Support",
          "ERP & CRM Integrations"
        ],
        "image": "./assets/explore/supercomputer.jpg",
        "figure": "orbs",
        "accent": "#6459e8"
      },
      {
        "id": "service-02",
        "label": "Service 02",
        "kicker": "02 / AI SOFTWARE",
        "title": "AI Software Development",
        "summary": "Custom AI-powered apps, agents and integrations, from prototype to production.",
        "detail": "We design and build AI-powered web and mobile apps, agents and integrations, and take them from first prototype to production.",
        "text": "Need a product that does not exist off the shelf? We design and build custom AI software: web and mobile apps, AI agents, chatbots and integrations with your existing systems. We start with a working prototype, test it with real users, then take it to production.",
        "features": [
          "Custom AI apps",
          "AI agents & chatbots",
          "API & system integrations"
        ],
        "capabilities": [
          "Web & Mobile AI Apps",
          "AI Agents & Chatbots",
          "LLM & API Integrations",
          "Retrieval Over Your Data (RAG)",
          "Prototype to Production",
          "Testing & Maintenance"
        ],
        "image": "./assets/explore/neural.jpg",
        "figure": "flatCircles",
        "accent": "#5eead4"
      },
      {
        "id": "service-03",
        "label": "Service 03",
        "kicker": "03 / AI CLOUD",
        "title": "AI Cloud Solutions",
        "summary": "Scalable model training, inference and MLOps on the cloud of your choice.",
        "detail": "We set up, scale and run AI workloads on the cloud provider you already use, with monitoring and cost control built in.",
        "text": "We set up and run AI workloads on the cloud provider you already use. That covers model hosting, training and fine-tuning, data pipelines and MLOps, with monitoring and cost controls built in, so your AI scales with demand without surprise bills.",
        "features": [
          "Model hosting & scaling",
          "Training & fine-tuning",
          "MLOps & monitoring"
        ],
        "capabilities": [
          "Model Hosting & Inference",
          "Training & Fine-Tuning",
          "Data Pipelines",
          "MLOps & CI/CD for Models",
          "Monitoring & Alerting",
          "Cloud Cost Optimization"
        ],
        "image": "./assets/explore/technology.jpg",
        "figure": "squares",
        "accent": "#e25c80"
      },
      {
        "id": "service-04",
        "label": "Service 04",
        "kicker": "04 / SELF-HOSTED AI",
        "title": "Self-Hosted AI",
        "summary": "Private AI models on your own servers, so your data never leaves your infrastructure.",
        "detail": "We deploy open AI models on your own servers or private cloud, so sensitive data stays inside your infrastructure.",
        "text": "For organisations that cannot send sensitive data to public AI services, we deploy open-source AI models on your own servers or private cloud. Your data stays inside your infrastructure, you control access, and you are not tied to any single AI vendor.",
        "features": [
          "On-premise deployment",
          "Private LLMs",
          "No data leaves your network"
        ],
        "capabilities": [
          "On-Premise & Private Cloud Deployment",
          "Open-Source LLM Setup",
          "Fine-Tuning on Your Data",
          "Secure Access Control",
          "GPU Server Planning",
          "Offline & Air-Gapped Options"
        ],
        "image": "./assets/explore/abstract.jpg",
        "figure": "doubleCone",
        "accent": "#a855f7"
      },
      {
        "id": "service-05",
        "label": "Service 05",
        "kicker": "05 / OSINT & SOCMINT",
        "title": "OSINT & SOCMINT Solutions",
        "summary": "Open-source & social media intelligence: monitoring, analysis & threat insight.",
        "detail": "We build tools that collect and analyse publicly available information and social media to surface trends, risks and threats.",
        "text": "We build intelligence tools that collect and analyse publicly available information, including news, websites and social media, to surface trends, risks and emerging threats. Teams get dashboards and alerts instead of manual searching, with collection kept within the law and platform terms.",
        "features": [
          "Media & social monitoring",
          "Trend & sentiment analysis",
          "Threat alerts"
        ],
        "capabilities": [
          "News & Social Media Monitoring",
          "Trend & Sentiment Analysis",
          "Brand & Reputation Tracking",
          "Disinformation Detection",
          "Threat & Risk Alerts",
          "Investigation Dashboards"
        ],
        "image": "./assets/explore/server.jpg",
        "figure": "corners",
        "accent": "#f43f5e"
      }
    ],

    // v1 block, kept for backwards compatibility with the existing CMS tab.
    homepage: {
      "hero": {
        "title": "AI LABS",
        "titleHighlight": "BY NIMBUS",
        "tagline": "We study how you work, then build only what you need.",
        "primaryBtnText": "Explore Product",
        "primaryBtnLink": "./explore",
        "secondaryBtnText": "Book Audit",
        "secondaryBtnLink": "#contact"
      },
      "dapper": {
        "chapters": [
          {
            "index": 1,
            "name": "ENTERPRISE AI SOLUTIONS",
            "caption": "AI BUILT INTO YOUR OPERATIONS: WORKFLOW AUTOMATION, COPILOTS & DECISION SUPPORT FOR YOUR TEAMS"
          },
          {
            "index": 2,
            "name": "AI SOFTWARE DEVELOPMENT",
            "caption": "CUSTOM AI-POWERED APPS, AGENTS & INTEGRATIONS, FROM PROTOTYPE TO PRODUCTION"
          },
          {
            "index": 3,
            "name": "AI CLOUD SOLUTIONS",
            "caption": "SCALABLE MODEL TRAINING, INFERENCE & MLOPS ON THE CLOUD OF YOUR CHOICE"
          },
          {
            "index": 4,
            "name": "SELF-HOSTED AI",
            "caption": "PRIVATE AI MODELS ON YOUR OWN SERVERS, SO YOUR DATA NEVER LEAVES YOUR INFRASTRUCTURE"
          },
          {
            "index": 5,
            "name": "OSINT & SOCMINT SOLUTIONS",
            "caption": "OPEN-SOURCE & SOCIAL MEDIA INTELLIGENCE: MONITORING, ANALYSIS & THREAT INSIGHT"
          }
        ]
      },
      "footer": {
        "brandTitle": "AI Labs by Nimbus",
        "brandDesc": "Enterprise AI, custom AI software, cloud and self-hosted AI, and OSINT & SOCMINT solutions, built around how your team works.",
        "brandLogo": "./assets/logo_tight.png",
        "copyrightYear": 2026,
        "copyrightText": "© 2026 AI Labs by Nimbus. All rights reserved.",
        "copyrightSuffix": "· Enterprise AI, Software & Intelligence Solutions.",
        "talkHeading": "Let’s build what you actually need.",
        "ctaText": "Book Diagnostic Audit",
        "email": "contact@ailabsnimbus.com",
        "emailHref": "mailto:contact@ailabsnimbus.com",
        "note": "Talk directly to the engineers who will build your system.",
        "locationBadge": "Our Office",
        "locationCity": "Dhaka, Bangladesh",
        "locationAddressLine1": "Gulshan 2, Dhaka 1212",
        "locationAddressLine2": "Bangladesh",
        "navAriaLabel": "Footer Nav",
        "legal": [],
        "statusText": "All Global Nimbus Clusters Operational",
        "tel": "+1 (415) 890-AI-LABS · Sovereign Consultations",
        "telHref": "tel:+14158902452",
        "nav": [
          {
            "label": "Solutions",
            "href": "./explore"
          },
          {
            "label": "Services & Audit",
            "href": "./services"
          },
          {
            "label": "Methodology",
            "href": "#methodology"
          },
          {
            "label": "Industries",
            "href": "#services-industries"
          },
          {
            "label": "What We Do",
            "href": "./#dapper"
          }
        ],
        "locationAddress": "Gulshan 2, Dhaka 1212\nBangladesh"
      }
    },

    pages: {
      "home": {
        "meta": {
          "title": "AI Labs by Nimbus | Enterprise AI, Software & Intelligence Solutions",
          "description": "AI Labs by Nimbus builds enterprise AI solutions, custom AI software, AI cloud and self-hosted AI, and OSINT & SOCMINT solutions, shaped around how your team works.",
          "ogTitle": "AI Labs by Nimbus | Enterprise AI & Intelligence Solutions",
          "ogDescription": "We study how you work, then build only what you need: enterprise AI, custom AI software, cloud and self-hosted AI, and OSINT & SOCMINT.",
          "ogType": "website",
          "themeColor": "#020016"
        },
        "headerCtaHref": "./services#contact",
        "hero": {
          "title": "AI LABS",
          "titleHighlight": "BY NIMBUS",
          "tagline": "We study how you work, then build only what you need.",
          "primaryBtnText": "Explore Product",
          "primaryBtnLink": "./explore",
          "primaryBtnAriaLabel": "Explore Nimbus Labs products and services",
          "secondaryBtnText": "Book Audit",
          "secondaryBtnLink": "./audit",
          "preloaderStatus": "LOADING AI LABS BY NIMBUS...",
          "layers": [
            {
              "id": "layer-01",
              "className": "hero-01",
              "src": "./assets/hero-01.png",
              "alt": "Sky background"
            },
            {
              "id": "layer-02",
              "className": "hero-02",
              "src": "./assets/hero-02.png",
              "alt": "Mountain ridges 2"
            },
            {
              "id": "layer-03",
              "className": "hero-03",
              "src": "./assets/hero-03.png",
              "alt": "Mountain ridges 3"
            },
            {
              "id": "layer-04",
              "className": "hero-04",
              "src": "./assets/hero-04.png",
              "alt": "Mountain ridges 4"
            },
            {
              "id": "layer-05",
              "className": "hero-05",
              "src": "./assets/hero-05.png",
              "alt": "Foothills 5"
            },
            {
              "id": "layer-06",
              "className": "hero-06",
              "src": "./assets/hero-06.png",
              "alt": "Pine ridges 6"
            },
            {
              "id": "layer-cloud1",
              "className": "hero-cloud1",
              "src": "./assets/hero-cloud1.png",
              "alt": "Cloud atmosphere 1"
            },
            {
              "id": "layer-cloud2",
              "className": "hero-cloud2",
              "src": "./assets/hero-cloud2.png",
              "alt": "Cloud atmosphere 2"
            },
            {
              "id": "layer-cloud3",
              "className": "hero-cloud3",
              "src": "./assets/hero-cloud3.png",
              "alt": "Cloud atmosphere 3"
            },
            {
              "id": "layer-cloud4",
              "className": "hero-cloud4",
              "src": "./assets/hero-cloud4.png",
              "alt": "Cloud atmosphere 4"
            },
            {
              "id": "layer-cloud5",
              "className": "hero-cloud5",
              "src": "./assets/hero-cloud5.png",
              "alt": "Cloud atmosphere 5"
            },
            {
              "id": "layer-cloud6",
              "className": "hero-cloud6",
              "src": "./assets/hero-cloud6.png",
              "alt": "Cloud atmosphere 6"
            },
            {
              "id": "layer-cloud7",
              "className": "hero-cloud7",
              "src": "./assets/hero-cloud7.png",
              "alt": "Cloud atmosphere 7"
            },
            {
              "id": "layer-cloud8",
              "className": "hero-cloud8",
              "src": "./assets/hero-cloud8.png",
              "alt": "Cloud atmosphere 8"
            },
            {
              "id": "layer-07",
              "className": "hero-07",
              "src": "./assets/hero-07.png",
              "alt": "Ridge forest 7"
            },
            {
              "id": "layer-08",
              "className": "hero-08",
              "src": "./assets/hero-08.png",
              "alt": "Foreground hills 8"
            },
            {
              "id": "layer-09",
              "className": "hero-09",
              "src": "./assets/hero-09.png",
              "alt": "Valley slopes 9"
            },
            {
              "id": "layer-10",
              "className": "hero-10",
              "src": "./assets/hero-10.png",
              "alt": "Near pine trees 10"
            }
          ]
        },
        "dapper": {
          "subheader": "AI LABS BY NIMBUS",
          "chapterCount": 5,
          "chapterPrefix": "CHAPTER",
          "chapterStart": "01",
          "chapterSeparator": "/",
          "captionPrefix": "//",
          "tagTop": "WHAT WE DO",
          "tagBottom": "OUR SERVICES",
          "tagPrefix": "CHAPTER 0",
          "tagSeparator": "//",
          "video": {
            "src": "assets/research-cognition.webm",
            "type": "video/webm"
          },
          "controls": {
            "pauseLabel": "Pause",
            "resumeLabel": "Resume",
            "soundLabel": "Sound",
            "mutedLabel": "Muted",
            "pauseAriaLabel": "Pause or Resume Video",
            "pauseTitle": "Pause / Resume",
            "soundAriaLabel": "Toggle Sound",
            "soundTitle": "Mute / Unmute",
            "groupAriaLabel": "Video Controls"
          }
        },
        "footerNav": [
          {
            "label": "Products",
            "href": "./explore",
            "linkClass": "f-link"
          },
          {
            "label": "Audits & Services",
            "href": "./services",
            "linkClass": "f-link"
          },
          {
            "label": "What We Do",
            "href": "#dapper",
            "linkClass": "f-link"
          },
          {
            "label": "Book Audit",
            "href": "./services#contact",
            "linkClass": "f-link"
          }
        ],
        "footerCtaLink": "./services#contact"
      },
      "explore": {
        "meta": {
          "title": "Products // AI Labs by Nimbus",
          "description": "Products built in-house by AI Labs by Nimbus, from media intelligence and learning apps to restaurant, school and developer tools.",
          "ogTitle": "Products | AI Labs by Nimbus",
          "ogDescription": "Real products solving real problems. Browse the AI Labs by Nimbus product catalogue.",
          "ogType": "website",
          "themeColor": "#020016"
        },
        "headerCtaHref": "./services#contact",
        "hero": {
          "eyebrow": "Built in-house. Each one solving something real.",
          "titleLineOne": "PRODUCTS",
          "titleLineTwo": "Built for Real Problems",
          "lead": "Built in-house. Each one solving something real.",
          "primaryBtnText": "Browse Products",
          "primaryBtnLink": "#products",
          "secondaryBtnText": "Book Audit",
          "secondaryBtnLink": "./audit",
          "preloaderStatus": "LOADING NIMBUS PRODUCTS...",
          "decor": {
            "contour": "./assets/explore/contour.svg",
            "ridge": "./assets/explore/horizon-ridge.svg"
          },
          "rail": [
            "PRODUCTS",
            "LIVE",
            "CONTACT"
          ],
          "metaLabels": [
            "Products",
            "Live Now",
            "In Development"
          ],
          "scrollHint": "Scroll to explore"
        },
        "aiStripAriaLabel": "Our services",
        "a11y": {
          "bridgeAriaLabel": "Feature marquee",
          "railAriaLabel": "Product Showcase Links",
          "productsAriaLabel": "Solutions Matrix",
          "layersAriaLabel": "Product showcase slides"
        },
        "aiStrip": [
          {
            "icon": "enterprise",
            "name": "Enterprise AI",
            "badge": "SERVICE",
            "category": "Automation & Copilots"
          },
          {
            "icon": "software",
            "name": "AI Software",
            "badge": "SERVICE",
            "category": "Custom Apps & Agents"
          },
          {
            "icon": "cloud",
            "name": "AI Cloud",
            "badge": "SERVICE",
            "category": "Hosting, Training & MLOps"
          },
          {
            "icon": "selfhosted",
            "name": "Self-Hosted AI",
            "badge": "SERVICE",
            "category": "Private, On-Premise Models"
          },
          {
            "icon": "osint",
            "name": "OSINT & SOCMINT",
            "badge": "SERVICE",
            "category": "Monitoring & Threat Insight"
          }
        ],
        "noscript": {
          "title": "JavaScript is required for the interactive catalogue.",
          "body": "This Explore catalogue renders its product and service entries with JavaScript. Enable JavaScript to view the placeholder catalogue."
        },
        "ui": {
          "chapterPrefix": "// CHAPTER 0",
          "chapterSeparator": " / ",
          "chapterDash": "—",
          "deployLabel": "Deploy",
          "exploreLabel": "Explore",
          "productFallback": "Product",
          "productCodePrefix": "PRD-",
          "defaultBrandTag": "PRODUCTS",
          "categoryFallback": "SYSTEMS"
        },
        "closing": {
          "eyebrow": "Ready when you are",
          "titleLineOne": "TALK TO US FIRST.",
          "titleLineTwo": "Get advice before you buy enterprise AI.",
          "sub": "Tell us what you are trying to solve. We will help you choose, build or self-host the right setup, or point you to one of our products.",
          "primaryBtnText": "Contact Us",
          "primaryBtnLink": "mailto:contact@ailabsnimbus.com",
          "secondaryBtnText": "Book Audit",
          "secondaryBtnLink": "./services#contact",
          "tertiaryBtnText": "Back to Home",
          "tertiaryBtnLink": "./",
          "title": "See further. Build with <em>Nimbus</em>."
        },
        "legal": [],
        "footerNote": ""
      },
      "audit": {
        "meta": {
          "title": "Services & Business Audit // AI Labs by Nimbus",
          "description": "Enterprise AI solutions, AI software development, AI cloud solutions, self-hosted AI and OSINT & SOCMINT solutions from AI Labs by Nimbus.",
          "ogTitle": "Services & Business Audit // AI Labs by Nimbus",
          "ogDescription": "We study how you work, then build only what you need: enterprise AI, custom AI software, cloud and self-hosted AI, and OSINT & SOCMINT.",
          "ogType": "website",
          "themeColor": "#ffffff"
        },
        "headerCtaHref": "#contact",
        "servicesHeading": "What we do",
        "hero": {
          "titleLines": [
            "AI solutions",
            "built around your work"
          ],
          "lead": "We study how your team works, find where AI will actually help, and build it, from enterprise copilots and custom software to self-hosted models you fully own.",
          "proof": [
            "Enterprise AI",
            "Custom AI Software",
            "Cloud or Self-Hosted",
            "You Own the Code"
          ]
        },
        "framework": {
          "kicker": "HOW WE WORK",
          "title": "From first call to a working system.",
          "lead": "A clear, fixed-scope process built to deliver working software, not slide decks.",
          "stages": [
            {
              "index": 1,
              "step": "STAGE 01",
              "title": "Discovery & Audit",
              "text": "We learn how your team works, map your data and workflows, and pinpoint where AI will save the most time or money."
            },
            {
              "index": 2,
              "step": "STAGE 02",
              "title": "Working Prototype",
              "text": "We build a working prototype on your real data in a safe test environment, so you see results before committing further."
            },
            {
              "index": 3,
              "step": "STAGE 03",
              "title": "Launch & Handover",
              "text": "We deploy to your cloud or your own servers, train your team, and hand over the source code and documentation."
            }
          ]
        },
        "industries": {
          "kicker": "// INDUSTRIES WE SERVE",
          "title": "Who we build for",
          "ariaLabel": "Industries we serve",
          "lead": "We work with teams that have real operational problems and data worth putting to work.",
          "sectorStart": "01",
          "sectorCount": 6,
          "sectors": [
            {
              "index": 1,
              "chapter": "// SECTOR 01 / 06 — FINANCE",
              "name": "Finance & Fintech",
              "bg": "#2f122e",
              "color": "#ffffff",
              "members": [
                "Fraud & Anomaly Detection",
                "Document & KYC Processing",
                "Risk Reporting Automation",
                "Customer Support Copilots",
                "Compliance Monitoring",
                "Market & News Monitoring"
              ]
            },
            {
              "index": 2,
              "chapter": "// SECTOR 02 / 06 — ENTERPRISE",
              "name": "Enterprise & B2B",
              "bg": "#e25c80",
              "color": "#ffffff",
              "members": [
                "Internal Knowledge Assistants",
                "Workflow Automation",
                "ERP & CRM Integrations",
                "Document Processing",
                "Sales & Support Copilots",
                "Reporting Dashboards"
              ]
            },
            {
              "index": 3,
              "chapter": "// SECTOR 03 / 06 — GOVERNMENT & SECURITY",
              "name": "Government & Security",
              "bg": "#6459e8",
              "color": "#ffffff",
              "members": [
                "Self-Hosted AI for Sensitive Data",
                "OSINT Investigations",
                "Social Media Monitoring",
                "Threat Intelligence",
                "Disinformation Tracking",
                "Secure On-Premise Deployments"
              ]
            },
            {
              "index": 4,
              "chapter": "// SECTOR 04 / 06 — TECHNOLOGY",
              "name": "Technology & SaaS",
              "bg": "#0f3d3e",
              "color": "#ffffff",
              "members": [
                "AI Features in Your Product",
                "LLM Integrations",
                "Model Hosting & Scaling",
                "MLOps Pipelines",
                "Cost & Latency Optimization",
                "AI Agents & Chatbots"
              ]
            },
            {
              "index": 5,
              "chapter": "// SECTOR 05 / 06 — HEALTHCARE",
              "name": "Healthcare & Life Sciences",
              "bg": "#3a102a",
              "color": "#ffffff",
              "members": [
                "Clinical Document Summaries",
                "Private Patient-Data Processing",
                "Intake & Scheduling Automation",
                "Medical Knowledge Search",
                "Self-Hosted Models for Privacy",
                "Research Data Analysis"
              ]
            },
            {
              "index": 6,
              "chapter": "// SECTOR 06 / 06 — LOGISTICS & RETAIL",
              "name": "Logistics & Retail",
              "bg": "#020016",
              "color": "#ffffff",
              "members": [
                "Demand Forecasting",
                "Route & Fleet Planning",
                "Inventory Automation",
                "Customer Service Chatbots",
                "Brand & Review Monitoring",
                "Operations Dashboards"
              ]
            }
          ]
        },
        "contact": {
          "heading": "Let’s build what you actually need."
        },
        "footerNav": [
          {
            "label": "Products",
            "href": "./explore",
            "linkClass": "f-link"
          },
          {
            "label": "Audits & Services",
            "href": "./services",
            "linkClass": "f-link is-active"
          },
          {
            "label": "Methodology",
            "href": "#methodology",
            "linkClass": "f-link"
          },
          {
            "label": "Industries",
            "href": "#services-industries",
            "linkClass": "f-link"
          },
          {
            "label": "What We Do",
            "href": "./#dapper",
            "linkClass": "f-link"
          },
          {
            "label": "Book Audit",
            "href": "#contact",
            "linkClass": "f-link"
          }
        ],
        "footerCtaLink": "#contact"
      },
      "login": {
        "meta": {
          "title": "Admin Access — AI Labs by Nimbus"
        },
        "kicker": "// Nimbus Control Plane",
        "title": "Admin Access",
        "subtitle": "Authenticate to open the CMS Matrix. Sessions expire after 8 hours and are bound to this browser.",
        "passwordLabel": "Passphrase",
        "passwordPlaceholder": "Enter admin passphrase",
        "revealLabel": "Show",
        "hideLabel": "Hide",
        "revealAriaLabel": "Show passphrase",
        "hideAriaLabel": "Hide passphrase",
        "submitLabel": "Enter Matrix",
        "busyLabel": "Authenticating…",
        "backLinkText": "Return to site",
        "backLinkHref": "/",
        "errorEmpty": "Enter the admin passphrase to continue.",
        "errorInvalid": "Invalid passphrase. Access denied.",
        "errorAuth": "Authentication failed.",
        "errorNetwork": "Network error. Check that the server is running.",
        "errorNotConfigured": "Admin access is not configured on the server. Set ADMIN_PASSWORD in .env and restart.",
        "statusSuccess": "Authenticated. Opening the CMS Matrix…"
      }
    }
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (isPlainObject(value)) {
    const out = {};
    Object.keys(value).forEach(function (key) {
      out[key] = clone(value[key]);
    });
    return out;
  }
  return value;
}

/**
 * Deep merge: existing values always win, defaults only fill the gaps.
 * Arrays are taken from the existing value as a whole.
 */
function mergeDefaults(defaults, value) {
  if (value === undefined || value === null) return clone(defaults);
  if (!isPlainObject(defaults) || !isPlainObject(value)) {
    return Array.isArray(defaults) ? clone(value) : value;
  }

  const out = clone(defaults);
  Object.keys(value).forEach(function (key) {
    if (isPlainObject(out[key]) && isPlainObject(value[key])) {
      out[key] = mergeDefaults(out[key], value[key]);
    } else if (value[key] !== undefined) {
      out[key] = clone(value[key]);
    }
  });
  return out;
}

/**
 * Upgrade any content document to the current schema without losing data.
 * @param {Object} content
 * @returns {Object} migrated content
 */
function migrate(content) {
  const defaults = defaultContent();
  const source = isPlainObject(content) ? content : {};
  const migrated = mergeDefaults(defaults, source);

  // Services are enriched per index so the audit cards keep their copy even
  // when the catalogue was edited before the v2 fields existed.
  const serviceDefaults = defaults.services || [];
  const sourceServices = Array.isArray(source.services) ? source.services : serviceDefaults;
  migrated.services = sourceServices.map(function (service, index) {
    const fallback = serviceDefaults[index];
    return fallback ? mergeDefaults(fallback, service) : service;
  });

  // Keep the legacy homepage.footer mirror in sync with the shared footer.
  migrated.homepage.footer = clone(migrated.site.footer);

  migrated.schemaVersion = SCHEMA_VERSION;
  return migrated;
}

module.exports = {
  SCHEMA_VERSION: SCHEMA_VERSION,
  RICH_TEXT_PATHS: RICH_TEXT_PATHS,
  defaultContent: defaultContent,
  migrate: migrate,
  mergeDefaults: mergeDefaults,
  clone: clone
};
