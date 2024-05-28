"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

//Método para crear dirección
export const createRoute = async (req) => {
  console.log(req);
  try {
    const from = `lat: ${req.origin.lat}, lng: ${req.origin.lng}`;
    const to = `lat: ${req.destination.lat}, lng: ${req.destination.lng}`;

    const truck = await prisma.truck.findMany({ where: {license_plate: req.truckLicense}})
    await prisma.route.create({ 
        data: {
            from, 
            to,
            time: req.duration, 
            distance: req.distance,
            truckId: truck[0].id,
            userId: req.userId,
        },
    })

    const idT = truck[0].id;
    await prisma.truck.update({ where: {id: idT}, data: { status: "active"}});

    revalidatePath("/dashboard/map");
    redirect('/dashboard/map');

  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const getRoutes = async () => {
    try {
        const routes = await prisma.route.findMany({
          include: { truck: true, user: true },
        });
        console.log(routes);
        return routes;
    } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
    }
}

// Método para obtener los registros de mantenimiento de un camión
export const getRouteByTruck = async (license_plate) => {
    try {
      const truck = await prisma.truck.findMany({
        where: { license_plate: { startsWith: license_plate } },
      });
      console.log(truck[0], "hola");
      if (truck[0] != undefined) {
        const idT = truck[0].id.toString(); // Convertir a cadena
        const route = await prisma.route.findMany({
          where: { truckId: idT },
          include: { truck: true, user: true },
        });
  
        if (!route) {
          console.error("registro de ruta no encontrado");
        }
  
        return route;
      } else return [];
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
};

export const deleteRoute = async (id) => {
    try{
        const route = await prisma.route.delete({
            where: {id: id},
            include: {truck: true}
        }, )

        console.log(route); 
        await prisma.truck.update({ where: {id: route.truck.id}, data: { status: "available"}});

        revalidatePath("/dashboard/map");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}
