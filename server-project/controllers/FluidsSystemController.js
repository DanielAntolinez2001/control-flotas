const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro del sistema de fluidos
export const createFluidsSystem = async (req, res) => {
  try {
    const { direction_fluid_level, brake_fluid_level, coolant_fluid_level, wiper_fluid_level, id} = req.body;
  
    const FluidsSystem_Truck = await prisma.fluidsSystem.create(
    { 
        data: { 
            truckId: id,
            direction_fluid_level: direction_fluid_level, 
            brake_fluid_level: brake_fluid_level, 
            coolant_fluid_level: coolant_fluid_level,
            wiper_fluid_level: wiper_fluid_level,
        },
    });

    res.status(201).json({ FluidsSystem_Truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para obtener todos los registros del sistema de fluidos
export const getFluidsSystem = async (req, res) => {
  try {
    const fluidsSystems = await prisma.fluidsSystem.findMany();
    res.status(200).json(fluidsSystems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro del sistema de fluidos por su ID
export const getFluidsSystemById = async (req, res) => {
  const { id } = req.params;

  try {
    const fluidsSystem = await prisma.fluidsSystem.findFirst({
      where: { id: id },
    });
    if (!fluidsSystem) {
      return res.status(404).json({ message: "Registro de sistema de fluidos no encontrado" });
    }
    res.status(200).json(fluidsSystem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro del sistema de fluidos por su ID
export const updateFluidsSystem = async (req, res) => {
  const { id } = req.params;
  const { direction_fluid_level, brake_fluid_level, coolant_fluid_level, wiper_fluid_level} = req.body;

  try {
    const fluidsSystem = await prisma.fluidsSystem.update({
      where: { id: id },
      data: { 
        direction_fluid_level: direction_fluid_level, 
        brake_fluid_level: brake_fluid_level, 
        coolant_fluid_level: coolant_fluid_level,
        wiper_fluid_level: wiper_fluid_level,
      },
    });
    res.status(200).json({ fluidsSystem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro del sistema de fluidos por su ID
export const deleteFluidsSystem = async (req, res) => {
  const { id } = req.params;

  try {
    const fluidsSystem = await prisma.fluidsSystem.delete({
      where: { id: id },
    });
    res.status(200).json({ fluidsSystem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
