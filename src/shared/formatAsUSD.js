const formatAsUSD = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(number);
};
export default formatAsUSD;
