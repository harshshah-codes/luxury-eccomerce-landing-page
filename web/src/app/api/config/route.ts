import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function renameImages(obj: any): any {
  if (Array.isArray(obj)) return obj.map(renameImages);
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'imageSeed') result.imageUrl = renameImages(v);
      else if (k === 'heroImageSeed') result.heroImageUrl = renameImages(v);
      else if (k === 'seed') result.url = renameImages(v);
      else result[k] = renameImages(v);
    }
    return result;
  }
  return obj;
}

export async function GET() {
  try {
    const siteConfig = await prisma.siteConfig.findFirst({
      where: { id: 1 }
    });

    if (!siteConfig) {
      return NextResponse.json({ error: 'No site config found. Run seed script.' }, { status: 404 });
    }

    const config = renameImages({
      hero: siteConfig.hero,
      marqueeItems: siteConfig.marqueeItems,
      manifesto: siteConfig.manifesto,
      categories: siteConfig.categories,
      featured: siteConfig.featured,
      atelier: siteConfig.atelier,
      principles: siteConfig.principles,
      footer: siteConfig.footer,
      shop: siteConfig.shop,
      atelierPage: siteConfig.atelierPage
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error loading site config:', error);
    return NextResponse.json({ error: 'Failed to load site config' }, { status: 500 });
  }
}
