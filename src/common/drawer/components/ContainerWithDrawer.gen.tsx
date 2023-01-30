import {fireEvent, RenderResult} from '@testing-library/react';
import {generate} from 'react-component-testing-library-client/lib/commands';
import {ContainerWithDrawer, Props as ContainerWithDrawerProps} from './ContainerWithDrawer';
import {ToggleButton} from "common/drawer/components/ToggleButton";
import {getAnyComponentMock} from "test/components";
import {ContextProps, useDrawer} from "common/drawer/hooks/useDrawer";
import {MOCKS} from "test";


const ChildrenMock = getAnyComponentMock('children');
function ContentMock() {
  const {} = useDrawer();
  return <div/>
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
      <ChildrenMock/>
    </ContainerWithDrawer>
  );
}

const elements = (rendered: RenderResult) => ({
  button: () => rendered.queryByRole('button', { name: 'my button' }),
  label: () => rendered.queryByText('A')
});

type Hooks = {
  useDrawer: ContextProps
}

generate<Props, Hooks, keyof ReturnType<typeof elements>>(
  __filename,
  TestComponent,
  elements,
  data => {
    data.setBase({
      size: 200,
      className: 'test',
      variant: 'persistent',
      DrawerContent: ContentMock,
      anchor: 'left',
      initiallyOpened: false
    }, {
      useDrawer: MOCKS.HOOK_MOCKS.useDrawer
    });

    data.setStateChanges((rendered, props, hooks, getElement) => ({
      'after opening drawer': () => {
        fireEvent.click(getElement.button());
      }
    }));

    data.setPropsChanges({});

    data.setHooksChanges({});

    data.setTests((it, rendered, props, hooks, expectResult, queryElement) => {
      it('is visible', () => {
        expectResult(hooks.useDrawer.isVisible).toEqual(true);
      });
    });
  }
);
