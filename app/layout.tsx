import './globals.css'
import './reset.css'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '都道府県別の総人口推移',
  description: '都道府県別の総人口推移を表示します。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
