import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const siteConfig = await prisma.siteConfig.findFirst({
      where: { id: 1 }
    });

    if (!siteConfig) {
      return NextResponse.json({ error: 'No site config found. Run seed script.' }, { status: 404 });
    }

    const config = {
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
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error loading site config:', error);
    return NextResponse.json({ error: 'Failed to load site config' }, { status: 500 });
  }
}
