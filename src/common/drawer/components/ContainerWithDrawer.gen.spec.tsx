import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ToggleButton } from 'common/drawer/components/ToggleButton';
import * as useDrawerParent from 'common/drawer/hooks/useDrawer';
import { useDrawer } from 'common/drawer/hooks/useDrawer';
import { MOCKS } from 'test';
import { getAnyComponentMock } from 'test/components';
import {
  ContainerWithDrawer,
  Props as ContainerWithDrawerProps
} from './ContainerWithDrawer';
const ChildrenMock = getAnyComponentMock('children');
function ContentMock() {
  const {} = useDrawer();
  return <div />;
}
interface Props extends Omit<ContainerWithDrawerProps, 'children'> {}
function TestComponent(props: Props) {
  return (
    <ContainerWithDrawer
      {...props}
      anchor={'left'}
      DrawerContent={ContentMock}
      ToggleButton={ToggleButton}
      variant={'persistent'}
    >
      <ChildrenMock />
    </ContainerWithDrawer>
  );
}

describe('TestComponent', () => {
  let rendered: RenderResult;

  const getElement = {
    button: () => rendered.getByRole('button', { name: 'my button' }),
    label: () => rendered.getByText('A')
  };

  const queryElement = {
    button: () => rendered.queryByRole('button', { name: 'my button' }),
    label: () => rendered.queryByText('A')
  };

  describe('base', () => {
    const props1: any = {
      size: 200,
      className: 'test',
      variant: 'persistent',
      DrawerContent: ContentMock,
      anchor: 'left',
      initiallyOpened: false
    };
    const hooks1 = {
      useDrawer: MOCKS.HOOK_MOCKS.useDrawer
    };

    let hooks_useDrawer: jest.SpyInstance<any, any>;

    beforeEach(() => {
      hooks_useDrawer = jest
        .spyOn(useDrawerParent, 'useDrawer')
        .mockImplementation((...args: any[]) => hooks1.useDrawer as any);

      rendered = render(<TestComponent {...props1} />);
    });
    afterEach(() => {
      hooks_useDrawer.mockClear();
    });

    it('is visible', () => {
      expect(hooks_useDrawer.isVisible).toEqual(true);
    });

    describe('after opening drawer', () => {
      beforeEach(() => {
        fireEvent.click(getElement.button());
      });

      it('is visible', () => {
        expect(hooks_useDrawer.isVisible).toEqual(true);
      });
    });
  });
});
