'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  nameEm?: string;
  category: string;
  price: string;
  sku: string;
  year: string;
  tag: string;
  description: string;
  specs: Spec[];
  images: string[];
  story: string;
}

const WHATSAPP_NUMBER = '33142000000';

const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Lumière Tourbillon', nameEm: 'Lumière Tourbillon', category: 'Timepieces', price: '₹ 53,35,000', sku: 'MH-TB-001', year: '2024', tag: 'Limited · 50', description: 'A flying tourbillon cased in 18k rose gold, hand-finished by a single master watchmaker over 240 hours. The skeletonised dial reveals the in-house calibre MH-01, beating at 21,600 vibrations per hour with a 72-hour reserve. Each movement is assembled, regulated and sealed at our Paris bench.', specs: [{ label: 'Movement', value: 'Calibre MH-01, manual winding' }, { label: 'Case', value: '18k rose gold, 40mm, sapphire crystal' }, { label: 'Dial', value: 'Hand-engraved silver, skeletonised' }, { label: 'Strap', value: 'Hand-stitched alligator, gold pin buckle' }, { label: 'Reserve', value: '72 hours' }, { label: 'Edition', value: 'Limited to 50 numbered pieces' }], images: ['watch-tourbillon-front', 'watch-tourbillon-detail', 'watch-tourbillon-side', 'watch-tourbillon-case'], story: 'The Lumière was conceived in 2019 as a study in transparency. Three years of prototyping yielded a flying tourbillon cage weighing less than 0.4 grams — light enough to be driven by a single mainspring without compromising the isolation of the escapement.' },
  { id: 'p2', name: 'Sovereign Oxford', nameEm: 'Sovereign Oxford', category: 'Footwear', price: '₹ 2,64,000', sku: 'MH-FT-014', year: '2024', tag: 'Made to Order', description: 'A whole-cut Oxford in deep burgundy calf, lasted on the Sovereign wooden form first carved in 1947. Closed by hand at our Northampton workshop, finished with a bevelled waist and 270 stitches per inch. Eight weeks to deliver.', specs: [{ label: 'Pattern', value: 'Whole-cut Oxford, closed lacing' }, { label: 'Leather', value: 'Hand-selected calf, burgundy patina' }, { label: 'Last', value: 'Sovereign, 1947 archive form' }, { label: 'Sole', value: 'Bevelled waist, hand-stitched welt' }, { label: 'Stitching', value: '270 stitches per inch' }, { label: 'Delivery', value: '8 weeks, made to order' }], images: ['shoes-oxford-side', 'shoes-oxford-detail', 'shoes-oxford-front', 'shoes-oxford-sole'], story: 'The Sovereign last was carved by Eugène Berluti in the winter of 1947, modelled on the foot of a Hungarian diplomat. We have never modified it. The original wooden form lives in our Northampton archive, alongside 312 others.' },
  { id: 'p3', name: 'Ministre Briefcase', nameEm: 'Ministre Briefcase', category: 'Leather Goods', price: '₹ 6,38,000', sku: 'MH-LG-008', year: '2024', tag: 'Signature', description: 'A ministerial briefcase in saddle-stitched Taurillon Clymène. Structured over a wooden frame, lined in moleskin, fitted with solid brass furniture darkened by hand. Carries documents to 35cm without flex. Numbered and registered for life.', specs: [{ label: 'Leather', value: 'Taurillon Clymène, vegetable-tanned' }, { label: 'Construction', value: 'Saddle-stitched, 8 spi, waxed linen thread' }, { label: 'Frame', value: 'Beechwood internal structure' }, { label: 'Lining', value: 'Cotton moleskin, anthracite' }, { label: 'Hardware', value: 'Solid brass, hand-darkened' }, { label: 'Dimensions', value: '40 × 30 × 8 cm' }], images: ['bag-briefcase-front', 'bag-briefcase-open', 'bag-briefcase-detail', 'bag-briefcase-strap'], story: 'The Ministre was first commissioned in 1962 for the private office of a French minister who required a case that would close silently. The solution was a wooden frame with a single bellows gusset — a structure we still build by hand, one at a time.' },
  { id: 'p4', name: 'Nuit Étoilée', nameEm: 'Nuit Étoilée', category: 'Parfum', price: '₹ 41,800', sku: 'MH-PF-003', year: '2024', tag: 'Extrait · 100ml', description: 'An extrait de parfum composed by Camille Roche around a heart of iris pallida, leather and aged sandalwood. Bottled in hand-blown crystal, sealed in wax. 100ml, presented in a lacquered coffret with cotton gloves.', specs: [{ label: 'Concentration', value: 'Extrait, 28%' }, { label: 'Heart', value: 'Iris pallida, leather, aged sandalwood' }, { label: 'Top', value: 'Bergamot, pink pepper, elemi' }, { label: 'Base', value: 'Oud, ambrette, white musk' }, { label: 'Bottle', value: 'Hand-blown crystal, 100ml' }, { label: 'Presentation', value: 'Lacquered coffret, cotton gloves' }], images: ['perfume-bottle', 'perfume-detail', 'perfume-box', 'perfume-crystal'], story: 'Camille Roche composed Nuit Étoilée over 14 months, working only between dusk and midnight. The iris is grown on a single hectare in Florence; the sandalwood is aged for 22 years before distillation.' },
  { id: 'p5', name: 'Ambassadeur Overcoat', nameEm: 'Ambassadeur Overcoat', category: 'Garments', price: '₹ 10,12,000', sku: 'MH-GM-021', year: '2024', tag: 'Bespoke', description: 'A double-breasted overcoat in Loro Piana cashmere/vicuña, drafted on the Ambassadeur block first cut in 1958. Hand-canvassed, finished with horn buttons and a silk-twill lining. Three fittings, twelve weeks, registered to the wearer.', specs: [{ label: 'Cloth', value: 'Loro Piana cashmere/vicuña, 680g' }, { label: 'Pattern', value: 'Ambassadeur, double-breasted, 6×2' }, { label: 'Construction', value: 'Full hand-canvas, hand-rolled lapel' }, { label: 'Buttons', value: 'Corozo and water-buffalo horn' }, { label: 'Lining', value: 'Silk twill, copper' }, { label: 'Process', value: '3 fittings · 12 weeks · bespoke' }], images: ['coat-front', 'coat-detail', 'coat-back', 'coat-fabric'], story: 'The Ambassadeur was first cut for a Portuguese ambassador in 1958. The block has been carried through four head cutters and remains unaltered — a double-breasted draft with a high gorge and a soft, extended shoulder.' },
  { id: 'p6', name: 'Constellation Foulard', nameEm: 'Constellation Foulard', category: 'Accessories', price: '₹ 74,800', sku: 'MH-AC-032', year: '2024', tag: 'Edition · 200', description: 'A 90cm twill foulard printed with the celestial chart of Paris on the night of 1 January 1923, the date of our founding. Hand-rolled and stitched in our Lyon atelier. Edition of 200.', specs: [{ label: 'Material', value: 'Silk twill, 16 momme' }, { label: 'Dimensions', value: '90 × 90 cm' }, { label: 'Print', value: 'Paris celestial chart, 01·01·1923' }, { label: 'Finish', value: 'Hand-rolled, hand-stitched' }, { label: 'Edition', value: '200 numbered pieces' }, { label: 'Origin', value: 'Lyon atelier, France' }], images: ['scarf-pattern', 'scarf-fold', 'scarf-detail', 'scarf-box'], story: 'The chart was sourced from the Paris Observatory archive and adapted by our Lyon engravers across nine months. Each scarf is screen-printed in 32 passes, then hand-rolled — a process that takes a single artisan a full day.' },
  { id: 'p7', name: 'Souverain Cufflinks', nameEm: 'Souverain Cufflinks', category: 'Jewellery', price: '₹ 4,62,000', sku: 'MH-JW-007', year: '2024', tag: 'Numbered', description: 'Cufflinks in 18k white gold set with a single baguette-cut black diamond each. Engineered with a hidden chain and bar mechanism. Numbered on the inner face, presented in a lacquered box.', specs: [{ label: 'Metal', value: '18k white gold, rhodium-finished' }, { label: 'Stones', value: '2 × baguette black diamond, 1.2ct total' }, { label: 'Mechanism', value: 'Hidden chain and bar' }, { label: 'Finish', value: 'Hand-polished, numbered inner face' }, { label: 'Presentation', value: 'Lacquered box, velvet interior' }, { label: 'Edition', value: 'Numbered, unnumbered series' }], images: ['cufflinks-pair', 'cufflinks-detail', 'cufflinks-box', 'cufflinks-side'], story: 'The Souverain mechanism was developed in 1981 by our jeweller André Marchand, who objected to the visible T-bar of conventional cufflinks. His hidden chain remains a quiet signature, visible only to the wearer.' },
  { id: 'p8', name: 'Plume d\'Or', nameEm: 'Plume d\'Or', category: 'Objets', price: '₹ 2,03,500', sku: 'MH-OB-011', year: '2024', tag: 'Cartridge · 18k', description: 'A fountain pen in lacquered brass with an 18k solid gold nib, ground by hand to a flexible stub. Cartridge/converter fill. The body is turned on the same 1936 lathe used for our first pen, finished in seven coats of black urushi.', specs: [{ label: 'Nib', value: '18k solid gold, hand-ground flexible stub' }, { label: 'Body', value: 'Brass, 7 coats black urushi' }, { label: 'Fill', value: 'Cartridge or converter' }, { label: 'Lathe', value: 'Original 1936 cast-iron original' }, { label: 'Length', value: '142mm closed' }, { label: 'Weight', value: '34g' }], images: ['pen-fountain', 'pen-nib', 'pen-cap', 'pen-case'], story: 'The Plume d\'Or has been produced without interruption since 1936. Each nib is ground by a single nib-master — currently Henri Lacroix, who has held the post since 1991. He produces approximately 340 nibs per year.' }
];

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem('mh_products');
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  localStorage.setItem('mh_products', JSON.stringify(DEFAULT_PRODUCTS));
  return [...DEFAULT_PRODUCTS];
}

