import React from "react";
import { ConfigProvider, theme } from "antd";
import { useTernaryDarkMode } from "usehooks-ts";
import { Notyist } from "@/packages/core";

const App = () => {
  const { isDarkMode } = useTernaryDarkMode();

  const menuRef = React.useRef(null);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div ref={menuRef} className="min-h-screen bg-colorBgContainer w-full py-16">
        <div className="max-w-3xl mx-auto h-full flex flex-col gap-10">
          <Notyist menuRef={menuRef} bordered />

          <Notyist menuRef={menuRef} mode="notion" bordered />
        </div>
      </div>
    </ConfigProvider>
  );
};

export { App };
