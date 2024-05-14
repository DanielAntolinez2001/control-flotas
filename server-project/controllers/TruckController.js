import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Método para crear un camión
export const createTruck = async (req, res) => {
  try {
    const { brand, model, status, license_plate} = req.body;
    const avatar = req.file ? req.file.filename : null;
  
    const truck = await prisma.truck.create({
      data: {
        brand,
        model,
        status,
        license_plate,
        avatar,
      },
    });

    const fuelTruck = await prisma.fuel.create({ data: {truckId: truck.id, }, });
    const brakesTruck = await prisma.brakes.create({ data: {truckId: truck.id, }, });
    const FluidsSystem_Truck = await prisma.fluidsSystem.create({ data: {truckId: truck.id, }, });
    const BodyChassis = await prisma.bodyChassis.create({ data: {truckId: truck.id, }, });
    const ExhaustSystem = await prisma.exhaustSystem.create({ data: {truckId: truck.id, }, });
    const ElectricalSystem = await prisma.electricalSystem.create({ data: {truckId: truck.id, }, });

    const Tire1 = await prisma.tire.create({ data: {truckId: truck.id, brand: req.body.Tire[0].brand, model: req.body.Tire[0].model }, });
    const Tire2 = await prisma.tire.create({ data: {truckId: truck.id, brand: req.body.Tire[1].brand, model: req.body.Tire[1].model}, });
    const Tire3 = await prisma.tire.create({ data: {truckId: truck.id, brand: req.body.Tire[2].brand, model: req.body.Tire[2].model}, });
    const Tire4 = await prisma.tire.create({ data: {truckId: truck.id, brand: req.body.Tire[3].brand, model: req.body.Tire[3].model}, });

    res.status(201).json({ truck, fluids_system: FluidsSystem_Truck, body_chassis: BodyChassis, electrical_system: ElectricalSystem, 
      brakes: brakesTruck, fuel: fuelTruck, exhaust_system: ExhaustSystem, tire: [Tire1, Tire2, Tire3, Tire4]});
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
  const { brand, model, status, license_plate} = req.body;
  const avatar = req.file ? req.file.filename : null;

  try {
    const truck = await prisma.truck.update({
      where: { id: id },
      data: {
        brand,
        model,
        status,
        license_plate,
        avatar,
      },
    });
    res.status(200).json({ truck });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTruck = async (req, res) => {
  const { id } = req.params;

  try {
    const truck = await prisma.truck.findUnique({
      where: { id: id },
      include: {
        fuel: true,
        brakes: true,
        fluids_system : true,
        body_chassis: true,
        electrical_system: true,
        exhaust_system: true,
        tire: true,
      },
    });

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    // Eliminar las relaciones dependientes
    if (truck.brakes) await prisma.brakes.delete({ where: { id: truck.brakes.id } });
    if (truck.fluidsSystem) await prisma.fluidsSystem.delete({ where: { id: truck.fluidsSystem.id } });
    if (truck.bodyChassis) await prisma.bodyChassis.delete({ where: { id: truck.bodyChassis.id } });
    if (truck.exhaustSystem) await prisma.exhaustSystem.delete({ where: { id: truck.exhaustSystem.id } });
    if (truck.electricalSystem) await prisma.electricalSystem.delete({ where: { id: truck.electricalSystem.id } });

    // Eliminar los neumáticos asociados al camión
    if (truck.tire && truck.tire.length > 0) {
      for (const tire of truck.tire) {
        await prisma.tire.delete({ where: { id: tire.id } });
      }
    }

    // Eliminar los registros de combustible asociados al camión
    if (truck.fuel && truck.fuel.length > 0) {
      for (const fuel of truck.fuel) {
        await prisma.fuel.delete({ where: { id: fuel.id } });
      }
    }

    // Finalmente, eliminar el camión
    await prisma.truck.delete({ where: { id: id } });

    res.status(200).json({ message: "Camión eliminado con exito" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


