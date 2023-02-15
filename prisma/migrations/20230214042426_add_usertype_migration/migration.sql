-- CreateTable
CREATE TABLE "org_user_type" (
    "ogut_id" SERIAL NOT NULL,
    "ogut_type" TEXT NOT NULL,

    CONSTRAINT "org_user_type_pkey" PRIMARY KEY ("ogut_id")
);
