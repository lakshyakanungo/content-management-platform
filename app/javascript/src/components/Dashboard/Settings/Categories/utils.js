export const swapItemsInArray = (array, index1, index2, value1, value2) => {
  const updatedArray = [...array];
  updatedArray[index1] = value2;
  updatedArray[index2] = value1;

  return updatedArray;
};
