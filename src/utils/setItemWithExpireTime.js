export const setItemWithExpireTime = (searchKeywords, searchValue) => {
  const searchValueObj = {
    searchValue,
    expire: Date.now() + 300000,
  };
  localStorage.setItem(searchKeywords, JSON.stringify(searchValueObj));
};
