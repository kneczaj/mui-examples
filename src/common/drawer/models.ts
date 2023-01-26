import {ButtonBaseProps} from "@material-ui/core";
import {AriaAttributes} from "react";
import {Property} from "csstype";

export type Anchor = 'left' | 'top' | 'right' | 'bottom';
export type ByAnchor<T> =  { [TKey in Anchor]: T }
export type Orientation = 'vertical' | 'horizontal'
export type ByOrientation<T> =  { [TKey in Orientation]: T }

export function toOrientation(anchor: Anchor): Orientation {
  return ['left', 'right'].includes(anchor) ? 'horizontal' : 'vertical';
}

export function getFlexDirection(anchor: Anchor) {
  const byAnchor: ByAnchor<Property.FlexDirection> = {
    left: "row",
    right: 'row-reverse',
    top: 'column',
    bottom: 'column-reverse'
  };
  return byAnchor[anchor];
}

export interface ToggleButtonProps extends Pick<ButtonBaseProps, 'onClick' | 'className'>, AriaAttributes {}
