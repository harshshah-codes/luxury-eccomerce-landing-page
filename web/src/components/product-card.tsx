'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/site-config';
import { img } from '@/lib/helpers';

export default function ProductCard({ product }: { product: Product }) {
  const images = product.images.filter(Boolean);
  const count = images.length;
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const start = () => {
    if (count <= 1) return;
    stop();
    timer.current = setInterval(() => setIndex(i => (i + 1) % count), 2600);
  };

  useEffect(() => stop, []);

  const goTo = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i + count) % count);
  };

  return (
    <Link
      className="product-card reveal"
      href={`/products/${product.id}`}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <div className="product-card__image">
        <span className="product-card__tag">{product.tag}</span>
        <div className="product-card__slides" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((url, i) => (
            <img key={i} className="lazy-img" src={img(url)} alt={`${product.name} view ${i + 1}`} loading="lazy" />
          ))}
        </div>
        {count > 1 && (
          <>
            <div className="carousel-nav">
              <button type="button" className="carousel-nav__btn" onClick={goTo(index - 1)} aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button type="button" className="carousel-nav__btn" onClick={goTo(index + 1)} aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
            <div className="carousel-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot${i === index ? ' active' : ''}`}
                  onClick={goTo(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="product-card__category">{product.category}</div>
      <div className="product-card__name">{product.name}</div>
      <div className="product-card__meta">
        <div className="product-card__price">{product.price}</div>
        <div className="product-card__arrow">View →</div>
      </div>
    </Link>
  );
}
