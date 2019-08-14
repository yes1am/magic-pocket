export default function contains (root, n) {
  // let node = n;
  while (n) {
    if (n === root) {
      return true
    }
    n = n.parentNode
  }
  return false
}
