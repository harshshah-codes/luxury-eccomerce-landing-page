import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

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

;

export async function loadProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { name: 'asc' }
    });

    return dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      nameEm: p.nameEm || undefined,
      category: p.category.name,
      price: p.price,
      sku: p.sku,
      year: p.year.toString(),
      tag: p.tag,
      description: p.description,
      specs: Array.isArray(p.specs) ? (p.specs as Spec[]) : [],
      images: p.images || [],
      story: p.story
    }));
  } catch (error) {
    console.error('Error loading products from database:', error);
    return DEFAULT_PRODUCTS;
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    const categoryMap = new Map<string, string>();

    for (const product of products) {
      const category = await prisma.category.upsert({
        where: { name: product.category },
        update: {},
        create: { name: product.category, imageUrl: [] }
      });
      categoryMap.set(product.category, category.id);

      await prisma.product.upsert({
        where: { id: product.id },
        update: {
          name: product.name,
          nameEm: product.nameEm || null,
          categoryId: categoryMap.get(product.category)!,
          sku: product.sku,
          price: product.price,
          year: parseInt(product.year),
          tag: product.tag,
          description: product.description,
          specs: product.specs as any,
          images: product.images || [],
          story: product.story,
          isPublished: true
        },
        create: {
          id: product.id,
          name: product.name,
          nameEm: product.nameEm || null,
          categoryId: categoryMap.get(product.category)!,
          sku: product.sku,
          price: product.price,
          year: parseInt(product.year),
          tag: product.tag,
          description: product.description,
          specs: product.specs as any,
          images: product.images || [],
          story: product.story,
          isPublished: true
        }
      });
    }
  } catch (error) {
    console.error('Error saving products to database:', error);
  }
}

export async function resetProducts(): Promise<Product[]> {
  try {
    await prisma.product.deleteMany({});
    const products = await loadProducts();
    await saveProducts(products);
    return products;
  } catch (error) {
    console.error('Error resetting products:', error);
    return DEFAULT_PRODUCTS;
  }
}

export async function loadConfig(): Promise<SiteConfig> {
  try {
    const siteConfig = await prisma.siteConfig.findFirst({
      where: { id: 1 }
    });

    if (!siteConfig) {
      return DEFAULT_SITE_CONFIG;
    }

    const categories = (siteConfig.categories as { name: string; imageSeed: string }[]) || DEFAULT_SITE_CONFIG.categories;
    const marqueeItems = (siteConfig.marqueeItems as string[]) || DEFAULT_SITE_CONFIG.marqueeItems;
    const principles = (siteConfig.principles as ConfigPrinciple[]) || DEFAULT_SITE_CONFIG.principles;

    return {
      hero: (siteConfig.hero as SiteConfig['hero']) || DEFAULT_SITE_CONFIG.hero,
      marqueeItems,
      manifesto: (siteConfig.manifesto as SiteConfig['manifesto']) || DEFAULT_SITE_CONFIG.manifesto,
      categories,
      featured: (siteConfig.featured as SiteConfig['featured']) || DEFAULT_SITE_CONFIG.featured,
      atelier: (siteConfig.atelier as SiteConfig['atelier']) || DEFAULT_SITE_CONFIG.atelier,
      principles,
      footer: (siteConfig.footer as SiteConfig['footer']) || DEFAULT_SITE_CONFIG.footer,
      shop: (siteConfig.shop as SiteConfig['shop']) || DEFAULT_SITE_CONFIG.shop,
      atelierPage: (siteConfig.atelierPage as SiteConfig['atelierPage']) || DEFAULT_SITE_CONFIG.atelierPage
    };
  } catch (error) {
    console.error('Error loading site config from database:', error);
    return DEFAULT_SITE_CONFIG;
  }
}

export async function saveConfig(config: SiteConfig): Promise<void> {
  try {
    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        hero: config.hero,
        marqueeItems: config.marqueeItems,
        manifesto: config.manifesto,
        categories: config.categories,
        featured: config.featured,
        atelier: config.atelier,
        principles: config.principles,
        footer: config.footer,
        shop: config.shop,
        atelierPage: config.atelierPage
      },
      create: {
        id: 1,
        hero: config.hero,
        marqueeItems: config.marqueeItems,
        manifesto: config.manifesto,
        categories: config.categories,
        featured: config.featured,
        atelier: config.atelier,
        principles: config.principles,
        footer: config.footer,
        shop: config.shop,
        atelierPage: config.atelierPage
      }
    });
  } catch (error) {
    console.error('Error saving site config to database:', error);
  }
}

export async function resetConfig(): Promise<SiteConfig> {
  try {
    await prisma.siteConfig.deleteMany({});
    const fresh = await loadConfig();
    await saveConfig(fresh);
    return fresh;
  } catch (error) {
    console.error('Error resetting site config:', error);
    return DEFAULT_SITE_CONFIG;
  }
}
