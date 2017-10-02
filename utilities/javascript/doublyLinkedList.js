/*
 * Doubly LinkedList with functionalities of 
   * add: Add node to list
   * contains: Check if the list contains a certain value (Not a strict object comparison)
   * getCurrentNode
   * toString(): Prints the LinkedList representation
   * next()
   * previous()
*/
class Node {
  constructor(_value) {
    this.value = _value;
    this.next = null;
    this.previous = null;
  }
  setNext(_next) {
    this.next = _next;
  }
  setPrevious(_previous) {
  	this.previous = _previous;
  }
}
class LinkedList {
  constructor() {
  	this.currentNode = null;
  	this.firstNode = null;
  	this.lastNode = null;
    for (let i = 0; i < arguments.length; i++) {
      this.add(arguments[i]);
    }
    // Update lastNode as currentNode after init.
    this.currentNode = this.lastNode;
  }
  add(element) {
    // Construct new node
    let newNode = new Node(element);
    // Update global list
    this.update(newNode);
    // Link up
    if (this.lastNode) {
      this.lastNode.setNext(newNode);
      newNode.setPrevious(this.lastNode);
    } else {
      // Is first node
      this.firstNode = newNode;
    }
    // Update currentNode
    this.lastNode = newNode;
  }
  contains(element) {
    if (this.globalList[element]) {
      return true;
    } else {
      return false;
    }
  }
  // Helper function to update global list
  update(newNode) {
    if (this.globalList) { // Has existing
      this.globalList[newNode.value] = true;
    } else {
      // Brand new
      this.globalList = {}
      this.globalList[newNode.value] = true;
    }
  }
  getCurrentNode() {
  	return this.currentNode;
  }
  next() {
  	if (this.currentNode.next) {
  		this.currentNode = this.currentNode.next;
  	} else {
  		console.log('Already at end of linked list'); // Optionally, go back to first element if we want a doubly-circular linkedlist
  	}
  }
  previous() {
  	if (this.currentNode.previous) {
  		this.currentNode = this.currentNode.previous;
  	} else {
  		console.log('Already at start of linked list'); // Optionally, go back to first element if we want a doubly-circular linkedlist
  	}
  }
  toString() {
  	var nodeToPrint = this.firstNode;
  	var linkedListString = String(nodeToPrint.value);
  	while(nodeToPrint.next) {
  		nodeToPrint = nodeToPrint.next;
  		linkedListString += "->";
  		linkedListString += String(nodeToPrint.value);
  	}
  	return linkedListString;
  }
}


/* Tests */
var list = new LinkedList(1,2,3); // New DoublyLinkedList constructed with value 1->2->3
console.log(list.toString()); // Prints '1->2->3'
list.contains(2); // returns true
list.contains(4); // returns false
console.log(list.currentNode.value); // Returns 3
list.previous(); // Pointer moves back by 1
console.log(list.currentNode.value); // Returns 2
list.next(); // Pointer moves forward by 1
console.log(list.currentNode.value); // Returns 3
list.next(); // Pointer moves forward by 1, but already at end of list. 'Already at end of linked list' logs to console.
list.previous(); // Pointer moves back by 1
list.previous(); // Pointer moves back by 1
console.log(list.currentNode.value); // Returns 1
list.previous(); // Pointer moves back by 1, but already at start of list. 'Already at start of linked list' logs to console.
list.add(4); // List is now 1->2->3->4
list.contains(4); // returns true
console.log(list.toString()); // Prints '1->2->3->4'
