import { copyFile, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, process.argv[2] ?? "site-html");
const assetsRoot = path.join(outputRoot, "assets");
const workerUrl = pathToFileURL(path.join(projectRoot, "dist/server/index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Falha ao renderizar o site: ${response.status}`);

let html = await response.text();
const cssDirectory = path.join(projectRoot, "dist/client/_next/static/css");
const cssFile = (await readdir(cssDirectory)).find((file) => file.endsWith(".css"));
if (!cssFile) throw new Error("CSS compilado não encontrado.");

let css = await readFile(path.join(cssDirectory, cssFile), "utf8");
css = css
  .replaceAll("/prototype.png", "./assets/prototype.png")
  .replaceAll("/logo-original.jpeg", "./assets/logo-original.jpeg")
  .replaceAll("/og.png", "./assets/og.png");

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*(?:stylesheet|modulepreload|preload)[^>]*>/gi, "")
  .replaceAll('src="/logo-original.jpeg"', 'src="./assets/logo-original.jpeg"')
  .replaceAll('src="/products/', 'src="./assets/products/')
  .replaceAll('href="/logo-original.jpeg"', 'href="./assets/logo-original.jpeg"')
  .replaceAll('href="/favicon.svg"', 'href="./assets/favicon.svg"')
  .replace(
    "</head>",
    '<title>Ateliê Del Rio | Decorações, Locações &amp; Buffet</title><meta name="description" content="Eventos únicos com decoração autoral, locações selecionadas e buffet memorável."><meta property="og:title" content="Ateliê Del Rio"><meta property="og:description" content="Momentos inesquecíveis começam nos detalhes."><meta property="og:image" content="./assets/og.png"><meta name="theme-color" content="#3a0f19"><link rel="icon" href="./assets/favicon.svg"><link rel="stylesheet" href="./style.css"><meta name="application-name" content="Ateliê Del Rio"></head>',
  )
  .replace(
    "</body>",
    `<script>
      const categories = {
        "gallery-1": "Casamentos", "gallery-2": "Festas", "gallery-3": "Corporativos",
        "gallery-4": "Festas", "gallery-5": "Corporativos", "gallery-6": "Casamentos"
      };
      document.querySelectorAll('.portfolio__filters button').forEach((button) => {
        button.addEventListener('click', () => {
          const selected = button.textContent.trim();
          document.querySelectorAll('.portfolio__filters button').forEach((item) => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', String(active));
          });
          document.querySelectorAll('.gallery .prototype-photo').forEach((photo) => {
            const photoClass = Object.keys(categories).find((name) => photo.classList.contains(name));
            photo.hidden = selected !== 'Todos' && categories[photoClass] !== selected;
          });
        });
      });
      const rentalTrack = document.querySelector('.rental-track');
      document.querySelectorAll('.rental-nav button').forEach((button, index) => {
        button.addEventListener('click', () => {
          if (!rentalTrack) return;
          const direction = index === 0 ? -1 : 1;
          rentalTrack.scrollBy({ left: direction * Math.min(rentalTrack.clientWidth * 0.86, 980), behavior: 'smooth' });
        });
      });
    </script></body>`,
  )
  .replace(/<\/main>[\s\S]*?<script>\s*const categories/, "</main><script>\n      const categories");

await mkdir(assetsRoot, { recursive: true });
await Promise.all([
  copyFile(path.join(projectRoot, "public/prototype.png"), path.join(assetsRoot, "prototype.png")),
  copyFile(path.join(projectRoot, "public/logo-original.jpeg"), path.join(assetsRoot, "logo-original.jpeg")),
  copyFile(path.join(projectRoot, "public/og.png"), path.join(assetsRoot, "og.png")),
  copyFile(path.join(projectRoot, "public/favicon.svg"), path.join(assetsRoot, "favicon.svg")),
  cp(path.join(projectRoot, "public/products"), path.join(assetsRoot, "products"), { recursive: true }),
]);
await writeFile(path.join(outputRoot, "style.css"), css, "utf8");
await writeFile(path.join(outputRoot, "index.html"), html, "utf8");
await writeFile(
  path.join(outputRoot, "_headers"),
  `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`,
  "utf8",
);

console.log(path.join(outputRoot, "index.html"));
