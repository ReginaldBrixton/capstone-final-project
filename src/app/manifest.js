// Next.js Manifest Configuration
export default function manifest() {
  return {
    name: 'Capstone Project System',
    short_name: 'Capstone Project System',
    description: 'A capstone project for the final project of the course',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'https://alfabank.servicecdn.ru/icons/click/icon_192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://alfabank.servicecdn.ru/icons/click/icon_512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}