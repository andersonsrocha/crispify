import { LucideProps, icons } from "lucide-react";

export type LucideIconNames = keyof typeof icons;

export type IconProps = LucideProps & { name: LucideIconNames };

const Icon: React.FC<IconProps> = ({ name, size = 14, ...rest }) => {
  const LucideIcon = icons[name];

  return <LucideIcon size={size} {...rest} />;
};

export { Icon };
