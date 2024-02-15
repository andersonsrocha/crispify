import { ConfigProvider, theme } from "antd";

import { TextMenu } from "./text-menu";

import type { Meta, StoryObj } from "@storybook/react";

const ColumnsMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <TextMenu.Wrapper>
        <TextMenu.Button tip="Delete" icon="Trash2" />

        <TextMenu.Divider />

        <TextMenu.Button tip="Sidebar left" icon="PanelLeft" />
        <TextMenu.Button tip="Two columns" icon="Columns2" />
        <TextMenu.Button tip="Sidebar right" icon="PanelRight" />
      </TextMenu.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Columns Menu",
  component: ColumnsMenu,
} as Meta;

export const Light: StoryObj<typeof ColumnsMenu> = {
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

export const Dark: StoryObj<typeof ColumnsMenu> = {
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
