import { ConfigProvider, theme } from "antd";
import { Action } from "@/components/ui/action";

import type { Meta, StoryObj } from "@storybook/react";

const TextMenu = () => {
  return (
    <div className="ny-bg-colorBgElevated ny-shadow-xl ny-shadow-black/70 ny-border ny-border-solid ny-border-colorBorder ny-rounded-md">
      <Action.Wrapper>
        <Action.ContentType editor={null} />
        <Action.Font editor={null} />
        <Action.FontSize editor={null} />

        <Action.Divider />

        <Action.Mark editor={null} type="bold" />
        <Action.Mark editor={null} type="italic" />
        <Action.Mark editor={null} type="underline" />
        <Action.Mark editor={null} type="strike" />
        <Action.Mark editor={null} type="code" />
        <Action.Mark editor={null} type="blockquote" />
        <Action.Link editor={null} />
        <Action.Highlight editor={null} />
        <Action.Color editor={null} />

        <Action.More>
          <Action.Mark editor={null} type="subscript" />
          <Action.Mark editor={null} type="superscript" />

          <Action.Divider />

          <Action.Align editor={null} type="left" />
          <Action.Align editor={null} type="center" />
          <Action.Align editor={null} type="right" />
          <Action.Align editor={null} type="justify" />
        </Action.More>
      </Action.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Text Menu",
  component: TextMenu,
} as Meta;

export const Light: StoryObj<typeof TextMenu> = {
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

export const Dark: StoryObj<typeof TextMenu> = {
  decorators: [
    (Story) => {
      return (
        <ConfigProvider prefixCls="ny" iconPrefixCls="ny" theme={{ algorithm: theme.darkAlgorithm }}>
          <div data-theme="dark" className="ny-flex ny-justify-center">
            <div className="ny-max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
