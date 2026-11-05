import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('Pop Negro is the primary brand and Luis Grasso is the professional reference', () => {
  assert.match(app, /POP NEGRO/);
  assert.match(app, /Pop Negro es la identidad de trabajo de Luis Grasso/);
  assert.doesNotMatch(app, /NAVE/);
});

test('the landing presents real service areas instead of invented case studies', () => {
  for (const phrase of ['Estrategia & producto', 'Diseño & comunicación', 'Desarrollo & tecnología', 'Marketing & crecimiento', 'Automatización & evolución']) {
    assert.ok(app.includes(phrase), `Missing service: ${phrase}`);
  }
  assert.doesNotMatch(app, /images\.pexels\.com|Caso preparado para vincular/);
});

test('contact form includes bounded required fields and a bot honeypot', () => {
  assert.match(app, /name="name" required minLength=\{2\} maxLength=\{120\}/);
  assert.match(app, /name="email" required type="email" maxLength=\{254\}/);
  assert.match(app, /name="message" required minLength=\{10\} maxLength=\{2000\}/);
  assert.match(app, /company_website/);
});

test('SEO metadata identifies Pop Negro in Spanish for Argentina', () => {
  assert.match(html, /<html lang="es-AR">/);
  assert.match(html, /<title>Pop Negro — Estrategia, diseño y tecnología<\/title>/);
  assert.match(html, /name="description"/);
  assert.match(html, /property="og:site_name" content="Pop Negro"/);
});
