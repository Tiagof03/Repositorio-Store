import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@/shared/Navbar'
import Footer from '@/shared/Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({
  children,
}: LayoutProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className='flex min-h-screen flex-col bg-background text-on-surface'>

      <Navbar />

      <main className='flex-1'>
        {children}
      </main>

      <Footer />

    </div>
  )
}