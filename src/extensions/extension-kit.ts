import { AnyExtension } from "@tiptap/core";
import { Styles } from "@/lib/data/styles";

import {
  Block,
  Blockquote,
  Code,
  CodeBlock,
  Color,
  Column,
  Columns,
  Document,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  Image,
  ImageUpload,
  Link,
  Placeholder,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  Underline,
} from ".";

export const useExtensions = (): AnyExtension[] => {
  return [
    Block,
    Underline,
    TextStyle,
    FontSize,
    FontFamily,
    Code,
    CodeBlock,
    Link,
    Color,
    Blockquote,
    Subscript,
    Superscript,
    Image,
    ImageUpload,
    Column,
    Columns,
    TaskList,
    Focus,
    HorizontalRule,
    Table,
    TableHeader,
    TableRow,
    TableCell.configure({
      HTMLAttributes: {
        style: Styles.TableCell,
      },
    }),
    TaskItem.configure({
      nested: true,
    }),
    Highlight.configure({
      multicolor: true,
    }),
    StarterKit.configure({
      heading: false,
      document: false,
      code: false,
      codeBlock: false,
      blockquote: false,
      horizontalRule: false,
    }),
    SlashCommand.configure({
      leftMenu: true,
    }),
    Document.configure({
      leftMenu: true,
    }),
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: false,
      considerAnyAsEmpty: true,
      placeholder: () => "",
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5],
    }),
  ];
};
