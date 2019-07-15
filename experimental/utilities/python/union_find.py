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



# Start with all elements separate
# -> [0], [1], [2], [3], [4], [5], [6]
print(find_root(parents, 2) == 2)

# Merge 1, 2, 3 and 4, 5, 6
# -> [0], [1, 2, 3], [4, 5, 6]
union(parents, 1, 2)
union(parents, 2, 3)
union(parents, 4, 5)
union(parents, 4, 6)

# Roots of 1, 2, 3 and 4, 5, 6 are the same
print(find_root(parents, 0))
print(list(find_root(parents, i) for i in (1, 2, 3)))
print(list(find_root(parents, i) for i in (4, 5, 6)))

# Merge 2, 4
# -> [0], [1, 2, 3, 4, 5, 6]
union(parents, 2, 4)
print(list(find_root(parents, i) for i in (1, 2, 3, 4, 5, 6)))
