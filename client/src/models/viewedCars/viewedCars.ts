import { combine } from 'effector';
import { $searchParams } from 'src/models/searchParams/searchParams';
import { $cars } from 'src/models/cars/cars';
import { getLocalStorage } from 'src/hooks/getLocalStorage';

export const $viewedCars = combine($cars, $searchParams, (cars, searchParams) => {
  let filteredCars = cars;
  if (searchParams.input) {
    filteredCars = filteredCars.filter((item) => {
      const searchMarkers = `${item.brand} ${item.model} ${item.releaseYear} ${
        item.brand} ${item.releaseYear} ${item.model} ${
        item.model} ${item.releaseYear} ${item.brand} ${
        item.model} ${item.brand} ${item.releaseYear} ${
        item.releaseYear} ${item.brand} ${item.model} ${
        item.releaseYear} ${item.model} ${item.brand}`;

      return searchMarkers.toUpperCase().indexOf(searchParams.input.toUpperCase()) > -1;
    });
  }
  if (searchParams.liked) {
    filteredCars = filteredCars.filter((item) => {
      return item.likedUsersId.includes(JSON.parse(getLocalStorage()?.getItem('data'))._id);
    });
  }
  if (searchParams.changeFilter) {
    if (searchParams.changeFilter === '10') {
      filteredCars = filteredCars.sort((a, b) => (a.brand.toLowerCase() > b.brand.toLowerCase() ? 1 : -1));
    }
    if (searchParams.changeFilter === '20') {
      filteredCars = filteredCars.sort((a, b) => (a.price - b.price));
    }
    if (searchParams.changeFilter === '30') {
      filteredCars = filteredCars.sort((a, b) => (a.releaseYear - b.releaseYear));
    }
  }
  if (searchParams.changeArrayInterval[0] !== 0 || searchParams.changeArrayInterval[1] !== 10000) {
    /* eslint-disable*/
    filteredCars = filteredCars.filter((item) => {
      if (searchParams.changeArrayInterval[0] <= item.price && searchParams.changeArrayInterval[1] >= item.price) {
        return item;
      }
    });
  }
  return filteredCars.filter((item) => item);
});


