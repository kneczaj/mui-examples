import { ContextHookFactory } from '../../utils/context-hook';
import {Anchor} from "../models";
import {DrawerProps as MuiDrawerProps} from "@material-ui/core/Drawer/Drawer";

export interface ContextProps {
  toggle: () => void;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  anchor: Anchor;
  variant: MuiDrawerProps['variant'];
}

export const DrawerContext = ContextHookFactory.createContext<ContextProps>('DrawerContext');

export const useDrawer = ContextHookFactory.createHook<ContextProps>(DrawerContext);
