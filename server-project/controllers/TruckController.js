const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Método para crear un camión
export const createTruck = async (req, res) => {
  try {
    const { brand, model, status, fuel, brakes, fluidsSystem, bodyChassis} = req.body;
    const avatar = req.file ? req.file.filename : null;
  
    const truck = await prisma.truck.create({
      data: {
        brand,
        model,
        status,
        avatar,
      },
    });

    const fuelTruck = await prisma.fuel.create({ data: {amount: fuel.amount, truckId: truck.id, }, });
    const brakesTruck = await prisma.brakes.create(
    { 
      data: { 
        truckId: truck.id,
        pads_condition: brakes.pads_condition, 
        discs_condition: brakes.discs_condition, 
        fluid_level: brakes.fluid_level
      },
    });

    const FluidsSystem_Truck = await prisma.fluidsSystem.create(
    { 
      data: { 
        truckId: truck.id,
        direction_fluid_level: fluidsSystem.direction_fluid_level, 
        brake_fluid_level: fluidsSystem.brake_fluid_level, 
        coolant_fluid_level: fluidsSystem.coolant_fluid_level,
        wiper_fluid_level: fluidsSystem.wiper_fluid_level,
      },
    });

    const BodyChassis = await prisma.bodyChassis.create({
      data: {
        truckId: truck.id,
        chassis_condition: bodyChassis.chassis_condition, 
        body_condition: bodyChassis.body_condition, 
        seatbelt_functionality: bodyChassis.seatbelt_functionality,
      }
    })

    res.status(201).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para obtener todos los camiones
export const getTruck = async (req, res) => {
  try {
    const trucks = await prisma.truck.findMany();
    res.status(200).json(trucks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un camión por su ID
export const getTruckById = async (req, res) => {
  const { id } = req.params;

  try {
    const truck = await prisma.truck.findFirst({
      where: { id: id },
    });
    if (!truck) {
      return res.status(404).json({ message: "Camión no encontrado" });
    }
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener camiones por su marca
export const getTruckByBrand = async (req, res) => {
  const { brand } = req.params;

  try {
    const truck = await prisma.truck.findMany({
      where: { brand: brand },
    });
    if (!truck) {
      return res.status(404).json({ message: "Camión no encontrado" });
    }
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un camión por su ID
export const updateTruck = async (req, res) => {
  const { id } = req.params;
  const { brand, model, status, driverId } = req.body;
  const avatar = req.file ? req.file.filename : null;

  try {
    const truck = await prisma.truck.update({
      where: { id: id },
      data: {
        brand,
        model,
        status,
        avatar,
        driverId,
      },
    });
    res.status(200).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para eliminar un camión por su ID
export const deleteTruck = async (req, res) => {
  const { id } = req.params;

  try {
    const truck = await prisma.truck.delete({
      where: { id: id },
    });
    res.status(200).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

