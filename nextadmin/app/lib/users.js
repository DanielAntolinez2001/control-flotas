"use server"

import * as addressController from "./address.js";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from 'path';
import fs from 'fs';

//Método para crear usuario
export const createUser = async (formData) => {
  console.log(formData);

  try{
    const formEntries = Object.fromEntries(formData.entries());
    const { name, lastname, email, password, role, active, street, zip_code, state, details, city, neighborhood} = formEntries;

    let avatarPath;

    // Asegurarse de que avatar es un archivo
    const avatar = formData.get('avatar');
    if (avatar && avatar instanceof File) {
      const avatarFileName = `${Date.now()}-${avatar.name}`;
      avatarPath = path.posix.join('/uploads', avatarFileName);
      const uploadPath = path.join(process.cwd(), 'public', avatarPath);

      // Convertir el archivo a un Buffer y guardar el archivo en la carpeta del proyecto
      const buffer = Buffer.from(await avatar.arrayBuffer());
      fs.writeFileSync(uploadPath, buffer);
    }

    if (active == "true") {var activeB = true}
    else{ var activeB = false}

    const userAddress = await addressController.createAddress({street, zip_code, state, details, city, neighborhood});

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            name,
            lastname,           
            email,   
            password: hashedPassword,           
            role,
            active: activeB,   
            addressId: userAddress.id,  
            avatar: avatarPath 
        },
    });

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");

  }catch (error){
    console.error(`Error: ${error.message}`);
    throw error;
  }
}; 

export const login = async (req, res) => {
    try {
      const {email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: email }, 
      });   
      
      console.log(user);

      if (!user || password != user.password) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      /*if (user[0].role != role){
        return res.status(401).json({ error: 'Role incorrecto' });
      }*/
  
      // Generar un token de acceso
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
      req.headers.authorization = null;
      res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Método para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {address: true},
    });

    return users;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

// Método para obtener un usuario por su ID
export const getUSerById = async (id) => {
  console.log(id);

  try {
      const user = await prisma.user.findFirst({
          where: { id: id },
          include: {address: true},
      })
      if (!user) {
        console.error("User not found");
      }
      return user;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
  
// Método para obtener usuarios por su nombre
export const getUSerByName = async (req) => {
    const name = req;

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedPrefix = capitalizeFirstLetter(name);

    try {
        const users = await prisma.user.findMany({
            where: { name: {startsWith: capitalizedPrefix,}, },
        })
        if (!users) {
          console.log("No se encontraron usuarios con ese nombre")
          return null;
        }
        return users;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
};

export const redirectMain = async () => { redirect('/dashboard/users'); }

export const updateUser = async (id, formData) => {
  // Convertir formData a un objeto
  const formEntries = Object.fromEntries(formData.entries());
  const { name, lastname, password, street, city, state, zip_code, details, neighborhood } = formEntries;

  let avatarPath;

  // Asegurarse de que avatar es un archivo
  const avatar = formData.get('avatar');
  if (avatar && avatar instanceof File) {
    const avatarFileName = `${Date.now()}-${avatar.name}`;
    avatarPath = path.posix.join('/uploads', avatarFileName);
    const uploadPath = path.join(process.cwd(), 'public', avatarPath);

    // Convertir el archivo a un Buffer y guardar el archivo en la carpeta del proyecto
    const buffer = Buffer.from(await avatar.arrayBuffer());
    fs.writeFileSync(uploadPath, buffer);
  }

  const updateData = {
    name,
    lastname,
    password,
    avatar: avatarPath
  };

  const user = await getUSerById(id);
  const idA = user.addressId;

  const adress = addressController.updateAddress({ street, city, state, zip_code, details, neighborhood }, idA)

  // Filtrar para eliminar propiedades vacías
  const filteredUpdateData = Object.fromEntries(
    Object.entries(updateData).filter(([key, value]) => value !== '' && value !== undefined)
  );

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: filteredUpdateData,
    });

    revalidatePath("/dashboard/users");
    redirect('/dashboard/users');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};
  
// Método para eliminar un usuario por su ID
export const deleteUser = async (id) => {
    try {
        const deleteUser1 = await prisma.user.delete({ where: { id: id},})
        await addressController.deleteAddress(deleteUser1.addressId)

        revalidatePath("/dashboard/users");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};
  
