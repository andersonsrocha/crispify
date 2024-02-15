import React from "react";
import { ConfigProvider, theme } from "antd";
import { useTernaryDarkMode } from "usehooks-ts";
import { Notyist } from "@/packages/core";

import { content } from "@/lib/data/content";

const App = () => {
  const { isDarkMode } = useTernaryDarkMode();

  const menuRef = React.useRef(null);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <div ref={menuRef} className="min-h-screen bg-colorBgContainer w-full py-16">
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            <Notyist menuRef={menuRef} bordered content={content} />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export { App };
