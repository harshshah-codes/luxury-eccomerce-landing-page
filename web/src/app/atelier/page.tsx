'use client';

import { useEffect, useState } from 'react';
import { loadConfig, loadProducts, type SiteConfig, type Product } from '@/lib/site-config';
import { img, RichText } from '@/lib/helpers';
import { initRevealObserver } from '@/lib/animations';
import Footer from '@/components/footer';

export default function AtelierPage() {
  const [cfg, setCfg] = useState<SiteConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const config = await loadConfig();
      const allProducts = await loadProducts();
      setCfg(config);
      setProducts(allProducts);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!cfg) return;
    initRevealObserver();
  }, [cfg]);

  if (!cfg || products.length === 0) return null;

  const p = cfg.atelierPage;

  const cats = cfg.categories;

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="atelier-hero" style={{ paddingTop: '11rem', paddingBottom: '6rem' }}>
        <div className="atelier-hero__inner" style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 2rem' }}>
          <div className="hero__eyebrow reveal">
            <span className="line"></span>
            <span className="label">{p.heroEyebrow}</span>
          </div>
          <h1 className="atelier__title reveal"><RichText text={p.heroTitle} /></h1>
          <p className="atelier__intro reveal">{p.heroSub}</p>
          <div className="atelier-hero__meta reveal">
            <span className="atelier-hero__num">{p.heroMetaNum}</span>
            <span className="atelier-hero__text"><RichText text={p.heroMetaText} /></span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="atelier-stats" style={{ padding: '4rem 2rem', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          {p.stats.map((s, i) => (
            <div className="reveal" key={i}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: 1, marginBottom: '0.4rem' }}>{s.num}</div>
              <div style={{ fontSize: '13px', letterSpacing: '0.05em', color: 'var(--text-mute)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="atelier-principles" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="hero__eyebrow reveal" style={{ marginBottom: '1.5rem' }}>
            <span className="line"></span>
            <span className="label">{p.sectionLabel}</span>
          </div>
          <h2 className="categories__title reveal" style={{ marginBottom: '1.5rem' }}><RichText text={p.principlesTitle} /></h2>
          <p className="atelier__intro reveal" style={{ marginBottom: '4rem' }}>{p.principlesIntro}</p>
          <div className="principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {p.principles.map((pr, i) => (
              <div className="principle-card reveal" key={i}
                style={{ padding: '2rem', border: '1px solid var(--line)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--text-mute)', marginBottom: '1rem' }}>{pr.detail}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  <span style={{ opacity: 0.4, marginRight: '0.6rem' }}>{pr.num}</span>
                  {pr.name}
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-soft)' }}>{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories" style={{ padding: '2rem 2rem 6rem' }}>
        <div className="categories__head" style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <h2 className="categories__title reveal" style={{ marginBottom: '0.5rem' }}>Disciplines</h2>
          <p className="atelier__intro reveal" style={{ marginBottom: '3rem' }}>{p.sectionIntro}</p>
        </div>
        <div className="categories__grid" style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          {cats.map((cat, i) => {
            const count = products.filter(pr => pr.category === cat.name).length;
            return (
              <a className="category-card reveal" href={`/shop?category=${cat.name.toLowerCase().replace(/\s/g, '-')}`} key={cat.name}>
                <div className="category-card__num">N° {String(i + 1).padStart(2, '0')}</div>
                <div className="category-card__image">
                  <img className="lazy-img" src={img(cat.imageUrl)} alt={cat.name} />
                </div>
                <div className="category-card__name">{cat.name}</div>
                <div className="category-card__count">{count} object{count === 1 ? '' : 's'} · View →</div>
              </a>
            );
          })}
        </div>
      </section>

      <Footer cfg={cfg} />
    </div>
  );
}
