export const creatUniqId = (function() {
  let i = 1;

  return () => String(i++);
})();
