import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import { FeedbackStatus, SortOrder } from '../api/types';

interface FilterState {
  status: FeedbackStatus | 'all';
  sort: SortOrder;
}

type FilterAction =
  | { type: 'SET_STATUS'; payload: FeedbackStatus | 'all' }
  | { type: 'SET_SORT'; payload: SortOrder };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
  }
}

const initialState: FilterState = { status: 'all', sort: 'newest' };

interface FilterContextValue {
  state: FilterState;
  setStatus: (status: FeedbackStatus | 'all') => void;
  setSort: (sort: SortOrder) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider
      value={{
        state,
        setStatus: (status) => dispatch({ type: 'SET_STATUS', payload: status }),
        setSort: (sort) => dispatch({ type: 'SET_SORT', payload: sort }),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilter must be used within FilterProvider');
  return ctx;
}
