'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  loadConfig, saveConfig, reseed,
  loadProducts, saveProducts,
  type SiteConfig, type Product
} from '@/lib/site-config';
import { img, ADMIN_TABS } from '@/lib/helpers';

type AdminTab = typeof ADMIN_TABS[number];

const TAB_LABELS: Record<AdminTab, string> = {
  products: 'Products', hero: 'Hero', marquee: 'Marquee',
  manifesto: 'Manifesto', categories: 'Categories', atelier: 'Atelier',
  principles: 'Principles', footer: 'Footer', shop: 'Shop', atelierpage: 'Atelier Page'
};

// ---------- Login Page ----------
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid');
      const data = await res.json();
      localStorage.setItem('mh_admin_token', data.token);
      onLogin();
    } catch {
      setError('Invalid credentials');
      setPassword('');
    }
  };

  return (
    <div className="page-fade">
      <section className="admin">
        <div className="admin__inner">
          <div className="admin__head">
            <div>
              <div className="admin__sub">Concierge · Private</div>
              <h1 className="admin__title">The <em>register</em>.</h1>
            </div>
          </div>
          <form className="admin__login" onSubmit={handleSubmit}>
            <div className="admin__login-title">Private access</div>
            <div className="admin__login-sub">Enter the concierge credentials.</div>
            <input
              type="text" className="admin__input"
              placeholder="Username" autoComplete="username"
              value={username} onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password" className="admin__input"
              placeholder="Password" autoComplete="current-password"
              value={password} onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="admin__error show">{error}</div>}
            <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Enter the register <span className="btn__arrow"></span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// ---------- Config Field Component ----------
