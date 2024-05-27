"use server"

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
    const { description, type, cost, licensePlate, brand, model, mileage, status, costF, efficienncy, amount, fluid_level, pads_condition, discs_condition, leak_detection, pipes_condition, mufflers_condition, direction_fluid_level, brake_fluid_level, coolant_fluid_level, wiper_fluid_level, chassis_condition, body_condition, seatbelt_functionality, battery_status, lights_functionality, fuse_status} = formData;
    console.log(formData)

    const truck = await getTruckByLicense(licensePlate);

    await updateTire({ brand, model, mileage, status}, truck[0].id);
    await updateFuel({ costF, efficienncy, amount }, truck[0].id);
    await updateBrakes({ pads_condition, discs_condition, fluid_level }, truck[0].id);
    await updateExhaustSystem({ leak_detection, pipes_condition, mufflers_condition }, truck[0].id);
    await updateFluidsSystem({ direction_fluid_level, brake_fluid_level, coolant_fluid_level, wiper_fluid_level }, truck[0].id);
    await updateBodyChassis({ chassis_condition, body_condition, seatbelt_functionality }, truck[0].id);
    await updateElectricalSystem({ battery_status, lights_functionality, fuse_status }, truck[0].id);
    
    // Convertir `cost` a un entero
    const costInt = parseInt(cost, 10);

    if (isNaN(costInt)) {
      console.error("Maintenance's cost must be a valid number" );
    }

    const maintenance = await prisma.maintenance.create({
      data: {
        description,
        type,
        Cost: costInt,
        truckId: truck[0].id,
      },
    });

    revalidatePath("/dashboard/maintenances");
    redirect('/dashboard/maintenances');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener todos registros de mantenimientos
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await prisma.maintenance.findMany({
      include: {truck: true},
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
    const maintenance = await prisma.maintenance.findFirst({ where: { id: id }, });
    if (!maintenance) { console.error("mantenimiento no encontrado"); }
    return maintenance;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
};

// Método para obtener los registros de mantenimiento de un camión
export const getMaintenanceByTruck = async (req, res) => {
  const { truckId } = req.params;

  try {
    const maintenance = await prisma.maintenance.findMany({
      where: { truckId: truckId },
    });
    if (!maintenance) {
      return res.status(404).json({ message: "registro de mantenimiento no encontrado" });
    }

    return maintenance;
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

// Método para eliminar un registro de mantenimiento por su ID
export const deleteMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    const maintenance = await prisma.maintenance.delete({
      where: { id: id },
    });
    res.status(200).json({ maintenance });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

