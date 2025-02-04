import { Hono } from "hono"
import { cors } from "hono/cors"
import { Routes } from "./routes"
import { inject } from "@vercel/analytics"

const app = new Hono()

app.use("*", cors())

app.use("*", async (c, next) => {
  inject()
  await next()
})

app.route("/api/todos", Routes)

export default app

export const fetch = app.fetch