function ConfigField({ id, label, value, onChange, type = 'text' }: {
  id: string; label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  if (type === 'textarea') {
    return (
      <div className="admin__field">
        <label className="admin__field-label" htmlFor={id}>{label}</label>
        <textarea id={id} placeholder={label} value={value} onChange={e => onChange(e.target.value)} />
      </div>
    );
  }
  return (
    <div className="admin__field">
      <label className="admin__field-label" htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} placeholder={label} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

// ---------- Admin Dashboard ----------
function Dashboard({ cfg: initialCfg, onLogout }: { cfg: SiteConfig; onLogout: () => void }) {
  const router = useRouter();
  const [cfg, setCfg] = useState(initialCfg);
  const [tab, setTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  // Product form state
  const [pf, setPf] = useState({ name: '', category: '', price: '', sku: '', year: '2024', tag: '', description: '', specs: '', images: '', story: '' });

  // Config section states
  const [hero, setHero] = useState({ ...cfg.hero });
  const [marqueeItems, setMarqueeItems] = useState(cfg.marqueeItems.join('\n'));
  const [manifesto, setManifesto] = useState({ ...cfg.manifesto });
  const [catsText, setCatsText] = useState(cfg.categories.map(c => `${c.name}|${c.imageUrl}`).join('\n'));
  const [atelier, setAtelier] = useState({
    label: cfg.atelier.label, title: cfg.atelier.title, intro: cfg.atelier.intro,
    stats: cfg.atelier.stats.map(s => `${s.num}|${s.label}`).join('\n'),
    images: cfg.atelier.images.map(im => `${im.url}|${im.caption}|${im.wide ? '1' : '0'}`).join('\n')
  });
  const [principlesText, setPrinciplesText] = useState(cfg.principles.map(p => `${p.num}|${p.name}|${p.desc}|${p.detail}`).join('\n'));
  const [footer, setFooter] = useState({
    whatsapp: cfg.whatsappNumber || '',
    brand: cfg.footer.brand, tag: cfg.footer.tag,
    columns: cfg.footer.columns.map(col => {
      const links = col.links.map(l => `${l.label}${l.href ? `:${l.href}` : ''}`).join(', ');
      return `${col.title}|${links}`;
    }).join('\n'),
    copyright: cfg.footer.copyright, tagline: cfg.footer.tagline
  });
  const [shop, setShop] = useState({ title: cfg.shop.title, subtitle: cfg.shop.subtitle });
  const [ap, setAp] = useState({
    heroEyebrow: cfg.atelierPage.heroEyebrow, heroTitle: cfg.atelierPage.heroTitle,
    heroSub: cfg.atelierPage.heroSub, heroImageUrl: cfg.atelierPage.heroImageUrl,
    heroMetaNum: cfg.atelierPage.heroMetaNum, heroMetaText: cfg.atelierPage.heroMetaText,
    sectionLabel: cfg.atelierPage.sectionLabel, sectionTitle: cfg.atelierPage.sectionTitle,
    sectionIntro: cfg.atelierPage.sectionIntro,
    stats: cfg.atelierPage.stats.map(s => `${s.num}|${s.label}`).join('\n'),
    images: cfg.atelierPage.images.map(im => `${im.url}|${im.caption}|${im.wide ? '1' : '0'}`).join('\n'),
    principlesTitle: cfg.atelierPage.principlesTitle, principlesIntro: cfg.atelierPage.principlesIntro,
    principles: cfg.atelierPage.principles.map(p => `${p.num}|${p.name}|${p.desc}|${p.detail}`).join('\n')
  });

  useEffect(() => { 
    if (typeof window !== 'undefined') {
      loadProducts().then(setProducts);
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const updateCfg = useCallback(async (updated: SiteConfig) => {
    await saveConfig(updated);
    setCfg(updated);
  }, []);

  // ------- Product CRUD -------
  const resetPf = () => setPf({ name: '', category: cfg.categories[0]?.name || 'Timepieces', price: '', sku: '', year: '2024', tag: '', description: '', specs: '', images: '', story: '' });

  const handleProductSave = async () => {
    if (!pf.name.trim()) { showToast('A name is required'); return; }
    const specs = pf.specs.split('\n').filter(Boolean).map(l => {
      const [label, ...rest] = l.split(':');
      return { label: label.trim(), value: rest.join(':').trim() };
    }).filter(s => s.label && s.value);
    const images = pf.images.split(',').map(s => s.trim()).filter(Boolean);
    const product: Product = {
      id: editingId || 'p' + Date.now(),
      name: pf.name, nameEm: pf.name,
      category: pf.category || cfg.categories[0]?.name || 'Timepieces',
      price: pf.price || 'Price on request',
      sku: pf.sku || 'MH-XX-000',
      year: pf.year || new Date().getFullYear().toString(),
      tag: pf.tag || 'New',
      description: pf.description, specs, images,
      story: pf.story
    };
    let updated = await loadProducts();
    if (editingId) {
      updated = updated.map(p => p.id === editingId ? product : p);
      showToast('Object updated');
    } else {
      updated.push(product);
      showToast('Object added to register');
    }
    await saveProducts(updated);
    setProducts(updated);
    setEditingId(null);
    resetPf();
  };

  const handleProductEdit = (id: string) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    setEditingId(id);
    setPf({
      name: p.name, category: p.category, price: p.price, sku: p.sku,
      year: p.year, tag: p.tag, description: p.description,
      specs: (p.specs || []).map(s => `${s.label}: ${s.value}`).join('\n'),
      images: (p.images || []).join(', '), story: p.story || ''
    });
  };

  const handleProductDelete = async (id: string) => {
    const p = products.find(x => x.id === id);
    if (!p || !confirm(`Remove "${p.name}" from the register?`)) return;
    const updated = products.filter(x => x.id !== id);
    await saveProducts(updated);
    setProducts(updated);
    showToast('Object removed from register');
  };

  const handleCancelEdit = () => { setEditingId(null); resetPf(); };

  // ------- Config saves -------
  const saveHero = () => {
    updateCfg({ ...cfg, hero: { ...hero } });
    showToast('Hero saved');
  };
  const saveMarquee = () => {
    const items = marqueeItems.split('\n').map(s => s.trim()).filter(Boolean);
    updateCfg({ ...cfg, marqueeItems: items });
    showToast('Marquee saved');
  };
  const saveManifesto = () => {
    updateCfg({ ...cfg, manifesto: { ...manifesto } });
    showToast('Manifesto saved');
  };
  const saveCategories = () => {
    const cats = catsText.split('\n').filter(Boolean).map(line => {
      const [name, imageUrl] = line.split('|').map(s => s.trim());
      return { name: name || 'Category', imageUrl: imageUrl || 'cat-' + Date.now() };
    });
    updateCfg({ ...cfg, categories: cats });
    showToast('Categories saved');
  };
  const saveAtelier = () => {
    const stats = atelier.stats.split('\n').filter(Boolean).map(line => {
      const [num, label] = line.split('|').map(s => s.trim());
      return { num: num || '', label: label || '' };
    });
    const images = atelier.images.split('\n').filter(Boolean).map(line => {
      const [url, caption, wide] = line.split('|').map(s => s.trim());
      return { url: url || '', caption: caption || '', wide: wide === '1' };
    });
    updateCfg({ ...cfg, atelier: { label: atelier.label, title: atelier.title, intro: atelier.intro, stats, images } });
    showToast('Atelier saved');
  };
  const savePrinciples = () => {
    const principles = principlesText.split('\n').filter(Boolean).map(line => {
      const [num, name, desc, detail] = line.split('|').map(s => s.trim());
      return { num: num || '', name: name || '', desc: desc || '', detail: detail || '' };
    });
    updateCfg({ ...cfg, principles });
    showToast('Principles saved');
  };
  const saveFooter = () => {
    const columns = footer.columns.split('\n').filter(Boolean).map(line => {
      const [title, linksStr] = line.split('|').map(s => s.trim());
      const links = linksStr ? linksStr.split(',').map(s => {
        const parts = s.trim().split(':');
        return { label: parts[0]?.trim() || '', href: parts[1]?.trim() || undefined };
      }) : [];
      return { title: title || '', links };
    });
    updateCfg({ ...cfg, whatsappNumber: footer.whatsapp, footer: { brand: footer.brand, tag: footer.tag, columns, copyright: footer.copyright, tagline: footer.tagline } });
    showToast('Footer saved');
  };
  const saveShop = () => {
    updateCfg({ ...cfg, shop: { ...shop } });
    showToast('Shop page saved');
  };
  const saveAtelierPage = () => {
    const stats = ap.stats.split('\n').filter(Boolean).map(line => {
      const [num, label] = line.split('|').map(s => s.trim());
      return { num: num || '', label: label || '' };
    });
    const images = ap.images.split('\n').filter(Boolean).map(line => {
      const [url, caption, wide] = line.split('|').map(s => s.trim());
      return { url: url || '', caption: caption || '', wide: wide === '1' };
    });
    const principles = ap.principles.split('\n').filter(Boolean).map(line => {
      const [num, name, desc, detail] = line.split('|').map(s => s.trim());
      return { num: num || '', name: name || '', desc: desc || '', detail: detail || '' };
    });
    updateCfg({ ...cfg, atelierPage: {
      heroEyebrow: ap.heroEyebrow, heroTitle: ap.heroTitle, heroSub: ap.heroSub,
      heroImageUrl: ap.heroImageUrl, heroMetaNum: ap.heroMetaNum, heroMetaText: ap.heroMetaText,
      sectionLabel: ap.sectionLabel, sectionTitle: ap.sectionTitle, sectionIntro: ap.sectionIntro,
      stats, images, principlesTitle: ap.principlesTitle, principlesIntro: ap.principlesIntro, principles
    }});
    showToast('Atelier page saved');
  };
  const handleResetAll = async () => {
    if (!confirm('Restore all content to defaults? Products, site config, everything will reset.')) return;
    await reseed();
    const fresh = await loadConfig();
    setCfg(fresh);
    setProducts(await loadProducts());
    setHero({ ...fresh.hero });
    setMarqueeItems(fresh.marqueeItems.join('\n'));
    setManifesto({ ...fresh.manifesto });
    setCatsText(fresh.categories.map(c => `${c.name}|${c.imageUrl}`).join('\n'));
    setAtelier({
      label: fresh.atelier.label, title: fresh.atelier.title, intro: fresh.atelier.intro,
      stats: fresh.atelier.stats.map(s => `${s.num}|${s.label}`).join('\n'),
      images: fresh.atelier.images.map(im => `${im.url}|${im.caption}|${im.wide ? '1' : '0'}`).join('\n')
    });
    setPrinciplesText(fresh.principles.map(p => `${p.num}|${p.name}|${p.desc}|${p.detail}`).join('\n'));
    setFooter({
      whatsapp: fresh.whatsappNumber || '',
      brand: fresh.footer.brand, tag: fresh.footer.tag,
      columns: fresh.footer.columns.map(col => {
        const links = col.links.map(l => `${l.label}${l.href ? `:${l.href}` : ''}`).join(', ');
        return `${col.title}|${links}`;
      }).join('\n'),
      copyright: fresh.footer.copyright, tagline: fresh.footer.tagline
    });
    setShop({ title: fresh.shop.title, subtitle: fresh.shop.subtitle });
    setAp({
      heroEyebrow: fresh.atelierPage.heroEyebrow, heroTitle: fresh.atelierPage.heroTitle,
      heroSub: fresh.atelierPage.heroSub, heroImageUrl: fresh.atelierPage.heroImageUrl,
      heroMetaNum: fresh.atelierPage.heroMetaNum, heroMetaText: fresh.atelierPage.heroMetaText,
      sectionLabel: fresh.atelierPage.sectionLabel, sectionTitle: fresh.atelierPage.sectionTitle,
      sectionIntro: fresh.atelierPage.sectionIntro,
      stats: fresh.atelierPage.stats.map(s => `${s.num}|${s.label}`).join('\n'),
      images: fresh.atelierPage.images.map(im => `${im.url}|${im.caption}|${im.wide ? '1' : '0'}`).join('\n'),
      principlesTitle: fresh.atelierPage.principlesTitle, principlesIntro: fresh.atelierPage.principlesIntro,
      principles: fresh.atelierPage.principles.map(p => `${p.num}|${p.name}|${p.desc}|${p.detail}`).join('\n')
    });
    showToast('All defaults restored');
  };

  // ------- Render sections -------
  const renderSidebar = () => {
    switch (tab) {
      case 'products':
        return (
          <div>
            <div className="admin__sidebar-title">{editingId ? 'Edit object' : 'Add new object'}</div>
            <ConfigField id="f-name" label="Name" value={pf.name} onChange={v => setPf(p => ({ ...p, name: v }))} />
            <div className="admin__field">
              <label className="admin__field-label">Category</label>
              <select value={pf.category} onChange={e => setPf(p => ({ ...p, category: e.target.value }))}>
                {cfg.categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <ConfigField id="f-price" label="Price" value={pf.price} onChange={v => setPf(p => ({ ...p, price: v }))} />
            <ConfigField id="f-sku" label="SKU / Reference" value={pf.sku} onChange={v => setPf(p => ({ ...p, sku: v }))} />
            <ConfigField id="f-year" label="Year" value={pf.year} onChange={v => setPf(p => ({ ...p, year: v }))} />
            <ConfigField id="f-tag" label="Tag" value={pf.tag} onChange={v => setPf(p => ({ ...p, tag: v }))} />
            <ConfigField id="f-description" label="Description" value={pf.description} onChange={v => setPf(p => ({ ...p, description: v }))} type="textarea" />
            <ConfigField id="f-specs" label="Specifications (Label: Value per line)" value={pf.specs} onChange={v => setPf(p => ({ ...p, specs: v }))} type="textarea" />
            <ConfigField id="f-images" label="Image URLs (comma separated)" value={pf.images} onChange={v => setPf(p => ({ ...p, images: v }))} />
            <ConfigField id="f-story" label="Story" value={pf.story} onChange={v => setPf(p => ({ ...p, story: v }))} type="textarea" />
            <div className="admin__actions">
              <button className="admin__btn" onClick={handleProductSave}>{editingId ? 'Save changes' : 'Add object'}</button>
              {editingId && <button className="admin__btn admin__btn--outline" onClick={handleCancelEdit}>Cancel</button>}
            </div>
          </div>
        );
      case 'hero':
        return (
          <div>
            <div className="admin__sidebar-title">Hero Section</div>
            <ConfigField id="cfg-hero-eyebrow" label="Eyebrow" value={hero.eyebrow} onChange={v => setHero(h => ({ ...h, eyebrow: v }))} />
            <ConfigField id="cfg-hero-title" label="Title" value={hero.title} onChange={v => setHero(h => ({ ...h, title: v }))} type="textarea" />
            <ConfigField id="cfg-hero-subtitle" label="Subtitle" value={hero.subtitle} onChange={v => setHero(h => ({ ...h, subtitle: v }))} type="textarea" />
            <ConfigField id="cfg-hero-image" label="Image URL" value={hero.imageUrl} onChange={v => setHero(h => ({ ...h, imageUrl: v }))} />
            <ConfigField id="cfg-hero-meta-num" label="Meta number" value={hero.metaNum} onChange={v => setHero(h => ({ ...h, metaNum: v }))} />
            <ConfigField id="cfg-hero-meta-text" label="Meta text" value={hero.metaText} onChange={v => setHero(h => ({ ...h, metaText: v }))} />
            <div className="admin__actions"><button className="admin__btn" onClick={saveHero}>Save Hero</button></div>
          </div>
        );
      case 'marquee':
        return (
          <div>
            <div className="admin__sidebar-title">Marquee Items</div>
            <div className="admin__field">
              <label className="admin__field-label">Items (one per line)</label>
              <textarea value={marqueeItems} onChange={e => setMarqueeItems(e.target.value)} placeholder="Timepieces" />
            </div>
            <div className="admin__actions"><button className="admin__btn" onClick={saveMarquee}>Save Marquee</button></div>
          </div>
        );
      case 'manifesto':
        return (
          <div>
            <div className="admin__sidebar-title">Manifesto</div>
            <ConfigField id="cfg-manifesto-label" label="Label" value={manifesto.label} onChange={v => setManifesto(m => ({ ...m, label: v }))} />
            <ConfigField id="cfg-manifesto-quote" label="Quote" value={manifesto.quote} onChange={v => setManifesto(m => ({ ...m, quote: v }))} type="textarea" />
            <ConfigField id="cfg-manifesto-attribution" label="Attribution name" value={manifesto.attribution} onChange={v => setManifesto(m => ({ ...m, attribution: v }))} />
            <ConfigField id="cfg-manifesto-role" label="Attribution role" value={manifesto.role} onChange={v => setManifesto(m => ({ ...m, role: v }))} />
            <div className="admin__actions"><button className="admin__btn" onClick={saveManifesto}>Save Manifesto</button></div>
          </div>
        );
      case 'categories':
        return (
          <div>
            <div className="admin__sidebar-title">Categories</div>
            <div className="admin__field">
              <label className="admin__field-label">Categories (one per line: Name|imageUrl)</label>
              <textarea value={catsText} onChange={e => setCatsText(e.target.value)} placeholder="Timepieces|cat-timepieces" />
            </div>
            <div className="admin__actions"><button className="admin__btn" onClick={saveCategories}>Save Categories</button></div>
          </div>
        );
      case 'atelier':
        return (
          <div>
            <div className="admin__sidebar-title">Atelier (Home)</div>
            <ConfigField id="cfg-atelier-label" label="Label" value={atelier.label} onChange={v => setAtelier(a => ({ ...a, label: v }))} />
            <ConfigField id="cfg-atelier-title" label="Title" value={atelier.title} onChange={v => setAtelier(a => ({ ...a, title: v }))} type="textarea" />
            <ConfigField id="cfg-atelier-intro" label="Intro" value={atelier.intro} onChange={v => setAtelier(a => ({ ...a, intro: v }))} type="textarea" />
            <div className="admin__field">
              <label className="admin__field-label">Stats (one per line: num|label)</label>
              <textarea value={atelier.stats} onChange={e => setAtelier(a => ({ ...a, stats: e.target.value }))} placeholder="1923|Year founded" />
            </div>
            <div className="admin__field">
              <label className="admin__field-label">Images (one per line: url|caption|wide(1/0))</label>
              <textarea value={atelier.images} onChange={e => setAtelier(a => ({ ...a, images: e.target.value }))} placeholder="atelier-bench|— caption|1" />
            </div>
            <div className="admin__actions"><button className="admin__btn" onClick={saveAtelier}>Save Atelier</button></div>
          </div>
        );
      case 'principles':
        return (
          <div>
            <div className="admin__sidebar-title">Principles</div>
            <div className="admin__field">
              <label className="admin__field-label">Principles (one per line: num|name|desc|detail)</label>
              <textarea value={principlesText} onChange={e => setPrinciplesText(e.target.value)} placeholder="I|One object, one hand|Each object is...|Principle · 1923" />
            </div>
            <div className="admin__actions"><button className="admin__btn" onClick={savePrinciples}>Save Principles</button></div>
          </div>
        );
      case 'footer':
        return (
          <div>
            <div className="admin__sidebar-title">Footer</div>
            <ConfigField id="cfg-footer-brand" label="Brand" value={footer.brand} onChange={v => setFooter(f => ({ ...f, brand: v }))} />
            <ConfigField id="cfg-footer-tag" label="Tag line" value={footer.tag} onChange={v => setFooter(f => ({ ...f, tag: v }))} type="textarea" />
            <div className="admin__field">
              <label className="admin__field-label">Columns (one per line: Title|link1:url, link2)</label>
              <textarea value={footer.columns} onChange={e => setFooter(f => ({ ...f, columns: e.target.value }))} placeholder="Maison|Heritage:/, The Atelier:/atelier" />
            </div>
            <ConfigField id="cfg-footer-copyright" label="Copyright" value={footer.copyright} onChange={v => setFooter(f => ({ ...f, copyright: v }))} />
            <ConfigField id="cfg-footer-tagline" label="Tagline" value={footer.tagline} onChange={v => setFooter(f => ({ ...f, tagline: v }))} />
            <ConfigField id="cfg-footer-whatsapp" label="WhatsApp number" value={footer.whatsapp} onChange={v => setFooter(f => ({ ...f, whatsapp: v }))} />
            <div className="admin__actions"><button className="admin__btn" onClick={saveFooter}>Save Footer</button></div>
          </div>
        );
      case 'shop':
        return (
          <div>
            <div className="admin__sidebar-title">Shop Page</div>
            <ConfigField id="cfg-shop-title" label="Title" value={shop.title} onChange={v => setShop(s => ({ ...s, title: v }))} />
            <ConfigField id="cfg-shop-subtitle" label="Subtitle" value={shop.subtitle} onChange={v => setShop(s => ({ ...s, subtitle: v }))} type="textarea" />
            <div className="admin__actions"><button className="admin__btn" onClick={saveShop}>Save Shop Page</button></div>
          </div>
        );
      case 'atelierpage':
        return (
          <div>
            <div className="admin__sidebar-title">Atelier Page</div>
            <h3 style={{ font: 'var(--serif)', fontSize: '1rem', margin: '1rem 0 0.5rem', opacity: 0.6 }}>Hero</h3>
            <ConfigField id="cfg-ap-hero-eyebrow" label="Hero Eyebrow" value={ap.heroEyebrow} onChange={v => setAp(a => ({ ...a, heroEyebrow: v }))} />
            <ConfigField id="cfg-ap-hero-title" label="Hero Title" value={ap.heroTitle} onChange={v => setAp(a => ({ ...a, heroTitle: v }))} type="textarea" />
            <ConfigField id="cfg-ap-hero-sub" label="Hero Subtitle" value={ap.heroSub} onChange={v => setAp(a => ({ ...a, heroSub: v }))} type="textarea" />
            <ConfigField id="cfg-ap-hero-image" label="Hero Image URL" value={ap.heroImageUrl} onChange={v => setAp(a => ({ ...a, heroImageUrl: v }))} />
            <ConfigField id="cfg-ap-hero-meta-num" label="Hero Meta number" value={ap.heroMetaNum} onChange={v => setAp(a => ({ ...a, heroMetaNum: v }))} />
            <ConfigField id="cfg-ap-hero-meta-text" label="Hero Meta text" value={ap.heroMetaText} onChange={v => setAp(a => ({ ...a, heroMetaText: v }))} />
            <h3 style={{ font: 'var(--serif)', fontSize: '1rem', margin: '1rem 0 0.5rem', opacity: 0.6 }}>Section</h3>
            <ConfigField id="cfg-ap-section-label" label="Section Label" value={ap.sectionLabel} onChange={v => setAp(a => ({ ...a, sectionLabel: v }))} />
            <ConfigField id="cfg-ap-section-title" label="Section Title" value={ap.sectionTitle} onChange={v => setAp(a => ({ ...a, sectionTitle: v }))} type="textarea" />
            <ConfigField id="cfg-ap-section-intro" label="Section Intro" value={ap.sectionIntro} onChange={v => setAp(a => ({ ...a, sectionIntro: v }))} type="textarea" />
            <h3 style={{ font: 'var(--serif)', fontSize: '1rem', margin: '1rem 0 0.5rem', opacity: 0.6 }}>Stats</h3>
            <div className="admin__field">
              <label className="admin__field-label">Stats (one per line: num|label)</label>
              <textarea value={ap.stats} onChange={e => setAp(a => ({ ...a, stats: e.target.value }))} placeholder="23|Artisans" />
            </div>
            <h3 style={{ font: 'var(--serif)', fontSize: '1rem', margin: '1rem 0 0.5rem', opacity: 0.6 }}>Images</h3>
            <div className="admin__field">
              <label className="admin__field-label">Images (one per line: url|caption|wide(1/0))</label>
              <textarea value={ap.images} onChange={e => setAp(a => ({ ...a, images: e.target.value }))} placeholder="atelier-watch|— caption|1" />
            </div>
            <h3 style={{ font: 'var(--serif)', fontSize: '1rem', margin: '1rem 0 0.5rem', opacity: 0.6 }}>Principles</h3>
            <ConfigField id="cfg-ap-principles-title" label="Principles Title" value={ap.principlesTitle} onChange={v => setAp(a => ({ ...a, principlesTitle: v }))} />
            <ConfigField id="cfg-ap-principles-intro" label="Principles Intro" value={ap.principlesIntro} onChange={v => setAp(a => ({ ...a, principlesIntro: v }))} type="textarea" />
            <div className="admin__field">
              <label className="admin__field-label">Principles (one per line: num|name|desc|detail)</label>
              <textarea value={ap.principles} onChange={e => setAp(a => ({ ...a, principles: e.target.value }))} placeholder="I|Watchmaking|Tourbillons...|Atelier · 1st floor" />
            </div>
            <div className="admin__actions"><button className="admin__btn" onClick={saveAtelierPage}>Save Atelier Page</button></div>
          </div>
        );
    }
  };

  const renderContent = () => {
    if (tab === 'products') {
      return (
        <div>
          <div className="admin__list-head">
            <div className="admin__list-title">All objects</div>
            <div className="admin__list-count">{products.length} registered</div>
          </div>
          <div className="admin__list">
            {products.map(p => (
              <div className="admin__product" key={p.id}>
                <div className="admin__product-image">
                  <img src={img(p.images[0])} alt={p.name} />
                </div>
                <div className="admin__product-info">
                  <div className="admin__product-name">{p.name}</div>
                  <div className="admin__product-meta">{p.category} · {p.sku} · {p.price}</div>
                </div>
                <div className="admin__product-actions">
                  <button className="admin__icon-btn" onClick={() => handleProductEdit(p.id)} title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="admin__icon-btn admin__icon-btn--danger" onClick={() => handleProductDelete(p.id)} title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-mute)' }}>The register is empty. Add your first object above.</div>}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="admin__list-head"><div className="admin__list-title">{TAB_LABELS[tab]} Preview</div></div>
        <p style={{ color: 'var(--text-soft)' }}>Save changes above to update this section.</p>
      </div>
    );
  };

  return (
    <div className="page-fade">
      {toast && <div className="toast show">{toast}</div>}
      <section className="admin">
        <div className="admin__inner">
          <div className="admin__head">
            <div>
              <div className="admin__sub">Concierge · Private register</div>
              <h1 className="admin__title">The <em>register</em>.</h1>
            </div>
            <div className="admin__actions-top">
              <button className="admin__btn admin__btn--outline" onClick={handleResetAll}>Restore defaults</button>
              <button className="admin__btn admin__btn--outline" onClick={onLogout}>Sign out</button>
            </div>
          </div>

          <div className="admin__tabs">
            {ADMIN_TABS.map(t => (
              <button
                key={t}
                className={`admin__tab ${tab === t ? 'active' : ''}`}
                onClick={() => { setTab(t); setEditingId(null); resetPf(); }}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>

          <div className="admin__layout">
            <div className="admin__sidebar">{renderSidebar()}</div>
            <div>{renderContent()}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Admin Page (handles auth) ----------
export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [cfg, setCfg] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure we're on the client side before doing any database operations
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const token = localStorage.getItem('mh_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    }).then(async (res) => {
        if (res.ok) {
          setAuthed(true);
          const config = await loadConfig();
          setCfg(config);
        } else {
          localStorage.removeItem('mh_admin_token');
        }
    }).catch(() => {
      localStorage.removeItem('mh_admin_token');
    }).finally(() => setLoading(false));
  }, [mounted]);

  const handleLogin = async () => {
    setAuthed(true);
    const config = await loadConfig();
    setCfg(config);
  };

  const handleLogout = () => {
    localStorage.removeItem('mh_admin_token');
    setAuthed(false);
  };

  if (!mounted || loading) return null;

  if (!authed) return <LoginForm onLogin={handleLogin} />;
  if (!cfg) return null;

  return <Dashboard cfg={cfg} onLogout={handleLogout} />;
}
