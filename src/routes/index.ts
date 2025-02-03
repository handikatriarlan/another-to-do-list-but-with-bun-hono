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

router.get("/", (c) => getTodos(c))
router.post("/", (c) => createTodo(c))
router.get("/:id", (c) => getTodoById(c))
router.patch("/:id/title", (c) => updateTodoTitle(c))
router.patch("/:id/status", (c) => updateTodoStatus(c))
router.delete("/:id", (c) => deleteTodo(c))

export const Routes = router
