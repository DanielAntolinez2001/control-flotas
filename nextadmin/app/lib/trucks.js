"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
const prisma = new PrismaClient();

// Método para crear un camión
export const createTruck = async (formData) => {
  try {
    const formEntries = Object.fromEntries(formData);
    const { brand, model, status, license_plate} = Object.fromEntries(formData);
    const tireBrand = formEntries["Tire[brand]"]
    const tireModel = formEntries["Tire[model]"]

    const avatar = formData.get('file') ? formData.get('file').name : null;
    console.log(avatar)

    // Convertir `model` a un entero
    const modelInt = parseInt(model, 10);

    if (isNaN(modelInt)) {
      console.error("Model must be a valid number" );
    }

    const truck = await prisma.truck.create({
      data: {
        brand,
        model: modelInt,
        status,
        license_plate,
        avatar,
      },
    });

    const fuelTruck = await prisma.fuel.create({ data: { truckId: truck.id } });
    const brakesTruck = await prisma.brakes.create({
      data: { truckId: truck.id },
    });
    const FluidsSystem_Truck = await prisma.fluidsSystem.create({
      data: { truckId: truck.id },
    });
    const BodyChassis = await prisma.bodyChassis.create({
      data: { truckId: truck.id },
    });
    const ExhaustSystem = await prisma.exhaustSystem.create({
      data: { truckId: truck.id },
    });
    const ElectricalSystem = await prisma.electricalSystem.create({
      data: { truckId: truck.id },
    });

    // Create tire related to the truck

    console.log('Tire Data:', {tireBrand, tireModel});

    if (tireBrand && tireModel) {

      const modelTInt = parseInt(tireModel, 10);
      if (isNaN(modelInt)) {
        console.error("Tire's model must be a valid number" );
      }

      await prisma.tire.create({
        data: {
          truckId: truck.id,
          brand: tireBrand,
          model: modelTInt,
        },
      });
    }else{
      console.error(`Error: Faltan datos de neumaticos`);
      throw error;
    }

    revalidatePath("/dashboard/trucks");
    redirect("/dashboard/trucks");

    return truck;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener todos los camiones
export const getTrucks = async () => {
  try {
    const trucks = await prisma.truck.findMany();
    return trucks;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un camión por su ID
export const getTruckById = async (id) => {
  try {
    const truck = await prisma.truck.findFirst({
      where: { id: id },
    });

    if (!truck) {
      alert("Truck not found");
    }

    return truck;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }
};

// Método para obtener camiones por su marca
export const getTruckByBrand = async (req) => {
  console.log(req);
  const brand = req;

  try {
    const truck = await prisma.truck.findMany({
      where: { brand: brand },
    });
    if (!truck) {
      console.error(`Camión no encontrado`);
      return null;
    }

    return truck;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para actualizar un camión por su ID
export const updateTruck = async (formData) => {
  const { id, brand, model, status, license_plate } = Object.fromEntries(formData);
  const avatar = formData.get('file') ? formData.get('file').name : null;
  console.log(avatar)

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

    Object.keys(truck).forEach(
      (key) => 
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    return truck;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
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
        fluids_system: true,
        body_chassis: true,
        electrical_system: true,
        exhaust_system: true,
        tire: true,
      },
    });

    if (!truck) {
      console.error("Error: Truck not found");
    }

    // Eliminar las relaciones dependientes
    if (truck.brakes)
      await prisma.brakes.delete({ where: { id: truck.brakes.id } });
    if (truck.fluidsSystem)
      await prisma.fluidsSystem.delete({where: { id: truck.fluids_system.id },});
    if (truck.bodyChassis)
      await prisma.bodyChassis.delete({ where: { id: truck.body_chassis.id } });
    if (truck.exhaustSystem)
      await prisma.exhaustSystem.delete({ where: { id: truck.exhaust_system.id },});
    if (truck.electricalSystem)
      await prisma.electricalSystem.delete({ where: { id: truck.electrical_system.id },});
    if (truck.tire)
      await prisma.tire.delete({ where: { id: truck.tire.id } });

    // Eliminar los registros de combustible asociados al camión
    if (truck.fuel && truck.fuel.length > 0) {
      for (const fuel of truck.fuel) {
        await prisma.fuel.delete({ where: { id: fuel.id } });
      }
    }

    // Finalmente, eliminar el camión
    console.log(id);
    await prisma.truck.delete({ where: { id: id },});

    console.log("Eliminado");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }

  revalidatePath("/dashboard/trucks");
};
