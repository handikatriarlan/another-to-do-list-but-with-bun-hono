import { Hono } from "hono"
import { getTodos } from "../controllers/TodoController"

const router = new Hono()

router.get("/", (c) => getTodos(c))

export const Routes = router
