import Navigation from '../components/Navigation'
import './globals.css'

export const metadata = {
  title: 'Custos - Bitcoin Inheritance & Security Platform',
  description: 'Secure Bitcoin inheritance with multisig vaults and dead man\'s switches',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="min-h-screen bg-black">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
