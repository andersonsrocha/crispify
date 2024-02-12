import { Styles } from "@/lib/data/styles";
import { AnyExtension, Extension } from "@tiptap/core";

import { Block } from "@/packages/extension-block";
import { Blockquote, BlockquoteOptions } from "@/packages/extension-blockquote";
import { Code, CodeOptions } from "@/packages/extension-code";
import { CodeBlock, CodeBlockOptions } from "@/packages/extension-code-block";
import { Column } from "@/packages/extension-column";
import { Columns } from "@/packages/extension-columns";
import { Document } from "@/packages/extension-document";
import { FontSize } from "@/packages/extension-font-size";
import { Heading, HeadingOptions } from "@/packages/extension-heading";
import { HorizontalRule, HorizontalRuleOptions } from "@/packages/extension-horizontal-rule";
import { ImageUpload } from "@/packages/extension-image-upload";
import { SlashCommand } from "@/packages/extension-slash-command";
import { Table } from "@/packages/extension-table";
import { TableCell } from "@/packages/extension-table-cell";
import { TableHeader } from "@/packages/extension-table-header";
import { TableRow } from "@/packages/extension-table-row";
import { TrailingNode } from "@/packages/extension-trailing-node";
import { Bold, BoldOptions } from "@tiptap/extension-bold";
import { BulletList, BulletListOptions } from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import { Dropcursor, DropcursorOptions } from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import { FontFamily, FontFamilyOptions } from "@tiptap/extension-font-family";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak, HardBreakOptions } from "@tiptap/extension-hard-break";
import { Highlight } from "@tiptap/extension-highlight";
import { History, HistoryOptions } from "@tiptap/extension-history";
import { Image, ImageOptions } from "@/packages/extension-image";
import { Italic, ItalicOptions } from "@tiptap/extension-italic";
import { Link, LinkOptions } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList, OrderedListOptions } from "@tiptap/extension-ordered-list";
import { Paragraph, ParagraphOptions } from "@tiptap/extension-paragraph";
import { Placeholder, PlaceholderOptions } from "@tiptap/extension-placeholder";
import { Strike, StrikeOptions } from "@tiptap/extension-strike";
import { Subscript, SubscriptExtensionOptions } from "@tiptap/extension-subscript";
import { Superscript, SuperscriptExtensionOptions } from "@tiptap/extension-superscript";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Text } from "@tiptap/extension-text";
import { TextAlign, TextAlignOptions } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline, UnderlineOptions } from "@tiptap/extension-underline";

export type StarterKitOptions = {
  leftMenu?: boolean;
  blockquote: Partial<BlockquoteOptions> | false;
  bold: Partial<BoldOptions> | false;
  bulletList: Partial<BulletListOptions> | false;
  code: Partial<CodeOptions> | false;
  codeBlock: Partial<CodeBlockOptions> | false;
  dropcursor: Partial<DropcursorOptions> | false;
  gapcursor: false;
  hardBreak: Partial<HardBreakOptions> | false;
  heading: Partial<HeadingOptions> | false;
  history: Partial<HistoryOptions> | false;
  horizontalRule: Partial<HorizontalRuleOptions> | false;
  italic: Partial<ItalicOptions> | false;
  orderedList: Partial<OrderedListOptions> | false;
  paragraph: Partial<ParagraphOptions> | false;
  strike: Partial<StrikeOptions> | false;
  block: false;
  placeholder: Partial<PlaceholderOptions> | false;
  underline: Partial<UnderlineOptions> | false;
  textStyle: false;
  font: Partial<FontFamilyOptions> | false;
  link: Partial<LinkOptions> | false;
  subscript: Partial<SubscriptExtensionOptions> | false;
  superscript: Partial<SuperscriptExtensionOptions> | false;
  image: Partial<ImageOptions> | false;
  columns: false;
  taskList: false;
  table: false;
  slashCommand: false;
  textAlign: Partial<TextAlignOptions> | false;
};

export const StarterKit = Extension.create<StarterKitOptions>({
  name: "starterKit",

  addExtensions() {
    const extensions: AnyExtension[] = [
      Text,
      Focus,
      TrailingNode,
      Document.configure({
        leftMenu: this.options?.leftMenu ?? true,
      }),
      Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        considerAnyAsEmpty: true,
        placeholder: () => "",
        ...this.options?.placeholder,
      }),
    ];

    if (this.options.block !== false) {
      extensions.push(Block);
    }

    if (this.options.underline !== false) {
      extensions.push(Underline.configure(this.options?.underline));
    }

    if (this.options.textStyle !== false) {
      extensions.push(Color);
      extensions.push(TextStyle);
      extensions.push(Highlight.configure({ multicolor: true }));
    }

    if (this.options.font !== false) {
      extensions.push(FontSize);
      extensions.push(FontFamily.configure(this.options?.font));
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options?.link));
    }

    if (this.options.subscript !== false) {
      extensions.push(Subscript.configure(this.options?.subscript));
    }

    if (this.options.superscript !== false) {
      extensions.push(Superscript.configure(this.options?.superscript));
    }

    if (this.options.image !== false) {
      extensions.push(Image.configure(this.options?.image));
      extensions.push(ImageUpload);
    }

    if (this.options.columns !== false) {
      extensions.push(Column);
      extensions.push(Columns);
    }

    if (this.options.taskList !== false) {
      extensions.push(TaskList);
      extensions.push(TaskItem);
    }

    if (this.options.table !== false) {
      extensions.push(Table);
      extensions.push(TableHeader);
      extensions.push(TableRow);
      extensions.push(TableCell.configure({ HTMLAttributes: { style: Styles.TableCell } }));
    }

    if (this.options.slashCommand !== false) {
      extensions.push(SlashCommand.configure({ leftMenu: this.options?.leftMenu ?? true }));
    }

    if (this.options.textAlign !== false) {
      extensions.push(
        TextAlign.configure({
          types: ["heading", "paragraph"],
          ...this.options?.textAlign,
        })
      );
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure({ levels: [1, 2, 3, 4, 5] }));
    }

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote));
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options?.bulletList));
      if (!extensions.some((ext) => ext.name === "listItem")) {
        extensions.push(ListItem);
      }
    }

    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code));
    }

    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure(this.options?.codeBlock));
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor));
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor));
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak));
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }

    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options?.horizontalRule));
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList));
      if (!extensions.some((ext) => ext.name === "listItem")) {
        extensions.push(ListItem);
      }
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike));
    }

    return extensions;
  },
});
