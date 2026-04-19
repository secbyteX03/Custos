import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
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
      <body className="min-h-screen bg-black flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
