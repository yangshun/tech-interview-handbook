function treeMirror(node) {
  if (!node) {
    return;
  }
  let temp = node.left;
  node.left = node.right;
  node.right = temp;
  treeMirror(node.left);
  treeMirror(node.right);
}
