import React from "react";
import {DrawerProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

export interface Props extends DrawerProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    transition: 'all .3s ease-out',
    overflow: 'hidden',
    flexBasis: 0
  },
  inner: {
    height: '100%',
    width: '100%',
    overflow: 'auto'
  }
}));

export function SimpleDrawer({children, className}: Props) {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.inner}>
        <div>{children}</div>
      </div>
    </div>
  )
}
