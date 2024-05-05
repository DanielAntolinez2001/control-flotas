const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un camión
const createTruck = async (req, res) => {
  try {
    const { brand, model, status } = req.body;
    const avatar = req.file ? req.file.filename : null;

    const truck = await prisma.truck.create({
      data: {
        brand,
        model,
        status,
        avatar,
      },
    });

    res.status(201).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para obtener todos los camiones
const getTruck = async (req, res) => {
  try {
    const trucks = await prisma.truck.findMany();
    res.status(200).json(trucks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un camión por su ID
const getTruckById = async (req, res) => {
  const { id } = req.params;

  try {
    const truck = await prisma.truck.findFirst({
      where: { id: id },
    });
    if (!truck) {
      return res.status(404).json({ message: "Camión no encontrado" });
    }
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener camiones por su marca
const getTruckByBrand = async (req, res) => {
  const { brand } = req.params;

  try {
    const truck = await prisma.truck.findMany({
      where: { brand: brand },
    });
    if (!truck) {
      return res.status(404).json({ message: "Camión no encontrado" });
    }
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un camión por su ID
const updateTruck = async (req, res) => {
  const { id } = req.params;
  const { brand, model, status, driverId } = req.body;
  const avatar = req.file ? req.file.filename : null;

  try {
    const truck = await prisma.truck.update({
      where: { id: id },
      data: {
        brand,
        model,
        status,
        avatar,
        driverId,
      },
    });
    res.status(200).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un camión por su ID
const deleteTruck = async (req, res) => {
  const { id } = req.params;

  try {
    const truck = await prisma.truck.delete({
      where: { id: id },
    });
    res.status(200).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTruck,
  getTruck,
  getTruckById,
  getTruckByBrand,
  updateTruck,
  deleteTruck,
};
