import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "포트폴리오 CMS 연결 실증",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
