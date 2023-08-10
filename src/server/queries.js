import HttpError from '@wasp/core/HttpError.js'

export const getUserEssays = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Essay.findMany({
    where: { userId: context.user.id }
  })
}

export const getEssayBibliography = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const bibliography = await context.entities.Bibliography.findMany({
    where: {
      essay: { id: args.essayId }
    }
  })

  if (!bibliography) throw new HttpError(404, 'No bibliography found for essay with id ' + args.essayId)

  return bibliography
}