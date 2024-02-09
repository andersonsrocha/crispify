import { LucideProps, icons } from "lucide-react";

export type LucideIconNames = keyof typeof icons;

const Icon: React.FC<{ name: LucideIconNames } & LucideProps> = ({ name, size = 14, ...rest }) => {
  const LucideIcon = icons[name];

  return <LucideIcon size={size} {...rest} />;
};

export { Icon };
