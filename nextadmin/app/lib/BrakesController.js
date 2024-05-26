"use server"

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para actualizar un registro del sistema de frenos por su ID
export const updateBrakes = async (req, id) => {
  try {
    const { pads_condition, discs_condition, fluid_level } = req;

    const updateData = {};
    if (pads_condition != "option") updateData.pads_condition = pads_condition;
    if (discs_condition != "option") updateData.discs_condition = discs_condition;
    if (fluid_level != "option") updateData.fluid_level = fluid_level;
  
    const brakes = await prisma.brakes.findMany({ where: { truckId: id, } });
    
    await prisma.brakes.update({
      where: { id: brakes[0].id },
      data: updateData,
    });

    if (!brakes ) {
      console.log("Brakes no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener todos los registros del sistema de frenos
export const getBrakes = async (req, res) => {
  try {
    const brakes = await prisma.brakes.findMany();
    res.status(200).json(brakes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro del sistema de frenos por su ID
export const getBrakesById = async (req, res) => {
  const { id } = req.params;

  try {
    const brakes = await prisma.brakes.findFirst({
      where: { id: id },
    });
    if (!brakes) {
      return res.status(404).json({ message: "Registro de frenos no encontrado" });
    }
    res.status(200).json(brakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
