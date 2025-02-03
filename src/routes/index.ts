import { Hono } from "hono"
import { getTodos, createTodo, getTodoById } from "../controllers/TodoController"

const router = new Hono()

router.get("/", (c) => getTodos(c))
router.post("/", (c) => createTodo(c))
router.get("/:id", (c) => getTodoById(c))

export const Routes = router
