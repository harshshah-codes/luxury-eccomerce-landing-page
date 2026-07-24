'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadConfig, loadProducts, type SiteConfig, type Product } from '@/lib/site-config';
import { img, RichText } from '@/lib/helpers';
import { initRevealObserver } from '@/lib/animations';
import Footer from '@/components/footer';

export default function ShopPage() {
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

  return (
    <div className="page-fade">
      <section className="shop" style={{ paddingTop: '11rem' }}>
        <div className="shop__head">
          <h1 className="shop__title reveal"><RichText text={cfg.shop.title} /></h1>
          <p className="shop__sub reveal">{cfg.shop.subtitle}</p>
          <div className="shop__filters reveal">
            <div className="shop__count">{products.length} object{products.length === 1 ? '' : 's'}</div>
          </div>
        </div>
        <div className="product-grid">
          {products.map(p => (
            <Link className="product-card reveal" href={`/products/${p.id}`} key={p.id}>
              <div className="product-card__image">
                <span className="product-card__tag">{p.tag}</span>
                <img className="lazy-img" src={img(p.images[0])} alt={p.name} />
              </div>
              <div className="product-card__category">{p.category}</div>
              <div className="product-card__name">{p.name}</div>
              <div className="product-card__meta">
                <div className="product-card__price">{p.price}</div>
                <div className="product-card__arrow">View →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer cfg={cfg} />
    </div>
  );
}
