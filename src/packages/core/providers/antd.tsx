import React from "react";
import { App, ConfigProvider } from "antd";
import { Feedback } from "@/packages/core";

export type ProviderProps = {
  nodeRef: React.RefObject<HTMLElement>;
};

export const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({ nodeRef, children }) => (
  <ConfigProvider
    prefixCls="ny"
    iconPrefixCls="ny"
    theme={{ inherit: true }}
    getTargetContainer={() => nodeRef.current || document.body}
    getPopupContainer={() => nodeRef.current || document.body}
  >
    <App>
      {children}
      <Feedback />
    </App>
  </ConfigProvider>
);
