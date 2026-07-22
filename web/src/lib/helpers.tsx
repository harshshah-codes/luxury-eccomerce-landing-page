import React from 'react';

export const WHATSAPP_NUMBER = '33142000000';

export function whatsappLink(productName: string, sku: string) {
  const msg = `Good day, Maison Héritage.\n\nI would like to enquire about the ${productName} (Ref: ${sku}).\n\nCould you kindly share availability and the next steps for acquisition?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function whatsappGeneralLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Good day, Maison Héritage. I would like to make a general enquiry.')}`;
}

export function img(seed: string, w = 800, h = 1000) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function escapeAttr(s: string) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const ADMIN_TABS = ['products', 'hero', 'marquee', 'manifesto', 'categories', 'atelier', 'principles', 'footer', 'shop', 'atelierpage'] as const;

const TAG_RE = new RegExp('<[^>]+>', 'g');
const BR_RE = /^<br\s*\/?>$/;
const EM_RE = new RegExp('^<em>(.*?)<\\/em>$');
const STRONG_RE = new RegExp('^<strong>(.*?)<\\/strong>$');

export function RichText({ text, as: As = 'span' }: { text: string; as?: 'span' | 'p' | 'h1' | 'h2' | 'div' }) {
  const parts = text.split(TAG_RE);
  const tags = text.match(TAG_RE) || [];
  const children: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) children.push(parts[i]);
    if (i < tags.length) {
      const t = tags[i];
      if (BR_RE.test(t)) {
        children.push(<br key={i} />);
      } else {
        const em = t.match(EM_RE);
        if (em) { children.push(<em key={i}>{em[1]}</em>); continue; }
        const strong = t.match(STRONG_RE);
        if (strong) { children.push(<strong key={i}>{strong[1]}</strong>); continue; }
      }
    }
  }
  return <As>{children}</As>;
}