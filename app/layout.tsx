import "./../styles/globals.css"
import type { Metadata } from "next"
import SwRegister from "../components/SwRegister"

export const metadata: Metadata = {
  title: "Macias Virtual Room",
  description: "TxDOT Plans Portal for Macias Specialty Contracting",
  icons: [
    {
      rel: "icon",
      url: "https://drive.google.com/uc?export=view&id=10vRKmfFECcIub9fW-S-n5pR09bTntSa3"
    }
  ],
  openGraph: {
    title: "Macias Virtual Room",
    description: "Secure TxDOT Plans Portal for Macias Specialty Contracting",
    images: [
      "https://drive.google.com/uc?export=view&id=10vRKmfFECcIub9fW-S-n5pR09bTntSa3"
    ]
  }, // ✅ added comma here
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SwRegister />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {children}
      </body>
    </html>
  )
}

