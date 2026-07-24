import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const products = await request.json();

    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    for (const product of products) {
      const category = await prisma.category.upsert({
        where: { name: product.category },
        update: {},
        create: { name: product.category, imageUrl: [] }
      });

      await prisma.product.upsert({
        where: { id: product.id },
        update: {
          externalId: product.id,
          name: product.name,
          nameEm: product.nameEm || null,
          categoryId: category.id,
          sku: product.sku,
          price: product.price,
          year: parseInt(product.year),
          tag: product.tag,
          description: product.description,
          specs: product.specs || [],
          images: product.images || [],
          story: product.story,
          isPublished: true
        },
        create: {
          externalId: product.id,
          name: product.name,
          nameEm: product.nameEm || null,
          categoryId: category.id,
          sku: product.sku,
          price: product.price,
          year: parseInt(product.year),
          tag: product.tag,
          description: product.description,
          specs: product.specs || [],
          images: product.images || [],
          story: product.story,
          isPublished: true
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting products:', error);
    return NextResponse.json({ error: 'Failed to delete products' }, { status: 500 });
  }
}
