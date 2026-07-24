import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const config = await request.json();

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
        whatsappNumber: config.whatsappNumber || '33142000000',
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
        whatsappNumber: config.whatsappNumber || '33142000000',
        shop: config.shop,
        atelierPage: config.atelierPage
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving site config:', error);
    return NextResponse.json({ error: 'Failed to save site config' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.siteConfig.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting site config:', error);
    return NextResponse.json({ error: 'Failed to delete site config' }, { status: 500 });
  }
}
