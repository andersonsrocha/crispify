import React from "react";
import { useFullscreen, useToggle } from "react-use";

import { Button } from "../button";

export interface FullScreenProps {
  /**
   * Reference of the container that will be used for fullscreen mode.
   */
  appendTo: React.RefObject<HTMLDivElement>;
  /**
   * Minimum size when not in fullscreen mode.
   */
  minHeight: number | string;
}

export const FullScreen: React.FC<FullScreenProps> = ({ appendTo, minHeight }) => {
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(appendTo, show, { onClose: () => toggle(false) });

  React.useEffect(() => {
    const $header = document.getElementById("editor_header");

    if (!appendTo.current || !$header) return;

    const { height: _header_height } = $header.getBoundingClientRect();

    const _default_height = Number.isNaN(Number(minHeight)) ? minHeight : `${minHeight}px`;
    appendTo.current.setAttribute("data-fullscreen", `${isFullscreen}`);
    appendTo.current.style.setProperty("--full-screen", `${isFullscreen}`);
    appendTo.current.style.setProperty(
      "--height",
      `${isFullscreen ? `calc(100% - ${_header_height}px)` : _default_height}`
    );
  }, [appendTo, isFullscreen, minHeight]);

  return (
    <Button icon={isFullscreen ? "Minimize" : "Expand"} tip="Open in fullsize" onClick={toggle} active={isFullscreen} />
  );
};
