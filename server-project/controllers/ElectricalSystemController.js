const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro del sistema eléctrico
export const createElectricalSystem = async (req, res) => {
  try {
    const { battery_status, lights_functionality, fuse_status, id} = req.body;
  
    const ElectricalSystem_Truck = await prisma.electricalSystem.create(
    { 
        data: { 
            truckId: id,    
            battery_Status: battery_status,
            lights_functionality: lights_functionality,
            fuse_status: fuse_status,
        },
    });

    res.status(201).json({ ElectricalSystem_Truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
      return res.status(404).json({ message: "Registro de sistema eléctrico no encontrado" });
    }
    res.status(200).json(electricalSystem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro del sistema eléctrico por su ID
export const updateElectricalSystem = async (req, res) => {
  const { id } = req.params;
  const { battery_status, lights_functionality, fuse_status} = req.body;

  try {
    const electricalSystem = await prisma.electricalSystem.update({
      where: { id: id },
      data: {   
        battery_Status: battery_status,
        lights_functionality: lights_functionality,
        fuse_status: fuse_status,
      },
    });
    res.status(200).json({ electricalSystem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro del sistema eléctrico por su ID
export const deleteElectricalSystem = async (req, res) => {
  const { id } = req.params;

  try {
    const electricalSystem = await prisma.electricalSystem.delete({
      where: { id: id },
    });
    res.status(200).json({ electricalSystem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
