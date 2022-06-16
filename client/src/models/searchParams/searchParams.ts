import { createEvent, createStore } from 'effector';
import { ISearchParams } from 'src/types/ISearchParams';

export const changeSearchInput = createEvent<string>();
export const changeShowByLikedBtn = createEvent<void>();
export const changeFilterValue = createEvent<string>();
export const changeVisibleArrayInterval = createEvent<object>();

export const $searchParams = createStore<ISearchParams>({
  input: '',
  liked: false,
  changeFilter: '',
  changeArrayInterval: [0, 10000],
})
  .on(changeSearchInput, (searchParams, searchInput:string) => {
    return { ...searchParams, input: searchInput };
  })
  .on(changeShowByLikedBtn, (searchParams) => {
    return { ...searchParams, liked: !searchParams.liked };
  })
  .on(changeFilterValue, (searchParams, filterValue:string) => {
    return { ...searchParams, changeFilter: filterValue };
  })
  .on(changeVisibleArrayInterval, (searchParams, Array:object) => {
    return { ...searchParams, changeArrayInterval: Array };
  });
