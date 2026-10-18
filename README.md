# PayloadPier Supplier Price Compare

Catch supplier price increases hidden behind unchanged case prices. A $120 case shrinking from 12 to 10 units raises unit cost from $10 to $12: **20%**.

This repository contains public integration examples only. It contains no production application source, customer data or API keys.

## Start here

- [RapidAPI listing and plans](https://rapidapi.com/Dumyd/api/payloadpier-supplier-price-compare)
- [Direct website, pricing and browser tester](https://payloadpier.com)
- [Marketplace guide](https://payloadpier.com/docs/rapidapi)
- [Marketplace OpenAPI definition](https://payloadpier.com/api/rapidapi/openapi.json)

## Practical tutorial

[Catch a supplier price increase hidden in a smaller pack](SUPPLIER-PRICE-TUTORIAL.md): a synthetic example, runnable marketplace integration, pricing and limitations.

## Agent discovery

- [Live access manifest](https://payloadpier.com/api/discovery)
- [MCP manifest](https://payloadpier.com/server.json)
- [Agent integration and registry status](DISCOVERY.md)

## Postman

Import `payloadpier-rapidapi.postman_collection.json`. Subscribe to a RapidAPI plan, then set `rapidapi_key` locally (prefer a private local/Vault value). The published variable is deliberately empty. Do not export or share your populated key.

Send **Compare pack-size shrinkage**. It uses a fresh operation key for each Send. The expected first changed row has `unit_cost_change_pct: "20.000000"`.

**Each request may count toward usage or incur a charge, including failed requests and retries.** Inspect uncertain responses before resending. There is no automatic retry.

## Node.js example

Use Node.js 18+:

```sh
export RAPIDAPI_KEY='YOUR_OWN_KEY'
node compare.mjs
```

The example reads `comparison.json`, sends exactly one request, and prints the response. Never commit your key. Marketplace requests need no separate PayloadPier account or direct customer key.

## Pricing

RapidAPI: BASIC 3 requests/month; PRO $0.30/request PAYG; ULTRA $25/month for 200; MEGA $65/month for 1,000. Monthly request quotas are hard capped. Separate bandwidth fees and applicable taxes may apply. Review the current RapidAPI subscription screen before subscribing.

Direct website plans are separate and priced independently. A RapidAPI request does not debit a PayloadPier direct prepaid wallet.

## Input rules and scope

Exact case-sensitive SKUs; decimal-string prices; explicit currencies and quantity units. Pack prices need positive pack quantities. Maximum 5,000 rows per snapshot, 2 MiB per file and 5 MiB per request. CSV/XLSX mappings and multipart upload schemas are in the linked OpenAPI definition.

No supplier scraping, fuzzy matching, currency conversion or order placement. Absent means absent from your supplied snapshot, not confirmed discontinued. Optional gross margins exclude freight, taxes, fees and overhead.

Use a new Idempotency-Key for each comparison. A recorded repeat returns 409 rather than replaying a result and does not guarantee marketplace billing deduplication. Backend safety limits also apply.

Inputs/results are processed in memory and not retained by the application; minimal usage and billing metadata persists. RapidAPI processes requests under its own policies.

## Support and policies

support@payloadpier.com · [Terms/refunds](https://payloadpier.com/terms) · [Privacy](https://payloadpier.com/privacy)
