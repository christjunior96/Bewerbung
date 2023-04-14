-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "textId" INTEGER,
    "headlineId" INTEGER,
    "imageId" INTEGER,
    "buttonId" INTEGER,
    "pageId" INTEGER,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Headline" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Headline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Button" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Button_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_headlineId_fkey" FOREIGN KEY ("headlineId") REFERENCES "Headline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "Button"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
