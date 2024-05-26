"use server"

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro de combustible
export const updateFuel = async (req, id) => {
  try {
    const { costF, efficienncy, amount } = req;

    const cost = parseFloat(costF);
    const efficiency = parseFloat(efficienncy);

    // Asegurarse de que los valores convertidos son números válidos
    if (isNaN(cost)) {
      console.error("Invalid cost value");
      return;
    }
    if (isNaN(efficiency)) {
      console.error("Invalid efficiency value");
      return;
    }

    const updateData = {};
    if (cost) updateData.cost = cost;
    if (efficiency) updateData.efficienncy = efficiency;
    if (amount != "option") updateData.amount = amount;
  
    const fuel = await prisma.fuel.findMany({ where: { truckId: id, } });
    
    await prisma.fuel.update({
      where: { id: fuel[0].id },
      data: updateData,
    });

    if (!fuel ) {
      console.log("Fuel no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
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

