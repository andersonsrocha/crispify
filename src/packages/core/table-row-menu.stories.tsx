import { ConfigProvider, theme } from "antd";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";

import type { Meta, StoryObj } from "@storybook/react";

const TableRowMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <Action.Wrapper direction="vertical">
        <Button center={false} icon="ArrowUpToLine">
          Add row before
        </Button>
        <Button center={false} icon="ArrowDownToLine">
          Add row after
        </Button>
        <Button center={false} icon="Trash2">
          Delete row
        </Button>
      </Action.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Table Row Menu",
  component: TableRowMenu,
} as Meta;

export const Light: StoryObj<typeof TableRowMenu> = {
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

export const Dark: StoryObj<typeof TableRowMenu> = {
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
