def tree_equal(node1, node2):
    if not node1 and not node2:
        return True
    if not node1 or not node2:
        return False
    return node1.val == node2.val and \
        tree_equal(node1.left, node2.left) and \
        tree_equal(node1.right, node2.right)
