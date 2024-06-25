import { getSpotifyUser } from '@/services/user'
import { useQuery } from 'react-query'

const useUser = (token: string) => {
  return useQuery('user', () => getSpotifyUser(token as string), {
    enabled: !!token,
  })
}

export default useUser
