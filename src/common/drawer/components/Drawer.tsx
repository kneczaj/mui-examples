import React, {ComponentType, ReactNode} from 'react';
import clsx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import MuiDrawer, {DrawerProps as MuiDrawerProps} from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {Theme as DefaultTheme} from "@material-ui/core/styles/createTheme";
import {Property} from 'csstype'
import {CreateCSSProperties} from "@material-ui/styles/withStyles/withStyles";
import {DrawerHeader} from "./DrawerHeader";
import {Anchor, ByAnchor, ByOrientation, toOrientation, ToggleButtonProps} from '../models';
import {SimpleDrawer} from "./SimpleDrawer";
import {ContextProps, DrawerContext} from '../hooks/useDrawer';

export interface Props {
  className?: string;
  anchor: Anchor;
  children: ReactNode;
  Content: ComponentType;
  /**
   * Size in pixels, width or height
   */
  size: number;
  /**
   * Button which is displayed on anchor side of the screen in `persistent` and `temporary` variant.
   * At `temporary` variant it gets hidden when the drawer gets closed.
   */
  ToggleButton?: ComponentType<ToggleButtonProps>;
  variant: MuiDrawerProps['variant'];
  DrawerProps?: Partial<Omit<MuiDrawerProps, 'open' | 'anchor' | 'variant'>>;
  initiallyOpened?: boolean;
}

type StylesProps = Pick<Props, 'anchor' | 'size' | 'variant'>;

const useStyles = makeStyles<DefaultTheme, StylesProps>((theme: Theme) =>
  ({
    root: ({ anchor }: StylesProps) => ({
      display: 'flex',
      flexDirection: (() => {
        const byAnchor: ByAnchor<Property.FlexDirection> = {
          left: "row",
          right: 'row-reverse',
          top: 'column',
          bottom: 'column-reverse'
        };
        return byAnchor[anchor];
      })(),
    }),
    drawerOpened: ({ size }: StylesProps) => ({
      flexBasis: size,
      flexShrink: 0,
    }),
    paper: ({ anchor, size }: StylesProps) => {
      const byOrientation: ByOrientation<CreateCSSProperties<StylesProps>> = {
        horizontal: { width: size },
        vertical: { height: size },
      }
      return byOrientation[toOrientation(anchor)];
    },
    content: {
      flexGrow: 1,
    },
  }),
);

export default function Drawer({ anchor, children, className, Content, DrawerProps = {}, size, ToggleButton, variant, initiallyOpened = false }: Props) {
  const classes = useStyles({ anchor, size, variant });
  const [isVisible, setIsVisible] = React.useState(false);
  // Mui Drawer does not smoothly cooperate with Toggle button in scope of synchronized animation
  const DrawerComponent = variant === 'temporary' ? MuiDrawer : SimpleDrawer;
  const context: ContextProps = {
    toggle: () => setIsVisible(val => !val),
    hide: () => setIsVisible(false),
    show: () => setIsVisible(true),
    isVisible
  };

  return (
    <div className={clsx(classes.root, className)}>
      <DrawerContext.Provider value={context}>
        <DrawerComponent
          className={clsx((variant === 'permanent' || isVisible) && classes.drawerOpened, DrawerProps.className)}
          variant={variant}
          anchor={anchor}
          open={isVisible}
          classes={{
            paper: classes.paper,
            ...(DrawerProps.classes || {})
          }}
        >
          {variant !== 'permanent' && <>
            <DrawerHeader setOpen={setIsVisible} anchor={anchor}/>
            <Divider />
          </>}
          <Content/>
        </DrawerComponent>
        {(variant === 'persistent' || variant === 'temporary') && ToggleButton && <ToggleButton
          aria-label="open drawer"
          onClick={() => setIsVisible(isOpened => !isOpened)}
        />}
      </DrawerContext.Provider>
      <div
        className={classes.content}
      >
        {children}
      </div>
    </div>
  );
}
