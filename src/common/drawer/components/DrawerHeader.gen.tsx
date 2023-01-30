import { RenderResult } from '@testing-library/react';
import { generate } from 'react-component-testing-library-client/lib/commands';
import { useDrawer } from '../hooks/useDrawer';
import { DrawerHeader, Props } from './DrawerHeader';
import {MOCKS} from "test";

const elements = (rendered: RenderResult) => ({
  title: () => rendered.queryByText('title'),
  closeButton: () => rendered.queryByLabelText('close')
});

type Hooks = {
  useDrawer: ReturnType<typeof useDrawer>;
};

generate<Props, Hooks, keyof ReturnType<typeof elements>>(
  __filename,
  DrawerHeader,
  elements,
  data => {
    data.setBase(
      {
        className: 'test',
        title: 'title'
      },
      { useDrawer: { ...MOCKS.HOOK_MOCKS.useDrawer, variant: 'temporary' } }
    );

    data.setPropsChanges({
      'with no title': {
        title: undefined
      }
    });

    data.setHooksChanges({
      'with permanent variant': {
        useDrawer: { ...MOCKS.HOOK_MOCKS.useDrawer, variant: 'permanent' }
      }
    });

    data.setTests((it, rendered, props, hooks, expectResult, queryElement) => {
      it('shows close button', () => {
        expectResult(queryElement.closeButton()).toBeInTheDocument();
      });
      it('shows title', () => {
        expectResult(queryElement.title()).toBeInTheDocument();
      });
    });
  }
);
