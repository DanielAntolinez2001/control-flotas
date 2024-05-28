"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

// Método para obtener todos los registros de neumáticos
export const getTires = async () => {
  try {
    const tires = await prisma.tire.findMany({ include: { truck: true } });
    return tires;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un registro de neumáticos por su ID
export const getTireByTruck = async (license_plate) => {
  try {
    const truck = await prisma.truck.findMany({
      where: { license_plate: { startsWith: license_plate } },
    });

    if (truck[0] != undefined) {
      const idT = truck[0].id.toString(); // Convertir a cadena
      const tire = await prisma.tire.findMany({
        where: { truckId: truckId },
        include: { truck: true },
      });

      if (!tire) {
        console.error("Tire no found");
      }

      return tire;
    } else return [];
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un registro de neumáticos por su ID
export const getTireById = async (id) => {
  console.log(id);
  try {
    const tire = await prisma.tire.findFirst({
      where: { id: id },
      include: { truck: true },
    });
    if (!tire) {
      console.error("Tire no found");
    }
    return tire;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para actualizar un registro de neumáticos por su ID
export const updateTire = async (req, id) => {
  const { brand, model, mileage, status } = req;

  // Convertir model a un entero
  const modelInt = parseInt(model, 10);

  if (isNaN(modelInt)) {
    console.error("Model must be a valid number");
  }

  // Convertir model a un entero
  const mileageInt = parseInt(mileage, 10);

  if (isNaN(mileageInt)) {
    console.error("Mileage must be a valid number");
  }

  const updateData = {};
  if (brand != "option") updateData.brand = brand;
  if (model) updateData.model = modelInt;
  if (mileage) updateData.mileage = mileageInt;
  if (status != "option") updateData.status = status;

  try {
    const tire = await prisma.tire.findMany({ where: { truckId: id } });

    await prisma.tire.update({
      where: { id: tire[0].id },
      data: updateData,
    });
    if (!tire) {
      console.log("Tire no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getTruckData = async (truckId) => {
  try {
    const truckData = await prisma.truck.findUnique({ where: { id: truckId } });
    return truckData;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

//Metodo para actualizar las rotaciones de los neumaticos
export const changeRotation = async (id, req) => {
  try {
    console.log(id, req);
    const { rotation_pattern } = Object.fromEntries(req.entries());
    const updateData = { rotation_pattern };

    // Filtrar para eliminar propiedades vacías
    const filteredUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== "" && value !== undefined
      )
    );

    const tire = await prisma.tire.findFirst({ where: { id: id } });
    if (filteredUpdateData != {}) {
      await prisma.truck.update({
        where: { id: tire.truckId },
        data: { rotation_neumatics: new Date() },
      });
    }

    await prisma.tire.update({
      where: { id: id },
      data: filteredUpdateData,
    });

    revalidatePath("/dashboard/tires");
    redirect("/dashboard/tires");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

//Metodo para cambiar los neumáticos
export const changeTire = async (id, req) => {
  try {
    const currentYear = new Date().getFullYear();
    const { brand, model } = Object.fromEntries(req.entries());

    // Convertir model a un entero
    const modelInt = parseInt(model, 10);

    if (isNaN(modelInt)) {
      console.error("Model must be a valid number");
      return { error: "Model must be a valid number" };
    }

    if (modelInt < 1970 || modelInt > currentYear + 1) {
      console.error("Model year must be between 1970 and next year");
      return { error: "Model year must be between 1970 and next year" };
    }

    const updateData = {
      brand,
      model: modelInt,
    };

    // Filtrar para eliminar propiedades vacías
    const filteredUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== "" && value !== undefined
      )
    );

    const tire = await prisma.tire.findFirst({ where: { id: id } });
    if (filteredUpdateData != {}) {
      await prisma.truck.update({
        where: { id: tire.truckId },
        data: { change_neumatics: new Date() },
      });
    }

    await prisma.tire.update({
      where: { id: id },
      data: filteredUpdateData,
    });

    revalidatePath("/dashboard/tires");
    redirect("/dashboard/tires");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Función para determinar si es hora de cambiar los neumáticos
export const isTimeToChangeTires = async () => {
  try {
    const tires = await prisma.tire.findMany();
    const tireStatus = [];

    for (const tire of tires) {
      const truck = await getTruckData(tire.truckId);
      const recommendedChangeDistance =
        Math.floor(Math.random() * (50000 - 30000 + 1)) + 10000; // Genera un valor aleatorio entre 30,000 y 50,000
      const shouldChangeTires = tire.mileage + 100 >= recommendedChangeDistance;

      if (shouldChangeTires || tire.status == "Change") {
        tireStatus.push({
          truckLicense: truck.license_plate,
          tireId: tire.id,
          mileage: tire.mileage,
          shouldChangeTires,
          description: `Truck ${truck.id} has already traveled ${tire.mileage} mileage`,
        });
      }
    }

    return tireStatus;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
