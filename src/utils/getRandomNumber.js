/**
 * Generate random number within a given range
 * @param minimum - start range
 * @param maximum - end range
 * @returns {number} - return random number
 */
const getRandomNumber = (minimum = 0, maximum = 1024) => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default getRandomNumber;
