import { ConfigProvider, theme } from "antd";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";

import type { StoryObj } from "@storybook/react";

const TableColumnMenu = () => {
  return (
    <div className="ny-bg-colorBgElevated ny-shadow-xl ny-shadow-black/70 ny-border ny-border-solid ny-border-colorBorder ny-rounded-md">
      <Action.Wrapper direction="vertical">
        <Button center={false} icon="ArrowLeftToLine">
          Add column before
        </Button>
        <Button center={false} icon="ArrowRightToLine">
          Add column after
        </Button>
        <Button center={false} icon="Paintbrush2">
          Add color line
        </Button>
        <Button center={false} icon="Trash2">
          Delete column
        </Button>
      </Action.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Table Column Menu",
  component: TableColumnMenu,
};

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
