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

test("acervo inicia em Decoração, com as dez abas e sem preços", async () => {
  const html = await (await render()).text();
  const cards = html.match(/class="rental-card"/g) ?? [];
  const productLinks = html.match(/aria-label="Consultar [^"]+ pelo WhatsApp"/g) ?? [];
  const rentalFilters = html.split('class="rental-filters"')[1]?.split('class="rental-count"')[0] ?? "";

  assert.equal(cards.length, 10);
  assert.equal(productLinks.length, 10);
  assert.match(html, /class="rental-track"/);
  for (const category of ["Decoração", "Bandejas", "Acessórios", "Pelúcias &amp; Bonecos", "Painel", "Cômodas", "Mesas", "Leds", "Arranjos", "Cenários"]) {
    assert.match(rentalFilters, new RegExp(category));
  }
  assert.doesNotMatch(rentalFilters, />Todos<|>Todos<!-- -->/);
  assert.match(html, /img-7001\.webp/);
  assert.match(html, /img-7007\.webp/);
  assert.match(html, /img-6336\.webp/);
  assert.match(html, /img-6335\.webp/);
  assert.match(html, /img-6334\.webp/);
  assert.match(html, /Decoração temática com personagens/);
  assert.match(html, /Consulte a disponibilidade/);
  assert.doesNotMatch(html, /Ref\.\s*(?:<!-- -->)?4334|referência 4334|ref\.%204334/i);
  assert.match(html, /wa\.me\/5521988742550\?text=/);
  assert.match(html, /href="tel:\+5521988742550"/);
  assert.match(html, /\(21\) 98874-2550/);
  assert.match(html, /Rua Franz Listz, 218 - Jardim América, RJ/);
  assert.doesNotMatch(html, /5511999999999|\(11\) 99999-9999|São Paulo – SP/);
  assert.doesNotMatch(html, /R\$\s*\d|preço|valor do item/i);
});
