## QuickSelect -- Linear-time k-th order statistic
## (i.e. select the k-th smallest element in an unsorted array)
## https://en.wikipedia.org/wiki/Quickselect

def partition(array, start, end, pivot):
    """Partitions by a pivot value, which might not necessarily be in the array.
    This variant is useful when you want to bound your recursion depth by the
    range of the input values, and not the length of the array."""
    pivot_index = start
    for i in range(start, end):
        if array[i] <= pivot:
            array[i], array[pivot_index] = array[pivot_index], array[i]
            pivot_index += 1
    return pivot_index

import random
def partition_first(array, start, end):
    """Selects the first element as pivot. Returns the index where the pivot went to.
    In this variant, we can guarantee that the pivot will be in its final sorted position.
    We need this guarantee for QuickSelect."""
    if start + 1 == end:
        return start
    pivot = array[start]
    pivot_index = start + 1
    for i in range(start + 1, end):
        if array[i] <= pivot:
            array[i], array[pivot_index] = array[pivot_index], array[i]
            pivot_index += 1
    # Move pivot to front
    array[start], array[pivot_index - 1] = array[pivot_index - 1], array[start]
    return pivot_index - 1

def quick_select(array, k):
    """NOTE: k-th smallest element counts from 0!"""
    left = 0
    right = len(array)
    while True:
        random_index = random.sample(range(left, right), 1)[0]
        array[left], array[random_index] = array[random_index], array[left]
        pivot_index = partition_first(array, left, right)
        if k == pivot_index:
            return array[pivot_index]
        if k < pivot_index:
            right = pivot_index
        else:
            left = pivot_index + 1



print(quick_select([0], 0) == 0)
print(quick_select([0, 1, 2, 3, 4], 2) == 2)
print(quick_select([4, 3, 2, 1, 0], 2) == 2)
print(quick_select([1, 3, 4, 2, 0], 2) == 2)

# Large test case, for randomized tests
lst = list(range(1000))
for _ in range(10):
    k = random.randint(0, 999)
    random.shuffle(lst)
    print(quick_select(lst, k) == k)
