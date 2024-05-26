const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

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
export const updateFluidsSystem = async (req, id) => {
  const { direction_fluid_level, brake_fluid_level, coolant_fluid_level, wiper_fluid_level} = req;

  try{
    const updateData = {};
      if (direction_fluid_level != "option" ) updateData.direction_fluid_level = direction_fluid_level;
      if (brake_fluid_level != "option") updateData.brake_fluid_level = brake_fluid_level;
      if (coolant_fluid_level != "option") updateData.coolant_fluid_level = coolant_fluid_level;
      if (wiper_fluid_level != "option") updateData.wiper_fluid_level = wiper_fluid_level;
    
      const fluidsSystem = await prisma.fluidsSystem.findMany({ where: { truckId: id, } });
      
      await prisma.fluidsSystem.update({
        where: { id: fluidsSystem[0].id },
        data: updateData,
      });

      if (!fluidsSystem) {
        console.log("Fluids System no found");
      }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

