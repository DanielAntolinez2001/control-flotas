const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro del sistema de frenos
export const createBrakes = async (req, res) => {
  try {
    const { pads_condition, discs_condition, fluid_level, id} = req.body;
  
    const brakesTruck = await prisma.brakes.create(
    { 
        data: { 
            truckId: id,
            pads_condition: pads_condition, 
            discs_condition: discs_condition, 
            fluid_level: fluid_level,
        },
    });

    res.status(201).json({ brakesTruck });
  } catch (error) {
    res.status(400).json({ message: error.message });
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

// Método para actualizar un registro del sistema de frenos por su ID
export const updateBrakes = async (req, res) => {
  const { id } = req.params;
  const { pads_condition, discs_condition, fluid_level} = req.body;

  try {
    const brakes = await prisma.brakes.update({
      where: { id: id },
      data: {
        pads_condition: pads_condition, 
        discs_condition: discs_condition, 
        fluid_level: fluid_level
      },
    });
    res.status(200).json({ brakes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro del sistema de frenos por su ID
export const deleteBrakes = async (req, res) => {
  const { id } = req.params;

  try {
    const brakes = await prisma.brakes.delete({
      where: { id: id },
    });
    res.status(200).json({ brakes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
