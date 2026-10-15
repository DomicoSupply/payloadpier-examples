import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
const key = process.env.RAPIDAPI_KEY;
if (!key) throw new Error('Set RAPIDAPI_KEY locally. Never commit it.');
const payload = JSON.parse(await readFile(new URL('./comparison.json', import.meta.url), 'utf8'));
// One potentially billable request. No automatic retry.
const response = await fetch('https://payloadpier-supplier-price-compare.p.rapidapi.com/api/v1/compare', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': 'payloadpier-supplier-price-compare.p.rapidapi.com', 'Idempotency-Key': randomUUID() },
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(30000)
});
console.log('HTTP', response.status);
console.log(await response.text());
if (!response.ok) process.exitCode = 1;
