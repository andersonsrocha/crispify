import { ConfigProvider, theme } from "antd";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";

import type { Meta, StoryObj } from "@storybook/react";

const TableRowMenu = () => {
  return (
    <div className="ny-bg-colorBgElevated ny-shadow-xl ny-shadow-black/70 ny-border ny-border-solid ny-border-colorBorder ny-rounded-md">
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
          <div data-theme="light" className="ny-flex ny-justify-center">
            <div className="ny-max-w-3xl">{Story()}</div>
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
          <div data-theme="dark" className="ny-flex ny-justify-center">
            <div className="ny-max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
