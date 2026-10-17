# CMS page: templates/free-organizational-chart-generator
Create one site page with this slug, then add these components in this order.
Each file is one component: put `component_slug` and `component_name` in their fields and paste `config` as the component's JSON.

| File | component_slug |
|---|---|
| `01-seo.json` | `seo` |
| `03-template_detail_hero.json` | `template_detail_hero` |
| `04-templates_detail_about.json` | `templates_detail_about` (`{ lede }`) |
| `05-template_features.json` | `template_features` |
| `06-template_audience.json` | `template_audience` |
| `07-template_steps.json` | `template_steps` |
| `08-template_benefits.json` | `template_benefits` |
| `09-faqs.json` | `faqs` |

The breadcrumb, sidebar promo and "Reach Us" strip are static on the site (the same on every template page), so they are not CMS components.
