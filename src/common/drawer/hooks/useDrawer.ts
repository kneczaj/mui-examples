import { ContextHookFactory } from '../../utils/context-hook';

export interface ContextProps {
  toggle: () => void;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

export const DrawerContext = ContextHookFactory.createContext<ContextProps>('DrawerContext');

export const useDrawer = ContextHookFactory.createHook<ContextProps>(DrawerContext);
