"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Método para crear dirección
export const createAddress = async (req) => {
  console.log(req);
  try {
    const { street, city, state, zip_code, details, neighborhood } = req;
    console.log(req);

    const address = await prisma.address.create({
      data: {
        street,
        city,
        state,
        zip_code,
        details,
        neighborhood,
      },
    });

    return address;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener todas las direcciones
export const getAddress = async (req, res) => {
  try {
    const address = await prisma.address.findMany();
    return address;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un usuario por su ID
export const getAdressById = async (id) => {
  try {
    const address = await prisma.address.findFirst({
      where: { id: id },
    });
    if (!address) {
      console.error("Dirección no encontrada");
    }
    return address;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para actualizar un usuario por su ID
export const updateAddress = async (req, id) => {
  const { street, city, state, zip_code, details, neighborhood } = req;

  const updateData = {};
  if (street) updateData.street = street;
  if (city) updateData.city = city;
  if (state) updateData.state = state;
  if (zip_code) updateData.zip_code = zip_code;
  if (details) updateData.details = details;
  if (neighborhood) updateData.neighborhood = neighborhood;

  try {
    const updateAddress1 = await prisma.address.update({
      where: { id: id },
      data: updateData,
    });

    if (!updateAddress1) {
      console.log("Address no found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para eliminar un usuario por su ID
export const deleteAddress = async (req, res) => {
  const { id } = req;
  console.log(req);

  try {
    const deleteAdresss = await prisma.address.delete({ where: { id: req } });

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
