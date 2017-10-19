def binary_search(arr, target):
    left = 0;
    right = len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2;
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

def bisect_left(arr, target):
    """Returns the leftmost position that `target` should
    go to such that the sequence remains sorted."""
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left

def bisect_right(arr, target):
    """Returns the rightmost position that `target` should
    go to such that the sequence remains sorted."""
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] > target:
            right = mid
        else:
            left = mid + 1
    return left

print(binary_search([1, 2, 3, 10], 1) == 0)
print(binary_search([1, 2, 3, 10], 2) == 1)
print(binary_search([1, 2, 3, 10], 3) == 2)
print(binary_search([1, 2, 3, 10], 10) == 3)
print(binary_search([1, 2, 3, 10], 9) == -1)
print(binary_search([1, 2, 3, 10], 4) == -1)
print(binary_search([1, 2, 3, 10], 0) == -1)
print(binary_search([1, 2, 3, 10], 11) == -1)
print(binary_search([5, 7, 8, 10], 3) == -1)
