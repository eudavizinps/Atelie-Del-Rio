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

test("catálogo de locações mostra as fotos reais sem preços", async () => {
  const html = await (await render()).text();
  const cards = html.match(/class="rental-card"/g) ?? [];
  const productLinks = html.match(/aria-label="Consultar [^"]+ pelo WhatsApp"/g) ?? [];

  assert.equal(cards.length, 66);
  assert.equal(productLinks.length, 66);
  assert.match(html, /class="rental-track"/);
  assert.match(html, /Bonecos e Pelúcias/);
  assert.match(html, /img-4334\.webp/);
  assert.match(html, /img-6336\.webp/);
  assert.match(html, /img-6335\.webp/);
  assert.match(html, /img-6334\.webp/);
  assert.match(html, /img-3916\.webp/);
  assert.match(html, /img-3862\.webp/);
  assert.match(html, /Mesas e Decorativos/);
  assert.match(html, /Decoração temática com personagens/);
  assert.match(html, /Consulte a disponibilidade/);
  assert.doesNotMatch(html, /Ref\.\s*(?:<!-- -->)?4334|referência 4334|ref\.%204334/i);
  assert.match(html, /wa\.me\/5511999999999\?text=/);
  assert.doesNotMatch(html, /R\$\s*\d|preço|valor do item/i);
});
