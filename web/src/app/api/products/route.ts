import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: { name: 'asc' }
    });

    const products = dbProducts.map(p => ({
      id: p.externalId || p.id,
      name: p.name,
      nameEm: p.nameEm || undefined,
      category: p.category.name,
      price: `₹ ${new Intl.NumberFormat('en-IN').format(Number(p.price))}`,
      sku: p.sku,
      year: p.year.toString(),
      tag: p.tag,
      description: p.description,
      specs: Array.isArray(p.specs) ? p.specs : [],
      images: p.images,
      story: p.story
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
