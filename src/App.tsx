import { ConfigProvider, theme, App as AppProvider } from "antd";
import { useTernaryDarkMode } from "usehooks-ts";
import { Notion, Feedback } from "@/packages/core";

const App = () => {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: { fontFamily: "'Inter', sans-serif" },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AppProvider>
        <main className="bg-colorBgContainer min-h-screen w-full py-16">
          <div className="mx-auto flex flex-col gap-2">
            <Notion />
          </div>
        </main>
        <Feedback />
      </AppProvider>
    </ConfigProvider>
  );
};

export { App };