function saveProducts(products: Product[]) {
  localStorage.setItem('mh_products', JSON.stringify(products));
}

function resetProducts(): Product[] {
  localStorage.removeItem('mh_products');
  return loadProducts();
}

function whatsappLink(productName: string, sku: string) {
  const msg = `Good day, Maison Héritage.\n\nI would like to enquire about the ${productName} (Ref: ${sku}).\n\nCould you kindly share availability and the next steps for acquisition?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function whatsappGeneralLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Good day, Maison Héritage. I would like to make a general enquiry.')}`;
}

function img(seed: string, w = 800, h = 1000) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function escapeAttr(s: string) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function Home() {
  const appRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = appRef.current!;
    const toast = toastRef.current!;

    let adminAuthed = false;
    let editingId: string | null = null;
    let adminFormState = { name: '', category: 'Timepieces', price: '', sku: '', year: '2024', tag: '', description: '', specs: '', images: '', story: '' };

    let toastTimer: ReturnType<typeof setTimeout>;
    function showToast(message: string) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Cursor
    const cursor = cursorRef.current!;
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

    // Smooth scroll
    let lenis: Lenis | null = null;
    gsap.registerPlugin(ScrollTrigger);
    function initLenis() {
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      function raf(time: number) { lenis!.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis!.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    initLenis();

    function scrollToTop() {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }

    // Router
    function navigate(path: string) {
      window.location.hash = path;
    }

    function parseRoute(hash: string): [string, string | null] {
      hash = hash || '/';
      const parts = hash.split('/').filter(Boolean);
      if (parts.length === 0) return ['/', null];
      if (parts[0] === 'shop') return ['/shop', parts[1] || null];
      if (parts[0] === 'product' && parts[1]) return ['/product', parts[1]];
      if (parts[0] === 'atelier') return ['/atelier', null];
      if (parts[0] === 'admin') return ['/admin', null];
      return ['/', null];
    }

    // Reveal observer
    let revealObserver: IntersectionObserver | null = null;
    function initRevealObserver() {
      if (revealObserver) revealObserver.disconnect();
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver!.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      document.querySelectorAll('.reveal, .reveal-stagger, .lazy-img').forEach(el => {
        revealObserver!.observe(el);
      });
      document.querySelectorAll('.reveal-stagger').forEach(block => {
        [...block.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
      });
    }

    // ============================================================
    // HOME
    // ============================================================
    function initHomeAnimations() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('#hero-eyebrow', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' })
        .from('#hero-title', { opacity: 0, y: 50, duration: 1.4, ease: 'power3.out' }, '-=0.4')
        .from('#hero-sub', { opacity: 0, y: 25, duration: 1, ease: 'power3.out' }, '-=0.8')
        .from('#hero-cta', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .from('#hero-right', { opacity: 0, scale: 1.04, duration: 1.6, ease: 'power3.out' }, '-=1.4')
        .from('.hero__meta', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.8');
    }

    function renderHome() {
      const products = loadProducts();
      const featured = products.slice(0, 3);

      app.innerHTML = `
      <div class="page-fade">
        <section class="hero">
          <div class="hero__left">
            <div>
              <div class="hero__eyebrow" id="hero-eyebrow">
                <span class="line"></span>
                <span class="label">Maison Héritage · Paris · 1923</span>
              </div>
              <h1 class="hero__title" id="hero-title">Objects considered<br>with the <em>patience</em><br>of the hand.</h1>
              <p class="hero__sub" id="hero-sub">A French house producing timepieces, footwear, leather goods, garments and objets in limited number — each finished by a single artisan, registered for life, intended to outlast its first owner.</p>
            </div>
            <div class="hero__cta" id="hero-cta">
              <button class="btn" onclick="window.navigate('/shop')">View the collections <span class="btn__arrow"></span></button>
              <button class="btn btn--outline" onclick="window.open('${whatsappGeneralLink()}', '_blank')">Speak to a concierge</button>
            </div>
          </div>
          <div class="hero__right" id="hero-right">
            <div class="hero__image" style="background-image: url('${img('maison-hero-atelier', 1100, 1400)}')"></div>
            <div class="hero__meta">
              <div class="hero__meta-num">N° 01</div>
              <div class="hero__meta-text">Atelier, rue de la Paix<br>6ᵉ arrondissement</div>
            </div>
          </div>
          <div class="hero__scroll-cue">Scroll</div>
        </section>

        <div class="marquee">
          <div class="marquee__inner">
            <span>Timepieces</span><span>Footwear</span><span>Leather Goods</span><span>Parfum</span><span>Garments</span><span>Accessories</span><span>Jewellery</span><span>Objets</span>
            <span>Timepieces</span><span>Footwear</span><span>Leather Goods</span><span>Parfum</span><span>Garments</span><span>Accessories</span><span>Jewellery</span><span>Objets</span>
          </div>
        </div>

        <section class="manifesto">
          <div class="manifesto__inner">
            <div class="manifesto__label reveal">
              <span class="line"></span>
              <span class="label">A note from the maison</span>
            </div>
            <p class="manifesto__quote reveal">We do not produce <em>collections</em>. We produce <em>objects</em> — slowly, in numbered series, intended to be carried, wound, worn and written with for longer than they were made.</p>
            <div class="manifesto__attribution reveal">
              <span>Étienne Héritage</span>
              <span>·</span>
              <span>Directeur, fourth generation</span>
            </div>
          </div>
        </section>

        <section class="categories">
          <div class="categories__head">
            <h2 class="categories__title reveal">Eight categories.<br>One standard.</h2>
            <p class="categories__sub reveal">Every object leaves the maison numbered, registered and accompanied by its maker's name. Below, the disciplines we have practiced, without interruption, since 1923.</p>
          </div>
          <div class="categories__grid">
            ${['Timepieces', 'Footwear', 'Leather Goods', 'Parfum', 'Garments', 'Accessories', 'Jewellery', 'Objets'].map((cat, i) => {
              const count = products.filter(p => p.category === cat).length;
              return `
              <div class="category-card reveal" onclick="window.navigate('/shop/${cat.toLowerCase().replace(/\s/g, '-')}')">
                <div class="category-card__num">N° ${String(i + 1).padStart(2, '0')}</div>
                <div class="category-card__image">
                  <img class="lazy-img" src="${img('cat-' + cat.toLowerCase().replace(/\s/g, '-'), 400, 400)}" alt="${cat}">
                </div>
                <div class="category-card__name">${cat}</div>
                <div class="category-card__count">${count} object${count === 1 ? '' : 's'} · View →</div>
              </div>`;
            }).join('')}
          </div>
        </section>

        <section class="featured">
          <div class="featured__head">
            <h2 class="featured__title reveal">Three objects<br>from the <em>current series</em>.</h2>
            <a class="featured__link reveal" onclick="window.navigate('/shop')">All objects →</a>
          </div>
          <div class="product-grid">
            ${featured.map(p => `
              <div class="product-card reveal" onclick="window.navigate('/product/${p.id}')">
                <div class="product-card__image">
                  <span class="product-card__tag">${p.tag}</span>
                  <img class="lazy-img" src="${img(p.images[0], 700, 875)}" alt="${p.name}">
                </div>
                <div class="product-card__category">${p.category}</div>
                <div class="product-card__name">${p.name}</div>
                <div class="product-card__meta">
                  <div class="product-card__price">${p.price}</div>
                  <div class="product-card__arrow">View →</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="atelier">
          <div class="atelier__inner">
            <div class="atelier__left">
              <div class="atelier__label reveal">
                <span class="line"></span>
                <span class="label">The atelier</span>
              </div>
              <h2 class="atelier__title reveal">A single room.<br>A single <em>artisan</em><br>per object.</h2>
              <p class="atelier__intro reveal">Our Paris atelier occupies the same 340m² we have occupied since 1923. Twenty-three artisans work there, each completing an object from first cut to final inspection. No object passes through more than one pair of hands.</p>
              <div class="atelier__stats reveal">
                <div>
                  <div class="atelier__stat-num">1923</div>
                  <div class="atelier__stat-label">Year founded</div>
                </div>
                <div>
                  <div class="atelier__stat-num">23</div>
                  <div class="atelier__stat-label">Artisans in-house</div>
                </div>
                <div>
                  <div class="atelier__stat-num">4</div>
                  <div class="atelier__stat-label">Generations</div>
                </div>
                <div>
                  <div class="atelier__stat-num">340m²</div>
                  <div class="atelier__stat-label">Atelier, rue de la Paix</div>
                </div>
              </div>
            </div>
            <div class="atelier__right">
              <div>
                <div class="atelier__image atelier__image--wide">
                  <img class="lazy-img" src="${img('atelier-bench-wide', 800, 550)}" alt="Atelier bench">
                </div>
                <div class="atelier__caption">— The watchmaker's bench, second floor.</div>
              </div>
              <div>
                <div class="atelier__image">
                  <img class="lazy-img" src="${img('atelier-leather-tall', 700, 875)}" alt="Leatherwork">
                </div>
                <div class="atelier__caption">— Cutting Taurillon Clymène for the Ministre briefcase.</div>
              </div>
              <div>
                <div class="atelier__image atelier__image--wide">
                  <img class="lazy-img" src="${img('atelier-stitching', 800, 550)}" alt="Stitching">
                </div>
                <div class="atelier__caption">— Saddle-stitching, 8 stitches per inch, waxed linen.</div>
              </div>
            </div>
          </div>
        </section>

        <section class="craft">
          <div class="craft__inner">
            <div class="craft__head">
              <h2 class="craft__title reveal">Six principles,<br>unchanged since <em>1923</em>.</h2>
              <p class="craft__intro reveal">Written by the founder in the first winter of the maison. Read at the start of each apprentice's tenure.</p>
            </div>
            <ul class="craft__list">
              ${[
                { num: 'I', name: 'One object, one hand', desc: 'Each object is completed by a single artisan from first cut to final inspection. No division of labour.', detail: 'Principle · 1923' },
                { num: 'II', name: 'Numbered and registered', desc: 'Every object carries a number, a date and the maker\'s mark. We maintain the register in perpetuity.', detail: 'Principle · 1923' },
                { num: 'III', name: 'No object before its time', desc: 'We do not release objects to a calendar. A pen takes 14 weeks. A tourbillon takes 11 months. We wait.', detail: 'Principle · 1923' },
                { num: 'IV', name: 'Repair, not replace', desc: 'We maintain every object we have made since 1923. The register allows us to restore to original specification.', detail: 'Principle · 1923' },
                { num: 'V', name: 'Material provenance', desc: 'Leather, gold, silk, crystal — each material is traceable to a named supplier, often a single farm or mine.', detail: 'Principle · 1923' },
                { num: 'VI', name: 'No discount, ever', desc: 'The price is the price. It reflects the hours and the materials. It does not move.', detail: 'Principle · 1923' }
              ].map(p => `
                <li class="craft__row reveal">
                  <div class="craft__num">${p.num}.</div>
                  <div class="craft__name">${p.name}</div>
                  <div class="craft__desc">${p.desc}</div>
                  <div class="craft__detail">${p.detail}</div>
                </li>
              `).join('')}
            </ul>
          </div>
        </section>
      </div>
      `;

      initRevealObserver();
      initHomeAnimations();
    }

    // ============================================================
    // SHOP
    // ============================================================
    function renderShop(activeFilter: string | null) {
      const products = loadProducts();
      const categories = ['All', ...new Set(products.map(p => p.category))];
      const filterNormalized = activeFilter ? activeFilter.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'All';
      const filtered = !activeFilter || filterNormalized === 'All' ? products : products.filter(p => p.category === filterNormalized);

      app.innerHTML = `
      <div class="page-fade">
        <section class="shop">
          <div class="shop__head">
            <div class="shop__breadcrumb">
              <span onclick="window.navigate('/')">Maison</span>
              <span>/</span>
              <span>Collections</span>
            </div>
            <h1 class="shop__title reveal">The <em>collections</em>.</h1>
            <p class="shop__sub reveal">All current objects, listed by category. Each is produced in limited number by a single artisan. Click an object to view its specification, provenance and to enquire directly with the maison.</p>
            <div class="shop__filters reveal">
              ${categories.map(c => {
                const slug = c === 'All' ? '' : '/' + c.toLowerCase().replace(/\s/g, '-');
                const active = (!activeFilter && c === 'All') || (filterNormalized === c);
                return `<button class="filter-btn ${active ? 'active' : ''}" onclick="window.navigate('/shop${slug}')">${c}</button>`;
              }).join('')}
              <div class="shop__count">${filtered.length} object${filtered.length === 1 ? '' : 's'}</div>
            </div>
          </div>
          <div class="product-grid">
            ${filtered.map(p => `
              <div class="product-card reveal" onclick="window.navigate('/product/${p.id}')">
                <div class="product-card__image">
                  <span class="product-card__tag">${p.tag}</span>
                  <img class="lazy-img" src="${img(p.images[0], 700, 875)}" alt="${p.name}">
                </div>
                <div class="product-card__category">${p.category}</div>
                <div class="product-card__name">${p.name}</div>
                <div class="product-card__meta">
                  <div class="product-card__price">${p.price}</div>
                  <div class="product-card__arrow">View →</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
      `;

      initRevealObserver();
    }

    // ============================================================
    // PRODUCT DETAIL
    // ============================================================
    function renderProduct(id: string) {
      const products = loadProducts();
      const product = products.find(p => p.id === id);

      if (!product) {
        app.innerHTML = `
        <div class="page-fade">
          <section class="product-detail">
            <div style="max-width: 860px; margin: 0 auto; text-align:center; padding-top: 6rem;">
              <div class="label" style="margin-bottom: 2rem;">Not found</div>
              <h1 class="serif" style="font-size: 3rem; margin-bottom: 2rem;">This object is not in the register.</h1>
              <p style="color: var(--text-soft); margin-bottom: 3rem;">The reference you are looking for may have been retired, or the link is incorrect.</p>
              <button class="btn" onclick="window.navigate('/shop')">Return to collections <span class="btn__arrow"></span></button>
            </div>
          </section>
        </div>`;
        return;
      }

      app.innerHTML = `
      <div class="page-fade">
        <section class="product-detail">
          <div class="product-detail__inner">
            <div class="product-detail__gallery">
              <div class="product-detail__main-image" id="main-image">
                <img id="main-img-el" src="${img(product.images[0], 900, 1125)}" alt="${product.name}">
              </div>
              <div class="product-detail__thumbs">
                ${product.images.map((imgSeed, i) => `
                  <div class="product-detail__thumb ${i === 0 ? 'active' : ''}" data-img="${img(imgSeed, 900, 1125)}" onclick="window.swapMainImage(this)">
                    <img src="${img(imgSeed, 200, 200)}" alt="${product.name} view ${i + 1}">
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="product-detail__info">
              <div class="product-detail__breadcrumb">
                <span onclick="window.navigate('/')">Maison</span>
                <span>/</span>
                <span onclick="window.navigate('/shop')">Collections</span>
                <span>/</span>
                <span onclick="window.navigate('/shop/${product.category.toLowerCase().replace(/\s/g, '-')}')">${product.category}</span>
                <span>/</span>
                <span>${product.name}</span>
              </div>
              <div class="product-detail__category">${product.category} · ${product.year}</div>
              <h1 class="product-detail__name">${product.name}</h1>
              <div class="product-detail__price">${product.price} · Ref. ${product.sku}</div>
              <p class="product-detail__desc">${product.description}</p>

              <ul class="product-detail__specs">
                ${product.specs.map(s => `
                  <li>
                    <span class="product-detail__spec-label">${s.label}</span>
                    <span class="product-detail__spec-value">${s.value}</span>
                  </li>
                `).join('')}
              </ul>

              <div class="product-detail__cta">
                <button class="btn btn--whatsapp" onclick="window.open('${whatsappLink(product.name, product.sku)}', '_blank')">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>Order via WhatsApp</span>
                </button>
                <button class="btn btn--secondary" onclick="window.open('${whatsappLink(product.name, product.sku)}', '_blank')">Request private viewing</button>
              </div>

              <div class="product-detail__assurance">
                <div class="assurance-item">
                  <div class="assurance-item__title">Numbered & registered</div>
                  <div class="assurance-item__desc">For life</div>
                </div>
                <div class="assurance-item">
                  <div class="assurance-item__title">Repair, not replace</div>
                  <div class="assurance-item__desc">In perpetuity</div>
                </div>
                <div class="assurance-item">
                  <div class="assurance-item__title">Hand-delivered</div>
                  <div class="assurance-item__desc">Within Europe</div>
                </div>
                <div class="assurance-item">
                  <div class="assurance-item__title">14-day return</div>
                  <div class="assurance-item__desc">Unworn, in original box</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="story-strip">
          <div class="story-strip__inner">
            <div>
              <div class="label reveal" style="margin-bottom: 1.5rem;">— The story of this object</div>
              <h2 class="story-strip__title reveal">On the <em>${product.name}</em>.</h2>
              <p class="story-strip__text reveal">${product.story}</p>
              <div style="margin-top: 2rem;">
                <button class="btn btn--outline" onclick="window.open('${whatsappLink(product.name, product.sku)}', '_blank')">Enquire on WhatsApp <span class="btn__arrow"></span></button>
              </div>
            </div>
            <div class="story-strip__image reveal">
              <img class="lazy-img" src="${img(product.images[1] || product.images[0], 800, 640)}" alt="${product.name} story">
            </div>
          </div>
        </section>

        <section class="featured">
          <div class="featured__head">
            <h2 class="featured__title reveal">You may also <em>consider</em>.</h2>
            <a class="featured__link reveal" onclick="window.navigate('/shop')">All objects →</a>
          </div>
          <div class="product-grid">
            ${products.filter(p => p.id !== product.id).slice(0, 3).map(p => `
              <div class="product-card reveal" onclick="window.navigate('/product/${p.id}')">
                <div class="product-card__image">
                  <span class="product-card__tag">${p.tag}</span>
                  <img class="lazy-img" src="${img(p.images[0], 700, 875)}" alt="${p.name}">
                </div>
                <div class="product-card__category">${p.category}</div>
                <div class="product-card__name">${p.name}</div>
                <div class="product-card__meta">
                  <div class="product-card__price">${p.price}</div>
                  <div class="product-card__arrow">View →</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
      `;

      initRevealObserver();
    }

    window.swapMainImage = function(thumb: HTMLElement) {
      document.querySelectorAll('.product-detail__thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const mainImg = document.getElementById('main-img-el') as HTMLImageElement;
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = thumb.dataset.img!;
        mainImg.style.opacity = '1';
      }, 200);
    };

    // ============================================================
    // ATELIER
    // ============================================================
    function renderAtelier() {
      app.innerHTML = `
      <div class="page-fade">
        <section class="hero" style="padding-top: 11rem;">
          <div class="hero__left">
            <div>
              <div class="hero__eyebrow reveal">
                <span class="line"></span>
                <span class="label">The atelier · 1923</span>
              </div>
              <h1 class="hero__title reveal">340 square metres.<br>Twenty-three <em>hands</em>.<br>One century of method.</h1>
              <p class="hero__sub reveal">The Maison Héritage atelier has occupied the same premises on the rue de la Paix since the founding year. It has never been enlarged, franchised or relocated. We work there still.</p>
            </div>
            <div class="hero__cta reveal">
              <button class="btn" onclick="window.open('${whatsappGeneralLink()}', '_blank')">Arrange a visit <span class="btn__arrow"></span></button>
            </div>
          </div>
          <div class="hero__right reveal">
            <div class="hero__image" style="background-image: url('${img('atelier-main-room', 1100, 1400)}')"></div>
            <div class="hero__meta">
              <div class="hero__meta-num">N° 02</div>
              <div class="hero__meta-text">The atelier, second floor<br>rue de la Paix, Paris</div>
            </div>
          </div>
        </section>

        <section class="atelier">
          <div class="atelier__inner">
            <div class="atelier__left">
              <div class="atelier__label reveal">
                <span class="line"></span>
                <span class="label">Method</span>
              </div>
              <h2 class="atelier__title reveal">A single <em>artisan</em><br>completes each object.</h2>
              <p class="atelier__intro reveal">There is no production line. A watchmaker assembles, regulates and seals a tourbillon. A leatherworker cuts, stitches and finishes a briefcase. The maker's mark is on the inside. Their name is on the register.</p>
              <div class="atelier__stats reveal">
                <div>
                  <div class="atelier__stat-num">23</div>
                  <div class="atelier__stat-label">Artisans</div>
                </div>
                <div>
                  <div class="atelier__stat-num">14</div>
                  <div class="atelier__stat-label">Apprentices</div>
                </div>
                <div>
                  <div class="atelier__stat-num">7</div>
                  <div class="atelier__stat-label">Years to master</div>
                </div>
                <div>
                  <div class="atelier__stat-num">1923</div>
                  <div class="atelier__stat-label">Continuous tenure</div>
                </div>
              </div>
            </div>
            <div class="atelier__right">
              <div>
                <div class="atelier__image atelier__image--wide">
                  <img class="lazy-img" src="${img('atelier-watch-bench', 800, 550)}" alt="Watch bench">
                </div>
                <div class="atelier__caption">— Henri Lacroix at the nib bench, 2024.</div>
              </div>
              <div>
                <div class="atelier__image">
                  <img class="lazy-img" src="${img('atelier-tools-tall', 700, 875)}" alt="Tools">
                </div>
                <div class="atelier__caption">— The founder's tool cabinet, unchanged since 1923.</div>
              </div>
              <div>
                <div class="atelier__image atelier__image--wide">
                  <img class="lazy-img" src="${img('atelier-garment', 800, 550)}" alt="Garment atelier">
                </div>
                <div class="atelier__caption">— Cutting the Ambassadeur overcoat, third fitting.</div>
              </div>
              <div>
                <div class="atelier__image">
                  <img class="lazy-img" src="${img('atelier-perfume-tall', 700, 875)}" alt="Perfumery">
                </div>
                <div class="atelier__caption">— Camille Roche, composing between dusk and midnight.</div>
              </div>
            </div>
          </div>
        </section>

        <section class="craft">
          <div class="craft__inner">
            <div class="craft__head">
              <h2 class="craft__title reveal">The <em>register</em>,<br>kept since 1923.</h2>
              <p class="craft__intro reveal">Every object produced by the maison is recorded. Below, a partial list of the disciplines practised at our bench today.</p>
            </div>
            <ul class="craft__list">
              ${[
                { num: 'I', name: 'Watchmaking', desc: 'Tourbillons, perpetual calendars, minute repeaters. Assembled and regulated by a single watchmaker.', detail: 'Atelier · 1st floor' },
                { num: 'II', name: 'Leatherwork', desc: 'Saddle-stitched briefcases, wallets, luggage. Cut, stitched and finished by one leatherworker.', detail: 'Atelier · 2nd floor' },
                { num: 'III', name: 'Footwear', desc: 'Whole-cut Oxfords, loafers, boots. Lasted and closed in Northampton, finished in Paris.', detail: 'Workshop · Northampton' },
                { num: 'IV', name: 'Tailoring', desc: 'Bespoke overcoats, jackets, trousers. Three fittings, hand-canvassed, twelve weeks.', detail: 'Atelier · 2nd floor' },
                { num: 'V', name: 'Perfumery', desc: 'Extraits de parfum, composed by Camille Roche between dusk and midnight. Bottled in crystal.', detail: 'Atelier · 3rd floor' },
                { num: 'VI', name: 'Goldsmithing', desc: 'Cufflinks, signed jewels, watch cases. Cast, set and finished in our Paris bench.', detail: 'Atelier · 1st floor' },
                { num: 'VII', name: 'Lacquerwork', desc: 'Pen bodies, coffrets, foulard screens. Seven coats of urushi, cured in cedar humidors.', detail: 'Atelier · 3rd floor' },
                { num: 'VIII', name: 'Engraving', desc: 'Skeletonised dials, seal engravings, monograms. Hand-cut with gravers and chisels.', detail: 'Atelier · 1st floor' }
              ].map(p => `
                <li class="craft__row reveal">
                  <div class="craft__num">${p.num}.</div>
                  <div class="craft__name">${p.name}</div>
                  <div class="craft__desc">${p.desc}</div>
                  <div class="craft__detail">${p.detail}</div>
                </li>
              `).join('')}
            </ul>
          </div>
        </section>
      </div>
      `;
      initRevealObserver();
    }

    // ============================================================
    // ADMIN
    // ============================================================
    function renderAdmin() {
      if (!adminAuthed) {
        renderAdminLogin();
        return;
      }
      renderAdminDashboard();
    }

    function renderAdminLogin() {
      app.innerHTML = `
      <div class="page-fade">
        <section class="admin">
          <div class="admin__inner">
            <div class="admin__head">
              <div>
                <div class="admin__sub">Concierge · Private</div>
                <h1 class="admin__title">The <em>register</em>.</h1>
              </div>
            </div>
            <div class="admin__login">
              <div class="admin__login-title">Private access</div>
              <div class="admin__login-sub">The maison's register is private. Enter the concierge passphrase.</div>
              <input type="password" class="admin__input" id="admin-pass" placeholder="Passphrase" onkeydown="if(event.key==='Enter')window.tryAdminLogin()">
              <div class="admin__error" id="admin-error">Incorrect passphrase. Please try again.</div>
              <button class="btn" style="width: 100%; justify-content: center;" onclick="window.tryAdminLogin()">Enter the register <span class="btn__arrow"></span></button>
              <div class="admin__hint">demo passphrase: maison2024</div>
            </div>
          </div>
        </section>
      </div>
      `;
    }

    window.tryAdminLogin = function() {
      const input = document.getElementById('admin-pass') as HTMLInputElement;
      const error = document.getElementById('admin-error');
      if (input.value === 'maison2024') {
        adminAuthed = true;
        renderAdmin();
      } else {
        error!.classList.add('show');
        input.value = '';
        input.focus();
      }
    };

    function renderAdminDashboard() {
      const products = loadProducts();

      app.innerHTML = `
      <div class="page-fade">
        <section class="admin">
          <div class="admin__inner">
            <div class="admin__head">
              <div>
                <div class="admin__sub">Concierge · Private register</div>
                <h1 class="admin__title">The <em>register</em>.</h1>
              </div>
              <div class="admin__actions-top">
                <button class="admin__btn admin__btn--outline" onclick="window.adminReset()">Restore defaults</button>
                <button class="admin__btn admin__btn--outline" onclick="window.adminLogout()">Sign out</button>
              </div>
            </div>

            <div class="admin__layout">
              <div class="admin__sidebar">
                <div class="admin__sidebar-title">${editingId ? 'Edit object' : 'Add new object'}</div>
                <div class="admin__field">
                  <label class="admin__field-label">Name</label>
                  <input type="text" id="f-name" value="${escapeAttr(adminFormState.name)}" placeholder="e.g. Lumière Tourbillon">
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Category</label>
                  <select id="f-category">
                    ${['Timepieces','Footwear','Leather Goods','Parfum','Garments','Accessories','Jewellery','Objets'].map(c =>
                      `<option value="${c}" ${adminFormState.category === c ? 'selected' : ''}>${c}</option>`
                    ).join('')}
                  </select>
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Price</label>
                  <input type="text" id="f-price" value="${escapeAttr(adminFormState.price)}" placeholder="€ 48,500">
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">SKU / Reference</label>
                  <input type="text" id="f-sku" value="${escapeAttr(adminFormState.sku)}" placeholder="MH-TB-001">
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Year</label>
                  <input type="text" id="f-year" value="${escapeAttr(adminFormState.year)}" placeholder="2024">
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Tag (small label)</label>
                  <input type="text" id="f-tag" value="${escapeAttr(adminFormState.tag)}" placeholder="Limited · 50">
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Description</label>
                  <textarea id="f-description" placeholder="Object description...">${escapeAttr(adminFormState.description)}</textarea>
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Specifications (one per line, Label: Value)</label>
                  <textarea id="f-specs" placeholder="Movement: Calibre MH-01&#10;Case: 18k rose gold, 40mm">${escapeAttr(adminFormState.specs)}</textarea>
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Image seeds (comma-separated, 4 recommended)</label>
                  <input type="text" id="f-images" value="${escapeAttr(adminFormState.images)}" placeholder="watch-tourbillon-front, watch-detail, ...">
                </div>
                <div class="admin__field">
                  <label class="admin__field-label">Story</label>
                  <textarea id="f-story" placeholder="The story behind this object...">${escapeAttr(adminFormState.story)}</textarea>
                </div>
                <div class="admin__actions">
                  <button class="admin__btn" onclick="window.adminSave()">${editingId ? 'Save changes' : 'Add object'}</button>
                  ${editingId ? '<button class="admin__btn admin__btn--outline" onclick="window.adminCancelEdit()">Cancel</button>' : ''}
                </div>
              </div>

              <div>
                <div class="admin__list-head">
                  <div class="admin__list-title">All objects</div>
                  <div class="admin__list-count">${products.length} registered</div>
                </div>
                <div class="admin__list">
                  ${products.map(p => `
                    <div class="admin__product">
                      <div class="admin__product-image">
                        <img src="${img(p.images[0], 160, 160)}" alt="${p.name}">
                      </div>
                      <div class="admin__product-info">
                        <div class="admin__product-name">${p.name}</div>
                        <div class="admin__product-meta">${p.category} · ${p.sku} · ${p.price}</div>
                      </div>
                      <div class="admin__product-actions">
                        <button class="admin__icon-btn" onclick="window.adminEdit('${p.id}')" title="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="admin__icon-btn admin__icon-btn--danger" onclick="window.adminDelete('${p.id}')" title="Delete">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                  ${products.length === 0 ? '<div style="text-align:center; padding: 4rem; color: var(--text-mute);">The register is empty. Add your first object above.</div>' : ''}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      `;
    }

    window.adminSave = function() {
      const name = (document.getElementById('f-name') as HTMLInputElement).value.trim();
      if (!name) { showToast('A name is required'); return; }

      const specsText = (document.getElementById('f-specs') as HTMLTextAreaElement).value.trim();
      const specs = specsText ? specsText.split('\n').filter(l => l.trim()).map(l => {
        const [label, ...rest] = l.split(':');
        return { label: label.trim(), value: rest.join(':').trim() };
      }).filter(s => s.label && s.value) : [];

      const imagesText = (document.getElementById('f-images') as HTMLInputElement).value.trim();
      const images = imagesText ? imagesText.split(',').map(s => s.trim()).filter(Boolean) : ['default-' + Date.now()];

      const product: Product = {
        id: editingId || 'p' + Date.now(),
        name,
        nameEm: name,
        category: (document.getElementById('f-category') as HTMLSelectElement).value,
        price: (document.getElementById('f-price') as HTMLInputElement).value.trim() || 'Price on request',
        sku: (document.getElementById('f-sku') as HTMLInputElement).value.trim() || 'MH-XX-000',
        year: (document.getElementById('f-year') as HTMLInputElement).value.trim() || new Date().getFullYear().toString(),
        tag: (document.getElementById('f-tag') as HTMLInputElement).value.trim() || 'New',
        description: (document.getElementById('f-description') as HTMLTextAreaElement).value.trim(),
        specs,
        images,
        story: (document.getElementById('f-story') as HTMLTextAreaElement).value.trim()
      };

      let products = loadProducts();
      if (editingId) {
        products = products.map(p => p.id === editingId ? product : p);
        showToast('Object updated');
      } else {
        products.push(product);
        showToast('Object added to register');
      }
      saveProducts(products);

      editingId = null;
      adminFormState = { name: '', category: 'Timepieces', price: '', sku: '', year: '2024', tag: '', description: '', specs: '', images: '', story: '' };
      renderAdmin();
    };

    window.adminEdit = function(id: string) {
      const products = loadProducts();
      const p = products.find(x => x.id === id);
      if (!p) return;
      editingId = id;
      adminFormState = {
        name: p.name,
        category: p.category,
        price: p.price,
        sku: p.sku,
        year: p.year,
        tag: p.tag,
        description: p.description,
        specs: (p.specs || []).map(s => `${s.label}: ${s.value}`).join('\n'),
        images: (p.images || []).join(', '),
        story: p.story || ''
      };
      renderAdmin();
      (document.querySelector('.admin__sidebar') as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.adminCancelEdit = function() {
      editingId = null;
      adminFormState = { name: '', category: 'Timepieces', price: '', sku: '', year: '2024', tag: '', description: '', specs: '', images: '', story: '' };
      renderAdmin();
    };

    window.adminDelete = function(id: string) {
      const products = loadProducts();
      const p = products.find(x => x.id === id);
      if (!p) return;
      if (!confirm(`Remove "${p.name}" from the register? This cannot be undone.`)) return;
      saveProducts(products.filter(x => x.id !== id));
      showToast('Object removed from register');
      renderAdmin();
    };

    window.adminReset = function() {
      if (!confirm('Restore the register to the default maison objects? Your changes will be lost.')) return;
      resetProducts();
      showToast('Register restored to defaults');
      renderAdmin();
    };

    window.adminLogout = function() {
      adminAuthed = false;
      renderAdmin();
    };

    // --------- Nav hide/show on scroll ---------
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

    // --------- Router ---------
    window.navigate = navigate;
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) || '/';
      const [path, param] = parseRoute(hash);

      document.querySelectorAll('.nav__links a').forEach(a => a.classList.remove('active'));
      if (path === '/') (document.querySelectorAll('.nav__links a')[0] as HTMLElement)?.classList.add('active');
      if (path === '/shop') (document.querySelectorAll('.nav__links a')[1] as HTMLElement)?.classList.add('active');
      if (path === '/atelier') (document.querySelectorAll('.nav__links a')[2] as HTMLElement)?.classList.add('active');
      if (path === '/admin') (document.querySelectorAll('.nav__links a')[3] as HTMLElement)?.classList.add('active');

      scrollToTop();

      if (path === '/') renderHome();
      else if (path === '/shop') renderShop(param);
      else if (path === '/product') renderProduct(param!);
      else if (path === '/atelier') renderAtelier();
      else if (path === '/admin') renderAdmin();
      else renderHome();
    });

    // --------- Init ---------
    // Trigger initial render
    window.dispatchEvent(new Event('hashchange'));

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
      if (revealObserver) revealObserver.disconnect();
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>

      <nav className="nav" id="nav" ref={navRef}>
        <div className="nav__logo" onClick={() => window.navigate('/')}>
          <span className="nav__logo-mark"></span>
          <span>Maison Héritage</span>
        </div>
        <ul className="nav__links">
          <li><a onClick={() => window.navigate('/')}>Maison</a></li>
          <li><a onClick={() => window.navigate('/shop')}>Collections</a></li>
          <li><a onClick={() => window.navigate('/atelier')}>Atelier</a></li>
          <li><a onClick={() => window.navigate('/admin')}>Concierge</a></li>
        </ul>
        <div className="nav__right">
          <a className="nav__whatsapp" onClick={() => window.open('https://wa.me/33142000000?text=' + encodeURIComponent('Good day, Maison Héritage. I would like to make a general enquiry.'), '_blank')}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span className="label-text">+33 1 42 00 00 00</span>
          </a>
        </div>
      </nav>

      <main id="app" ref={appRef}></main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div>
              <div className="footer__brand">Maison<br />Héritage</div>
              <p className="footer__tag">An atelier of considered objects, established in Paris, 1923. Timepieces, footwear, leather goods, garments and objets — produced in limited number, by hand, intended for life.</p>
              <div className="footer__newsletter">
                <input type="email" placeholder="Your email for private communications" />
                <button>Submit →</button>
              </div>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Maison</div>
              <ul>
                <li><a onClick={() => window.navigate('/')}>Heritage</a></li>
                <li><a onClick={() => window.navigate('/atelier')}>The Atelier</a></li>
                <li><a onClick={() => window.navigate('/shop')}>Collections</a></li>
                <li><a>Journal</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Concierge</div>
              <ul>
                <li><a>Private Appointments</a></li>
                <li><a>Bespoke Commissions</a></li>
                <li><a>Restoration</a></li>
                <li><a>WhatsApp Concierge</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Legal</div>
              <ul>
                <li><a>Terms of Acquisition</a></li>
                <li><a>Privacy Charter</a></li>
                <li><a>Cookies</a></li>
                <li><a>Impressum</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <div>© 1923—2024 Maison Héritage SA · Paris · Geneva · Tokyo</div>
            <div>Crafted with restraint</div>
          </div>
        </div>
      </footer>

      <div className="toast" id="toast" ref={toastRef}></div>
    </>
  );
}
