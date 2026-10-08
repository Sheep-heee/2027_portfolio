"use client";

import dynamic from "next/dynamic";

// Studio is an authenticated browser application, not public SSR content.
// Keep its browser dependencies out of Worker server rendering.
const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => <p>콘텐츠 관리 화면을 불러오는 중입니다.</p>,
});

export default function StudioLoader(props: {
  projectId: string;
  dataset: string;
}) {
  return <Studio {...props} />;
}
