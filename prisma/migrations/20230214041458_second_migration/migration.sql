/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "org" (
    "org_id" SERIAL NOT NULL,
    "org_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_updated_at" TIMESTAMP(3) NOT NULL,
    "org_name" TEXT NOT NULL,

    CONSTRAINT "org_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "org_admin" (
    "oga_id" SERIAL NOT NULL,
    "oga_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oga_updated_at" TIMESTAMP(3) NOT NULL,
    "oga_email" TEXT NOT NULL,
    "oga_password" TEXT NOT NULL,
    "oga_name" TEXT NOT NULL,
    "oga_user_type" INTEGER NOT NULL,
    "oga_org_id" INTEGER,

    CONSTRAINT "org_admin_pkey" PRIMARY KEY ("oga_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "org_admin_oga_email_key" ON "org_admin"("oga_email");

-- AddForeignKey
ALTER TABLE "org_admin" ADD CONSTRAINT "org_admin_oga_org_id_fkey" FOREIGN KEY ("oga_org_id") REFERENCES "org"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;
