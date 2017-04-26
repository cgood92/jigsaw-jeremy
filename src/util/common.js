export const combineClasses = (...args) => args.filter(val => val).join(' ')
export const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min
