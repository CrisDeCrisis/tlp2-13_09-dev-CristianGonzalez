import { Router } from "express";
import {
    createTaskCtrl,
    deleteTaskCtrl,
    getAllTodosCtrl,
    updateTaskCtrl
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post('/', validarJwt, createTaskCtrl);
todosRouter.put('/:id', validarJwt, updateTaskCtrl);
todosRouter.delete('/:id', validarJwt, deleteTaskCtrl);

export { todosRouter };
