"use server";

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para obtener todos los registros del sistema de escape
export const getExhaustSystem = async (req, res) => {
  try {
    const ExhaustSystem = await prisma.exhaustSystem.findMany();
    res.status(200).json(ExhaustSystem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro del sistema de escape por su ID
export const getExhaustSystemById = async (req, res) => {
  const { id } = req.params;

  try {
    const exhaustSystem = await prisma.exhaustSystem.findFirst({
      where: { id: id },
    });
    if (!exhaustSystem) {
      return res
        .status(404)
        .json({ message: "Registro de sistema de escape no encontrado" });
    }
    res.status(200).json(exhaustSystem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro del sistema de escape por su ID
export const updateExhaustSystem = async (req, id) => {
  const { leak_detection, pipes_condition, mufflers_condition } = req;
  console.log(req);

  try {
    const updateData = {};
    if (leak_detection == "Yes") {
      var leak_detectionB = true;
    } else {
      var leak_detectionB = false;
    }
    updateData.leak_detection = leak_detectionB;

    if (pipes_condition != "option")
      updateData.pipes_condition = pipes_condition;
    if (mufflers_condition != "option")
      updateData.mufflers_condition = mufflers_condition;

    const exhaustSystem = await prisma.exhaustSystem.findMany({
      where: { truckId: id },
    });

    await prisma.exhaustSystem.update({
      where: { id: exhaustSystem[0].id },
      data: updateData,
    });

    if (!exhaustSystem) {
      console.log("Exhaust System no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
