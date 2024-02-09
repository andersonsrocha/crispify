import { ChainedCommands } from "@tiptap/react";

export type CommandMarkType = {
  [K in keyof ChainedCommands as K extends `toggle${string}` ? K : never]: ChainedCommands[K];
};

export type CommandAlignType = {
  [K in keyof ChainedCommands as K extends "setTextAlign" ? K : never]: ChainedCommands[K];
};

export type CommandArgs<K extends MarkType | AlignType, T extends CommandMarkType | CommandAlignType> = Parameters<
  ChainedCommands[Record<K, T>[k]]
>;
