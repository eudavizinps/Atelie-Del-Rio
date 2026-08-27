import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza o site completo do Ateliê Del Rio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Momentos inesquecíveis começam nos detalhes/);
  assert.match(html, /Acervo para locação/);
  assert.match(html, /Peças que transformam cada cenário/);
  assert.match(html, /Ateliê Del Rio/);
});

test("catálogo de locações não exibe preços e envia cada item ao WhatsApp", async () => {
  const html = await (await render()).text();
  const cards = html.match(/class="rental-card"/g) ?? [];
  const productLinks = html.match(/aria-label="Solicitar orçamento de [^"]+ pelo WhatsApp"/g) ?? [];

  assert.equal(cards.length, 8);
  assert.equal(productLinks.length, 8);
  assert.match(html, /class="rental-track"/);
  assert.match(html, /wa\.me\/5511999999999\?text=/);
  assert.doesNotMatch(html, /R\$\s*\d|preço|valor do item/i);
});
