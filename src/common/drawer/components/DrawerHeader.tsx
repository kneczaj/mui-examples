import IconButton from "@material-ui/core/IconButton";
import React, {ComponentType} from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {makeStyles} from "@material-ui/core";
import {Anchor, ByAnchor} from "../models";
import {Theme as DefaultTheme} from "@material-ui/core/styles/createTheme";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {useDrawer} from "../hooks/useDrawer";

export interface Props {
  className?: string;
  title?: string;
}

const useStyles = makeStyles<DefaultTheme>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'space-between',
    flexDirection: "row",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  hidden: {
    visibility: 'hidden'
  }
}));

const CloseIconByAnchor: ByAnchor<ComponentType> = {
  left: ChevronLeftIcon,
  right: ChevronRightIcon,
  top: ChevronLeftIcon,
  bottom: ChevronRightIcon,
}

export function DrawerHeader({ className, title }: Props) {
  const { anchor, hide, variant } = useDrawer();
  const classes = useStyles();
  const CloseIcon = CloseIconByAnchor[anchor];
  const hideCloseButton = variant === 'permanent';
  if (!title && hideCloseButton) {
    return null;
  }
  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant={'h6'} className={clsx(!title && classes.hidden)}>
        {title}
      </Typography>
      <IconButton onClick={hide} className={clsx(hideCloseButton && classes.hidden)}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
