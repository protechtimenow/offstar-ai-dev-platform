import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OFFSTAR AI Development Platform',
  description: 'AI-powered development platform integrating Codespaces, Replit AI, Io.net, and OBL.dev',
  keywords: 'AI, development, platform, Io.net, Replit, Codespaces, OBL.dev, prototyping',
  authors: [{ name: 'OFFSTAR Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}>
        <Providers>
          <div className=\"relative min-h-screen\">
            {/* Background Effects */}
            <div className=\"fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20\" />
            <div className=\"fixed inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 animate-pulse\" />
            
            {/* Main Content */}
            <div className=\"relative z-10\">
              {children}
            </div>
            
            {/* Toast Notifications */}
            <Toaster
              position=\"top-right\"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#f1f5f9',
                  border: '1px solid #334155',
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  )
}