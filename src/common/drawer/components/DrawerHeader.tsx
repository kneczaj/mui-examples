import IconButton from "@material-ui/core/IconButton";
import React, {ComponentType} from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {makeStyles} from "@material-ui/core";
import {CSSProperties} from "@material-ui/styles/withStyles/withStyles";
import {Anchor, ByAnchor} from "../models";
import {Theme as DefaultTheme} from "@material-ui/core/styles/createTheme";
import clsx from "clsx";

export interface Props {
  className?: string;
  anchor: Anchor;
  setOpen: (val: boolean) => void;
}

interface StylesProps extends Pick<Props, 'anchor'> {};

const useStyles = makeStyles<DefaultTheme, StylesProps>((theme) => ({
  root: ({ anchor }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    ...(() => {
      const byAnchor: ByAnchor<CSSProperties> = {
        left: { justifyContent: 'flex-end' },
        right: { justifyContent: 'flex-start' },
        top: { justifyContent: 'flex-start' },
        bottom: { justifyContent: 'flex-end' },
      }
      return byAnchor[anchor];
    })(),
  }),
}));

const CloseIconByAnchor: ByAnchor<ComponentType> = {
  left: ChevronLeftIcon,
  right: ChevronRightIcon,
  top: ChevronLeftIcon,
  bottom: ChevronRightIcon,
}

export function DrawerHeader({ anchor, className, setOpen }: Props) {
  const classes = useStyles({ anchor });
  const CloseIcon = CloseIconByAnchor[anchor];
  return (
    <div className={clsx(classes.root, className)}>
      <IconButton onClick={() => setOpen(false)}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
