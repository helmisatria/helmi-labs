import "./tailwind.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";

import bgUrl from "@/assets/bg.png";

import "@fontsource/dm-serif-text";
import "@fontsource/dm-sans";
import { Sidebar } from "./components/Sidebar";

const queryClient = new QueryClient();

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen min-w-full bg-amber-50">
        <div className="flex flex-col lg:flex-row mx-auto">
          <Sidebar />
          <div
            className="flex-1 w-full lg:min-w-[70%] xl:min-w-[55%] mx-auto mt-5 lg:mt-0 bg-[#FDFBF7]"
            style={{
              boxShadow:
                "0px 197px 79px rgba(138, 133, 117, 0.02), 0px 111px 67px rgba(138, 133, 117, 0.08), 0px 49px 49px rgba(138, 133, 117, 0.13), 0px 12px 27px rgba(138, 133, 117, 0.16)",
            }}
          >
            <Content>{children}</Content>
          </div>
          <div
            className="relative 2xl:pr-20 w-96 xl:w-full h-screen hidden xl:block max-h-screen"
            style={{
              backgroundImage: `url(${bgUrl})`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(253,249,233,0)] to-[#FEFAEA]"></div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const boxShadowStyle = isMobile
    ? "37px -26px 18px rgba(111, 91, 22, 0.01), 21px -15px 15px rgba(111, 91, 22, 0.05), 9px -6px 11px rgba(111, 91, 22, 0.09), 2px -2px 6px rgba(111, 91, 22, 0.1)"
    : "0px 197px 79px rgba(138, 133, 117, 0.02), 0px 111px 67px rgba(138, 133, 117, 0.08), 0px 49px 49px rgba(138, 133, 117, 0.13), 0px 12px 27px rgba(138, 133, 117, 0.16)";

  return (
    <main
      id="page-container"
      className="relative z-20 min-h-screen bg-[#FAF8F0] rounded-t-xl lg:rounded-t-none"
      style={{
        boxShadow: boxShadowStyle,
      }}
    >
      <div id="page-content" className="p-5 pb-12">
        <div className="absolute top-0 left-0 w-full h-[190px]">
          <img
            src="/bg-article.png"
            alt=""
            height={190}
            width="100%"
            className="absolute h-[190px]"
          />
          <div className="absolute top-0 left-0 w-full h-[190px] bg-gradient-to-b from-[rgba(253,249,233,0)] to-[#FAF8F0]"></div>
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </main>
  );
}
