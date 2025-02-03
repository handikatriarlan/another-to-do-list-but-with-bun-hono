import { Hono } from "hono"
import { Routes } from "./routes"

const app = new Hono().basePath("/api")

app.route("/todos", Routes)

export default app
