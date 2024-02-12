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
      <div ref={menuRef} className="min-h-screen">
        <Notyist menuRef={menuRef} bordered />

        <Notyist menuRef={menuRef} mode="document" bordered />

        <Notyist menuRef={menuRef} mode="notion" bordered />
      </div>
    </ConfigProvider>
  );
};

export { App };
