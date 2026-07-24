import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

const DEFAULT_SITE_CONFIG = {
  id: 1,
  hero: {
    eyebrow: 'Maison Héritage',
    title: 'Objects considered\nfor a life unlived.',
    subtitle: 'Timepieces, footwear, leather goods, garments and objets — produced in limited number, by hand, intended for life.',
    imageSeed: 'luxury-watch-hero',
    metaNum: 'N° 001',
    metaText: 'Bench-marked\nsince 1923'
  },
  marqueeItems: [
    'Timepieces',
    'Footwear',
    'Leather Goods',
    'Parfum',
    'Garments',
    'Accessories',
    'Jewellery',
    'Objets'
  ],
  manifesto: {
    label: 'Principles',
    quote: 'We make only what we would keep. Every joint, every stitch, every surface is finished to the standard of the maker — not the expectation of the buyer.',
    attribution: 'Maison Héritage',
    role: 'Founded Paris, 1923'
  },
  categories: [
    { name: 'Timepieces', imageSeed: 'cat-timepieces' },
    { name: 'Footwear', imageSeed: 'cat-footwear' },
    { name: 'Leather Goods', imageSeed: 'cat-leather' },
    { name: 'Parfum', imageSeed: 'cat-parfum' },
    { name: 'Garments', imageSeed: 'cat-garments' },
    { name: 'Accessories', imageSeed: 'cat-accessories' },
    { name: 'Jewellery', imageSeed: 'cat-jewellery' },
    { name: 'Objets', imageSeed: 'cat-objets' }
  ],
  featured: { title: 'From the register.' },
  atelier: {
    label: 'The Atelier',
    title: 'Eight disciplines.\nOne bench.',
    intro: 'Every object that bears our name is assembled, regulated and sealed by a single craftsperson at a single bench in our Paris atelier. The maker\'s name is stamped inside each piece — a contract of accountability.',
    stats: [
      { num: '101', label: 'Years of heritage' },
      { num: '23', label: 'Artisans at the bench' },
      { num: '240', label: 'Hours per piece' },
      { num: '8', label: 'Object categories' }
    ],
    images: [
      { seed: 'atelier-main', caption: 'The main bench, rue du Faubourg Saint-Honoré', wide: true },
      { seed: 'atelier-detail', caption: 'Hand-engraving the Lumière dial', wide: false },
      { seed: 'atelier-tools', caption: 'Original tools, in continuous use since 1923', wide: false }
    ]
  },
  principles: [
    { num: 'I', name: 'One object, one hand', desc: 'Each object is assembled from start to finish by a single craftsperson. No task is delegated. The maker\'s name is stamped inside.', detail: 'Principle · 1923' },
    { num: 'II', name: 'No imitation, no compromise', desc: 'We do not follow trends. We do not substitute materials. If the correct component cannot be made, the object is not completed.', detail: 'Principle · 1923' },
    { num: 'III', name: 'Finished to the maker', desc: 'Every surface — including those unseen by the client — is finished to the standard of the craftsperson, not the expectation of the buyer.', detail: 'Principle · 1923' },
    { num: 'IV', name: 'Registered for life', desc: 'Each object is numbered, registered and serviced without charge for the lifetime of its owner. Our register is continuous since 1923.', detail: 'Principle · 1923' },
    { num: 'V', name: 'Limited by intention', desc: 'We produce only what can be made properly. A run is limited by the number of objects our bench can complete — not by demand.', detail: 'Principle · 1923' },
    { num: 'VI', name: 'Silence is a material', desc: 'We do not advertise. We do not endorse. The object speaks through its making, its wear, and the word of its owner.', detail: 'Principle · 1923' }
  ],
  footer: {
    brand: 'Maison\nHéritage',
    tag: 'An atelier of considered objects, established in Paris, 1923. Timepieces, footwear, leather goods, garments and objets — produced in limited number, by hand, intended for life.',
    columns: [
      {
        title: 'Maison',
        links: [
          { label: 'Heritage', href: '/' },
          { label: 'The Atelier', href: '/atelier' },
          { label: 'Collections', href: '/shop' },
          { label: 'Journal', href: undefined }
        ]
      },
      {
        title: 'Concierge',
        links: [
          { label: 'Private Appointments', href: undefined },
          { label: 'Bespoke Commissions', href: undefined },
          { label: 'Restoration', href: undefined },
          { label: 'WhatsApp Concierge', href: undefined }
        ]
      },
      {
        title: 'Legal',
        links: [
          { label: 'Terms of Acquisition', href: undefined },
          { label: 'Privacy Charter', href: undefined },
          { label: 'Cookies', href: undefined },
          { label: 'Impressum', href: undefined }
        ]
      }
    ],
    copyright: '© 1923—2024 Maison Héritage SA · Paris · Geneva · Tokyo',
    tagline: 'Crafted with restraint'
  },
  shop: {
    title: 'The register.',
    subtitle: 'Every object leaves the maison numbered, registered and accompanied by its maker\'s name.'
  },
  atelierPage: {
    heroEyebrow: 'The Atelier',
    heroTitle: 'Where every object\nbegins — and ends.',
    heroSub: 'Our Paris bench has been in continuous use since 1923. Eight disciplines share a single atelier, each under the direction of a master craftsperson.',
    heroImageSeed: 'atelier-hero-bench',
    heroMetaNum: 'N° 001',
    heroMetaText: 'Rue du Faubourg\nSaint-Honoré, Paris',
    sectionLabel: 'The Workshop',
    sectionTitle: 'Eight disciplines.\nOne standard.',
    sectionIntro: 'Every craftsperson at Maison Héritage has completed a minimum seven-year apprenticeship. Each holds a bench in the main atelier — a single room, natural light, tools inherited from the previous occupant.',
    stats: [
      { num: '23', label: 'Artisans at the bench' },
      { num: '1923', label: 'Year established' },
      { num: '240', label: 'Hours per object' },
      { num: '8', label: 'Disciplines' }
    ],
    images: [
      { seed: 'atelier-panoramic', caption: 'The main atelier, panoramic view', wide: true },
      { seed: 'atelier-watchmaker', caption: 'The watchmaker\'s bench', wide: false },
      { seed: 'atelier-leather', caption: 'Leather workshop, hand-stitching', wide: false }
    ],
    principlesTitle: 'Six principles,\nunchanged since 1923.',
    principlesIntro: 'Written by the founder in the first winter of the maison. Read at the start of each apprentice\'s tenure.',
    principles: [
      { num: 'I', name: 'One object, one hand', desc: 'Each object is assembled from start to finish by a single craftsperson.', detail: 'Principle · 1923' },
      { num: 'II', name: 'No imitation, no compromise', desc: 'We do not follow trends. We do not substitute materials.', detail: 'Principle · 1923' },
      { num: 'III', name: 'Finished to the maker', desc: 'Every surface is finished to the standard of the craftsperson.', detail: 'Principle · 1923' },
      { num: 'IV', name: 'Registered for life', desc: 'Each object is numbered, registered and serviced without charge.', detail: 'Principle · 1923' },
      { num: 'V', name: 'Limited by intention', desc: 'A run is limited by the number of objects our bench can complete.', detail: 'Principle · 1923' },
      { num: 'VI', name: 'Silence is a material', desc: 'We do not advertise. The object speaks through its making.', detail: 'Principle · 1923' }
    ]
  }
};

