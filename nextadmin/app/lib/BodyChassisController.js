"use server"

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

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
export const updateBodyChassis = async (req, id) => {
  const { chassis_condition, body_condition, seatbelt_functionality} = req;
  try{
    const updateData = {};
      if (chassis_condition != "option") updateData.chassis_condition = chassis_condition;
      if (body_condition != "option") updateData.body_condition = body_condition;
      if (seatbelt_functionality != "option") updateData.seatbelt_functionality = seatbelt_functionality;
    
      const bodyChassis = await prisma.bodyChassis.findMany({ where: { truckId: id, } });
      
      await prisma.bodyChassis.update({
        where: { id: bodyChassis[0].id },
        data: updateData,
      });

      if (!bodyChassis) {
        console.log("Body and Chassis no found");
      }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

