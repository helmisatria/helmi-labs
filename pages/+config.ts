import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault.js";

import og from "@/public/og.png";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "Helmi Satria Labs.",
  description: "Personal laboratory of code, design, and tech experiments by Helmi Satria.",

  ssr: false,
  
  image: og,

  extends: vikeReact,
} satisfies Config;
