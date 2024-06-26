"use server";

import * as maintenanceController from "./maintenance";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReport = async (id) => {
  try {
    const reportM = await getReportByMaintenance(id);
    console.log(reportM);

    if (reportM == null) {
      // Obtener la información de mantenimiento con todos los detalles asociados
      const maintenance = await maintenanceController.getMaintenanceForReport(
        id
      );
      const costo = maintenance.Cost;

      // Formatear la información en un texto legible
      let reportContent = `Reporte de Mantenimiento\n\n`;
      reportContent += `ID de Mantenimiento: ${maintenance.id}\n`;
      reportContent += `Fecha de Mantenimiento: ${maintenance.createdAt}\n`;

      reportContent += `\nInformación del Camión:\n`;
      reportContent += `Marca: ${maintenance.truck.brand}\n`;
      reportContent += `Modelo: ${maintenance.truck.model}\n`;
      reportContent += `Estado: ${maintenance.truck.status}\n`;
      reportContent += `Placa: ${maintenance.truck.license_plate}\n`;

      reportContent += `\nDetalles del Mantenimiento:\n`;
      reportContent += `Descripción: ${maintenance.description}\n`;
      reportContent += `Costo: ${maintenance.Cost}\n`;

      // Agregar información de los objetos asociados al camión
      reportContent += `\nDetalles del Camión:\n`;

      const fluidSystem = await prisma.fluidsSystem.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles del sistema de fluidos:\n`;
      reportContent += `  Nivel de líquido de dirección: ${fluidSystem[0].direction_fluid_level}\n`;
      reportContent += `  Nivel de líquido de frenos: ${fluidSystem[0].brake_fluid_level}\n`;
      reportContent += `  Nivel de líquido refrigerante: ${fluidSystem[0].coolant_fluid_level}\n`;
      reportContent += `  Nivel de líquido limpiaparabrisas: ${fluidSystem[0].wiper_fluid_level}\n`;

      const bodyChassis = await prisma.bodyChassis.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles del Chassis y Cuerpo:\n`;
      reportContent += `  Condición del chasis: ${bodyChassis[0].chassis_condition}\n`;
      reportContent += `  Condición del cuerpo: ${bodyChassis[0].body_condition}\n`;
      reportContent += `  Funcionalidad del cinturón de seguridad: ${bodyChassis[0].seatbelt_functionality}\n`;

      const electricalSystem = await prisma.electricalSystem.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles del sistema eléctrico:\n`;
      reportContent += `  Estado de la batería: ${electricalSystem[0].battery_status}\n`;
      reportContent += `  Funcionalidad de las luces: ${electricalSystem[0].lights_functionality}\n`;
      reportContent += `  Estado de los fusibles: ${electricalSystem[0].fuse_status}\n`;

      const brakes = await prisma.brakes.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles de los frenos:\n`;
      reportContent += `  Condición de almohadillas: ${brakes[0].pads_condition}\n`;
      reportContent += `  Condición de los discos: ${brakes[0].discs_condition}\n`;
      reportContent += `  Nivel de fluidos: ${brakes[0].fluid_level}\n`;

      const fuel = await prisma.fuel.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles del combustible:\n`;
      reportContent += `  Cantidad de combustible: ${fuel[0].amount}\n`;
      reportContent += `  Costo: ${fuel[0].cost}\n`;
      reportContent += `  Eficiencia: ${fuel[0].efficienncy}\n`;

      const exhaustSystem = await prisma.exhaustSystem.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles del sistema de escape:\n`;
      reportContent += `  Condición de tuberías: ${exhaustSystem[0].pipes_condition}\n`;
      reportContent += `  Condición de silenciadores: ${exhaustSystem[0].mufflers_condition}\n`;
      reportContent += `  Fugas detectadas: ${exhaustSystem[0].leak_detection}\n`;

      const tire = await prisma.tire.findMany({
        where: { truckId: maintenance.truck.id },
      });
      reportContent += `\n  Detalles del Neumáticos\n`;
      reportContent += `  Marca: ${tire[0].brand}\n`;
      reportContent += `  Estado de los nemáticos: ${tire[0].status}\n`;
      reportContent += `  Modelo: ${tire[0].model}\n`;
      reportContent += `  Millas: ${tire[0].mileage}\n`;

      // Crear el reporte en la base de datos
      const report = await prisma.report.create({
        data: { maintenanceId: id, content: reportContent, cost: costo },
      });

      return [report];
    } else console.log(reportM);
    return reportM;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

//Generación de informe del mantenimiento total de la flota
export const createTotalReport = async (req, res) => {
  try {
    // Obtener las fechas de inicio y fin del rango
    const { startDate, endDate } = req.body;

    const maintenances = await prisma.maintenance.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        truck: true,
      },
    });

    // Contar la cantidad de mantenimientos realizados
    const totalMaintenanceCount = maintenances.length;

    let reportContent = `Se realizaron ${totalMaintenanceCount} mantenimientos entre ${startDate} y ${endDate}`;

    // Crear el informe total en la base de datos
    const totalReport = await prisma.report.create({
      data: { content: reportContent },
    });

    res.status(201).json({
      totalReport,
      mantenimientos: { count: totalMaintenanceCount, content: maintenances },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Metodo para generar un informe que identifique el vehículo que consume más combustible
export const createReportFuel = async () => {
  try {
    // Encuentra los reportes existentes que consumen combustible
    const reportS = await prisma.report.findMany({
      where: { consume_fuel: true },
    });
    // Encuentra todos los camiones con sus registros de combustible
    const trucks = await prisma.truck.findMany({ include: { fuel: true } });

    // Variables para los camiones con mayor consumo de combustible
    let maxFuelConsumptionTruck = null;
    let maxTotalFuelConsumption = 0;
    let maxFuelConsumptionTruck2 = null;
    let maxTotalFuelConsumption2 = 0;

    // Calcula el consumo total de combustible para cada camión
    trucks.forEach((truck) => {
      let totalFuelConsumption = 0;

      truck.fuel.forEach((fuelRecord) => {
        totalFuelConsumption += fuelRecord.cost;
      });

      // Encuentra los dos camiones con mayor consumo de combustible
      if (totalFuelConsumption > maxTotalFuelConsumption) {
        maxFuelConsumptionTruck2 = maxFuelConsumptionTruck;
        maxTotalFuelConsumption2 = maxTotalFuelConsumption;
        maxFuelConsumptionTruck = truck;
        maxTotalFuelConsumption = totalFuelConsumption;
      } else if (totalFuelConsumption >= maxTotalFuelConsumption2) {
        maxFuelConsumptionTruck2 = truck;
        maxTotalFuelConsumption2 = totalFuelConsumption;
      }
    });

    // Genera el contenido del informe
    let reportContent = "";
    if (maxFuelConsumptionTruck) {
      reportContent = "Informe de Consumo de Combustible\n\n";
      reportContent += "El camión con el mayor consumo de combustible es:\n";
      reportContent += `ID: ${maxFuelConsumptionTruck.id}\n`;
      reportContent += `Marca: ${maxFuelConsumptionTruck.brand}\n`;
      reportContent += `Modelo: ${maxFuelConsumptionTruck.model}\n`;
      reportContent += `Estado: ${maxFuelConsumptionTruck.status}\n`;
      reportContent += `Placa: ${maxFuelConsumptionTruck.license_plate}\n`;
      reportContent += `Consumo Total de Combustible: ${maxTotalFuelConsumption}\n`;

      if (maxFuelConsumptionTruck2) {
        reportContent +=
          "\nEl segundo camión con el mayor consumo de combustible es:\n";
        reportContent += `ID: ${maxFuelConsumptionTruck2.id}\n`;
        reportContent += `Marca: ${maxFuelConsumptionTruck2.brand}\n`;
        reportContent += `Modelo: ${maxFuelConsumptionTruck2.model}\n`;
        reportContent += `Estado: ${maxFuelConsumptionTruck2.status}\n`;
        reportContent += `Placa: ${maxFuelConsumptionTruck2.license_plate}\n`;
        reportContent += `Consumo Total de Combustible: ${maxTotalFuelConsumption2}\n`;
      }
    } else {
      reportContent = "No se encontraron datos de consumo de combustible";
    }

    let report = null;
    console.log(reportS);

    // Actualiza el reporte si ya existe, de lo contrario crea uno nuevo
    if (reportS.length > 0) {
      report = await prisma.report.update({
        where: { id: reportS[0].id },
        data: { content: reportContent },
      });
    } else {
      report = await prisma.report.create({
        data: {
          consume_fuel: true,
          content: reportContent,
          cost: 0,
          maintenanceId: null, // Asegúrate de que maintenanceId sea null si no lo necesitas
        },
      });
    }

    return [report];
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un reporte por su ID
export const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.findFirst({
      where: { id: id },
    });
    if (!report) {
      return res.status(404).json({ message: "reporte no encontrado" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener el reporte dado el mantenimiento
export const getReportByMaintenance = async (id) => {
  try {
    const report = await prisma.report.findMany({
      where: { maintenanceId: id },
    });
    if (report.length === 0) {
      return null;
    }
    return report;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para eliminar un reporte por su ID
export const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.delete({
      where: { id: id },
    });
    res.status(200).json({ report });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
