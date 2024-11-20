import { cn } from "@/lib/utils";
import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { prefetch } from "vike/client/router";

export function Link({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive =
    href === "/" ? urlPathname === href : urlPathname.startsWith(href);

  return (
    <a
      href={href}
      onMouseEnter={() => prefetch(href)}
      className={cn(isActive ? "is-active" : undefined, className)}
      data-active={isActive ? "true" : undefined}
    >
      {children}
    </a>
  );
}
