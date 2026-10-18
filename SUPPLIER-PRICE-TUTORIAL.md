# Catch a supplier price increase hidden in a smaller pack

Published by PayloadPier, the provider of the commercial API used below. This guide was prepared with AI assistance and checked against the public integration examples.

A supplier keeps a case at $120 but reduces the pack from 12 units to 10. A case-price comparison reports no increase. Your cost per unit rises from $10 to $12: a 20% increase.

```text
old unit cost = 120 / 12 = 10
new unit cost = 120 / 10 = 12
increase = (12 / 10 - 1) × 100 = 20%
```

This is the difference between a changed-cell report and a purchasing-cost comparison. Before updating a catalog, normalize prices to the same quantity unit and currency.

## Prepare two snapshots

The repository's [comparison.json](comparison.json) contains a synthetic example:

```json
{
  "old_rows": [
    {"sku":"A-100","price":"120","currency":"USD","price_basis":"pack","pack_quantity":"12","unit":"each"}
  ],
  "new_rows": [
    {"sku":"A-100","price":"120","currency":"USD","price_basis":"pack","pack_quantity":"10","unit":"each"}
  ]
}
```

Use exact, case-sensitive SKUs and decimal strings for money. Do not merge different currencies or incompatible units. CSV and XLSX inputs also work through the documented multipart interface and explicit column mappings.

The hosted API accepts at most 5,000 rows per snapshot, 2 MiB per file and 5 MiB per request. An absent SKU means absent from your supplied snapshot; it does not prove that a supplier discontinued it.

## Run the marketplace example

Open the [RapidAPI listing](https://rapidapi.com/Dumyd/api/payloadpier-supplier-price-compare), inspect its current plans, and subscribe to your chosen plan. Keep the resulting key private.

Download [compare.mjs](compare.mjs) and [comparison.json](comparison.json) into the same folder. With Node.js 18 or later, set RAPIDAPI_KEY in your local environment and run:

```sh
node compare.mjs
```

The example sends exactly one POST to /api/v1/compare and prints the status and response. For the synthetic changed row, expect unit_cost_change_pct to equal "20.000000".

**Requests can consume marketplace quota or incur a charge, including failures and retries.** The example deliberately does not retry automatically. If a response is uncertain, reconcile the operation before sending another. A duplicate operation can return 409 instead of replaying the original result; this does not guarantee marketplace billing deduplication.

## Use the result in a purchasing workflow

1. Validate the supplier snapshot and retain your original files securely.
2. Review changed pack sizes, normalized unit costs and minimum orders.
3. Inspect flagged rows before updating purchasing costs.
4. If supplying selling prices, review the optional gross-margin impact.

For example, at a $15 selling price per unit, the change above reduces gross margin from 33.33% to 20%. This simple margin excludes freight, taxes, fees and overhead. It is not net profit.

PayloadPier does not scrape supplier catalogs, perform fuzzy matching, convert currencies or place orders. You supply the snapshots and remain responsible for purchasing decisions.

## Direct access and agents

[Direct pricing and account setup](https://payloadpier.com) are separate from RapidAPI. Direct prepaid comparisons cost $0.25 per successful comparison, with credit packs starting at $5. Monthly plans start at $9 for 50 comparisons; other current plans are $19 for 200 and $49 for 1,000. Applicable taxes are extra. Included units expire at the end of the period; prepaid overages are $0.25 each. Prices may change: check the purchase screen.

The free local browser tester is available at [PayloadPier](https://payloadpier.com/portal#docs). It is not a free hosted API quota. RapidAPI's separate BASIC trial currently offers three requests per month.

Compatible agents can use REST or the remote API-key MCP endpoint at https://payloadpier.com/api/mcp with a funded, appropriately scoped direct key. RapidAPI keys are not interchangeable with direct keys. Store credentials in the client's secret configuration, never in tool arguments or a public repository.

Public tool discovery passed from our workspace client on 18 October 2026. Some external discovery clients are still blocked by the current host. OAuth end-to-end use and mainnet x402 payment settlement remain unverified; do not assume every agent can autonomously find, buy and use this service. See [current discovery and access details](DISCOVERY.md).

## Data handling and help

Comparison inputs and results are processed in memory and are not retained by the application. Usage and billing metadata persists; marketplace requests also pass through RapidAPI under its policies.

[Documentation](https://payloadpier.com/docs/agents) · [Terms and refunds](https://payloadpier.com/terms) · [Privacy](https://payloadpier.com/privacy) · support@payloadpier.com

This repository contains integration examples, not the hosted server's source code.
