import { ConfigProvider, theme } from "antd";
import { Crispify } from "@/packages/core";

import { content } from "@/lib/data/content";

const App = () => {
  return (
    <div data-theme="dark">
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className="ny-min-h-screen ny-bg-colorBgContainer ny-w-full">
          <div className="ny-w-full ny-max-w-4xl ny-mx-auto ny-py-12">
            <Crispify content={content} mode="WYSIWYG" height={410} />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export { App };
