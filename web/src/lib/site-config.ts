export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  nameEm?: string;
  category: string;
  price: string;
  sku: string;
  year: string;
  tag: string;
  description: string;
  specs: Spec[];
  images: string[];
  story: string;
}

export interface ConfigStat {
  num: string;
  label: string;
}

export interface ConfigImage {
  url: string;
  caption: string;
  wide: boolean;
}

export interface ConfigPrinciple {
  num: string;
  name: string;
  desc: string;
  detail: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href?: string }[];
}

export interface SiteConfig {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    metaNum: string;
    metaText: string;
  };
  marqueeItems: string[];
  manifesto: {
    label: string;
    quote: string;
    attribution: string;
    role: string;
  };
  categories: { name: string; imageUrl: string }[];
  featured: {
    title: string;
  };
  atelier: {
    label: string;
    title: string;
    intro: string;
    stats: ConfigStat[];
    images: ConfigImage[];
  };
  principles: ConfigPrinciple[];
  footer: {
    brand: string;
    tag: string;
    columns: FooterColumn[];
    copyright: string;
    tagline: string;
  };
  whatsappNumber: string;
  shop: {
    title: string;
    subtitle: string;
  };
  atelierPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSub: string;
    heroImageUrl: string;
    heroMetaNum: string;
    heroMetaText: string;
    sectionLabel: string;
    sectionTitle: string;
    sectionIntro: string;
    stats: ConfigStat[];
    images: ConfigImage[];
    principlesTitle: string;
    principlesIntro: string;
    principles: ConfigPrinciple[];
  };
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mh_admin_token');
}

function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function loadProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function loadConfig(): Promise<SiteConfig> {
  const res = await fetch('/api/config');
  if (!res.ok) throw new Error('Failed to load site config');
  return res.json();
}

export async function saveProducts(products: Product[]): Promise<void> {
  const res = await fetch('/api/products/admin', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(products)
  });
  if (!res.ok) throw new Error('Failed to save products');
}

export async function saveConfig(config: SiteConfig): Promise<void> {
  const res = await fetch('/api/config/admin', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(config)
  });
  if (!res.ok) throw new Error('Failed to save site config');
}

export async function resetProducts(): Promise<void> {
  const res = await fetch('/api/products/admin', {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Failed to reset products');
}

export async function reseed(): Promise<void> {
  const res = await fetch('/api/seed', {
    method: 'POST',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Failed to reseed database');
}
