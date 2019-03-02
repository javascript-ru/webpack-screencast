export function usefulUtil(...args) {
  console.log('Useful utils function was called with args:', ...args);
}

// this function should me marked as unused https://webpack.js.org/guides/tree-shaking/
export function uselessUtils(...args) {
  console.log('Useless utils function was called with args:', ...args);
}
