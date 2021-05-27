const calculateDomain = (value) => {
  const newMin = Math.floor(value * 0.99);
  const newMax = Math.ceil(value * 1.01);

  return [newMin, newMax];
};

export default calculateDomain;
