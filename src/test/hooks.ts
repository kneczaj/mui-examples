import {ContextProps} from "common/drawer/hooks/useDrawer";

export const useDrawer: ContextProps = {
  toggle: jest.fn(),
  isVisible: false,
  show: jest.fn(),
  hide: jest.fn(),
  anchor: 'left',
  variant: 'temporary'
}
