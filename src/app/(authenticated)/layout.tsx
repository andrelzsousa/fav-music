'use client'

import { storageGet } from '@/services/localStorage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = storageGet('token')

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [token, router])

  return <div>{children}</div>
}

export default AuthenticatedLayout
