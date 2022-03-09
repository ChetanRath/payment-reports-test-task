import { useState, useCallback } from "react";
import { TAsyncGenericState, TGenericDataType } from "util/common.types";

const useAsyncFn = (fn: Function) => {
  const [state, setState] = useState<TAsyncGenericState<TGenericDataType>>({
    isLoading: false,
    err: null,
    res: { code: "", data: [], err: null },
  });
  const asyncFunc = useCallback(
    async (...args: string[]) => {
      setState({
        isLoading: true,
        err: null,
        res: { code: "", data: [], err: null },
      });
      try {
        const { data } = await fn(...args);
        setState({ ...state, isLoading: false, res: data });
      } catch (err) {
        setState({ ...state, isLoading: false, err: err as null });
      }
    },
    [fn, state]
  );

  return { ...state, asyncFunc };
};

export default useAsyncFn;
