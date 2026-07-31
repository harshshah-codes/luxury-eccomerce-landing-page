'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { loadConfig, loadProducts, type SiteConfig, type Product } from '@/lib/site-config';
import { initRevealObserver } from '@/lib/animations';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';

export default function CategoryProductsPage() {
  const params = useParams();
  const categorySlug = params.id as string;
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

  const filterNormalized = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const filtered = products.filter(p => p.category === filterNormalized);

  return (
    <div className="page-fade">
      <section className="shop" style={{ paddingTop: '11rem' }}>
        <div className="shop__head">
          <div className="shop__breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/categories">Categories</a>
            <span>/</span>
            <span>{filterNormalized}</span>
          </div>
          <h1 className="shop__title reveal">{filterNormalized}</h1>
          <div className="shop__filters reveal">
            <div className="shop__count">{filtered.length} object{filtered.length === 1 ? '' : 's'}</div>
          </div>
        </div>
        <div className="product-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <Footer cfg={cfg} />
    </div>
  );
}
