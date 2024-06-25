import axios from 'axios'
import { storageGet } from './localStorage'

export const getTopTracks = async () => {
  try {
    const token = storageGet('token')
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data.items
  } catch (error) {
    console.error(error)
    return []
  }
}
