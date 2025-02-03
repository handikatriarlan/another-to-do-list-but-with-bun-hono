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

export async function getTodoById(c: Context) {
  try {
    const todoId = parseInt(c.req.param("id"))

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    })

    if (!todo) {
      //return JSON
      return c.json(
        {
          success: false,
          message: "Todo Not Found!",
          data: null,
        },
        404
      )
    }

    return c.json(
      {
        success: true,
        message: `Detail Data Todo By ID : ${todoId}`,
        data: todo,
      },
      200
    )
  } catch (e: unknown) {
    console.error(`Error finding todo: ${e}`)
    return c.json(
      {
        success: false,
        message: `Error finding todo: ${e}`,
        data: null,
      },
      500
    )
  }
}
