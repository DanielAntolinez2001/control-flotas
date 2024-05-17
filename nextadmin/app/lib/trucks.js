"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
const prisma = new PrismaClient();

// Método para crear un camión
export const createTruck = async (formData) => {
  try {
    const { brand, model, status, license_plate} = Object.fromEntries(formData);
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
    const Tire = await prisma.tire.create({ data: {truckId: truck.id, brand: req.body.Tire.brand, model: req.body.Tire.model }, });

    alert('Truck created successfully');
  } catch (error) {
    //throw new Error("Failed to create truck!")
    alert(`Error: ${error.message}`);
  }

  revalidatePath("/dashboard/trucks")
  redirect("/dashboard/trucks")
};

// Método para obtener todos los camiones
export const getTrucks = async () => {
  try {
    const trucks = await prisma.truck.findMany();
    return trucks
    
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

// Método para obtener un camión por su ID
export const getTruckById = async (id) => {

  try {
    const truck = await prisma.truck.findFirst({
      where: { id: id },
    });

    if (!truck) {
      alert('Truck not found');
    }

    return truck
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
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

export const deleteTruck = async (formData) => {
  const { id } = Object.fromEntries(formData);

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
      alert("Error: Truck not found");
    }

    // Eliminar las relaciones dependientes
    if (truck.brakes) await prisma.brakes.delete({ where: { id: truck.brakes.id } });
    if (truck.fluidsSystem) await prisma.fluidsSystem.delete({ where: { id: truck.fluidsSystem.id } });
    if (truck.bodyChassis) await prisma.bodyChassis.delete({ where: { id: truck.bodyChassis.id } });
    if (truck.exhaustSystem) await prisma.exhaustSystem.delete({ where: { id: truck.exhaustSystem.id } });
    if (truck.electricalSystem) await prisma.electricalSystem.delete({ where: { id: truck.electricalSystem.id } });
    if (truck.tire) await prisma.tire.delete({ where: { id: truck.electricalSystem.id } });

    // Eliminar los registros de combustible asociados al camión
    if (truck.fuel && truck.fuel.length > 0) {
      for (const fuel of truck.fuel) {
        await prisma.fuel.delete({ where: { id: fuel.id } });
      }
    }

    // Finalmente, eliminar el camión
    await prisma.truck.delete({ where: { id: id } });

    alert('Truck deleted successfully');
  } catch (error) {
    alert(`Error: ${error.message}`);
  }

  revalidatePath("/dashboard/trucks")
};


