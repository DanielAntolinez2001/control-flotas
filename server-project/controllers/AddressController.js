import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Método para crear dirección
export const createAddress = async (req, res) => {
  try{
        const { street, city, state, zip_code, details} = req;

        const address = await prisma.address.create({
            data: {
                street,
                city,
                state,
                zip_code,
                details,
            },
        });

        return address;
  }catch (error)
  {
    throw new Error(error.message);
  }
}; 

// Método para obtener todas las direcciones
export const getAddress = async (req, res) => {
  try {
    const address = await prisma.address.findMany()
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
// Método para obtener un usuario por su ID
export const getAdressById = async (req, res) => {
    const { id } = req.params

    try {
        const address = await prisma.address.findFirst({
            where: { id: id },
        })
        if (!address) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Método para actualizar un usuario por su ID
export const updateAddress = async (req, res) => {
    const { id } = req.params

    const { street, city, state, zip_code, details} = req.body;

    const updateData = {
        street,
        city,
        state,
        zip_code,
        details,
    };

    try {
        const updateAddress1 = await prisma.address.update({
            where: {id: id},
            data: updateData,
        })

        if (!updateAddress1 ) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }else{
            res.status(200).json(updateAddress1);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
// Método para eliminar un usuario por su ID
export const deleteAddress = async (req, res) => {
    const { id } = req;
    console.log(req);

    try {
        const deleteAdresss = await prisma.address.delete({ where: { id: req},})

        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};
  
