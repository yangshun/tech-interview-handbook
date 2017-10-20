# Implements a min-heap. For max-heap, simply reverse all comparison orders.
#
# Note on alternate subroutine namings (used in some textbooks):
#     - _bubble_up = siftdown
#     - _bubble_down = siftup

def _bubble_up(heap, i):
    while i > 0:
        parent_i = (i - 1) // 2
        if heap[i] < heap[parent_i]:
            heap[i], heap[parent_i] = heap[parent_i], heap[i]
            i = parent_i
            continue
        break

def _bubble_down(heap, i):
    startpos = i
    newitem = heap[i]
    left_i = 2 * i + 1
    while left_i < len(heap):
        # Pick the smaller of the L and R children
        right_i = left_i + 1
        if right_i < len(heap) and not heap[left_i] < heap[right_i]:
            child_i = right_i
        else:
            child_i = left_i

        # Break if heap invariant satisfied
        if heap[i] < heap[child_i]:
            break
        
        # Move the smaller child up.
        heap[i], heap[child_i] = heap[child_i], heap[i]
        i = child_i
        left_i = 2 * i + 1

def heapify(lst):
    for i in reversed(range(len(lst) // 2)):
        _bubble_down(lst, i)

def heappush(heap, item):
    heap.append(item)
    _bubble_up(heap, len(heap) - 1)

def heappop(heap):
    if len(heap) == 1:
        return heap.pop()
    min_value = heap[0]
    heap[0] = heap[-1]
    del heap[-1]
    _bubble_down(heap, 0)
    return min_value
