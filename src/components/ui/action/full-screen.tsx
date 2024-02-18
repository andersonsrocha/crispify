import React from "react";

import { Button } from "../button";

export interface FullScreenProps {
  /**
   * Reference of the container that will be used for fullscreen mode.
   */
  appendTo: React.RefObject<HTMLDivElement>;
}

export const FullScreen: React.FC<FullScreenProps> = ({ appendTo: { current } }) => {
  const [show, toggle] = React.useReducer((_state) => {
    current?.classList.toggle("noty-editor__fullscreen");
    return !_state;
  }, false);

  return <Button icon={show ? "Minimize" : "Expand"} tip="Open in fullsize" onClick={toggle} active={show} />;
};
