const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Validasi body: kembalikan pesan error atau null jika valid.
function validate(body) {
  const { name, price } = body ?? {};
  if (typeof name !== "string" || !name.trim()) {
    return "Field 'name' wajib berupa string tidak kosong";
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    return "Field 'price' wajib berupa angka >= 0";
  }
  return null;
}

// ID dari path harus bilangan bulat, selain itu dianggap tidak ditemukan.
function parseId(raw) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Semua controller menerima (req, res) dan mengembalikan JSON.
// Data kini dibaca/ditulis via PrismaClient, bukan array in-memory.
exports.getAll = async (req, res) => {
  res.json(await prisma.product.findMany());
};

exports.getById = async (req, res) => {
  const id = parseId(req.params.id);
  const product = id && (await prisma.product.findUnique({ where: { id } }));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

exports.create = async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  const { name, price } = req.body;
  const product = await prisma.product.create({ data: { name: name.trim(), price } });
  res.status(201).json(product);
};

exports.update = async (req, res) => {
  const id = parseId(req.params.id);
  const product = id && (await prisma.product.findUnique({ where: { id } }));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const error = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  const { name, price } = req.body;
  res.json(await prisma.product.update({ where: { id }, data: { name: name.trim(), price } }));
};

exports.remove = async (req, res) => {
  const id = parseId(req.params.id);
  const product = id && (await prisma.product.findUnique({ where: { id } }));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await prisma.product.delete({ where: { id } });
  res.json(product);
};
