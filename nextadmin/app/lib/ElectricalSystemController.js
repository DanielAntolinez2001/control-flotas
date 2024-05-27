"use server";

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para obtener todos los registros del sistema eléctrico
export const getElectricalSystem = async (req, res) => {
  try {
    const ElectricalSystem = await prisma.electricalSystem.findMany();
    res.status(200).json(ElectricalSystem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro del sistema eléctrico por su ID
export const getElectricalSystemById = async (req, res) => {
  const { id } = req.params;

  try {
    const electricalSystem = await prisma.electricalSystem.findFirst({
      where: { id: id },
    });
    if (!electricalSystem) {
      return res
        .status(404)
        .json({ message: "Registro de sistema eléctrico no encontrado" });
    }
    res.status(200).json(electricalSystem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro del sistema eléctrico por su ID
export const updateElectricalSystem = async (req, id) => {
  const { battery_status, lights_functionality, fuse_status } = req;

  try {
    const updateData = {};
    if (battery_status != "option") updateData.battery_status = battery_status;
    if (lights_functionality != "option")
      updateData.lights_functionality = lights_functionality;
    if (fuse_status != "option") updateData.fuse_status = fuse_status;

    const electricalSystem = await prisma.electricalSystem.findMany({
      where: { truckId: id },
    });

    await prisma.electricalSystem.update({
      where: { id: electricalSystem[0].id },
      data: updateData,
    });

    if (!electricalSystem) {
      console.log("Electrical System no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
