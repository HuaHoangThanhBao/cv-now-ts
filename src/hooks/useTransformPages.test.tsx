import { renderHook, act, cleanup } from '@testing-library/react';
import { useTransformPages } from './useTransformPages';
import { store } from '../store';
import { pagesOneColumn, pagesTwoColumn } from '../contants/ColumnFormat';
import { Wrapper } from '../utils/test-utils';

afterEach(cleanup);

describe('useTransformPages', () => {
  const blockState = store.getState().block;
  test('call update if there are no changes', () => {
    const { result } = renderHook(useTransformPages, {
      initialProps: {
        isOneColumn: blockState.isOneColumn || false,
        pagesOneColumn: blockState.pagesOneColumn,
        pagesTwoColumn: blockState.pagesTwoColumn,
      },
      wrapper: Wrapper,
    });
    act(() => {
      result.current.callTransformPages();
    });
    expect(store.getState().block.pagesTwoColumn).toEqual(pagesTwoColumn);
    expect(store.getState().block.pagesOneColumn).toEqual(pagesOneColumn);
    expect(store.getState().block.isOneColumn).toEqual(false);
  });
  test('call only one column to update', () => {
    const { result } = renderHook(useTransformPages, {
      initialProps: {
        isOneColumn: blockState.isOneColumn || false,
        pagesOneColumn: blockState.pagesOneColumn,
        pagesTwoColumn: blockState.pagesTwoColumn,
      },
      wrapper: Wrapper,
    });
    act(() => {
      result.current.callTransformPages(blockState.pagesOneColumn, blockState.pagesTwoColumn, true);
    });
    expect(store.getState().block.isOneColumn).toBe(true);
  });
  test('call only page one column to update', () => {
    const { result } = renderHook(useTransformPages, {
      initialProps: {
        isOneColumn: blockState.isOneColumn || false,
        pagesOneColumn: blockState.pagesOneColumn,
        pagesTwoColumn: blockState.pagesTwoColumn,
      },
      wrapper: Wrapper,
    });
    act(() => {
      result.current.callTransformPages(
        pagesOneColumn,
        blockState.pagesTwoColumn,
        blockState.isOneColumn
      );
    });
    expect(store.getState().block.pagesOneColumn).toEqual(pagesOneColumn);
  });
  test('call only page two columns to update', () => {
    const { result } = renderHook(useTransformPages, {
      initialProps: {
        isOneColumn: blockState.isOneColumn || false,
        pagesOneColumn: blockState.pagesOneColumn,
        pagesTwoColumn: blockState.pagesTwoColumn,
      },
      wrapper: Wrapper,
    });
    act(() => {
      result.current.callTransformPages(
        blockState.pagesOneColumn,
        pagesTwoColumn,
        blockState.isOneColumn
      );
    });
    expect(store.getState().block.pagesTwoColumn).toEqual(pagesTwoColumn);
  });
});
