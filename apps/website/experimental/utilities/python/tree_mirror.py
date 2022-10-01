def tree_mirror(node):
    if not node:
        return
    node.left, node.right = node.right, node.left
    tree_mirror(node.left)
    tree_mirror(node.right)
