"use server"

import * as addressController from "./address.js";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Método para crear usuario
export const createUser = async (formData) => {
  try{
    const { name, lastname, email, password, role, active} = Object.fromEntries(formData);
    const avatar = Object.fromEntries(formData).file ? req.file.filename : null;
    console.log(avatar);  

    // Luego, creamos la dirección asociada al usuario
    //const userAddress = await addressController.createAddress(address);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            name,
            lastname,           
            email,   
            password: hashedPassword,           
            role,
            active,      
            avatar, // Asociamos la dirección al usuario recién creado 
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
  const { id } = id

  try {
      const user = await prisma.user.findFirst({
          where: { id: id },
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

    try {
        const users = await prisma.user.findMany({
            where: { name: name },
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

// Método para actualizar un usuario por su ID
export const updateUser = async (formData) => {
    const { id, name, lastname, email, password, role, active, addressId} = Object.fromEntries(formData);
    const avatar = formData.get('file') ? formData.get('file').name : null;
    console.log(avatar)

    const updateData = {
        name,
        lastname,              
        password,           
        role,
        active, 
        addressId,      
        avatar 
    };

    if (avatar) updateData.avatar = avatar;

    try {
        const updateUser1 = await prisma.user.update({
            where: {id: id},
            data: updateData,
        })

        revalidatePath("/dashboard/trucks");
        redirect('/dashboard/trucks');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
};
  
// Método para eliminar un usuario por su ID
export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        const deleteUser1 = await prisma.user.delete({ where: { id: id},})
        if (deleteUser1.address)
          await addressController.deleteAddress(deleteUser1.addressId)

        revalidatePath("/dashboard/users");
        redirect("/dashboard/users");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};
  
