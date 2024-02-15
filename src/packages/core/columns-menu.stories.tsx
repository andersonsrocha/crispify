import { ConfigProvider, theme } from "antd";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";

import type { Meta, StoryObj } from "@storybook/react";

const ColumnsMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <Action.Wrapper>
        <Button tip="Delete" icon="Trash2" />

        <Action.Divider />

        <Button tip="Sidebar left" icon="PanelLeft" />
        <Button tip="Two columns" icon="Columns2" />
        <Button tip="Sidebar right" icon="PanelRight" />
      </Action.Wrapper>
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
