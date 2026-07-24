-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "SiteConfig" ADD COLUMN     "whatsappNumber" TEXT NOT NULL DEFAULT '33142000000';
