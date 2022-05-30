export const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  } else return null;
};
