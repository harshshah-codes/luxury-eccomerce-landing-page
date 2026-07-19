'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { loadConfig, loadProducts, type SiteConfig, type Product } from '@/lib/site-config';
import { img, whatsappLink } from '@/lib/helpers';
import { initRevealObserver } from '@/lib/animations';
import Footer from '@/components/footer';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [cfg, setCfg] = useState<SiteConfig | null>(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const config = loadConfig();
    const products = loadProducts();
    setCfg(config);
    setAllProducts(products);
    const p = products.find(x => x.id === id);
    setProduct(p);
    if (p) setMainImage(img(p.images[0], 900, 1125));
  }, [id]);

  useEffect(() => {
    if (!cfg) return;
    initRevealObserver();
  }, [cfg]);

  if (!cfg) return null;

  if (!product) {
    return (
      <div className="page-fade">
        <section className="product-detail">
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', paddingTop: '6rem' }}>
            <div className="label" style={{ marginBottom: '2rem' }}>Not found</div>
            <h1 className="serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>This object is not in the register.</h1>
            <p style={{ color: 'var(--text-soft)', marginBottom: '3rem' }}>The reference you are looking for may have been retired, or the link is incorrect.</p>
            <Link className="btn" href="/products">Return to collections <span className="btn__arrow"></span></Link>
          </div>
        </section>
        <Footer cfg={cfg} />
      </div>
    );
  }

  const related = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  const swapMainImage = (thumb: HTMLElement) => {
    document.querySelectorAll('.product-detail__thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const mainImg = document.getElementById('main-img-el') as HTMLImageElement;
    if (mainImg) {
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = thumb.dataset.img!;
        mainImg.style.opacity = '1';
      }, 200);
    }
  };

  return (
    <div className="page-fade">
      <section className="product-detail">
        <div className="product-detail__inner">
          <div className="product-detail__gallery">
            <div className="product-detail__main-image" id="main-image">
              <img id="main-img-el" src={mainImage || img(product.images[0], 900, 1125)} alt={product.name} />
            </div>
            <div className="product-detail__thumbs">
              {product.images.map((imgSeed, i) => (
                <div
                  className={`product-detail__thumb ${i === 0 ? 'active' : ''}`}
                  data-img={img(imgSeed, 900, 1125)}
                  onClick={(e) => swapMainImage(e.currentTarget)}
                  key={i}
                >
                  <img src={img(imgSeed, 200, 200)} alt={`${product.name} view ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="product-detail__info">
            <div className="product-detail__breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
              <span>/</span>
              <Link href={`/categories/${product.category.toLowerCase().replace(/\s/g, '-')}`}>{product.category}</Link>
              <span>/</span>
              <span>{product.name}</span>
            </div>
            <div className="product-detail__category">{product.category} · {product.year}</div>
            <h1 className="product-detail__name">{product.name}</h1>
            <div className="product-detail__price">{product.price} · Ref. {product.sku}</div>
            <p className="product-detail__desc">{product.description}</p>
            <ul className="product-detail__specs">
              {product.specs.map((s, i) => (
                <li key={i}>
                  <span className="product-detail__spec-label">{s.label}</span>
                  <span className="product-detail__spec-value">{s.value}</span>
                </li>
              ))}
            </ul>
            <div className="product-detail__cta">
              <a className="btn btn--whatsapp" href={whatsappLink(product.name, product.sku)} target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Order via WhatsApp</span>
              </a>
              <a className="btn btn--secondary" href={whatsappLink(product.name, product.sku)} target="_blank" rel="noopener">Request private viewing</a>
            </div>
            <div className="product-detail__assurance">
              <div className="assurance-item">
                <div className="assurance-item__title">Numbered & registered</div>
                <div className="assurance-item__desc">For life</div>
              </div>
              <div className="assurance-item">
                <div className="assurance-item__title">Repair, not replace</div>
                <div className="assurance-item__desc">In perpetuity</div>
              </div>
              <div className="assurance-item">
                <div className="assurance-item__title">Hand-delivered</div>
                <div className="assurance-item__desc">Within Europe</div>
              </div>
              <div className="assurance-item">
                <div className="assurance-item__title">14-day return</div>
                <div className="assurance-item__desc">Unworn, in original box</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="story-strip">
        <div className="story-strip__inner">
          <div>
            <div className="label reveal" style={{ marginBottom: '1.5rem' }}>— The story of this object</div>
            <h2 className="story-strip__title reveal">On the <em>{product.name}</em>.</h2>
            <p className="story-strip__text reveal">{product.story}</p>
            <div style={{ marginTop: '2rem' }}>
              <a className="btn btn--outline" href={whatsappLink(product.name, product.sku)} target="_blank" rel="noopener">Enquire on WhatsApp <span className="btn__arrow"></span></a>
            </div>
          </div>
          <div className="story-strip__image reveal">
            <img className="lazy-img" src={img(product.images[1] || product.images[0], 800, 640)} alt={`${product.name} story`} />
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="featured__head">
          <h2 className="featured__title reveal">You may also <em>consider</em>.</h2>
          <Link className="featured__link reveal" href="/products">All objects →</Link>
        </div>
        <div className="product-grid">
          {related.map(p => (
            <Link className="product-card reveal" href={`/products/${p.id}`} key={p.id}>
              <div className="product-card__image">
                <span className="product-card__tag">{p.tag}</span>
                <img className="lazy-img" src={img(p.images[0], 700, 875)} alt={p.name} />
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
