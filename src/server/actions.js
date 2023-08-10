import HttpError from '@wasp/core/HttpError.js'
import bcrypt from 'bcryptjs'

export const createUser = async ({ username, password }, context) => {
  const newUser = await context.entities.User.create({ data: { username, password } })
  return newUser
}

export const createEssay = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { title, content, wordCount, format } = args

  const essay = await context.entities.Essay.create({
    data: {
      title,
      content,
      wordCount,
      format,
      user: { connect: { id: context.user.id } }
    }
  })

  return essay
}

export const createBibliography = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { essayId, source, format } = args

  const essay = await context.entities.Essay.findUnique({
    where: { id: essayId }
  })
  if (essay.userId !== context.user.id) { throw new HttpError(403) }

  const bibliography = await context.entities.Bibliography.create({
    data: {
      source,
      format,
      essay: { connect: { id: essayId } }
    }
  })

  return bibliography
}