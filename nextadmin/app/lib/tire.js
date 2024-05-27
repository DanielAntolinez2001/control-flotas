"use server"

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para obtener todos los registros de neumáticos
export const getTires = async () => {
  try {
    const tires = await prisma.tire.findMany();
    return tires;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un registro de neumáticos por su ID
export const getTireByTruck = async (license_plate) => {
  try {
    const truck = await prisma.truck.findMany({ where: { truckId: license_plate }, });
    const truckId = truck[0].id; 
    const tire = await prisma.tire.findMany({ where: { truckId: truckId }, });
    if (!tire) {
      console.error("Tire no found" );
    }

    return tire;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
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
export const updateTire = async (req, id) => {
  const { brand, model, mileage, status}= req;

  // Convertir `model` a un entero
  const modelInt = parseInt(model, 10);

  if (isNaN(modelInt)) {
    console.error("Model must be a valid number" );
  }

  // Convertir `model` a un entero
  const mileageInt = parseInt(mileage, 10);

  if (isNaN(mileageInt)) {
    console.error("Mileage must be a valid number" );
  }

  const updateData = {};
  if (brand != "option" ) updateData.brand = brand;
  if (model) updateData.model = modelInt;
  if (mileage) updateData.mileage = mileageInt;
  if (status != "option" ) updateData.status = status;

  try {
    const tire = await prisma.tire.findMany({ where: { truckId: id, } });

    await prisma.tire.update({
      where: { id: tire[0].id },
      data: updateData,
    });
    if (!tire ) {
      console.log("Tire no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getTruckData = async (truckId) => {
  try {
    const truckData = await prisma.truck.findUnique({  where: { id: truckId }, });
    return truckData;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

//Metodo para actualizar las rotaciones de los neumaticos
export const changeRotation = async (req) => {
  try {
    const truckData = await prisma.tire.update({  where: { id: truckId }, });
    return truckData;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Función para determinar si es hora de cambiar los neumáticos
export const isTimeToChangeTires = async () => {
  try {
    const tires = await prisma.tire.findMany();
    const tireStatus = [];

    for (const tire of tires) {
      const truck = await getTruckData(tire.truckId);
      const recommendedChangeDistance = Math.floor(Math.random() * (50000 - 30000 + 1)) + 10000; // Genera un valor aleatorio entre 30,000 y 50,000
      const shouldChangeTires = tire.mileage+100 >= recommendedChangeDistance;

      if (shouldChangeTires){
        tireStatus.push({
          truckLicense: truck.license_plate,
          tireId: tire.id,
          mileage: tire.mileage,
          shouldChangeTires,
          description: `Truck ${truck.id} has already traveled ${tire.mileage} mileage`
        });
      }
    }

    return tireStatus;

  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};


