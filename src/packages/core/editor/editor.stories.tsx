import { ConfigProvider, theme } from "antd";
import { content } from "@/lib/data/content";

import { Crispify } from "./editor";

import type { StoryObj } from "@storybook/react";

export default {
  title: "Editor UI/Crispify",
  component: Crispify,
  args: {
    content,
  },
};

export const WYSIWYG: StoryObj<typeof Crispify> = {
  args: {
    mode: "WYSIWYG",
  },
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
          <div data-theme="light" className="ny-flex ny-justify-center">
            <div className="ny-max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};

export const Notion: StoryObj<typeof Crispify> = {
  args: {
    mode: "notion",
  },
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
          <div data-theme="light" className="ny-flex ny-justify-center">
            <div className="ny-max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
