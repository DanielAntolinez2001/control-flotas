import * as maintenanceController from "./MaintenanceController.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReport = async (req, res) => {
    try {
      const { maintenanceId } = req.body;
  
      // Obtener la información de mantenimiento con todos los detalles asociados
      const maintenance = await maintenanceController.getMaintenanceForReport(maintenanceId);
      const costo = maintenance.cost;
  
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
      reportContent += `Costo: ${maintenance.cost}\n`;
  
       // Agregar información de los objetos asociados al camión
       reportContent += `\nDetalles del Camión:\n`;
       if (maintenance.truck.fluids_system) { reportContent += `Sistema de Fluidos: ${maintenance.truck.fluids_system.condition}\n`; }
        if (maintenance.truck.body_chassis) { reportContent += `Carrocería y Chasis: ${maintenance.truck.body_chassis.condition}\n`; }
        if (maintenance.truck.electrical_system) { reportContent += `Sistema Eléctrico: ${maintenance.truck.electrical_system.condition}\n`; }
        if (maintenance.truck.brakes) { reportContent += `Sistema de Frenos: ${maintenance.truck.brakes.condition}\n`; }
        if (maintenance.truck.fuel) { reportContent += `Combustible: ${maintenance.truck.fuel.type}\n`; }
        if (maintenance.truck.exhaust_system) { reportContent += `Sistema de Escape: ${maintenance.truck.exhaust_system.condition}\n`; }
        if (maintenance.truck.tire && maintenance.truck.tire.length > 0) {
            reportContent += `Neumáticos:\n`;
            maintenance.truck.tire.forEach((tire, index) => {
                reportContent += `Neumático ${index + 1}:\n`;
                reportContent += `Marca: ${tire.brand}\n`;
                reportContent += `Modelo: ${tire.model}\n`;
            });
        }

        // Crear el reporte en la base de datos
        const report = await prisma.report.create({ data: { maintenanceId: maintenanceId, content: reportContent, costo: costo, }, });

        res.status(201).json({ report });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
      const totalReport = await prisma.report.create({ data: { content: reportContent }, });
  
      res.status(201).json({ totalReport, mantenimientos: {count: totalMaintenanceCount, content: maintenances} });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};  

//Metodo para generar un informe que identifique el vehículo que consume más combustible
export const createReportFuel = async (req, res) => {

  try {
    const trucks = await prisma.truck.findMany({
      include: {
        fuel: true,
      },
    });

    // Encuentra el camión con el mayor consumo de combustible
    let maxFuelConsumptionTruck = null;
    let maxTotalFuelConsumption = 0;

    trucks.forEach((truck) => {
      let totalFuelConsumption = 0;

      truck.fuel.forEach((fuelRecord) => {
        totalFuelConsumption += fuelRecord.cost;
      });

      if (totalFuelConsumption > maxTotalFuelConsumption) {
        maxTotalFuelConsumption = totalFuelConsumption;
        maxFuelConsumptionTruck = truck;
      }
    });

    // Genera el informe sobre el camión con el mayor consumo de combustible
    let reportContent = '';
    if (maxFuelConsumptionTruck) {
      reportContent = `
        <h1>Informe de Consumo de Combustible</h1>
        <p>El camión con el mayor consumo de combustible es:</p>
        <p>ID: ${maxFuelConsumptionTruck.id}</p>
        <p>Marca: ${maxFuelConsumptionTruck.brand}</p>
        <p>Modelo: ${maxFuelConsumptionTruck.model}</p>
        <p>Estado: ${maxFuelConsumptionTruck.status}</p>
        <p>Placa: ${maxFuelConsumptionTruck.license_plate}</p>
        <p>Consumo Total de Combustible: ${maxTotalFuelConsumption} L</p>
      `;
    } else {
      reportContent = 'No se encontraron datos de consumo de combustible';
    }

    // Envía el informe como respuesta
    res.status(200).send(reportContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
export const getReportByMaintenance = async (req, res) => {
  const { maintenanceId } = req.body;

  try {
    const report = await prisma.report.findMany({
      where: { maintenanceId: maintenanceId },
    });
    if (!report) {
      return res.status(404).json({ message: "reporte no encontrado" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

