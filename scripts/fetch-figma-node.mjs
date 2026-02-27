#!/usr/bin/env node
/**
 * Fetch a Figma node via REST API and print frame name, dimensions, colors, typography, and child layers.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/fetch-figma-node.mjs [fileKey] [nodeId]
 *
 * Example (from URL https://figma.com/design/FIKXOYEmhHpVXRniB8Q7HM/Project-Intacct?node-id=3897-4577):
 *   FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma-node.mjs FIKXOYEmhHpVXRniB8Q7HM 3897:4577
 *
 * Get a token: Figma → Settings → Account → Personal access tokens (file_content:read scope).
 */

const fileKey = process.argv[2] || 'FIKXOYEmhHpVXRniB8Q7HM';
const nodeIdParam = process.argv[3] || '3897:4577';
const nodeId = nodeIdParam.replace('-', ':');

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error('Set FIGMA_ACCESS_TOKEN (e.g. export FIGMA_ACCESS_TOKEN=your_token)');
  console.error('Get one: Figma → Settings → Account → Personal access tokens');
  process.exit(1);
}

const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;

let res;
try {
  res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });
} catch (e) {
  console.error('Request failed:', e.message);
  process.exit(1);
}

if (!res.ok) {
  console.error('API error:', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const nodeEntry = data.nodes?.[nodeId];
if (!nodeEntry?.document) {
  console.error('Node not found. Check file key and node id. Raw response:', JSON.stringify(data, null, 2));
  process.exit(1);
}

const doc = nodeEntry.document;

function rgba(c) {
  if (!c || typeof c.r === 'undefined') return null;
  const r = Math.round((c.r ?? 0) * 255);
  const g = Math.round((c.g ?? 0) * 255);
  const b = Math.round((c.b ?? 0) * 255);
  const a = c.a !== undefined ? c.a : 1;
  return a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
}

function collectFills(node) {
  const out = [];
  if (node.fills && Array.isArray(node.fills)) {
    for (const f of node.fills) {
      if (f.visible === false) continue;
      if (f.type === 'SOLID' && f.color) out.push(rgba(f.color));
      else if (f.type === 'GRADIENT_LINEAR' && f.gradientStops) {
        const stops = f.gradientStops.map(s => `${rgba(s.color)} ${(s.position * 100).toFixed(0)}%`).join(', ');
        out.push(`linear-gradient(${stops})`);
      }
    }
  }
  if (node.backgroundColor && !node.fills?.length) out.push(rgba(node.backgroundColor));
  return out;
}

function collectTypography(node) {
  if (node.type !== 'TEXT') return null;
  const style = node.style || {};
  return {
    fontFamily: style.fontFamily ?? node.fontName ?? '—',
    fontSize: style.fontSize ?? '—',
    fontWeight: style.fontWeight ?? '—',
    lineHeight: style.lineHeightPx ?? style.lineHeightPercent ?? '—',
    letterSpacing: style.letterSpacing != null ? style.letterSpacing : '—',
  };
}

function summarizeNode(node, indent = '') {
  const box = node.absoluteBoundingBox;
  const dims = box ? `${Math.round(box.width)}×${Math.round(box.height)}` : '—';
  const fills = collectFills(node);
  const typo = collectTypography(node);
  const parts = [
    `${indent}${node.type}: "${node.name}"`,
    `  ${indent}dimensions: ${box ? `${Math.round(box.width)} × ${Math.round(box.height)} px` : '—'}`,
  ];
  if (box && (box.x !== 0 || box.y !== 0)) {
    parts.push(`  ${indent}position: x=${Math.round(box.x)}, y=${Math.round(box.y)}`);
  }
  if (fills.length) parts.push(`  ${indent}colors/fills: ${fills.join(', ')}`);
  if (typo) {
    parts.push(`  ${indent}typography: ${typo.fontFamily} ${typo.fontSize}px, weight ${typo.fontWeight}, lineHeight ${typo.lineHeight}`);
  }
  return { parts, children: node.children };
}

function walk(node, indent = '', list = []) {
  const { parts, children } = summarizeNode(node, indent);
  list.push(...parts);
  if (children && children.length) {
    list.push(`${indent}  children (${children.length}):`);
    for (const c of children) {
      walk(c, indent + '    ', list);
    }
  }
  return list;
}

console.log('--- Frame / node summary ---\n');
console.log('Name:', doc.name);
console.log('Type:', doc.type);
if (doc.absoluteBoundingBox) {
  const b = doc.absoluteBoundingBox;
  console.log('Dimensions:', `${Math.round(b.width)} × ${Math.round(b.height)} px`);
  console.log('Position: x =', Math.round(b.x), ', y =', Math.round(b.y));
}
const rootFills = collectFills(doc);
if (rootFills.length) console.log('Colors/fills:', rootFills.join(', '));
const rootTypo = collectTypography(doc);
if (rootTypo) console.log('Typography:', rootTypo);

console.log('\n--- Child layers ---\n');
if (doc.children?.length) {
  const lines = [];
  for (const c of doc.children) {
    walk(c, '  ', lines);
  }
  console.log(lines.join('\n'));
} else {
  console.log('  (no children)');
}

console.log('\n--- Raw node IDs (for reference) ---');
function ids(n, depth = 0) {
  const pre = '  '.repeat(depth);
  console.log(`${pre}${n.id}  ${n.type}  "${n.name}"`);
  (n.children || []).forEach((c) => ids(c, depth + 1));
}
ids(doc);
