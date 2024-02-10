import { ConfigProvider, theme, App as AppProvider } from "antd";
import { useTernaryDarkMode } from "usehooks-ts";
import { Notion } from "@/packages/core";

const App = () => {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AppProvider>
        <Notion />
      </AppProvider>
    </ConfigProvider>
  );
};

export { App };
