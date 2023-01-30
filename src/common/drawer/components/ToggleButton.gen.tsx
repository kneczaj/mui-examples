import {RenderResult} from '@testing-library/react';
import {useDrawer} from 'common/drawer/hooks/useDrawer';
import {generate} from 'react-component-testing-library-client/lib/commands';
import {ToggleButton} from './ToggleButton';
import {MOCKS} from "test";
import {ToggleButtonProps} from "common/drawer/models";

const elements = (rendered: RenderResult) => ({
  openButton: () => rendered.queryByLabelText('open drawer'),
  closeButton: () => rendered.queryByLabelText('close drawer'),
});

type Hooks = {
  useDrawer: ReturnType<typeof useDrawer>;
};

generate<ToggleButtonProps, Hooks, keyof ReturnType<typeof elements>>(
  __filename,
  ToggleButton,
  elements,
  data => {
    data.setBase({
      className: 'test',
      onClick: jest.fn()
    })

    data.setBaseVariants({
      'when drawer is closed': {
        hooks: {
          useDrawer: {
            ...MOCKS.HOOK_MOCKS.useDrawer,
            isVisible: false
          }
        }
      },
      'when drawer is opened': {
        hooks: {
          useDrawer: {
            ...MOCKS.HOOK_MOCKS.useDrawer,
            isVisible: true
          }
        }
      }
    });

    data.setTests((it, rendered, props, hooks, expectResult, queryElement) => {
      it('shows open button', () => {
        expectResult(queryElement.openButton()).toBeInTheDocument();
      });
      it('shows close button', () => {
        expectResult(queryElement.closeButton()).toBeInTheDocument();
      });
    });
  }
);
