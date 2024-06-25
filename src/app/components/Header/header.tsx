'use client'

import useUser from '@/hooks/useUser'
import { storageGet } from '@/services/localStorage'
import Image from 'next/image'
import Wrapper from '../Wrapper/wrapper'

const Header = () => {
  const token = storageGet<string>('token')

  const { data: user } = useUser(token as string)

  return (
    <header className="bg-black h-24 py-1">
      <Wrapper className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={'/favmusic-logo.png'}
            width={50}
            height={50}
            alt="FavMusic Logo"
          />
          <p className="font-medium text-xl text-fern-50">FavMusic</p>
        </div>
        <div>
          {token && user && (
            <p className="text-fern-50 font-medium">
              {user ? user.display_name : ''}
            </p>
          )}
        </div>
      </Wrapper>
    </header>
  )
}

export default Header
