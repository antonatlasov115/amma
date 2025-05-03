import './globals.css';
// Импортируем ConditionalNavigation вместо Navigation
import ConditionalNavigation from './components/ConditionalNavigation';
import Footer from './components/Footer';
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';

// Загрузка шрифтов
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter'
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  variable: '--font-montserrat'
});

export const metadata = {
  title: 'Киностудия AMMA - Создаем истории, которые запоминаются',
  description: 'Профессиональная киностудия, специализирующаяся на создании художественных, документальных и рекламных фильмов с уникальным авторским подходом.',
  keywords: 'киностудия, фильмы, кинопроизводство, документальное кино, рекламные ролики, видеопроизводство, кинематограф, режиссура',
  authors: [{ name: 'AMMA Studio', url: 'https://ammafilms.ru' }],
  creator: 'AMMA Film Studio',
  publisher: 'AMMA Film Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Киностудия AMMA - Создаем истории',
    description: 'Профессиональная киностудия с уникальным авторским подходом',
    url: 'https://ammafilms.ru',
    siteName: 'AMMA Film Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/ima3.png',
        width: 1200,
        height: 630,
        alt: 'AMMA Film Studio',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable} dark scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff5252" />
        <meta name="msapplication-TileColor" content="#da532c" />
        
        {/* Прелоадер для важных ресурсов */}
        <link rel="preload" as="image" href="/logo.svg" />
        <link rel="preload" as="image" href="/images/kuku1.jpg" />
        
        {/* Структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AMMA Film Studio",
              "url": "https://ammafilms.ru",
              "logo": "https://ammafilms.ru/logo.svg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressCountry": "RU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-999-123-4567",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://vk.com/ammastudio",
                "https://t.me/ammastudio"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        {/* Используем отдельный компонент ConditionalNavigation */}
        <ConditionalNavigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* Аналитика */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            // Здесь будет код аналитики
          `}
        </Script>
      </body>
    </html>
  );
}
