# PayloadPier agent discovery

Authoritative access manifest: https://payloadpier.com/api/discovery

- REST/OpenAPI: https://payloadpier.com/api/openapi.json
- Public MCP endpoint: https://payloadpier.com/api/mcp
- MCP registration manifest: https://payloadpier.com/server.json
- Text index: https://payloadpier.com/llms.txt
- Agent setup: https://payloadpier.com/docs/agents

MCP initialize, server/discover and tools/list require no customer API key. Paid tool calls require a scoped direct key or an explicitly enabled customer delegation. Never put credentials in tool arguments. Discovery is not payment authorization.

## x402

POST JSON comparisons to https://payloadpier.com/api/x402/compare with Content-Type: application/json and a unique durable Idempotency-Key (16–100 letters, digits, underscore or hyphen). The HTTP 402 challenge supplies exact payment terms: 0.25 USDC on Base mainnet, a quote-specific resource URL and a Bazaar extension with the input schema/example and canonical route. A compatible client must honor that quote URL and preserve the original request body and operation key. Never repay an uncertain operation with a new ID.

The metadata is publicly discoverable. Mainnet settlement and actual inclusion in the Coinbase Bazaar catalog are not yet verified. An enabled discovery extension is not proof that a directory has indexed the endpoint.

## Registry status, 18 October 2026

The official MCP Registry publication workflow remains blocked before publishing: the current host rejects the GitHub Python client with HTTP 403 / Cloudflare Error 1010. No registry listing is claimed. Other external clients have successfully discovered the tools. Hosting migration is being verified separately; staging endpoints are not advertised as production.

RapidAPI is live: https://rapidapi.com/Dumyd/api/payloadpier-supplier-price-compare

APIs.guru submission is open for maintainer review: https://github.com/APIs-guru/openapi-directory/issues/3807
