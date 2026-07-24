'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { cleanPhone } from '@/lib/helpers';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [whatsappNumber, setWhatsappNumber] = useState('33142000000');
  const [brandName, setBrandName] = useState('Maison Héritage');
  const cursorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cursor = cursorRef.current!;

    // Cursor tracking
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const onMouseMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);
    function cursorLoop() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .product-card, .category-card, .craft__row, .nav__logo, .filter-btn, [data-cursor-hover]')) {
        cursor.classList.add('is-hover');
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .product-card, .category-card, .craft__row, .nav__logo, .filter-btn, [data-cursor-hover]')) {
        cursor.classList.remove('is-hover');
      }
    };
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Lenis
    let lenis: Lenis | null = null;
    function initLenis() {
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      (window as any).__lenis = lenis;
      function raf(time: number) { lenis!.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis!.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    initLenis();

    // Toast function
    let toastTimer: ReturnType<typeof setTimeout>;
    (window as any).showToast = (message: string) => {
      toastRef.current!.textContent = message;
      toastRef.current!.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastRef.current!.classList.remove('show'), 3000);
    };

    // Nav hide/show on scroll
    let lastScroll = 0;
    const navEl = navRef.current!;
    const onScroll = () => {
      const current = window.scrollY;
      if (current > 100 && current > lastScroll + 5) {
        navEl.classList.add('hidden');
      } else if (current < lastScroll - 5) {
        navEl.classList.remove('hidden');
      }
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
      if (lenis) lenis.destroy();
    };
  }, []);

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(cfg => {
      if (cfg.whatsappNumber) setWhatsappNumber(cfg.whatsappNumber);
      if (cfg.footer?.brand) setBrandName(cfg.footer.brand.replace('\n', ' '));
    }).catch(() => {});
  }, []);

  const linkClass = (p: string) =>
    `nav__link${pathname === p || pathname.startsWith(p + '/') ? ' active' : ''}`;

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>

      <nav className="nav" id="nav" ref={navRef}>
        <div className="nav__logo" onClick={() => window.location.href = '/'}>
          <span className="nav__logo-mark"></span>
          <span>Maison Héritage</span>
        </div>
        <ul className="nav__links">
          <li><a className={linkClass('/')} href="/">Maison</a></li>
          <li><a className={linkClass('/shop')} href="/shop">Collections</a></li>
          <li><a className={linkClass('/atelier')} href="/atelier">Atelier</a></li>
          <li><a className={linkClass('/admin')} href="/admin">Concierge</a></li>
        </ul>
        <div className="nav__right">
          <a className="nav__whatsapp" href={`https://wa.me/${cleanPhone(whatsappNumber)}?text=${encodeURIComponent(`Good day, ${brandName}. I would like to make a general inquiry.`)}`} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span className="label-text">{whatsappNumber}</span>
          </a>
        </div>
      </nav>

      <main id="app">{children}</main>

      <div className="toast" id="toast" ref={toastRef}></div>
    </>
  );
}
