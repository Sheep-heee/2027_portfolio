"use client";
import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";
export default function Studio({
  projectId,
  dataset,
}: {
  projectId: string;
  dataset: string;
}) {
  return (
    <NextStudio
      config={defineConfig({
        name: "portfolio",
        title: "포트폴리오 콘텐츠 · 연결 실증",
        basePath: "/studio",
        projectId,
        dataset,
        plugins: [structureTool()],
        schema: { types: schemaTypes },
      })}
    />
  );
}
