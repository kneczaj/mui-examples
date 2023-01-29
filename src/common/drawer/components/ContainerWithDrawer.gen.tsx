import { fireEvent, RenderResult } from '@testing-library/react';
import { generate } from 'react-component-testing-library-client/lib/commands';
import { ContainerWithDrawer, Props as ContainerWithDrawerProps } from './ContainerWithDrawer';
import {DrawerHeader} from "src/common/drawer/components/DrawerHeader";
import Divider from "@material-ui/core/Divider";
import {Menu} from "src/common/drawer/components/Menu";
import {ToggleButton} from "src/common/drawer/components/ToggleButton";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {getAnyComponentMock} from "src/test/components";

const ChildrenMock = getAnyComponentMock('children');

interface Props extends Omit<ContainerWithDrawerProps, 'children'> {}

function TestComponent(props: Props) {
  <ContainerWithDrawer
    anchor={'left'}
    DrawerContent={() => (
      <>
        <DrawerHeader />
        <Divider />
        <Menu />
      </>
    )}
    size={240}
    className={classes.drawer}
    ToggleButton={ToggleButton}
    variant={'persistent'}
  >
    <ChildrenMock className={classes.main}/>
  </ContainerWithDrawer>
}

const elements = (rendered: RenderResult) => ({
  button: () => rendered.queryByRole('button', { name: 'my button' }),
  label: () => rendered.queryByText('A')
});

generate<Props, any, keyof ReturnType<typeof elements>>(
  __filename,
  ContainerWithDrawer,
  elements,
  data => {
    data.setBase({
      size: 200,
      className: 'test',
      variant: undefined as any,
      ToggleButton: undefined as any,
      DrawerContent: undefined as any,
      anchor: undefined as any,
      initiallyOpened: false,
      children: undefined as any,
      DrawerProps: undefined as any
    }, {}, 'permanent');

    data.setBase({
      size: 200,
      className: 'test',
      variant: undefined as any,
      ToggleButton: undefined as any,
      DrawerContent: undefined as any,
      anchor: undefined as any,
      initiallyOpened: false,
      children: undefined as any,
      DrawerProps: undefined as any
    }, {}, 'temporary');

    data.setBase({
      size: 200,
      className: 'test',
      variant: undefined as any,
      ToggleButton: undefined as any,
      DrawerContent: undefined as any,
      anchor: undefined as any,
      initiallyOpened: false,
      children: undefined as any,
      DrawerProps: undefined as any
    }, {}, 'persistent');

    data.setStateChanges((rendered, props, hooks, getElement) => ({
      'after clicking the button': () => {
        fireEvent.click(getElement.button());
      }
    }));

    data.setPropsChanges({});

    data.setHooksChanges({});

    data.setTests((it, rendered, props, hooks, expectResult, queryElement) => {
      it('sample test', () => {});
    });
  }
);
