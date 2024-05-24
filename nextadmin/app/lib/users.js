"use server"

import * as addressController from "./address.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

//Método para crear usuario
export const createUser = async (req, res) => {
  try{
    const { name, lastname, email, password, role, active, address} = req.body;
    const avatar = req.file ? req.file.filename : null;
    console.log(avatar);  

    // Luego, creamos la dirección asociada al usuario
    const userAddress = await addressController.createAddress(address);

    const user = await prisma.user.create({
        data: {
            name,
            lastname,           
            email,   
            password,           
            role,
            active,      
            avatar,
            addressId: userAddress.id, // Asociamos la dirección al usuario recién creado 
        },
    });

    res.status(201).json({ user, address: userAddress });
  }catch (error)
  {
    res.status(400).json({ message: error.message });
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
export const getUSerById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findFirst({
            where: { id: id },
        })
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
export const updateUser = async (req, res) => {
    const { id } = req.params

    const { name, lastname, email, password, role, active, addressId} = req.body;
    const avatar = req.file ? req.file.filename : null;

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

        if (!updateUser1 ) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }else{
            res.status(200).json(updateUser1);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
// Método para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteUser1 = await prisma.user.delete({ where: { id: id},})
        const deleteAdresss = await addressController.deleteAddress(deleteUser1.addressId);

        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
