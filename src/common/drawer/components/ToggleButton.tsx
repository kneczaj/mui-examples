import {Button} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import {ToggleButtonProps} from "../models";

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <Button {...props} variant={'contained'} color={'primary'}>
      <MenuIcon />
    </Button>
  )
}
