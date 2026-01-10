import type { Metadata } from "next";
import { Inter, Noto_Sans, Nunito_Sans, Figtree } from "next/font/google";
import { readFileSync } from "fs";
import { join } from "path";
import { getBrandName } from "@/lib/brand";
import "./globals.css";

// 모든 폰트를 모듈 스코프에서 상수로 선언 (Next.js 요구사항)
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

// components.json에서 폰트 설정 읽기 (기본값: inter)
function getFontConfig() {
  try {
    const configPath = join(process.cwd(), "components.json");
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    return config.font || "inter";
  } catch {
    return "inter";
  }
}

const fontConfig = getFontConfig();

// 폰트 선택 함수 (폰트는 이미 로드되어 있음)
function getFontVariable() {
  const fontMap: Record<string, string> = {
    inter: inter.variable,
    "noto-sans": notoSans.variable,
    "nunito-sans": nunitoSans.variable,
    figtree: figtree.variable,
  };

  return fontMap[fontConfig] || fontMap.inter;
}

const fontVariable = getFontVariable();
const brandName = getBrandName();

export const metadata: Metadata = {
  title: {
    default: `${brandName} - Join the Waitlist`,
    template: `%s | ${brandName}`,
  },
  description:
    "Join our waitlist and be the first to experience our revolutionary product. Get early access and exclusive benefits.",
  keywords: ["waitlist", "early access", "product launch", "beta", "sign up"],
  authors: [{ name: brandName }],
  creator: brandName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: brandName,
    title: `${brandName} - Join the Waitlist`,
    description:
      "Join our waitlist and be the first to experience our revolutionary product.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: brandName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} - Join the Waitlist`,
    description:
      "Join our waitlist and be the first to experience our revolutionary product.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariable} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
