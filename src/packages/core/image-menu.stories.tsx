import { ConfigProvider, Slider, theme } from "antd";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";

import type { StoryObj } from "@storybook/react";

const ImageMenu = () => {
  return (
    <div className="ny-bg-colorBgElevated ny-shadow-xl ny-shadow-black/70 ny-border ny-border-solid ny-border-colorBorder ny-rounded-md">
      <Action.Wrapper>
        <Button tip="Delete" icon="Trash2" />

        <Action.Divider />

        <Button tip="Align image left" icon="AlignHorizontalDistributeStart" />
        <Button tip="Align image center" icon="AlignHorizontalDistributeCenter" />
        <Button tip="Align image right" icon="AlignHorizontalDistributeEnd" />

        <Action.Divider />

        <Slider step={10} className="ny-w-20 ny-mr-3" tooltip={{ formatter: (v) => `${v}%` }} />
      </Action.Wrapper>
    </div>
  );
};

export default {
  title: "Menus UI/Image Menu",
  component: ImageMenu,
};

export const Light: StoryObj<typeof ImageMenu> = {
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

export const Dark: StoryObj<typeof ImageMenu> = {
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
