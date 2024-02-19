import { ConfigProvider, theme } from "antd";
import { EditorHeader } from "@/packages/core/editor";

import type { StoryObj } from "@storybook/react";

export default {
  title: "Editor UI/Editor Header",
  component: EditorHeader,
};

export const Light: StoryObj<typeof EditorHeader> = {
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

export const Dark: StoryObj<typeof EditorHeader> = {
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <div data-theme="dark" className="ny-flex ny-justify-center">
            <div className="ny-max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
