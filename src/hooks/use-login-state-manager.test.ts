import { default as liffMock } from '@line/liff';
import { renderHook, act } from '@testing-library/react-hooks';

import { useLoginStateManager } from './use-login-state-manager';

jest.mock('@line/liff');

describe('useLoginStateManager', () => {
  describe('When liff is not given', () => {
    const { result, rerender } = renderHook(() => useLoginStateManager());

    describe('After the hook is initialized', () => {
      it('returns false as initial login status', () => {
        expect(result.current[0]).toBe(false);
      });
    });

    describe('After login() was called', () => {
      beforeEach(() => {
        act(() => {
          result.current[1].login();
        });
        rerender();
      });

      it('returns false as login status after login', () => {
        expect(result.current[0]).toBe(false);
        expect(liffMock.login).not.toBeCalled();
      });
    });

    describe('After logout() was called', () => {
      beforeEach(() => {
        act(() => {
          result.current[1].login();
          result.current[1].logout();
        });
        rerender();
      });

      it('returns false as login status after logout', () => {
        expect(result.current[0]).toBe(false);
        expect(liffMock.logout).not.toBeCalled();
      });
    });
  });

  describe('When liff is given', () => {
    const { result, rerender } = renderHook(() => useLoginStateManager(liffMock));

    describe('After the hook is initialized', () => {
      it('returns false as initial login status', () => {
        expect(result.current[0]).toBe(false);
      });
    });

    describe('After login() was called', () => {
      beforeEach(() => {
        act(() => {
          result.current[1].login();
        });
        rerender();
      });

      it('returns true as login status after login', () => {
        expect(result.current[0]).toBe(true);
        expect(liffMock.login).toBeCalled();
      });
    });

    describe('After logout() was called', () => {
      beforeEach(() => {
        act(() => {
          result.current[1].login();
          result.current[1].logout();
        });
        rerender();
      });

      it('returns false as login status after logout', () => {
        expect(result.current[0]).toBe(false);
        expect(liffMock.logout).toBeCalled();
      });
    });
  });
});
