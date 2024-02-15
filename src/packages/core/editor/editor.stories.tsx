import { ConfigProvider, theme } from "antd";
import { content } from "@/lib/data/content";

import { Notyist } from "./editor";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Editor UI/Notyist",
  component: Notyist,
  args: {
    content,
  },
} as Meta;

export const WYSIWYG: StoryObj<typeof Notyist> = {
  args: {
    mode: "WYSIWYG",
  },
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
          <div data-theme="light" className="flex justify-center">
            <div className="max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};

export const Notion: StoryObj<typeof Notyist> = {
  args: {
    mode: "notion",
  },
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
          <div data-theme="light" className="flex justify-center">
            <div className="max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
