import { Hono } from "hono"
import { cors } from "hono/cors"
import { Routes } from "./routes"

const app = new Hono().basePath("/api")

app.use("*", cors())

app.route("/todos", Routes)

export default app
