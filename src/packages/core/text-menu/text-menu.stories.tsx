import { ConfigProvider, theme } from "antd";

import { Wrapper } from "./components/wrapper";
import { ContentType } from "./components/content-type";
import { Font } from "./components/font-family";
import { FontSize } from "./components/font-size";
import { Divider } from "./components/divider";
import { Mark } from "./components/mark";
import { Link } from "./components/link";
import { Highlight } from "./components/highlight";
import { Color } from "./components/color";
import { More } from "./components/more";
import { Align } from "./components/align";

import type { Meta, StoryObj } from "@storybook/react";

const TextMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <Wrapper>
        <ContentType />
        <Font />
        <FontSize />

        <Divider />

        <Mark type="bold" />
        <Mark type="italic" />
        <Mark type="underline" />
        <Mark type="strike" />
        <Mark type="code" />
        <Mark type="blockquote" />
        <Link />
        <Highlight />
        <Color />

        <More>
          <Mark type="subscript" />
          <Mark type="superscript" />

          <Divider />

          <Align type="left" />
          <Align type="center" />
          <Align type="right" />
          <Align type="justify" />
        </More>
      </Wrapper>
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
          <div data-theme="light" className="flex justify-center">
            <div className="max-w-3xl">{Story()}</div>
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
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <div data-theme="dark" className="flex justify-center">
            <div className="max-w-3xl">{Story()}</div>
          </div>
        </ConfigProvider>
      );
    },
  ],
};
