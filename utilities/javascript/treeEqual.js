function treeEqual(node1, node2) {
  if (!node1 && !node2) {
    return true;
  }
  if (!node1 || !node2) {
    return false;
  }
  return (
    node1.val == node2.val &&
    treeEqual(node1.left, node2.left) &&
    treeEqual(node1.right, node2.right)
  );
}
