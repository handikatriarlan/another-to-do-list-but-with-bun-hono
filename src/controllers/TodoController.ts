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
    const body = await c.req.json().catch(() => null)

    if (!body || typeof body.title !== "string" || !body.title.trim()) {
      return c.json(
        {
          success: false,
          message: "Title is required and must be a valid string!",
          data: null,
        },
        400
      )
    }

    const todo = await prisma.todo.create({
      data: { title: body.title.trim() },
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

export async function updateTodoTitle(c: Context) {
  try {
    const todoId = parseInt(c.req.param("id"))

    if (isNaN(todoId)) {
      return c.json(
        { success: false, message: "Invalid ID format!", data: null },
        400
      )
    }

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    })

    if (!todo) {
      return c.json(
        {
          success: false,
          message: "Todo Not Found!",
          data: null,
        },
        404
      )
    }

    const body = await c.req.json().catch(() => null)

    if (!body || typeof body.title !== "string" || !body.title.trim()) {
      return c.json(
        {
          success: false,
          message: "Title is required and must be a valid string!",
          data: null,
        },
        400
      )
    }

    const todoUpdate = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title: body.title.trim(),
        updatedAt: new Date(),
      },
    })

    return c.json(
      {
        success: true,
        message: "Todo Updated Successfully!",
        data: todoUpdate,
      },
      200
    )
  } catch (e: unknown) {
    console.error(`Error updating todo: ${e}`)
    return c.json(
      {
        success: false,
        message: "An unexpected error occurred while updating todo.",
        data: null,
      },
      500
    )
  }
}
