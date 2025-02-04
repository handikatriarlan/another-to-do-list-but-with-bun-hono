import { Hono } from "hono"
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodoTitle,
  updateTodoStatus,
  deleteTodo,
} from "../controllers/TodoController"

const router = new Hono()

router.get("/todos", getTodos)
router.post("/todos", createTodo)
router.get("/todos/:id", getTodoById)
router.patch("/todos/:id/title", updateTodoTitle)
router.patch("/todos/:id/status", updateTodoStatus)
router.delete("/todos/:id", deleteTodo)

export const Routes = router
