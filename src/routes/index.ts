import { Hono } from "hono"
import { getTodos, createTodo } from "../controllers/TodoController"

const router = new Hono()

router.get("/", (c) => getTodos(c))
router.post("/", (c) => createTodo(c))

export const Routes = router
