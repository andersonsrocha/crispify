export * from "./command";
export * from "./mark";
export * from "./menu";
export * from "./slash-command";

export type Keyboard =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "."
  | ",";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Generic = Record<string, any>;
