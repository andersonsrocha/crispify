import { ConfigProvider, Slider, theme } from "antd";

import { TextMenu } from "./text-menu";

import type { Meta, StoryObj } from "@storybook/react";

const ImageMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <TextMenu.Wrapper>
        <TextMenu.Button tip="Delete" icon="Trash2" />

        <TextMenu.Divider />

        <TextMenu.Button tip="Align image left" icon="AlignHorizontalDistributeStart" />
        <TextMenu.Button tip="Align image center" icon="AlignHorizontalDistributeCenter" />
        <TextMenu.Button tip="Align image right" icon="AlignHorizontalDistributeEnd" />

        <TextMenu.Divider />

        <Slider step={10} className="w-20 mr-3" tooltip={{ formatter: (v) => `${v}%` }} />
      </TextMenu.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Image Menu",
  component: ImageMenu,
} as Meta;

export const Light: StoryObj<typeof ImageMenu> = {
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

export const Dark: StoryObj<typeof ImageMenu> = {
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
