import { ConfigProvider, Slider, theme } from "antd";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";

import type { Meta, StoryObj } from "@storybook/react";

const ImageMenu = () => {
  return (
    <div className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md">
      <Action.Wrapper>
        <Button tip="Delete" icon="Trash2" />

        <Action.Divider />

        <Button tip="Align image left" icon="AlignHorizontalDistributeStart" />
        <Button tip="Align image center" icon="AlignHorizontalDistributeCenter" />
        <Button tip="Align image right" icon="AlignHorizontalDistributeEnd" />

        <Action.Divider />

        <Slider step={10} className="w-20 mr-3" tooltip={{ formatter: (v) => `${v}%` }} />
      </Action.Wrapper>
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