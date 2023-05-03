const decimalPlaces = (value: string | number) => {
  const quantity = value.toString();
  const decimalIndex = quantity.indexOf('.');
  const decimalPlaces = decimalIndex === -1 ? 0 : quantity.length - decimalIndex - 1;
  return decimalPlaces;
}

export default decimalPlaces;