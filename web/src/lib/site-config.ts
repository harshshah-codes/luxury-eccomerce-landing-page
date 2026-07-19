export interface Spec {
  label: string;
  value: string;
}

export interface Product {
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

export interface ConfigStat {
  num: string;
  label: string;
}

export interface ConfigImage {
  seed: string;
  caption: string;
  wide: boolean;
}

export interface ConfigPrinciple {
  num: string;
  name: string;
  desc: string;
  detail: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href?: string }[];
}

export interface SiteConfig {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageSeed: string;
    metaNum: string;
    metaText: string;
  };
  marqueeItems: string[];
  manifesto: {
    label: string;
    quote: string;
    attribution: string;
    role: string;
  };
  categories: { name: string; imageSeed: string }[];
  featured: {
    title: string;
  };
  atelier: {
    label: string;
    title: string;
    intro: string;
    stats: ConfigStat[];
    images: ConfigImage[];
  };
  principles: ConfigPrinciple[];
  footer: {
    brand: string;
    tag: string;
    columns: FooterColumn[];
    copyright: string;
    tagline: string;
  };
  shop: {
    title: string;
    subtitle: string;
  };
  atelierPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSub: string;
    heroImageSeed: string;
    heroMetaNum: string;
    heroMetaText: string;
    sectionLabel: string;
    sectionTitle: string;
    sectionIntro: string;
    stats: ConfigStat[];
    images: ConfigImage[];
    principlesTitle: string;
    principlesIntro: string;
    principles: ConfigPrinciple[];
  };
}

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Lumière Tourbillon', nameEm: 'Lumière Tourbillon', category: 'Timepieces', price: '₹ 53,35,000', sku: 'MH-TB-001', year: '2024', tag: 'Limited · 50', description: 'A flying tourbillon cased in 18k rose gold, hand-finished by a single master watchmaker over 240 hours. The skeletonised dial reveals the in-house calibre MH-01, beating at 21,600 vibrations per hour with a 72-hour reserve. Each movement is assembled, regulated and sealed at our Paris bench.', specs: [{ label: 'Movement', value: 'Calibre MH-01, manual winding' }, { label: 'Case', value: '18k rose gold, 40mm, sapphire crystal' }, { label: 'Dial', value: 'Hand-engraved silver, skeletonised' }, { label: 'Strap', value: 'Hand-stitched alligator, gold pin buckle' }, { label: 'Reserve', value: '72 hours' }, { label: 'Edition', value: 'Limited to 50 numbered pieces' }], images: ['watch-tourbillon-front', 'watch-tourbillon-detail', 'watch-tourbillon-side', 'watch-tourbillon-case'], story: 'The Lumière was conceived in 2019 as a study in transparency. Three years of prototyping yielded a flying tourbillon cage weighing less than 0.4 grams — light enough to be driven by a single mainspring without compromising the isolation of the escapement.' },
  { id: 'p2', name: 'Sovereign Oxford', nameEm: 'Sovereign Oxford', category: 'Footwear', price: '₹ 2,64,000', sku: 'MH-FT-014', year: '2024', tag: 'Made to Order', description: 'A whole-cut Oxford in deep burgundy calf, lasted on the Sovereign wooden form first carved in 1947. Closed by hand at our Northampton workshop, finished with a bevelled waist and 270 stitches per inch. Eight weeks to deliver.', specs: [{ label: 'Pattern', value: 'Whole-cut Oxford, closed lacing' }, { label: 'Leather', value: 'Hand-selected calf, burgundy patina' }, { label: 'Last', value: 'Sovereign, 1947 archive form' }, { label: 'Sole', value: 'Bevelled waist, hand-stitched welt' }, { label: 'Stitching', value: '270 stitches per inch' }, { label: 'Delivery', value: '8 weeks, made to order' }], images: ['shoes-oxford-side', 'shoes-oxford-detail', 'shoes-oxford-front', 'shoes-oxford-sole'], story: 'The Sovereign last was carved by Eugène Berluti in the winter of 1947, modelled on the foot of a Hungarian diplomat. We have never modified it. The original wooden form lives in our Northampton archive, alongside 312 others.' },
  { id: 'p3', name: 'Ministre Briefcase', nameEm: 'Ministre Briefcase', category: 'Leather Goods', price: '₹ 6,38,000', sku: 'MH-LG-008', year: '2024', tag: 'Signature', description: 'A ministerial briefcase in saddle-stitched Taurillon Clymène. Structured over a wooden frame, lined in moleskin, fitted with solid brass furniture darkened by hand. Carries documents to 35cm without flex. Numbered and registered for life.', specs: [{ label: 'Leather', value: 'Taurillon Clymène, vegetable-tanned' }, { label: 'Construction', value: 'Saddle-stitched, 8 spi, waxed linen thread' }, { label: 'Frame', value: 'Beechwood internal structure' }, { label: 'Lining', value: 'Cotton moleskin, anthracite' }, { label: 'Hardware', value: 'Solid brass, hand-darkened' }, { label: 'Dimensions', value: '40 × 30 × 8 cm' }], images: ['bag-briefcase-front', 'bag-briefcase-open', 'bag-briefcase-detail', 'bag-briefcase-strap'], story: 'The Ministre was first commissioned in 1962 for the private office of a French minister who required a case that would close silently. The solution was a wooden frame with a single bellows gusset — a structure we still build by hand, one at a time.' },
  { id: 'p4', name: 'Nuit Étoilée', nameEm: 'Nuit Étoilée', category: 'Parfum', price: '₹ 41,800', sku: 'MH-PF-003', year: '2024', tag: 'Extrait · 100ml', description: 'An extrait de parfum composed by Camille Roche around a heart of iris pallida, leather and aged sandalwood. Bottled in hand-blown crystal, sealed in wax. 100ml, presented in a lacquered coffret with cotton gloves.', specs: [{ label: 'Concentration', value: 'Extrait, 28%' }, { label: 'Heart', value: 'Iris pallida, leather, aged sandalwood' }, { label: 'Top', value: 'Bergamot, pink pepper, elemi' }, { label: 'Base', value: 'Oud, ambrette, white musk' }, { label: 'Bottle', value: 'Hand-blown crystal, 100ml' }, { label: 'Presentation', value: 'Lacquered coffret, cotton gloves' }], images: ['perfume-bottle', 'perfume-detail', 'perfume-box', 'perfume-crystal'], story: 'Camille Roche composed Nuit Étoilée over 14 months, working only between dusk and midnight. The iris is grown on a single hectare in Florence; the sandalwood is aged for 22 years before distillation.' },
  { id: 'p5', name: 'Ambassadeur Overcoat', nameEm: 'Ambassadeur Overcoat', category: 'Garments', price: '₹ 10,12,000', sku: 'MH-GM-021', year: '2024', tag: 'Bespoke', description: 'A double-breasted overcoat in Loro Piana cashmere/vicuña, drafted on the Ambassadeur block first cut in 1958. Hand-canvassed, finished with horn buttons and a silk-twill lining. Three fittings, twelve weeks, registered to the wearer.', specs: [{ label: 'Cloth', value: 'Loro Piana cashmere/vicuña, 680g' }, { label: 'Pattern', value: 'Ambassadeur, double-breasted, 6×2' }, { label: 'Construction', value: 'Full hand-canvas, hand-rolled lapel' }, { label: 'Buttons', value: 'Corozo and water-buffalo horn' }, { label: 'Lining', value: 'Silk twill, copper' }, { label: 'Process', value: '3 fittings · 12 weeks · bespoke' }], images: ['coat-front', 'coat-detail', 'coat-back', 'coat-fabric'], story: 'The Ambassadeur was first cut for a Portuguese ambassador in 1958. The block has been carried through four head cutters and remains unaltered — a double-breasted draft with a high gorge and a soft, extended shoulder.' },
  { id: 'p6', name: 'Constellation Foulard', nameEm: 'Constellation Foulard', category: 'Accessories', price: '₹ 74,800', sku: 'MH-AC-032', year: '2024', tag: 'Edition · 200', description: 'A 90cm twill foulard printed with the celestial chart of Paris on the night of 1 January 1923, the date of our founding. Hand-rolled and stitched in our Lyon atelier. Edition of 200.', specs: [{ label: 'Material', value: 'Silk twill, 16 momme' }, { label: 'Dimensions', value: '90 × 90 cm' }, { label: 'Print', value: 'Paris celestial chart, 01·01·1923' }, { label: 'Finish', value: 'Hand-rolled, hand-stitched' }, { label: 'Edition', value: '200 numbered pieces' }, { label: 'Origin', value: 'Lyon atelier, France' }], images: ['scarf-pattern', 'scarf-fold', 'scarf-detail', 'scarf-box'], story: 'The chart was sourced from the Paris Observatory archive and adapted by our Lyon engravers across nine months. Each scarf is screen-printed in 32 passes, then hand-rolled — a process that takes a single artisan a full day.' },
  { id: 'p7', name: 'Souverain Cufflinks', nameEm: 'Souverain Cufflinks', category: 'Jewellery', price: '₹ 4,62,000', sku: 'MH-JW-007', year: '2024', tag: 'Numbered', description: 'Cufflinks in 18k white gold set with a single baguette-cut black diamond each. Engineered with a hidden chain and bar mechanism. Numbered on the inner face, presented in a lacquered box.', specs: [{ label: 'Metal', value: '18k white gold, rhodium-finished' }, { label: 'Stones', value: '2 × baguette black diamond, 1.2ct total' }, { label: 'Mechanism', value: 'Hidden chain and bar' }, { label: 'Finish', value: 'Hand-polished, numbered inner face' }, { label: 'Presentation', value: 'Lacquered box, velvet interior' }, { label: 'Edition', value: 'Numbered, unnumbered series' }], images: ['cufflinks-pair', 'cufflinks-detail', 'cufflinks-box', 'cufflinks-side'], story: 'The Souverain mechanism was developed in 1981 by our jeweller André Marchand, who objected to the visible T-bar of conventional cufflinks. His hidden chain remains a quiet signature, visible only to the wearer.' },
  { id: 'p8', name: 'Plume d\'Or', nameEm: 'Plume d\'Or', category: 'Objets', price: '₹ 2,03,500', sku: 'MH-OB-011', year: '2024', tag: 'Cartridge · 18k', description: 'A fountain pen in lacquered brass with an 18k solid gold nib, ground by hand to a flexible stub. Cartridge/converter fill. The body is turned on the same 1936 lathe used for our first pen, finished in seven coats of black urushi.', specs: [{ label: 'Nib', value: '18k solid gold, hand-ground flexible stub' }, { label: 'Body', value: 'Brass, 7 coats black urushi' }, { label: 'Fill', value: 'Cartridge or converter' }, { label: 'Lathe', value: 'Original 1936 cast-iron original' }, { label: 'Length', value: '142mm closed' }, { label: 'Weight', value: '34g' }], images: ['pen-fountain', 'pen-nib', 'pen-cap', 'pen-case'], story: 'The Plume d\'Or has been produced without interruption since 1936. Each nib is ground by a single nib-master — currently Henri Lacroix, who has held the post since 1991. He produces approximately 340 nibs per year.' }
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    eyebrow: 'Maison Héritage · Paris · 1923',
    title: 'Objects considered<br>with the <em>patience</em><br>of the hand.',
    subtitle: 'A French house producing timepieces, footwear, leather goods, garments and objets in limited number — each finished by a single artisan, registered for life, intended to outlast its first owner.',
    imageSeed: 'maison-hero-atelier',
    metaNum: 'N° 01',
    metaText: 'Atelier, rue de la Paix<br>6ᵉ arrondissement'
  },
  marqueeItems: ['Timepieces', 'Footwear', 'Leather Goods', 'Parfum', 'Garments', 'Accessories', 'Jewellery', 'Objets'],
  manifesto: {
    label: 'A note from the maison',
    quote: 'We do not produce <em>collections</em>. We produce <em>objects</em> — slowly, in numbered series, intended to be carried, wound, worn and written with for longer than they were made.',
    attribution: 'Étienne Héritage',
    role: 'Directeur, fourth generation'
  },
  categories: [
    { name: 'Timepieces', imageSeed: 'cat-timepieces' },
    { name: 'Footwear', imageSeed: 'cat-footwear' },
    { name: 'Leather Goods', imageSeed: 'cat-leather-goods' },
    { name: 'Parfum', imageSeed: 'cat-parfum' },
    { name: 'Garments', imageSeed: 'cat-garments' },
    { name: 'Accessories', imageSeed: 'cat-accessories' },
    { name: 'Jewellery', imageSeed: 'cat-jewellery' },
    { name: 'Objets', imageSeed: 'cat-objets' }
  ],
  featured: {
    title: 'Three objects<br>from the <em>current series</em>.'
  },
  atelier: {
    label: 'The atelier',
    title: 'A single room.<br>A single <em>artisan</em><br>per object.',
    intro: 'Our Paris atelier occupies the same 340m² we have occupied since 1923. Twenty-three artisans work there, each completing an object from first cut to final inspection. No object passes through more than one pair of hands.',
    stats: [
      { num: '1923', label: 'Year founded' },
      { num: '23', label: 'Artisans in-house' },
      { num: '4', label: 'Generations' },
      { num: '340m²', label: 'Atelier, rue de la Paix' }
    ],
    images: [
      { seed: 'atelier-bench-wide', caption: '— The watchmaker\'s bench, second floor.', wide: true },
      { seed: 'atelier-leather-tall', caption: '— Cutting Taurillon Clymène for the Ministre briefcase.', wide: false },
      { seed: 'atelier-stitching', caption: '— Saddle-stitching, 8 stitches per inch, waxed linen.', wide: true }
    ]
  },
  principles: [
    { num: 'I', name: 'One object, one hand', desc: 'Each object is completed by a single artisan from first cut to final inspection. No division of labour.', detail: 'Principle · 1923' },
    { num: 'II', name: 'Numbered and registered', desc: 'Every object carries a number, a date and the maker\'s mark. We maintain the register in perpetuity.', detail: 'Principle · 1923' },
    { num: 'III', name: 'No object before its time', desc: 'We do not release objects to a calendar. A pen takes 14 weeks. A tourbillon takes 11 months. We wait.', detail: 'Principle · 1923' },
    { num: 'IV', name: 'Repair, not replace', desc: 'We maintain every object we have made since 1923. The register allows us to restore to original specification.', detail: 'Principle · 1923' },
    { num: 'V', name: 'Material provenance', desc: 'Leather, gold, silk, crystal — each material is traceable to a named supplier, often a single farm or mine.', detail: 'Principle · 1923' },
    { num: 'VI', name: 'No discount, ever', desc: 'The price is the price. It reflects the hours and the materials. It does not move.', detail: 'Principle · 1923' }
  ],
  footer: {
    brand: 'Maison<br>Héritage',
    tag: 'An atelier of considered objects, established in Paris, 1923. Timepieces, footwear, leather goods, garments and objets — produced in limited number, by hand, intended for life.',
    columns: [
      { title: 'Maison', links: [{ label: 'Heritage', href: '/' }, { label: 'The Atelier', href: '/atelier' }, { label: 'Collections', href: '/shop' }, { label: 'Journal' }] },
      { title: 'Concierge', links: [{ label: 'Private Appointments' }, { label: 'Bespoke Commissions' }, { label: 'Restoration' }, { label: 'WhatsApp Concierge' }] },
      { title: 'Legal', links: [{ label: 'Terms of Acquisition' }, { label: 'Privacy Charter' }, { label: 'Cookies' }, { label: 'Impressum' }] }
    ],
    copyright: '© 1923—2024 Maison Héritage SA · Paris · Geneva · Tokyo',
    tagline: 'Crafted with restraint'
  },
  shop: {
    title: 'The <em>collections</em>.',
    subtitle: 'All current objects, listed by category. Each is produced in limited number by a single artisan. Click an object to view its specification, provenance and to enquire directly with the maison.'
  },
  atelierPage: {
    heroEyebrow: 'The atelier · 1923',
    heroTitle: '340 square metres.<br>Twenty-three <em>hands</em>.<br>One century of method.',
    heroSub: 'The Maison Héritage atelier has occupied the same premises on the rue de la Paix since the founding year. It has never been enlarged, franchised or relocated. We work there still.',
    heroImageSeed: 'atelier-main-room',
    heroMetaNum: 'N° 02',
    heroMetaText: 'The atelier, second floor<br>rue de la Paix, Paris',
    sectionLabel: 'Method',
    sectionTitle: 'A single <em>artisan</em><br>completes each object.',
    sectionIntro: 'There is no production line. A watchmaker assembles, regulates and seals a tourbillon. A leatherworker cuts, stitches and finishes a briefcase. The maker\'s mark is on the inside. Their name is on the register.',
    stats: [
      { num: '23', label: 'Artisans' },
      { num: '14', label: 'Apprentices' },
      { num: '7', label: 'Years to master' },
      { num: '1923', label: 'Continuous tenure' }
    ],
    images: [
      { seed: 'atelier-watch-bench', caption: '— Henri Lacroix at the nib bench, 2024.', wide: true },
      { seed: 'atelier-tools-tall', caption: '— The founder\'s tool cabinet, unchanged since 1923.', wide: false },
      { seed: 'atelier-garment', caption: '— Cutting the Ambassadeur overcoat, third fitting.', wide: true },
      { seed: 'atelier-perfume-tall', caption: '— Camille Roche, composing between dusk and midnight.', wide: false }
    ],
    principlesTitle: 'The <em>register</em>,<br>kept since 1923.',
    principlesIntro: 'Every object produced by the maison is recorded. Below, a partial list of the disciplines practised at our bench today.',
    principles: [
      { num: 'I', name: 'Watchmaking', desc: 'Tourbillons, perpetual calendars, minute repeaters. Assembled and regulated by a single watchmaker.', detail: 'Atelier · 1st floor' },
      { num: 'II', name: 'Leatherwork', desc: 'Saddle-stitched briefcases, wallets, luggage. Cut, stitched and finished by one leatherworker.', detail: 'Atelier · 2nd floor' },
      { num: 'III', name: 'Footwear', desc: 'Whole-cut Oxfords, loafers, boots. Lasted and closed in Northampton, finished in Paris.', detail: 'Workshop · Northampton' },
      { num: 'IV', name: 'Tailoring', desc: 'Bespoke overcoats, jackets, trousers. Three fittings, hand-canvassed, twelve weeks.', detail: 'Atelier · 2nd floor' },
      { num: 'V', name: 'Perfumery', desc: 'Extraits de parfum, composed by Camille Roche between dusk and midnight. Bottled in crystal.', detail: 'Atelier · 3rd floor' },
      { num: 'VI', name: 'Goldsmithing', desc: 'Cufflinks, signed jewels, watch cases. Cast, set and finished in our Paris bench.', detail: 'Atelier · 1st floor' },
      { num: 'VII', name: 'Lacquerwork', desc: 'Pen bodies, coffrets, foulard screens. Seven coats of urushi, cured in cedar humidors.', detail: 'Atelier · 3rd floor' },
      { num: 'VIII', name: 'Engraving', desc: 'Skeletonised dials, seal engravings, monograms. Hand-cut with gravers and chisels.', detail: 'Atelier · 1st floor' }
    ]
  }
};

