import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID || '';
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || '';
const BASIC = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const ENDPOINTS = {
  accessToken: 'https://accounts.spotify.com/api/token',
  playlists: 'https://api.spotify.com/v1/me/playlists',
  currentlyPlaying: 'https://api.spotify.com/v1/me/player',
  pausePlayback: 'https://api.spotify.com/v1/me/player/pause',
  skipToNext: 'https://api.spotify.com/v1/me/player/next',
  skipToPrev: 'https://api.spotify.com/v1/me/player/previous',
}

const getAccessToken = async (refreshToken:string) => {
  const response: {
    data: { access_token: 'string' }
  }= await axios({
    url: ENDPOINTS.accessToken,
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  return response.data.access_token || ''
};

export const getUsersPlaylists = async (refreshToken:string) => {
  const accessToken = await getAccessToken(refreshToken);
  const response = await axios({
    url: ENDPOINTS.playlists,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const {items: playlists} = response.data as SpotifyApi.ListOfCurrentUsersPlaylistsResponse
  return playlists
};

export const getCurrentlyPlaying = async (refreshToken:string) => {
  const accessToken = await getAccessToken(refreshToken);
  const response = await axios({
    url: ENDPOINTS.currentlyPlaying,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const currentlyPlaying = response.data as SpotifyApi.CurrentlyPlayingResponse
  return currentlyPlaying
}

export const pausePlayback = async (refreshToken:string) => {
  const accessToken = await getAccessToken(refreshToken);
  return axios({
    url: ENDPOINTS.pausePlayback,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const skipToNextSong = async (refreshToken:string) => {
  const accessToken = await getAccessToken(refreshToken);
  return axios({
    url: ENDPOINTS.skipToNext,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const skipToPrevSong = async (refreshToken:string) => {
  const accessToken = await getAccessToken(refreshToken);
  return axios({
    url: ENDPOINTS.skipToPrev,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

