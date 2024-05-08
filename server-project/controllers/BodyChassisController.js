const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un registro del cuerpo y chasis del camión
export const createBodyChassis = async (req, res) => {
  try {
    const { chassis_condition, body_condition, seatbelt_functionality, id} = req.body;
  
    const BodyChassis_Truck = await prisma.bodyChassis.create(
    { 
        data: { 
            truckId: id,
            chassis_condition: chassis_condition, 
            body_condition: body_condition, 
            seatbelt_functionality: seatbelt_functionality,
        },
    });

    res.status(201).json({ BodyChassis_Truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para obtener todos los registros de los cuerpos y chasiss de los camiones
export const getBodyChassis = async (req, res) => {
  try {
    const bodiesChassis = await prisma.bodyChassis.findMany();
    res.status(200).json(bodiesChassis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un registro del cuerpo y chasis del camión por su ID
export const getBodyChassisById = async (req, res) => {
  const { id } = req.params;

  try {
    const bodyChassis = await prisma.bodyChassis.findFirst({
      where: { id: id },
    });
    if (!bodyChassis) {
      return res.status(404).json({ message: "Registro de cuerpo y chasis del camión no encontrado" });
    }
    res.status(200).json(bodyChassis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un registro del cuerpo y chasis del camión por su ID
export const updateBodyChassis = async (req, res) => {
  const { id } = req.params;
  const { chassis_condition, body_condition, seatbelt_functionality} = req.body;

  try {
    const bodyChassis = await prisma.bodyChassis.update({
      where: { id: id },
      data: { 
        chassis_condition: chassis_condition, 
        body_condition: body_condition, 
        seatbelt_functionality: seatbelt_functionality,
      },
    });
    res.status(200).json({ bodyChassis });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un registro del cuerpo y chasis del camión por su ID
export const deleteBodyChassis = async (req, res) => {
  const { id } = req.params;

  try {
    const bodyChassis = await prisma.bodyChassis.delete({
      where: { id: id },
    });
    res.status(200).json({ bodyChassis });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
