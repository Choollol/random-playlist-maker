import { IconButton, Link, Tooltip } from "@mui/material";
import { ComponentProps, ReactNode } from "react";

interface Props {
  tooltipText: string;
  linkHref: string;
  iconComponent: ReactNode;
  iconButtonSize?: ComponentProps<typeof IconButton>["size"];
}

const IconLinkButton = ({
  tooltipText,
  linkHref,
  iconComponent,
  iconButtonSize = "large",
}: Props) => {
  return (
    <Tooltip title={tooltipText}>
      <Link href={linkHref}>
        <IconButton size={iconButtonSize}>{iconComponent}</IconButton>
      </Link>
    </Tooltip>
  );
};

export default IconLinkButton;
