## Union-Find data structure
## https://en.wikipedia.org/wiki/Disjoint-set_data_structure

parents = [0, 1, 2, 3, 4, 5, 6] # parent[i] is the parent of i
weights = [1, 1, 1, 1, 1, 1, 1]

def find_root(parents, p):
    '''Average: O(log n)'''
    root = p
    while parents[root] != root:
        root = parents[root]
    # Flatten tree
    while parents[p] != p:
        parents[p], p = root, parents[p]
    return root

def union(parents, p, q):
    '''Average: O(log n)'''
    p = find_root(parents, p)
    q = find_root(parents, q)
    # Link the smaller node to the larger node
    if weights[p] > weights[q]:
        parents[q] = p
        weights[p] += weights[q]
    else:
        parents[p] = q
        weights[q] += weights[p]
