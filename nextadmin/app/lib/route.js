"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Método para crear dirección
export const createRoute = async (req) => {
  console.log(req);
  try {
    const from = `lat: ${req.origin.lat}, lng: ${req.origin.lng}`;
    const to = `lat: ${req.destination.lat}, lng: ${req.destination.lng}`;

    await prisma.route.create({ 
        data: {
            from, 
            to,
            time: req.duration, 
            distance: req.distance,
        },
    })
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
