const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

//Método para crear usuario
const createAddress = async (req, res) => {
  try{
        const { name, lastname, email, password, role, active, addressId} = req.body;
        const avatar = req.file ? req.file.filename : null;
        console.log(avatar);  

        const user = await prisma.user.create({
            data: {
                name,
                lastname,           
                email,   
                password,           
                role,
                active, 
                addressId,      
                avatar 
            },
        });

        res.status(201).json({ user });
  }catch (error)
  {
    res.status(400).json({ message: error.message });
  }
}; 

// Método para obtener todos los usuarios
const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
// Método para obtener un usuario por su ID
const getUSerById = async (req, res) => {
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
  
// Método para actualizar un usuario por su ID
const updateUser = async (req, res) => {
    const { id } = req.params

    const { name, lastname, email, password, role, active, addressId} = req.body;
    const avatar = req.file ? req.file.filename : null;

    const updateData = {
        name,
        lastname,           
        email,   
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
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser1 = await prisma.user.delete({
            where: { id: id},
        })
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
    createAddress,
    getUser,
    getUSerById,
    updateUser,
    deleteUser,
};
