import React, {ComponentType, ReactNode} from 'react';
import clsx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import MuiDrawer, {DrawerProps as MuiDrawerProps} from '@material-ui/core/Drawer';
import {Theme as DefaultTheme} from "@material-ui/core/styles/createTheme";
import {CreateCSSProperties} from "@material-ui/styles/withStyles/withStyles";
import {Anchor, ByOrientation, toOrientation, ToggleButtonProps, getFlexDirection} from '../models';
import {SimpleDrawer} from "./SimpleDrawer";
import {ContextProps, DrawerContext} from '../hooks/useDrawer';

export interface Props {
  className?: string;
  anchor: Anchor;
  children: ReactNode;
  DrawerContent: ComponentType;
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
      flexDirection: getFlexDirection(anchor)
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
    contentContainer: ({ anchor }: StylesProps) => ({
      flex: 1,
      position: 'relative',
      flexDirection: getFlexDirection(anchor),
      overflow: 'auto'
    }),
    content: {
      height: '100%',
      overflow: 'auto'
    },
    toggleContainer: ({ anchor }: StylesProps) => ({
      position: 'absolute',
      [anchor]: 0,
      ...(() => {
        const byOrientation: ByOrientation<CreateCSSProperties<StylesProps>> = {
          vertical: {
            left: '50%',
            transform: 'translate(-50%, 0)',
          },
          horizontal: {
            top: '50%',
            transform: 'translate(0, -50%)',
          },
        }
        return byOrientation[toOrientation(anchor)];
      })()
    })
  }),
);

export function ContainerWithDrawer({ anchor, children, className, DrawerContent, DrawerProps = {}, size, ToggleButton, variant, initiallyOpened = false }: Props) {
  const classes = useStyles({ anchor, size, variant });
  const [isVisible, setIsVisible] = React.useState(false);
  // Mui Drawer does not smoothly cooperate with Toggle button in scope of synchronized animation
  const Drawer = variant === 'temporary' ? MuiDrawer : SimpleDrawer;
  const context: ContextProps = {
    toggle: () => setIsVisible(val => !val),
    hide: () => setIsVisible(false),
    show: () => setIsVisible(true),
    isVisible,
    variant,
    anchor
  };
  const showToggleButton = (variant === 'persistent' || variant === 'temporary') && ToggleButton;

  return (
    <div className={clsx(classes.root, className)}>
      <DrawerContext.Provider value={context}>
        <Drawer
          className={clsx((variant === 'permanent' || isVisible) && classes.drawerOpened, DrawerProps.className)}
          variant={variant}
          anchor={anchor}
          open={isVisible}
          classes={{
            paper: classes.paper,
            ...(DrawerProps.classes || {})
          }}
        >
          <DrawerContent/>
        </Drawer>
      </DrawerContext.Provider>
      <div
        className={classes.contentContainer}
      >
        <div className={classes.content}>
          {children}
        </div>
        {showToggleButton &&
          <div className={classes.toggleContainer}>
            <ToggleButton
              aria-label="open drawer"
              onClick={() => setIsVisible(isOpened => !isOpened)}
            />
          </div>
        }
      </div>
    </div>
  );
}
