"use server";

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para obtener todos los registros de neumáticos
export const getTire = async (req, res) => {
  try {
    const tire = await prisma.tire.findMany();
    res.status(200).json(tire);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro de neumáticos por su ID
export const getTireById = async (req, res) => {
  const { id } = req.params;

  try {
    const tire = await prisma.tire.findFirst({
      where: { id: id },
    });
    if (!tire) {
      return res
        .status(404)
        .json({ message: "Registro de sistema de escape no encontrado" });
    }
    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro de neumáticos por su ID
export const updateTire = async (req, id) => {
  const { brand, model, mileage, status } = req;

  // Convertir `model` a un entero
  const modelInt = parseInt(model, 10);

  if (isNaN(modelInt)) {
    console.error("Model must be a valid number");
  }

  // Convertir `model` a un entero
  const mileageInt = parseInt(mileage, 10);

  if (isNaN(mileageInt)) {
    console.error("Mileage must be a valid number");
  }

  const updateData = {};
  if (brand != "option") updateData.brand = brand;
  if (model) updateData.model = modelInt;
  if (mileage) updateData.mileage = mileageInt;
  if (status != "option") updateData.status = status;

  try {
    const tire = await prisma.tire.findMany({ where: { truckId: id } });

    await prisma.tire.update({
      where: { id: tire[0].id },
      data: updateData,
    });
    if (!tire) {
      console.log("Tire no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getTruckData = async (truckId) => {
  try {
    const truckData = await prisma.truck.findUnique({
      where: { id: truckId }, // Suponiendo que tienes el ID del camión disponible
    });
    return truckData;
  } catch (error) {
    console.error("Error fetching truck data:", error);
    throw new Error("Failed to fetch truck data");
  }
};

// Función para determinar si es hora de cambiar los neumáticos
export const isTimeToChangeTires = async (id) => {
  try {
    const tire = await prisma.tire.findFirst({
      where: { id: id },
    });

    if (!tire) {
      alert("Tire not found");
    }

    const truck = await getTruckData(tire.truckId);

    // Genera un valor aleatorio entre 10,000 y 50,000
    const recommendedChangeDistance =
      Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;

    return {
      shouldChangeTires: tire.mileage >= recommendedChangeDistance,
      descripction: `Truck ${truck.id} has already traveled ${tire.mileage} mileage`,
    };
  } catch (error) {
    console.error("Error fetching truck data:", error);
    throw new Error("Failed to fetch truck data");
  }
};
