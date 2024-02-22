import { ChainedCommands } from "@tiptap/react";

import { AlignType, MarkType, NodeType } from ".";

export type CommandMarkType = {
  [K in keyof ChainedCommands as K extends `toggle${string}` ? K : never]: ChainedCommands[K];
};

export type CommandAlignType = {
  [K in keyof ChainedCommands as K extends "setTextAlign" ? K : never]: ChainedCommands[K];
};

type CommandNodeType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof ChainedCommands]: ChainedCommands[K] extends (...args: any[]) => any ? ChainedCommands[K] : never;
};

export type CommandArgs<
  K extends MarkType | AlignType | NodeType,
  T extends CommandMarkType | CommandAlignType | CommandNodeType
> = Parameters<ChainedCommands[Record<K, T>[k]]>;
