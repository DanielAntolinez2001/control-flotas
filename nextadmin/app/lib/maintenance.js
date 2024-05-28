"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateBodyChassis } from "./BodyChassisController";
import { updateTire } from "./tire";
import { updateFuel } from "./FuelController";
import { updateBrakes } from "./BrakesController";
import { updateExhaustSystem } from "./ExhaustSystemController";
import { updateFluidsSystem } from "./FluidsSystemController";
import { updateElectricalSystem } from "./ElectricalSystemController";
import { getTruckById, getTruckByLicense } from "./trucks";
const prisma = new PrismaClient();

// Método para crear un registro de mantenimiento
export const createMaintenance = async (formData) => {
  console.log(formData);
  try {
    const {
      description,
      type,
      cost,
      license_plate,
      brand,
      model,
      mileage,
      status,
      costF,
      efficienncy,
      amount,
      fluid_level,
      pads_condition,
      discs_condition,
      leak_detection,
      pipes_condition,
      mufflers_condition,
      direction_fluid_level,
      brake_fluid_level,
      coolant_fluid_level,
      wiper_fluid_level,
      chassis_condition,
      body_condition,
      seatbelt_functionality,
      battery_status,
      lights_functionality,
      fuse_status,
    } = formData;
    console.log(formData);

    const truck = await getTruckByLicense(license_plate);

    // Convertir cost a un entero
    const costInt = parseInt(cost, 10);
    // Convertir cost a un entero
    const costMileage = parseInt(mileage, 10);

    if (isNaN(costInt)) {
      console.error("Maintenance's cost must be a valid number");
      return { error: "Cost must be a valid number" };
    }

    if (isNaN(costMileage) && mileage !== "") {
      console.error("Mileage cost must be a valid number");
      return { error: "mileage must be a valid number" };
    }

    await updateTire({ brand, model, mileage, status }, truck[0].id);
    await updateFuel({ costF, efficienncy, amount }, truck[0].id);
    await updateBrakes(
      { pads_condition, discs_condition, fluid_level },
      truck[0].id
    );
    await updateExhaustSystem(
      { leak_detection, pipes_condition, mufflers_condition },
      truck[0].id
    );
    await updateFluidsSystem(
      {
        direction_fluid_level,
        brake_fluid_level,
        coolant_fluid_level,
        wiper_fluid_level,
      },
      truck[0].id
    );
    await updateBodyChassis(
      { chassis_condition, body_condition, seatbelt_functionality },
      truck[0].id
    );
    await updateElectricalSystem(
      { battery_status, lights_functionality, fuse_status },
      truck[0].id
    );

    await prisma.maintenance.create({
      data: {
        description,
        type,
        Cost: costInt,
        truckId: truck[0].id,
      },
    });
    

    revalidatePath("/dashboard/maintenances");
    redirect("/dashboard/maintenances");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener todos registros de mantenimientos
export const getMaintenances = async () => {
  try {
    const maintenances = await prisma.maintenance.findMany({
      include: { truck: true, report: true },
    });
    console.log(maintenances);
    return maintenances;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un registro de mantenimiento por su ID
export const getMaintenanceForReport = async (id) => {
  try {
    const maintenance = await prisma.maintenance.findFirst({
      where: { id: id },
      include: { truck: true },
    });
    if (!maintenance) {
      console.error("mantenimiento no encontrado");
    }
    return maintenance;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener los registros de mantenimiento de un camión
export const getMaintenanceByTruck = async (license_plate) => {
  try {
    const truck = await prisma.truck.findMany({
      where: { license_plate: { startsWith: license_plate } },
    });
    console.log(truck[0], "hola");
    if (truck[0] != undefined) {
      const idT = truck[0].id.toString(); // Convertir a cadena
      const maintenance = await prisma.maintenance.findMany({
        where: { truckId: idT },
        include: { report: true, truck: true },
      });

      if (!maintenance) {
        console.error("registro de mantenimiento no encontrado");
      }

      return maintenance;
    } else return [];
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para actualizar un registro de mantenimiento por su ID
export const updateMaintenance = async (req, res) => {
  const { id } = req.params;
  const { description, cost } = req.body;

  try {
    const maintenance = await prisma.maintenance.update({
      where: { id: id },
      data: {
        description: description,
        cost: cost,
      },
    });

    res.status(200).json({ maintenance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const scheduleMaintenance = async (type, scheduleDate, licensePlate) => {
  try {
    console.log(type, scheduleDate, licensePlate);
    const scheduleDateObject = new Date(scheduleDate);

    // Verificar si la conversión fue exitosa
    if (isNaN(scheduleDateObject.getTime())) {
      console.error("Error: La fecha de programación no es válida.");
      return; 
    }

    // Obtener la fecha y hora en formato ISO-8601
    const scheduleDateISO = scheduleDateObject.toISOString();

    const truck = await prisma.truck.findMany({
      where: { license_plate: licensePlate },
    });
    const idT = truck[0].id;
    await prisma.maintenance.create({
      data: {
        status: "Pending",
        type: type,
        schedule_m: scheduleDateISO,
        truckId: idT,
      },
    });

    revalidatePath("/dashboard/maintenances");
    redirect("/dashboard/maintenances");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const deleteMaintenanceForTruck = async (id) => {
  try {
    const maintenance = await prisma.maintenance.deleteMany({
      where: { truckId: id },
    });
    await prisma.report.deleteMany({
      where: { maintenanceId: maintenance.id },
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getPendingMaintenances = async () => {
  try {
    const pendingMaintenances = await prisma.maintenance.findMany({
      where: { status: "Pending" },
      include: { truck: true },
    });
    const maintenancesStatus = [];

    for (const maintenance of pendingMaintenances) {
      maintenancesStatus.push({
        truckLicense: maintenance.truck.license_plate,
        id: maintenance.id,
        schedule_m: maintenance.schedule_m,
      });
    }

    return maintenancesStatus;
  } catch (error) {
    console.error(
      `Error al obtener los mantenimientos pendientes: ${error.message}`
    );
    throw error;
  }
};

// Método para eliminar un registro de mantenimiento por su ID
export const deleteMaintenance = async (id) => {
  try {
    console.log(id);
    const maintenance = await prisma.maintenance.findFirst({
      where: { id: id },
    });
    await prisma.report.deleteMany({
      where: { maintenanceId: maintenance.id },
    });
    await prisma.maintenance.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/maintenances");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// -----------------------------------  Exception --------------------------------- //
export const createException = async (id, formData) => {
  try {
    const {
      description,
      statusE,
      brand,
      model,
      mileage,
      status,
      costF,
      efficienncy,
      amount,
      fluid_level,
      pads_condition,
      discs_condition,
      leak_detection,
      pipes_condition,
      mufflers_condition,
      direction_fluid_level,
      brake_fluid_level,
      coolant_fluid_level,
      wiper_fluid_level,
      chassis_condition,
      body_condition,
      seatbelt_functionality,
      battery_status,
      lights_functionality,
      fuse_status,
    } = formData;
    console.log(formData);

    const truck = await getTruckById(id);
    console.log(truck, id);

    await updateTire({ brand, model, mileage, status }, truck.id);
    await updateFuel({ costF, efficienncy, amount }, truck.id);
    await updateBrakes(
      { pads_condition, discs_condition, fluid_level },
      truck.id
    );
    await updateExhaustSystem(
      { leak_detection, pipes_condition, mufflers_condition },
      truck.id
    );
    await updateFluidsSystem(
      {
        direction_fluid_level,
        brake_fluid_level,
        coolant_fluid_level,
        wiper_fluid_level,
      },
      truck.id
    );
    await updateBodyChassis(
      { chassis_condition, body_condition, seatbelt_functionality },
      truck.id
    );
    await updateElectricalSystem(
      { battery_status, lights_functionality, fuse_status },
      truck.id
    );

    const exception = await prisma.exception.create({
      data: {
        description,
        status: statusE,
        truckId: truck.id,
      },
    });

    revalidatePath(`/dashboard/`);
    redirect(`/dashboard/`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getPendingException = async () => {
  try {
    const pendingException = await prisma.exception.findMany({
      where: { status: "Pending" },
      include: { truck: true },
    });
    const exceptionsStatus = [];

    for (const exception of pendingException) {
      exceptionsStatus.push({
        truckid: exception.truck.id,
        truckLicense: exception.truck.license_plate,
        id: exception.id,
        description: exception.description,
      });
    }

    console.log(exceptionsStatus);
    return exceptionsStatus;
  } catch (error) {
    console.error(
      `Error al obtener las excepciones pendientes: ${error.message}`
    );
    throw error;
  }
};

export const checkException = async (id) => {
  try {
    console.log(id);
    await prisma.exception.update({
      where: { id: id },
      data: { status: "Ckeck" },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
  } catch (error) {
    console.error(
      `Error al obtener las excepciones pendientes: ${error.message}`
    );
    throw error;
  }
};
