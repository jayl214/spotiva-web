import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type { Session } from "next-auth";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getCurrentlyPlaying, getUsersPlaylists, pausePlayback, skipToNextSong, skipToPrevSong } from "~/server/spotify";

const getRefreshToken = async (ctx: {
  prisma: PrismaClient;
  session: Session;
}) => {
  const userId = ctx.session.user.id
  const account = await ctx.prisma.account.findFirst({where: {userId}})
  
  const refreshToken = account?.refresh_token
  if(!refreshToken){
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'account not found'
    })
  }
  return refreshToken
}

export const spotifyRouter = createTRPCRouter({
  getPlaylists: protectedProcedure.query(async ({ctx}) => {
    const refreshToken = await getRefreshToken(ctx)
    const playlists = await getUsersPlaylists(refreshToken)
    return playlists
  }),

  getCurrentlyPlaying: protectedProcedure.query(async ({ctx}) => {
    const refreshToken = await getRefreshToken(ctx)
    const currentlyPlaying = await getCurrentlyPlaying(refreshToken)
    return currentlyPlaying
  }),

  pausePlayback: protectedProcedure.query(async ({ctx}) => {
    const refreshToken = await getRefreshToken(ctx)
    return await pausePlayback(refreshToken)
  }),
  
  skipToNextSong: protectedProcedure.query(async ({ctx}) => {
    const refreshToken = await getRefreshToken(ctx)
    await skipToNextSong(refreshToken)
  }),

  skipToPrevSong: protectedProcedure.query(async ({ctx}) => {
    const refreshToken = await getRefreshToken(ctx)
    await skipToPrevSong(refreshToken)
  }),
});
