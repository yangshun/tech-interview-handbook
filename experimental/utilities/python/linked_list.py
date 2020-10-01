# Singly-Linked List
#
# The linked list is passed around as a variable pointing to the
# root node of the linked list, or None if the list is empty.

class LinkedListNode:
    def __init__(self, value):
        self.value = value
        self.next = None

def linked_list_append(linked_list, value):
    '''Appends a value to the end of the linked list'''
    node = linked_list
    insert_node = LinkedListNode(value)
    if not node:
        return insert_node
    while node.next:
        node = node.next
    node.next = insert_node
    return linked_list

def linked_list_insert_index(linked_list, value, index):
    '''Inserts a value at a particular index'''
    node = linked_list
    insert_node = LinkedListNode(value)
    
    # Check if inserting at head
    if index == 0:
        insert_node.next = node
        return insert_node

    # Skip ahead
    for _ in range(index - 1):
        node = node.next
        if not node:
            raise ValueError
    insert_node.next = node.next
    node.next = insert_node
    return linked_list

def linked_list_delete(linked_list, value):
    '''Deletes the first occurrence of a value in the linked list'''
    node = linked_list
    
    # Check if deleting at head
    if node.value == value:
        return node.next

    # Skip ahead
    while node.next:
        if node.next.value == value:
            node.next = node.next.next
            return linked_list
        node = node.next
    raise ValueError

def linked_list_delete_index(linked_list, index):
    '''Deletes the element at a particular index in the linked list'''
    node = linked_list
    
    # Check if deleting at head
    if index == 0:
        return node.next

    # Skip ahead
    for _ in range(index - 1):
        node = node.next
        if not node:
            raise ValueError
    if not node.next:
        raise ValueError
    node.next = node.next.next
    return linked_list

def linked_list_iter(linked_list):
    '''Lazy iterator over each node in the linked list'''
    node = linked_list
    while node is not None:
        yield node
        node = node.next


# Append to back
linked_list = None    # Start with an empty linked list
linked_list = linked_list_append(linked_list, 1)
linked_list = linked_list_append(linked_list, 2)
linked_list = linked_list_append(linked_list, 4)
print([node.value for node in linked_list_iter(linked_list)])

# Insert by index
linked_list = linked_list_insert_index(linked_list, 0, 0) # Front
print([node.value for node in linked_list_iter(linked_list)])
linked_list = linked_list_insert_index(linked_list, 3, 3) # Back
print([node.value for node in linked_list_iter(linked_list)])

# Delete "3"
linked_list = linked_list_delete(linked_list, 3)
print([node.value for node in linked_list_iter(linked_list)])

# Delete by index
linked_list = linked_list_delete_index(linked_list, 0)
print([node.value for node in linked_list_iter(linked_list)])
linked_list = linked_list_delete_index(linked_list, 1)
print([node.value for node in linked_list_iter(linked_list)])

# Delete until empty
linked_list = linked_list_delete_index(linked_list, 0)
linked_list = linked_list_delete_index(linked_list, 0)
print([node.value for node in linked_list_iter(linked_list)])
