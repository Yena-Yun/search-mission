const checkExpiredCache = () => {
  Object.keys(localStorage).forEach((key) => {
    const obj = localStorage.getItem(key);
    if (!obj) return;

    const searchValueObj = JSON.parse(obj);
    if (Date.now() > searchValueObj.expire) {
      localStorage.removeItem(key);
    }
  });
};

export default checkExpiredCache;
