import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Método para crear un registro de mantenimiento
export const createMaintenance = async (formData) => {
  try {
    const { description, type, cost} = Object.fromEntries(formData);
  
    const maintenance = await prisma.maintenance.create({
      data: {
        description,
        type,
        cost,
      },
    });

    return maintenance;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener todos registros de mantenimientos
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await prisma.maintenance.findMany();
    return maintenances;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un registro de mantenimiento por su ID
export const getMaintenanceForReport = async (req, res) => {
  const { id } = req;

  try {
    const maintenance = await prisma.maintenance.findFirst({ where: { id: id }, });
    if (!maintenance) { return  "mantenimiento no encontrado" ; }

      return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Método para obtener los registros de mantenimiento de un camión
export const getMaintenanceByTruck = async (req, res) => {
  const { truckId } = req.params;

  try {
    const maintenance = await prisma.maintenance.findMany({
      where: { truckId: truckId },
    });
    if (!maintenance) {
      return res.status(404).json({ message: "registro de mantenimiento no encontrado" });
    }

    return maintenance;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para actualizar un registro de mantenimiento por su ID
export const updateMaintenance = async (req, res) => {
  const { id } = req.params;
  const { description, cost } = req.body;
  
  try {
    const maintenance = await prisma.maintenance.update({
        where: { id: id },
        data: {
          description: description,
          cost: cost,
        },
    });

    res.status(200).json({ maintenance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro de mantenimiento por su ID
export const deleteMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    const maintenance = await prisma.maintenance.delete({
      where: { id: id },
    });
    res.status(200).json({ maintenance });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