export function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem('mh_products');
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  localStorage.setItem('mh_products', JSON.stringify(DEFAULT_PRODUCTS));
  return [...DEFAULT_PRODUCTS];
}

export function saveProducts(products: Product[]) {
  localStorage.setItem('mh_products', JSON.stringify(products));
}

export function resetProducts(): Product[] {
  localStorage.removeItem('mh_products');
  return loadProducts();
}

export function loadConfig(): SiteConfig {
  try {
    const stored = localStorage.getItem('mh_config');
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  localStorage.setItem('mh_config', JSON.stringify(DEFAULT_SITE_CONFIG));
  return { ...DEFAULT_SITE_CONFIG, categories: [...DEFAULT_SITE_CONFIG.categories], marqueeItems: [...DEFAULT_SITE_CONFIG.marqueeItems], principles: [...DEFAULT_SITE_CONFIG.principles], atelier: { ...DEFAULT_SITE_CONFIG.atelier, stats: [...DEFAULT_SITE_CONFIG.atelier.stats], images: [...DEFAULT_SITE_CONFIG.atelier.images] }, footer: { ...DEFAULT_SITE_CONFIG.footer, columns: DEFAULT_SITE_CONFIG.footer.columns.map(c => ({ ...c, links: [...c.links] })) }, shop: { ...DEFAULT_SITE_CONFIG.shop }, atelierPage: { ...DEFAULT_SITE_CONFIG.atelierPage, stats: [...DEFAULT_SITE_CONFIG.atelierPage.stats], images: [...DEFAULT_SITE_CONFIG.atelierPage.images], principles: [...DEFAULT_SITE_CONFIG.atelierPage.principles] } };
}

export function saveConfig(config: SiteConfig) {
  localStorage.setItem('mh_config', JSON.stringify(config));
}

export function resetConfig(): SiteConfig {
  localStorage.removeItem('mh_config');
  return loadConfig();
}
