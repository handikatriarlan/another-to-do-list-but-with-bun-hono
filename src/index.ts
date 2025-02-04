import { Hono } from "hono"
import { handle } from "hono/vercel"
import { cors } from "hono/cors"
import Routes from "./routes"
import { inject } from "@vercel/analytics"

const app = new Hono().basePath("/api")

app.use("*", cors())

app.use("*", async (c, next) => {
  inject()
  await next()
})

app.route("/", Routes)

export default handle(app)
