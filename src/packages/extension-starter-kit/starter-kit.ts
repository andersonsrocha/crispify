import { AnyExtension } from "@tiptap/core";
import { Styles } from "@/lib/data/styles";

import { Block } from "@/packages/extension-block";
import { Blockquote } from "@/packages/extension-blockquote";
import { Code } from "@/packages/extension-code";
import { CodeBlock } from "@/packages/extension-code-block";
import { Column } from "@/packages/extension-column";
import { Columns } from "@/packages/extension-columns";
import { Document } from "@/packages/extension-document";
import { FontSize } from "@/packages/extension-font-size";
import { Heading } from "@/packages/extension-heading";
import { HorizontalRule } from "@/packages/extension-horizontal-rule";
import { Image } from "@/packages/extension-image";
import { ImageUpload } from "@/packages/extension-image-upload";
import { SlashCommand } from "@/packages/extension-slash-command";
import { Table } from "@/packages/extension-table";
import { TableCell } from "@/packages/extension-table-cell";
import { TableHeader } from "@/packages/extension-table-header";
import { TableRow } from "@/packages/extension-table-row";
import { TrailingNode } from "@/packages/extension-trailing-node";
import { Color } from "@tiptap/extension-color";
import { FocusClasses as Focus } from "@tiptap/extension-focus";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";

export const useExtensions = (): AnyExtension[] => {
  return [
    Block,
    TrailingNode,
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
