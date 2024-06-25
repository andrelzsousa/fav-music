import axios from 'axios'
import { storageGet } from './localStorage'

export const SearchTrack = async (track: string) => {
  console.log('track', track)

  try {
    const token = storageGet('token')
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${track}&type=track&market=BR&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log(response.data.tracks.items[0])
    return response.data.tracks.items[0]
  } catch (error) {
    console.error(error)
    return []
  }
}
