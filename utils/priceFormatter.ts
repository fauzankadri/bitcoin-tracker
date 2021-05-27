const priceFormatter = (value, option?) => {
  return (
    '$' +
    value
      .toFixed(option && option.noDecimal ? 0 : 2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
};

export default priceFormatter;
