export const getLocalStorageValue = (value: string) => {
  return localStorage.getItem(value);
};
export const setLocalStorageValue = (item: string, value: string) => {
  localStorage.setItem(item, value);
};