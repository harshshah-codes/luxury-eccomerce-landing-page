'use client';

import gsap from 'gsap';

let revealObserver: IntersectionObserver | null = null;

export function initRevealObserver() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver!.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger, .lazy-img').forEach(el => revealObserver!.observe(el));
  document.querySelectorAll('.reveal-stagger').forEach(block => {
    [...block.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
  });
}

export function initHomeAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tl = gsap.timeline({ delay: 0.3 });
  tl.from('#hero-eyebrow', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' })
    .from('#hero-title', { opacity: 0, y: 50, duration: 1.4, ease: 'power3.out' }, '-=0.4')
    .from('#hero-sub', { opacity: 0, y: 25, duration: 1, ease: 'power3.out' }, '-=0.8')
    .from('#hero-cta', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out' }, '-=0.6')
    .from('#hero-right', { opacity: 0, scale: 1.04, duration: 1.6, ease: 'power3.out' }, '-=1.4')
    .from('.hero__meta', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.8');
}

export function scrollToTop() {
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
}
