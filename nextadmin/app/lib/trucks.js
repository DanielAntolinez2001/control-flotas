"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
import path from "path";
import fs from "fs";
import { deleteMaintenanceForTruck } from "./maintenance";

// Método para crear un camión
export const createTruck = async (formData) => {
  try {
    const formEntries = Object.fromEntries(formData);
    const { brand, model, status, license_plate } = formEntries;
    const tireBrand = formEntries["Tire[brand]"];
    const tireModel = formEntries["Tire[model]"];

    let avatarPath;

    // Asegurarse de que avatar es un archivo
    const avatar = formData.get("avatar");
    if (avatar && avatar instanceof File && avatar.name !== "undefined") {
      const avatarFileName = `${license_plate}-${avatar.name}`;
      avatarPath = path.posix.join("/uploads", avatarFileName);
      const uploadPath = path.join(process.cwd(), "public", avatarPath);

      // Convertir el archivo a un Buffer y guardar el archivo en la carpeta del proyecto
      const buffer = Buffer.from(await avatar.arrayBuffer());
      fs.writeFileSync(uploadPath, buffer);
    }

    // Convertir model a un entero
    const modelInt = parseInt(model, 10);
    const modelTireInt = parseInt(tireModel, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(modelInt) || isNaN(modelTireInt)) {
      console.error("Model must be a valid number");
      return { error: "Model must be a valid number" };
    }

    if (modelInt < 1970 || modelInt > currentYear + 1) {
      console.error("Model year must be between 1970 and next year");
      return { error: "Model year must be between 1970 and next year" };
    }
    if (modelTireInt < 1970 || modelTireInt > currentYear + 1) {
      console.error("Tire's model year must be between 1970 and next year");
      return { error: "Tire's model year must be between 1970 and next year" };
    }

    if (license_plate.length !== 6) {
      console.error("License plate must be exactly 6 characters");
      return { error: "License plate must be exactly 6 characters" };
    }

    const truck = await prisma.truck.create({
      data: {
        brand,
        model: modelInt,
        status,
        license_plate,
        avatar: avatarPath,
      },
    });

    console.log("Tire Data:", { tireBrand, tireModel });

    if (tireBrand && tireModel) {
      await prisma.tire.create({
        data: {
          truckId: truck.id,
          brand: tireBrand,
          model: modelTireInt,
        },
      });
    } else {
      console.error("Error: Faltan datos de neumáticos");
      throw new Error("Faltan datos de neumáticos");
    }

    await prisma.fuel.create({ data: { truckId: truck.id } });
    await prisma.brakes.create({ data: { truckId: truck.id } });
    await prisma.fluidsSystem.create({ data: { truckId: truck.id } });
    await prisma.bodyChassis.create({ data: { truckId: truck.id } });
    await prisma.exhaustSystem.create({ data: { truckId: truck.id } });
    await prisma.electricalSystem.create({ data: { truckId: truck.id } });

    revalidatePath("/dashboard/trucks");
    redirect("/dashboard/trucks");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getLicensePlates = async () => {
  try {
    const trucks = await prisma.truck.findMany({
      select: {
        license_plate: true,
      },
    });
    console.log(trucks.map((truck) => truck.license_plate));
    return trucks.map((truck) => truck.license_plate);
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

export const getAvailableTrucks = async () => {
  try {
    const availableTrucks = await prisma.truck.findMany({
      where: { status: "available" },
    });
    const trucksStatus = [];

    for (const truck of availableTrucks) {
      trucksStatus.push({
        truckLicense: truck.license_plate,
        id: truck.id,
        status: truck.status,
      });
    }

    return trucksStatus;
  } catch (error) {
    console.error(
      `Error al obtener los camiones disponibles: ${error.message}`
    );
    throw error;
  }
};

export const getLicensePlatesAvailable = async () => {
  try {
    const trucks = await prisma.truck.findMany({
      where: { status: "available" },
      select: {
        id: true,
        license_plate: true,
      },
    });

    // Obtener la fecha de hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availableLicensePlates = [];

    for (const truck of trucks) {
      // Obtener todas las rutas del camión creadas hoy
      const routes = await prisma.route.findMany({
        where: {
          truckId: truck.id,
          createdAt: {
            gte: today,
          },
        },
      });

      const totalMinutes = routes.reduce((sum, route) => sum + route.duration, 0);

      if (totalMinutes < 780) {
        availableLicensePlates.push(truck.license_plate);
      }else{
        await prisma.truck.update({ where: {id: truck.id}, data: { status: "active"}});
      }
    }

    console.log(availableLicensePlates);
    return availableLicensePlates;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getTruckAndComponents = async (id) => {
  try {
    const truck = await prisma.truck.findFirst({ where: { id: id } });
    const fluidsSystem = await prisma.fluidsSystem.findMany({
      where: { truckId: id },
    });
    const brakes = await prisma.brakes.findMany({ where: { truckId: id } });
    const bodyChassis = await prisma.bodyChassis.findMany({
      where: { truckId: id },
    });
    const exhaustSystem = await prisma.exhaustSystem.findMany({
      where: { truckId: id },
    });
    const electricalSystem = await prisma.electricalSystem.findMany({
      where: { truckId: id },
    });
    const tire = await prisma.tire.findMany({ where: { truckId: id } });

    const recentFuel = await prisma.fuel.findFirst({
      where: { truckId: id },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!truck) {
      console.error("Truck not found");
      return null;
    }

    const result = {
      truck,
      fluidsSystem,
      brakes,
      bodyChassis,
      exhaustSystem,
      electricalSystem,
      tire,
      fuel: recentFuel,
    };

    // Log the result in a more readable format
    console.log(JSON.stringify(result, null, 2));
    return result;
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
      where: { brand: { startsWith: brand } },
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
      data: { status },
    });

    revalidatePath("/dashboard/trucks");
    redirect("/dashboard/trucks");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const redirectMain = async () => {
  redirect("/dashboard/trucks");
};

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
    await prisma.fluidsSystem.deleteMany({ where: { truckId: id } });
    await prisma.brakes.deleteMany({ where: { truckId: id } });
    await prisma.fluidsSystem.deleteMany({ where: { truckId: id } });
    await prisma.bodyChassis.deleteMany({ where: { truckId: id } });
    await prisma.exhaustSystem.deleteMany({ where: { truckId: id } });
    await prisma.electricalSystem.deleteMany({ where: { truckId: id } });
    await prisma.tire.deleteMany({ where: { truckId: id } });
    await deleteMaintenanceForTruck(id);
    // Eliminar los registros de combustible asociados al camión
    if (truck.fuel && truck.fuel.length > 0) {
      for (const fuel of truck.fuel) {
        await prisma.fuel.delete({ where: { id: fuel.id } });
      }
    }
    await prisma.exception.delete({ where: {truckId: id}});

    // Finalmente, eliminar el camión
    await prisma.truck.delete({ where: { id: id } });

    revalidatePath("/dashboard/trucks");
    console.log("Eliminado");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
