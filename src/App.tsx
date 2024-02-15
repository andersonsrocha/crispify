import { ConfigProvider, theme } from "antd";
import { Notyist } from "@/packages/core";

import { content } from "@/lib/data/content";

const App = () => {
  return (
    <div data-theme="dark">
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className="h-screen bg-colorBgContainer w-full flex flex-col justify-center py-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            <Notyist bordered content={content} height={400} />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export { App };
