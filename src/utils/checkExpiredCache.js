const checkExpiredCache = () => {
  Object.keys(localStorage).forEach((key) => {
    const obj = localStorage.getItem(key);

    const searchValueObj = JSON.parse(obj);
    if (Date.now() > searchValueObj.expiresAt) {
      localStorage.removeItem(key);
    }
  });
};

export default checkExpiredCache;
