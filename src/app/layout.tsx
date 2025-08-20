import { ReactNode } from 'react';

import './globals.css';

export const metadata = {
  title: 'Pokemon Search',
  description: 'A practical React training project',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Pokemon Search" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Pokemon Search</title>
      </head>
      <body>
        <div
          id="root"
          className="flex flex-col min-w-full max-w-[1440px] min-h-screen my-0 mx-auto text-center"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
