const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro del sistema de escape
export const createExhaustSystem = async (req, res) => {
  try {
    const { pipes_condition, mufflers_condition, leak_detection, id} = req.body;
  
    const ExhaustSystem_Truck = await prisma.exhaustSystem.create(
    { 
        data: { 
            truckId: id,
            pipes_condition: pipes_condition,    
            mufflers_condition: mufflers_condition, 
            leak_detection: leak_detection,     
        },
    });

    res.status(201).json({ ExhaustSystem_Truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
      return res.status(404).json({ message: "Registro de sistema de escape no encontrado" });
    }
    res.status(200).json(exhaustSystem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro del sistema de escape por su ID
export const updateExhaustSystem = async (req, res) => {
  const { id } = req.params;
  const { pipes_condition, mufflers_condition, leak_detection} = req.body;

  try {
    const exhaustSystem = await prisma.exhaustSystem.update({
      where: { id: id },
      data: { 
        pipes_condition: pipes_condition,    
        mufflers_condition: mufflers_condition, 
        leak_detection: leak_detection,     
      },
    });
    res.status(200).json({ exhaustSystem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro del sistema de escape por su ID
export const deleteExhaustSystem = async (req, res) => {
  const { id } = req.params;

  try {
    const exhaustSystem = await prisma.exhaustSystem.delete({
      where: { id: id },
    });
    res.status(200).json({ exhaustSystem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
