import { ConfigProvider, theme } from "antd";
import { Notyist } from "@/packages/core";

import { content } from "@/lib/data/content";

const App = () => {
  return (
    <div data-theme="dark">
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className="ny-min-h-screen ny-bg-colorBgContainer ny-w-full ny-flex ny-flex-col ny-justify-center ny-py-10">
          <div className="ny-w-full ny-max-w-3xl ny-min-h-96 ny-mx-auto ny-flex ny-flex-col ny-gap-10">
            <Notyist bordered content={content} height={450} />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export { App };
