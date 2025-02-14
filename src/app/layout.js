import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/app/_components/header/header";
import "./globals.css";
import AuthSessionProvider from "./_providers/auth-session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <AuthSessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
            {children}
          </main>
        </body>
      </html>
    </AuthSessionProvider>
  );
}
