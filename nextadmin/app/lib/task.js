import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const taskController = {
  // CREATE (Crear una nueva tarea)
  async createTask(req, res) {
    const { type, description, userId } = req.body;

    try {
      const newTask = await prisma.task.create({
        data: { type, description, user: { connect: { id: userId } } },
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la tarea" });
    }
  },

  // READ (Obtener todas las tareas o una tarea específica)
  async getTasks(req, res) {
    const { id } = req.params; // Si se proporciona un ID, busca una tarea específica

    try {
      const tasks = id
        ? await prisma.task.findUnique({ where: { id } })
        : await prisma.task.findMany();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  },

  // UPDATE (Actualizar una tarea existente)
  async updateTask(req, res) {
    const { id } = req.params;
    const { type, description, check } = req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: { type, description, check },
      });
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la tarea" });
    }
  },

  // DELETE (Eliminar una tarea)
  async deleteTask(req, res) {
    const { id } = req.params;

    try {
      await prisma.task.delete({ where: { id } });
      res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la tarea" });
    }
  },
};

export default taskController;
