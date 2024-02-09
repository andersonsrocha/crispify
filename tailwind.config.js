import { theme } from "antd";
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

  const light = generateColors(getDesignToken({}));
  const dark = generateColors(getDesignToken({ algorithm: theme.darkAlgorithm }));

  return createThemes({ light, dark }, { defaultTheme: { light: "light", dark: "dark" } });
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  corePlugins: {
    colors: false,
    preflight: false,
  },
  plugins: [require("tailwind-scrollbar"), antd()],
};
