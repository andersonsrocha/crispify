import { ConfigProvider, theme } from "antd";
import { Notyist } from "@/packages/core";

import { content } from "@/lib/data/content";

const App = () => {
  return (
    <div data-theme="dark">
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className="min-h-screen bg-colorBgContainer w-full flex flex-col justify-center py-10">
          <div className="w-full max-w-3xl min-h-96 mx-auto flex flex-col gap-10">
            <Notyist content={content} height="100%" mode="notion" />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export { App };
