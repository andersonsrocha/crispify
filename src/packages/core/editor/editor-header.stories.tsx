import { ConfigProvider, theme } from "antd";
import { EditorHeader } from "./editor-header";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Editor UI/Editor Header",
  component: EditorHeader,
} as Meta;

export const Light: StoryObj<typeof EditorHeader> = {
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

export const Dark: StoryObj<typeof EditorHeader> = {
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <div data-theme="dark" className="flex justify-center">
            <div className="max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
