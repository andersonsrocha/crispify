import { ConfigProvider, theme } from "antd";

import { TextMenu } from "./text-menu";

import type { Meta, StoryObj } from "@storybook/react";

const TableColumnMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <TextMenu.Wrapper direction="vertical">
        <TextMenu.Button center={false} icon="ArrowLeftToLine">
          Add column before
        </TextMenu.Button>
        <TextMenu.Button center={false} icon="ArrowRightToLine">
          Add column after
        </TextMenu.Button>
        <TextMenu.Button center={false} icon="Trash2">
          Delete column
        </TextMenu.Button>
      </TextMenu.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Table Column Menu",
  component: TableColumnMenu,
} as Meta;

export const Light: StoryObj<typeof TableColumnMenu> = {
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

export const Dark: StoryObj<typeof TableColumnMenu> = {
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
