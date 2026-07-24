import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SEED_SITE_CONFIG = {
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
  whatsappNumber: '33142000000',
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

const SEED_PRODUCTS = [
  { externalId: 'p1', name: 'Lumière Tourbillon', nameEm: 'Lumière Tourbillon', category: 'Timepieces', price: '48500.00', sku: 'MH-TB-001', year: 2024, tag: 'Limited · 50', description: 'A flying tourbillon cased in 18k rose gold, hand-finished by a single master watchmaker over 240 hours. The skeletonised dial reveals the in-house calibre MH-01, beating at 21,600 vibrations per hour with a 72-hour reserve. Each movement is assembled, regulated and sealed at our Paris bench.', specs: [{ label: 'Movement', value: 'Calibre MH-01, manual winding' }, { label: 'Case', value: '18k rose gold, 40mm, sapphire crystal' }, { label: 'Dial', value: 'Hand-engraved silver, skeletonised' }, { label: 'Strap', value: 'Hand-stitched alligator, gold pin buckle' }, { label: 'Reserve', value: '72 hours' }, { label: 'Edition', value: 'Limited to 50 numbered pieces' }], images: ['watch-tourbillon-front', 'watch-tourbillon-detail', 'watch-tourbillon-side', 'watch-tourbillon-case'], story: 'The Lumière was conceived in 2019 as a study in transparency. Three years of prototyping yielded a flying tourbillon cage weighing less than 0.4 grams — light enough to be driven by a single mainspring without compromising the isolation of the escapement.' },
  { externalId: 'p2', name: 'Sovereign Oxford', nameEm: 'Sovereign Oxford', category: 'Footwear', price: '2400.00', sku: 'MH-FT-014', year: 2024, tag: 'Made to Order', description: 'A whole-cut Oxford in deep burgundy calf, lasted on the Sovereign wooden form first carved in 1947. Closed by hand at our Northampton workshop, finished with a bevelled waist and 270 stitches per inch. Eight weeks to deliver.', specs: [{ label: 'Pattern', value: 'Whole-cut Oxford, closed lacing' }, { label: 'Leather', value: 'Hand-selected calf, burgundy patina' }, { label: 'Last', value: 'Sovereign, 1947 archive form' }, { label: 'Sole', value: 'Bevelled waist, hand-stitched welt' }, { label: 'Stitching', value: '270 stitches per inch' }, { label: 'Delivery', value: '8 weeks, made to order' }], images: ['shoes-oxford-side', 'shoes-oxford-detail', 'shoes-oxford-front', 'shoes-oxford-sole'], story: 'The Sovereign last was carved by Eugène Berluti in the winter of 1947, modelled on the foot of a Hungarian diplomat. We have never modified it. The original wooden form lives in our Northampton archive, alongside 312 others.' },
  { externalId: 'p3', name: 'Ministre Briefcase', nameEm: 'Ministre Briefcase', category: 'Leather Goods', price: '5800.00', sku: 'MH-LG-008', year: 2024, tag: 'Signature', description: 'A ministerial briefcase in saddle-stitched Taurillon Clymène. Structured over a wooden frame, lined in moleskin, fitted with solid brass furniture darkened by hand. Carries documents to 35cm without flex. Numbered and registered for life.', specs: [{ label: 'Leather', value: 'Taurillon Clymène, vegetable-tanned' }, { label: 'Construction', value: 'Saddle-stitched, 8 spi, waxed linen thread' }, { label: 'Frame', value: 'Beechwood internal structure' }, { label: 'Lining', value: 'Cotton moleskin, anthracite' }, { label: 'Hardware', value: 'Solid brass, hand-darkened' }, { label: 'Dimensions', value: '40 × 30 × 8 cm' }], images: ['bag-briefcase-front', 'bag-briefcase-open', 'bag-briefcase-detail', 'bag-briefcase-strap'], story: 'The Ministre was first commissioned in 1962 for the private office of a French minister who required a case that would close silently. The solution was a wooden frame with a single bellows gusset — a structure we still build by hand, one at a time.' },
  { externalId: 'p4', name: 'Nuit Étoilée', nameEm: 'Nuit Étoilée', category: 'Parfum', price: '380.00', sku: 'MH-PF-003', year: 2024, tag: 'Extrait · 100ml', description: 'An extrait de parfum composed by Camille Roche around a heart of iris pallida, leather and aged sandalwood. Bottled in hand-blown crystal, sealed in wax. 100ml, presented in a lacquered coffret with cotton gloves.', specs: [{ label: 'Concentration', value: 'Extrait, 28%' }, { label: 'Heart', value: 'Iris pallida, leather, aged sandalwood' }, { label: 'Top', value: 'Bergamot, pink pepper, elemi' }, { label: 'Base', value: 'Oud, ambrette, white musk' }, { label: 'Bottle', value: 'Hand-blown crystal, 100ml' }, { label: 'Presentation', value: 'Lacquered coffret, cotton gloves' }], images: ['perfume-bottle', 'perfume-detail', 'perfume-box', 'perfume-crystal'], story: 'Camille Roche composed Nuit Étoilée over 14 months, working only between dusk and midnight. The iris is grown on a single hectare in Florence; the sandalwood is aged for 22 years before distillation.' },
  { externalId: 'p5', name: 'Ambassadeur Overcoat', nameEm: 'Ambassadeur Overcoat', category: 'Garments', price: '9200.00', sku: 'MH-GM-021', year: 2024, tag: 'Bespoke', description: 'A double-breasted overcoat in Loro Piana cashmere/vicuña, drafted on the Ambassadeur block first cut in 1958. Hand-canvassed, finished with horn buttons and a silk-twill lining. Three fittings, twelve weeks, registered to the wearer.', specs: [{ label: 'Cloth', value: 'Loro Piana cashmere/vicuña, 680g' }, { label: 'Pattern', value: 'Ambassadeur, double-breasted, 6×2' }, { label: 'Construction', value: 'Full hand-canvas, hand-rolled lapel' }, { label: 'Buttons', value: 'Corozo and water-buffalo horn' }, { label: 'Lining', value: 'Silk twill, copper' }, { label: 'Process', value: '3 fittings · 12 weeks · bespoke' }], images: ['coat-front', 'coat-detail', 'coat-back', 'coat-fabric'], story: 'The Ambassadeur was first cut for a Portuguese ambassador in 1958. The block has been carried through four head cutters and remains unaltered — a double-breasted draft with a high gorge and a soft, extended shoulder.' },
  { externalId: 'p6', name: 'Constellation Foulard', nameEm: 'Constellation Foulard', category: 'Accessories', price: '680.00', sku: 'MH-AC-032', year: 2024, tag: 'Edition · 200', description: 'A 90cm twill foulard printed with the celestial chart of Paris on the night of 1 January 1923, the date of our founding. Hand-rolled and stitched in our Lyon atelier. Edition of 200.', specs: [{ label: 'Material', value: 'Silk twill, 16 momme' }, { label: 'Dimensions', value: '90 × 90 cm' }, { label: 'Print', value: 'Paris celestial chart, 01·01·1923' }, { label: 'Finish', value: 'Hand-rolled, hand-stitched' }, { label: 'Edition', value: '200 numbered pieces' }, { label: 'Origin', value: 'Lyon atelier, France' }], images: ['scarf-pattern', 'scarf-fold', 'scarf-detail', 'scarf-box'], story: 'The chart was sourced from the Paris Observatory archive and adapted by our Lyon engravers across nine months. Each scarf is screen-printed in 32 passes, then hand-rolled — a process that takes a single artisan a full day.' },
  { externalId: 'p7', name: 'Souverain Cufflinks', nameEm: 'Souverain Cufflinks', category: 'Jewellery', price: '4200.00', sku: 'MH-JW-007', year: 2024, tag: 'Numbered', description: 'Cufflinks in 18k white gold set with a single baguette-cut black diamond each. Engineered with a hidden chain and bar mechanism. Numbered on the inner face, presented in a lacquered box.', specs: [{ label: 'Metal', value: '18k white gold, rhodium-finished' }, { label: 'Stones', value: '2 × baguette black diamond, 1.2ct total' }, { label: 'Mechanism', value: 'Hidden chain and bar' }, { label: 'Finish', value: 'Hand-polished, numbered inner face' }, { label: 'Presentation', value: 'Lacquered box, velvet interior' }, { label: 'Edition', value: 'Numbered, unnumbered series' }], images: ['cufflinks-pair', 'cufflinks-detail', 'cufflinks-box', 'cufflinks-side'], story: 'The Souverain mechanism was developed in 1981 by our jeweller André Marchand, who objected to the visible T-bar of conventional cufflinks. His hidden chain remains a quiet signature, visible only to the wearer.' },
  { externalId: 'p8', name: "Plume d'Or", nameEm: "Plume d'Or", category: 'Objets', price: '1850.00', sku: 'MH-OB-011', year: 2024, tag: 'Cartridge · 18k', description: "A fountain pen in lacquered brass with an 18k solid gold nib, ground by hand to a flexible stub. Cartridge/converter fill. The body is turned on the same 1936 lathe used for our first pen, finished in seven coats of black urushi.", specs: [{ label: 'Nib', value: '18k solid gold, hand-ground flexible stub' }, { label: 'Body', value: 'Brass, 7 coats black urushi' }, { label: 'Fill', value: 'Cartridge or converter' }, { label: 'Lathe', value: 'Original 1936 cast-iron original' }, { label: 'Length', value: '142mm closed' }, { label: 'Weight', value: '34g' }], images: ['pen-fountain', 'pen-nib', 'pen-cap', 'pen-case'], story: "The Plume d'Or has been produced without interruption since 1936. Each nib is ground by a single nib-master — currently Henri Lacroix, who has held the post since 1991. He produces approximately 340 nibs per year." }
];

async function main() {
  console.log('Seeding database...');

  await prisma.siteConfig.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.siteConfig.create({
    data: {
      id: 1,
      hero: SEED_SITE_CONFIG.hero,
      marqueeItems: SEED_SITE_CONFIG.marqueeItems,
      manifesto: SEED_SITE_CONFIG.manifesto,
      categories: SEED_SITE_CONFIG.categories,
      featured: SEED_SITE_CONFIG.featured,
      atelier: SEED_SITE_CONFIG.atelier,
      principles: SEED_SITE_CONFIG.principles,
      footer: SEED_SITE_CONFIG.footer,
      whatsappNumber: SEED_SITE_CONFIG.whatsappNumber || '33142000000',
      shop: SEED_SITE_CONFIG.shop,
      atelierPage: SEED_SITE_CONFIG.atelierPage
    }
  });
  console.log('Site config seeded.');

  for (const p of SEED_PRODUCTS) {
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
  console.log(`${SEED_PRODUCTS.length} products seeded.`);

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
