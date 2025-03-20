-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "author" TEXT,
    CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL DEFAULT '',
    "heroImage_filesize" INTEGER,
    "heroImage_filename" TEXT,
    "heroTwoLogo_filesize" INTEGER,
    "heroTwoLogo_filename" TEXT,
    "mainHeading" TEXT NOT NULL DEFAULT '',
    "subHeading" TEXT NOT NULL DEFAULT '',
    "agentCount" INTEGER DEFAULT 0,
    "galleryMainHeading" TEXT NOT NULL DEFAULT '',
    "galleryTitle" TEXT NOT NULL DEFAULT '',
    "galleryParagraph" TEXT NOT NULL DEFAULT '',
    "amenitiesList" TEXT NOT NULL DEFAULT '',
    "paymentPlanHeading" TEXT NOT NULL DEFAULT '',
    "paymentPlanImage_filesize" INTEGER,
    "paymentPlanImage_filename" TEXT,
    "paymentPlanTitle" TEXT NOT NULL DEFAULT '',
    "paymentPlanNumber" TEXT NOT NULL DEFAULT '',
    "paymentPlanSuffix" TEXT NOT NULL DEFAULT '',
    "paymentPlanDescription" TEXT NOT NULL DEFAULT '',
    "paymentPlanBullets" TEXT NOT NULL DEFAULT '',
    "locationHeading" TEXT NOT NULL DEFAULT '',
    "locationSubheading" TEXT NOT NULL DEFAULT '',
    "locationTitle" TEXT NOT NULL DEFAULT '',
    "locationDescription" TEXT NOT NULL DEFAULT '',
    "locationDescription2" TEXT NOT NULL DEFAULT '',
    "locationBullets" TEXT NOT NULL DEFAULT '',
    "locationMapImage_filesize" INTEGER,
    "locationMapImage_filename" TEXT,
    "developerTitle" TEXT NOT NULL DEFAULT '',
    "developerParagraph1" TEXT NOT NULL DEFAULT '',
    "developerParagraph2" TEXT NOT NULL DEFAULT '',
    "developerRedParagraph" TEXT NOT NULL DEFAULT '',
    "developerRedBoldText" TEXT NOT NULL DEFAULT '',
    "developerImage1_filesize" INTEGER,
    "developerImage1_filename" TEXT,
    "developerImage2_filesize" INTEGER,
    "developerImage2_filename" TEXT,
    "contactHeading" TEXT NOT NULL DEFAULT '',
    "contactProfilePic_filesize" INTEGER,
    "contactProfilePic_filename" TEXT,
    "contactProfileName" TEXT NOT NULL DEFAULT '',
    "contactProfileDescription" TEXT NOT NULL DEFAULT '',
    "contactBullets" TEXT NOT NULL DEFAULT '',
    "contactMap_filesize" INTEGER,
    "contactMap_filename" TEXT,
    "parallaxImage_filesize" INTEGER,
    "parallaxImage_filename" TEXT,
    "panoramicImage_filesize" INTEGER,
    "panoramicImage_filename" TEXT,
    "amenitiesSectionHeading" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "photo_filesize" INTEGER,
    "photo_filename" TEXT,
    "project" TEXT,
    CONSTRAINT "Agent_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image_filesize" INTEGER,
    "image_filename" TEXT,
    "project" TEXT,
    CONSTRAINT "GalleryImage_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    CONSTRAINT "FAQ_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AmenityCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_filename" TEXT,
    "categories" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    CONSTRAINT "AmenityCard_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AmenityFilter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    CONSTRAINT "AmenityFilter_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_filename" TEXT,
    "tag" TEXT NOT NULL DEFAULT '',
    "cityView" BOOLEAN NOT NULL DEFAULT false,
    "sqft" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    CONSTRAINT "Unit_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnitFilter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    CONSTRAINT "UnitFilter_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaterialCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_filename" TEXT,
    "document_filesize" INTEGER,
    "document_filename" TEXT,
    "project" TEXT,
    CONSTRAINT "MaterialCard_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logo_filesize" INTEGER,
    "logo_filename" TEXT,
    "footerLogo_filesize" INTEGER,
    "footerLogo_filename" TEXT,
    "footerCopyright" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "icon_filesize" INTEGER,
    "icon_filename" TEXT,
    "url" TEXT NOT NULL DEFAULT '',
    "siteSetting" TEXT,
    CONSTRAINT "SocialLink_siteSetting_fkey" FOREIGN KEY ("siteSetting") REFERENCES "SiteSetting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CallbackRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "pageUrl" TEXT NOT NULL DEFAULT '',
    "ipAddress" TEXT NOT NULL DEFAULT '',
    "project" TEXT,
    "projectName" TEXT NOT NULL DEFAULT '',
    "actionFrom" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "CallbackRequest_project_fkey" FOREIGN KEY ("project") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Post_author_idx" ON "Post"("author");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Agent_project_idx" ON "Agent"("project");

-- CreateIndex
CREATE INDEX "GalleryImage_project_idx" ON "GalleryImage"("project");

-- CreateIndex
CREATE INDEX "FAQ_project_idx" ON "FAQ"("project");

-- CreateIndex
CREATE INDEX "AmenityCard_project_idx" ON "AmenityCard"("project");

-- CreateIndex
CREATE INDEX "AmenityFilter_project_idx" ON "AmenityFilter"("project");

-- CreateIndex
CREATE INDEX "Unit_project_idx" ON "Unit"("project");

-- CreateIndex
CREATE INDEX "UnitFilter_project_idx" ON "UnitFilter"("project");

-- CreateIndex
CREATE INDEX "MaterialCard_project_idx" ON "MaterialCard"("project");

-- CreateIndex
CREATE INDEX "SocialLink_siteSetting_idx" ON "SocialLink"("siteSetting");

-- CreateIndex
CREATE INDEX "CallbackRequest_project_idx" ON "CallbackRequest"("project");
