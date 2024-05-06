const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro de neumáticos
export const createTire = async (req, res) => {
  try {
    const { brand, status, model, mileage, id} = req.body;
  
    const TireTruck = await prisma.tire.create(
    { 
        data: { 
            truckId: id,   
            brand: brand,
            status: status,
            model: model,
            mileage: mileage,
        },
    });

    res.status(201).json({ TireTruck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
      return res.status(404).json({ message: "Registro de sistema de escape no encontrado" });
    }
    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro de neumáticos por su ID
export const updateTire = async (req, res) => {
  const { id } = req.params;
  const { brand, status, model, mileage} = req.body;

  try {
    const tire = await prisma.tire.update({
      where: { id: id },
      data: { 
        brand: brand,
        status: status,
        model: model,
        mileage: mileage,
      },
    });
    res.status(200).json({ tire });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro de neumáticos por su ID
export const deleteTire = async (req, res) => {
  const { id } = req.params;

  try {
    const tire = await prisma.tire.delete({
      where: { id: id },
    });
    res.status(200).json({ tire });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