const DEFAULT_PRODUCTS = [
  { externalId: 'p1', name: 'Lumière Tourbillon', nameEm: 'Lumière Tourbillon', category: 'Timepieces', price: '5335000.00', sku: 'MH-TB-001', year: 2024, tag: 'Limited · 50', description: 'A flying tourbillon cased in 18k rose gold, hand-finished by a single master watchmaker over 240 hours. The skeletonised dial reveals the in-house calibre MH-01, beating at 21,600 vibrations per hour with a 72-hour reserve. Each movement is assembled, regulated and sealed at our Paris bench.', specs: [{ label: 'Movement', value: 'Calibre MH-01, manual winding' }, { label: 'Case', value: '18k rose gold, 40mm, sapphire crystal' }, { label: 'Dial', value: 'Hand-engraved silver, skeletonised' }, { label: 'Strap', value: 'Hand-stitched alligator, gold pin buckle' }, { label: 'Reserve', value: '72 hours' }, { label: 'Edition', value: 'Limited to 50 numbered pieces' }], images: ['watch-tourbillon-front', 'watch-tourbillon-detail', 'watch-tourbillon-side', 'watch-tourbillon-case'], story: 'The Lumière was conceived in 2019 as a study in transparency.' },
  { externalId: 'p2', name: 'Sovereign Oxford', nameEm: 'Sovereign Oxford', category: 'Footwear', price: '264000.00', sku: 'MH-FT-014', year: 2024, tag: 'Made to Order', description: 'A whole-cut Oxford in deep burgundy calf, lasted on the Sovereign wooden form first carved in 1947.', specs: [{ label: 'Pattern', value: 'Whole-cut Oxford, closed lacing' }, { label: 'Leather', value: 'Hand-selected calf, burgundy patina' }], images: ['shoes-oxford-side', 'shoes-oxford-detail', 'shoes-oxford-front', 'shoes-oxford-sole'], story: 'The Sovereign last was carved by Eugène Berluti in 1947.' },
  { externalId: 'p3', name: 'Ministre Briefcase', nameEm: 'Ministre Briefcase', category: 'Leather Goods', price: '638000.00', sku: 'MH-LG-008', year: 2024, tag: 'Signature', description: 'A ministerial briefcase in saddle-stitched Taurillon Clymène.', specs: [{ label: 'Leather', value: 'Taurillon Clymène, vegetable-tanned' }], images: ['bag-briefcase-front', 'bag-briefcase-open', 'bag-briefcase-detail', 'bag-briefcase-strap'], story: 'The Ministre was first commissioned in 1962.' },
  { externalId: 'p4', name: 'Nuit Étoilée', nameEm: 'Nuit Étoilée', category: 'Parfum', price: '41800.00', sku: 'MH-PF-003', year: 2024, tag: 'Extrait · 100ml', description: 'An extrait de parfum composed by Camille Roche.', specs: [{ label: 'Concentration', value: 'Extrait, 28%' }], images: ['perfume-bottle', 'perfume-detail', 'perfume-box', 'perfume-crystal'], story: 'Camille Roche composed Nuit Étoilée over 14 months.' },
  { externalId: 'p5', name: 'Ambassadeur Overcoat', nameEm: 'Ambassadeur Overcoat', category: 'Garments', price: '1012000.00', sku: 'MH-GM-021', year: 2024, tag: 'Bespoke', description: 'A double-breasted overcoat in Loro Piana cashmere/vicuña.', specs: [{ label: 'Cloth', value: 'Loro Piana cashmere/vicuña, 680g' }], images: ['coat-front', 'coat-detail', 'coat-back', 'coat-fabric'], story: 'The Ambassadeur was first cut for a Portuguese ambassador in 1958.' },
  { externalId: 'p6', name: 'Constellation Foulard', nameEm: 'Constellation Foulard', category: 'Accessories', price: '74800.00', sku: 'MH-AC-032', year: 2024, tag: 'Edition · 200', description: 'A 90cm twill foulard printed with the celestial chart of Paris.', specs: [{ label: 'Material', value: 'Silk twill, 16 momme' }], images: ['scarf-pattern', 'scarf-fold', 'scarf-detail', 'scarf-box'], story: 'The chart was sourced from the Paris Observatory archive.' },
  { externalId: 'p7', name: 'Souverain Cufflinks', nameEm: 'Souverain Cufflinks', category: 'Jewellery', price: '462000.00', sku: 'MH-JW-007', year: 2024, tag: 'Numbered', description: 'Cufflinks in 18k white gold set with black diamonds.', specs: [{ label: 'Metal', value: '18k white gold, rhodium-finished' }], images: ['cufflinks-pair', 'cufflinks-detail', 'cufflinks-box', 'cufflinks-side'], story: 'The Souverain mechanism was developed in 1981.' },
  { externalId: 'p8', name: "Plume d'Or", nameEm: "Plume d'Or", category: 'Objets', price: '203500.00', sku: 'MH-OB-011', year: 2024, tag: 'Cartridge · 18k', description: 'A fountain pen in lacquered brass with 18k gold nib.', specs: [{ label: 'Nib', value: '18k solid gold, hand-ground' }], images: ['pen-fountain', 'pen-nib', 'pen-cap', 'pen-case'], story: "The Plume d'Or has been produced since 1936." }
];

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.siteConfig.deleteMany({});

    await prisma.siteConfig.create({
      data: {
        id: 1,
        hero: DEFAULT_SITE_CONFIG.hero,
        marqueeItems: DEFAULT_SITE_CONFIG.marqueeItems,
        manifesto: DEFAULT_SITE_CONFIG.manifesto,
        categories: DEFAULT_SITE_CONFIG.categories,
        featured: DEFAULT_SITE_CONFIG.featured,
        atelier: DEFAULT_SITE_CONFIG.atelier,
        principles: DEFAULT_SITE_CONFIG.principles,
        footer: DEFAULT_SITE_CONFIG.footer,
        shop: DEFAULT_SITE_CONFIG.shop,
        atelierPage: DEFAULT_SITE_CONFIG.atelierPage
      }
    });

    for (const p of DEFAULT_PRODUCTS) {
      const category = await prisma.category.upsert({
        where: { name: p.category },
        update: {},
        create: { name: p.category, imageUrl: [] }
      });

      await prisma.product.create({
        data: {
          externalId: p.externalId,
          name: p.name,
          nameEm: p.nameEm,
          categoryId: category.id,
          sku: p.sku,
          price: p.price,
          year: p.year,
          tag: p.tag,
          description: p.description,
          story: p.story,
          specs: p.specs,
          images: p.images
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
