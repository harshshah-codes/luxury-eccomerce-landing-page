'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadConfig, loadProducts, type SiteConfig } from '@/lib/site-config';
import { img, whatsappGeneralLink, RichText } from '@/lib/helpers';
import { initRevealObserver, initHomeAnimations } from '@/lib/animations';
import Footer from '@/components/footer';

export default function HomePage() {
  const [cfg, setCfg] = useState<SiteConfig | null>(null);
  const [products, setProducts] = useState<any[]>([]);

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
    initHomeAnimations();
    initRevealObserver();
  }, [cfg]);

  if (!cfg || products.length === 0) return null;

  const featured = products.slice(0, 3);
  const h = cfg.hero;
  const marqueeItems = cfg.marqueeItems;
  const m = cfg.manifesto;
  const cats = cfg.categories;
  const a = cfg.atelier;
  const principles = cfg.principles;

  return (
    <div className="page-fade">
      <section className="hero">
        <div className="hero__left">
          <div>
            <div className="hero__eyebrow" id="hero-eyebrow">
              <span className="line"></span>
              <span className="label">{h.eyebrow}</span>
            </div>
            <h1 className="hero__title" id="hero-title"><RichText text={h.title} /></h1>
            <p className="hero__sub" id="hero-sub">{h.subtitle}</p>
          </div>
          <div className="hero__cta" id="hero-cta">
            <Link className="btn" href="/shop">View the collections <span className="btn__arrow"></span></Link>
            <a className="btn btn--outline" href={whatsappGeneralLink()} target="_blank" rel="noopener">Speak to a concierge</a>
          </div>
        </div>
        <div className="hero__right" id="hero-right">
          <div className="hero__image" style={{ backgroundImage: `url('${img(h.imageUrl)}')` }}></div>
          <div className="hero__meta">
            <div className="hero__meta-num">{h.metaNum}</div>
            <div className="hero__meta-text"><RichText text={h.metaText} /></div>
          </div>
        </div>
        <div className="hero__scroll-cue">Scroll</div>
      </section>

      <div className="marquee">
        <div className="marquee__inner">
          {marqueeItems.map((item, i) => <span key={i}>{item}</span>)}
          {marqueeItems.map((item, i) => <span key={`dup-${i}`}>{item}</span>)}
        </div>
      </div>

      <section className="manifesto">
        <div className="manifesto__inner">
          <div className="manifesto__label reveal">
            <span className="line"></span>
            <span className="label">{m.label}</span>
          </div>
          <p className="manifesto__quote reveal"><RichText text={m.quote} /></p>
          <div className="manifesto__attribution reveal">
            <span>{m.attribution}</span>
            <span>·</span>
            <span>{m.role}</span>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="categories__head">
          <h2 className="categories__title reveal">Eight categories.<br />One standard.</h2>
          <p className="categories__sub reveal">Every object leaves the maison numbered, registered and accompanied by its maker's name. Below, the disciplines we have practiced, without interruption, since 1923.</p>
        </div>
        <div className="categories__grid">
          {cats.map((cat, i) => {
            const count = products.filter(p => p.category === cat.name).length;
            return (
              <Link className="category-card reveal" href={`/categories/${cat.name.toLowerCase().replace(/\s/g, '-')}`} key={cat.name}>
                <div className="category-card__num">N° {String(i + 1).padStart(2, '0')}</div>
                <div className="category-card__image">
                  <img className="lazy-img" src={img(cat.imageUrl)} alt={cat.name} />
                </div>
                <div className="category-card__name">{cat.name}</div>
                <div className="category-card__count">{count} object{count === 1 ? '' : 's'} · View →</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="featured">
        <div className="featured__head">
          <h2 className="featured__title reveal"><RichText text={cfg.featured.title} /></h2>
          <Link className="featured__link reveal" href="/products">All objects →</Link>
        </div>
        <div className="product-grid">
          {featured.map(p => (
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

      <section className="atelier">
        <div className="atelier__inner">
          <div className="atelier__left">
            <div className="atelier__label reveal">
              <span className="line"></span>
              <span className="label">{a.label}</span>
            </div>
            <h2 className="atelier__title reveal"><RichText text={a.title} /></h2>
            <p className="atelier__intro reveal">{a.intro}</p>
            <div className="atelier__stats reveal">
              {a.stats.map((s, i) => (
                <div key={i}>
                  <div className="atelier__stat-num">{s.num}</div>
                  <div className="atelier__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="atelier__right">
            {a.images.map((im, i) => (
              <div key={i}>
                <div className={`atelier__image${im.wide ? ' atelier__image--wide' : ''}`}>
                  <img className="lazy-img" src={img(im.url)} alt={im.caption} />
                </div>
                <div className="atelier__caption">{im.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="craft">
        <div className="craft__inner">
          <div className="craft__head">
            <h2 className="craft__title reveal">Six principles,<br />unchanged since <em>1923</em>.</h2>
            <p className="craft__intro reveal">Written by the founder in the first winter of the maison. Read at the start of each apprentice's tenure.</p>
          </div>
          <ul className="craft__list">
            {principles.map(p => (
              <li className="craft__row reveal" key={p.num}>
                <div className="craft__num">{p.num}.</div>
                <div className="craft__name">{p.name}</div>
                <div className="craft__desc">{p.desc}</div>
                <div className="craft__detail">{p.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer cfg={cfg} />
    </div>
  );
}
