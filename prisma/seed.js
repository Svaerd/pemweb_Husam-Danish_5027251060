// Data awal yang sama dengan versi array agar pengujian tetap konsisten.
// Jalankan: node prisma/seed.js
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log("Seed: dilewati, produk sudah ada:", count);
    return;
  }
  await prisma.product.createMany({
    data: [
      { name: "Laptop", price: 15000000 },
      { name: "Mouse", price: 150000 },
      { name: "Keyboard", price: 500000 },
    ],
  });
  console.log("Seed: 3 produk ditambahkan");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
