import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MOCKS } from 'test';
import * as useDrawerParent from '../hooks/useDrawer';
import { DrawerHeader } from './DrawerHeader';

describe('DrawerHeader', () => {
  let rendered: RenderResult;

  const getElement = {
    title: () => rendered.getByText('title'),
    closeButton: () => rendered.getByLabelText('close')
  };

  const queryElement = {
    title: () => rendered.queryByText('title'),
    closeButton: () => rendered.queryByLabelText('close')
  };

  describe('base', () => {
    const props1: any = {
      className: 'test',
      title: 'title'
    };
    const hooks1 = {
      useDrawer: {
        ...MOCKS.HOOK_MOCKS.useDrawer,
        variant: 'temporary'
      }
    };

    let hooks_useDrawer: jest.SpyInstance<any, any>;

    beforeEach(() => {
      hooks_useDrawer = jest
        .spyOn(useDrawerParent, 'useDrawer')
        .mockImplementation((...args: any[]) => hooks1.useDrawer as any);

      rendered = render(<DrawerHeader {...props1} />);
    });
    afterEach(() => {
      hooks_useDrawer.mockClear();
    });

    it('shows close button', () => {
      expect(getElement.closeButton()).toBeInTheDocument();
    });

    it('shows title', () => {
      expect(getElement.title()).toBeInTheDocument();
    });

    describe('with permanent variant', () => {
      const hooks2 = {
        useDrawer: {
          ...MOCKS.HOOK_MOCKS.useDrawer,
          variant: 'permanent'
        }
      };

      let hooks_useDrawer: jest.SpyInstance<any, any>;

      beforeEach(() => {
        hooks_useDrawer = jest
          .spyOn(useDrawerParent, 'useDrawer')
          .mockImplementation((...args: any[]) => hooks2.useDrawer as any);

        cleanup();
        rendered = render(<DrawerHeader {...props1} />);
      });
      afterEach(() => {
        hooks_useDrawer.mockClear();
      });

      it('not shows close button', () => {
        expect(queryElement.closeButton()).not.toBeInTheDocument();
      });

      it('shows title', () => {
        expect(getElement.title()).toBeInTheDocument();
      });
    });

    describe('with no title', () => {
      const props2: any = {
        ...props1,
        title: undefined
      };

      beforeEach(() => {
        cleanup();
        rendered = render(<DrawerHeader {...props2} />);
      });

      it('shows close button', () => {
        expect(getElement.closeButton()).toBeInTheDocument();
      });

      it('not shows title', () => {
        expect(queryElement.title()).not.toBeInTheDocument();
      });

      describe('with permanent variant', () => {
        const hooks2 = {
          useDrawer: {
            ...MOCKS.HOOK_MOCKS.useDrawer,
            variant: 'permanent'
          }
        };

        let hooks_useDrawer: jest.SpyInstance<any, any>;

        beforeEach(() => {
          hooks_useDrawer = jest
            .spyOn(useDrawerParent, 'useDrawer')
            .mockImplementation((...args: any[]) => hooks2.useDrawer as any);

          cleanup();
          rendered = render(<DrawerHeader {...props2} />);
        });
        afterEach(() => {
          hooks_useDrawer.mockClear();
        });

        it('not shows close button', () => {
          expect(queryElement.closeButton()).not.toBeInTheDocument();
        });

        it('not shows title', () => {
          expect(queryElement.title()).not.toBeInTheDocument();
        });
      });
    });
  });
});
