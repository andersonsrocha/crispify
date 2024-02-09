import { Editor } from "@tiptap/core";
import { LucideIconNames } from "@/components";

declare module "@notion/types" {
  export type Command = {
    name: string;
    label: string;
    aliases?: string[];
    iconName: LucideIconNames;
    action: (editor: Editor) => void;
    shouldBeHidden?: (editor: Editor) => boolean;
  };

  export type Option = {
    name: string;
    title: string;
    commands: Command[];
  };

  export type MenuListProps = {
    editor: Editor;
    items: Option[];
    command: (command: Command) => void;
  };
}
