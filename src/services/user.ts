import axios from 'axios'

export const getSpotifyUser = async (accessToken: string) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
