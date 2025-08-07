import type { Metadata } from "next";
import styles from "./layout.module.css";
import "./globals.css";
import Link from "next/link";

const title = "browser-card-game";
const description = "A multiplayer card game in the browser.";

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <div className={styles.title}>{metadata.title as string}</div>
          <div className={styles.link}>
            <Link href="/">Lobby</Link>
            <Link href="/new-game">New Game</Link>
            <Link href="/deck">Deck</Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
