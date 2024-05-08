const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro de combustible
export const createFuel = async (req, res) => {
  try {
    const { amount, cost, efficiency, id} = req.body;
  
    const fuelTruck = await prisma.fuel.create(
    { 
        data: {
            amount: amount, 
            truckId: id, 
            cost: cost,
            efficiency: efficiency,
        }, 
    });

    res.status(201).json({ fuelTruck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para obtener todos los registros de combustible
export const getFuel = async (req, res) => {
  try {
    const fuels = await prisma.fuel.findMany();
    res.status(200).json(fuels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro de combustible por su ID
export const getFuelById = async (req, res) => {
  const { id } = req.params;

  try {
    const fuel = await prisma.fuel.findFirst({
      where: { id: id },
    });
    if (!fuel) {
      return res.status(404).json({ message: "Registro de combustible no encontrado" });
    }
    res.status(200).json(fuel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro de combustible por su ID
export const updateFuel = async (req, res) => {
  const { id } = req.params;
  const { amount, cost, efficiency } = req.body;

  try {
    const fuel = await prisma.fuel.update({
      where: { id: id },
      data: {
        amount: amount, 
        cost: cost,
        efficiency: efficiency,
      },
    });
    res.status(200).json({ fuel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro de combustible por su ID
export const deleteFuel = async (req, res) => {
  const { id } = req.params;

  try {
    const fuel = await prisma.fuel.delete({
      where: { id: id },
    });
    res.status(200).json({ fuel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
