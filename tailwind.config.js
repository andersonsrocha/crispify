import { theme } from "antd";
import { presetPalettes, gray } from "@ant-design/colors";
import { createThemes } from "tw-colors";
import _ from "lodash";

const { getDesignToken } = theme;

/**
 * Função responsável por criar e adicionar a paleta de cores do Ant Design
 * no Tailwind.
 *
 * @returns plugin do tailwind para adicionar paleta de cores.
 */
const antd = () => {
  const generateColors = (token) => {
    const keys = Object.keys(token);
    const filtered = keys.filter((key) => {
      return _.isString(key) && (key.toLowerCase().includes("color") || key.toLowerCase().includes("bg"));
    });
    return filtered.reduce((o, k) => {
      return Object.assign(o, { [k]: token[k] });
    }, {});
  };

  const light = generateColors(getDesignToken({ token: { fontFamily: "'Inter', sans-serif" } }));
  const dark = generateColors(
    getDesignToken({ algorithm: theme.darkAlgorithm, token: { fontFamily: "'Inter', sans-serif" } })
  );

  return createThemes(
    { light, dark },
    {
      defaultTheme: "light",
      produceCssVariable: (name) => `--ny-${name}`,
      produceThemeClass: (name) => `ny-${name}`,
      produceThemeVariant: (name) => `ny-${name}`,
    }
  );
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  darkMode: ["class", "[data-theme='dark']"],
  prefix: "ny-",
  theme: {
    colors: { ...presetPalettes, gray, white: "#FFFFFF", black: "#000000", transparent: "transparent" },
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif",
        jetbrains: "'JetBrains Mono', monospace",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("tailwind-scrollbar"), antd()],
};
