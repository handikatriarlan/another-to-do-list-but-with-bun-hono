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
