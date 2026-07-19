'use client';

import { useEffect, useState } from 'react';
import { loadConfig, loadProducts, type SiteConfig } from '@/lib/site-config';
import { img } from '@/lib/helpers';
import { initRevealObserver } from '@/lib/animations';
import Footer from '@/components/footer';

export default function CategoriesPage() {
  const [cfg, setCfg] = useState<SiteConfig | null>(null);

  useEffect(() => {
    setCfg(loadConfig());
  }, []);

  useEffect(() => {
    if (!cfg) return;
    initRevealObserver();
  }, [cfg]);

  if (!cfg) return null;

  const products = loadProducts();
  const cats = cfg.categories;

  return (
    <div className="page-fade">
      <section className="categories" style={{ paddingTop: '11rem' }}>
        <div className="categories__head">
          <h1 className="shop__title reveal">Categories</h1>
          <p className="shop__sub reveal">Browse our collections by category.</p>
        </div>
        <div className="categories__grid">
          {cats.map((cat, i) => {
            const count = products.filter(p => p.category === cat.name).length;
            return (
              <a className="category-card reveal" href={`/categories/${cat.name.toLowerCase().replace(/\s/g, '-')}`} key={cat.name}>
                <div className="category-card__num">N° {String(i + 1).padStart(2, '0')}</div>
                <div className="category-card__image">
                  <img className="lazy-img" src={img(cat.imageSeed, 400, 400)} alt={cat.name} />
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
