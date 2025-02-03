import { Hono } from "hono"
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodoTitle,
} from "../controllers/TodoController"

const router = new Hono()

router.get("/", (c) => getTodos(c))
router.post("/", (c) => createTodo(c))
router.get("/:id", (c) => getTodoById(c))
router.patch("/:id", (c) => updateTodoTitle(c))

export const Routes = router
