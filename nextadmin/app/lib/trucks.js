"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
import path from 'path';
import fs from 'fs';
import { deleteMaintenanceForTruck } from "./maintenance";

// Método para crear un camión
export const createTruck = async (formData) => {

  try {
    const formEntries = Object.fromEntries(formData);
    const { brand, model, status, license_plate} = Object.fromEntries(formData);
    const tireBrand = formEntries["Tire[brand]"]
    const tireModel = formEntries["Tire[model]"]

    let avatarPath;

    // Asegurarse de que avatar es un archivo
    const avatar = formData.get('avatar');
    if (avatar && avatar instanceof File) {
      const avatarFileName = `${license_plate}-${avatar.name}`;
      avatarPath = path.posix.join('/uploads', avatarFileName);
      const uploadPath = path.join(process.cwd(), 'public', avatarPath);

      // Convertir el archivo a un Buffer y guardar el archivo en la carpeta del proyecto
      const buffer = Buffer.from(await avatar.arrayBuffer());
      fs.writeFileSync(uploadPath, buffer);
    }

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
        avatar: avatarPath 
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
    redirect('/dashboard/trucks');

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
  console.log(id);
  
  try {
    const truck = await prisma.truck.findFirst({
      where: { id: id },
    });

    if (!truck) {
      console.error("Truck not found");
    }

    return truck;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un camión por su ID
export const getTruckByLicense = async (license_plate) => {
  console.log(license_plate);
  
  try {
    const truck = await prisma.truck.findMany({
      where: { license_plate: license_plate },
    });

    if (!truck) {
      console.error("Truck not found");
    }

    return truck;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
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
      console.error("Truck not found");
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
  const { id, status } = Object.fromEntries(formData);

  try {
    
    const truck = await prisma.truck.update({
      where: { id: id },
      data: { status, },
    });

    revalidatePath("/dashboard/trucks");
    redirect('/dashboard/trucks');

  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const redirectMain = async () => { redirect('/dashboard/trucks'); }

export const deleteTruck = async (id) => {

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
    await prisma.fluidsSystem.deleteMany({ where: { truckId: id, }, });
    await prisma.brakes.deleteMany({ where: { truckId: id, } });
    await prisma.fluidsSystem.deleteMany({where: { truckId: id,} ,});
    await prisma.bodyChassis.deleteMany({ where: { truckId: id, } });
    await prisma.exhaustSystem.deleteMany({ where: { truckId: id, },});
    await prisma.electricalSystem.deleteMany({ where: { truckId: id, },});
    await prisma.tire.deleteMany({ where: { truckId: id, } });
    await deleteMaintenanceForTruck(id);
    // Eliminar los registros de combustible asociados al camión
    if (truck.fuel && truck.fuel.length > 0) {
      for (const fuel of truck.fuel) {
        await prisma.fuel.delete({ where: { id: fuel.id } });
      }
    }

    // Finalmente, eliminar el camión
    await prisma.truck.delete({ where: { id: id },});
    
    revalidatePath("/dashboard/trucks");
    console.log("Eliminado");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }

};
