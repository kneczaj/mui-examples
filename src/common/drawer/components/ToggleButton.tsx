import {Button} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import {ToggleButtonProps} from "../models";
import {useDrawer} from "common/drawer/hooks/useDrawer";

export function ToggleButton(props: ToggleButtonProps) {
  const { isVisible } = useDrawer();
  return (
    <Button {...props} aria-label={isVisible ? 'close drawer' : 'open drawer'} variant={'contained'} color={'primary'}>
      <MenuIcon />
    </Button>
  )
}
