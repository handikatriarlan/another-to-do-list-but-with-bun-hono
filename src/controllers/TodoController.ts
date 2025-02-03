import { Context } from "hono"
import prisma from "../../prisma/client"

export const getTodos = async (c: Context) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { id: "desc" } })

    return c.json(
      {
        success: true,
        message: "List Data Todos!",
        data: todos,
      },
      200
    )
  } catch (e: unknown) {
    console.error(`Error getting todos: ${e}`)
    return c.json(
      {
        success: false,
        message: `Error getting todos: ${e}`,
        data: null,
      },
      500
    )
  }
}

export async function createTodo(c: Context) {
  try {
    const body = await c.req.parseBody()

    const title = typeof body["title"] === "string" ? body["title"].trim() : ""
    if (!title) {
      return c.json(
        { success: false, message: "Title is required!", data: null },
        400
      )
    }

    const todo = await prisma.todo.create({
      data: { title },
    })

    return c.json(
      {
        success: true,
        message: "Todo Created Successfully!",
        data: todo,
      },
      201
    )
  } catch (e: unknown) {
    console.error(`Error creating todo: ${e}`)
    return c.json(
      {
        success: false,
        message: `Error creating todo: ${e}`,
        data: null,
      },
      500
    )
  }
}
