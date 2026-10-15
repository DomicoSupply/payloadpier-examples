# PayloadPier MCP connection

Remote URL: https://payloadpier.com/api/mcp

Use a direct PayloadPier API key in the `X-API-Key` header. RapidAPI keys belong to the marketplace endpoint and do not work here.

## Setup

1. Create/sign into an account at https://payloadpier.com/account.
2. Create a scoped key with `supplier-price` for comparisons and `account-read` for balance queries.
3. Store the key in your MCP client's private secret settings.
4. Configure the remote HTTP endpoint and header. Clients must support custom HTTP headers.
5. Start with `get_account_balance`, which has no usage charge. Fund your direct account or choose a direct subscription before comparisons.

Generic client configuration (adapt to your client's documented format):

```json
{
  "mcpServers": {
    "payloadpier": {
      "url": "https://payloadpier.com/api/mcp",
      "headers": {
        "X-API-Key": "YOUR_PRIVATE_DIRECT_KEY"
      }
    }
  }
}
```

Never publish the populated key or put it in tool arguments. This is an API-key connection; OAuth compatibility remains under verification.

## Tools

- `compare_supplier_prices`: one included unit or $0.25 prepaid per successful comparison. Supply a durable `operation_id` and `comparison` object. Do not automatically retry uncertain responses with a new ID.
- `get_account_balance`: account-read scope, no usage charge.
- `get_referral_link` and `claim_referral`: referrals scope; the referral program is based on attributable profit.

## Discovery and publication status

`server.json` is the remote registration manifest. The GitHub Actions workflow validates public initialize/tools-list responses and metadata before attempting publication through the registry's documented GitHub OIDC flow. A saved manifest or workflow is **not** proof of registry publication; check the workflow result and registry listing.

Guide: https://payloadpier.com/docs/mcp
