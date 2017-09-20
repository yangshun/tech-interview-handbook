class Trie(object):
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.d = {}

    def insert(self, word):
        """
        Inserts a word into the trie.
        :type word: str
        :rtype: void
        """
        curr = self.d
        for char in word:
            if char not in curr:
                curr[char] = {}
            curr = curr[char]
        curr['#'] = {} # Using an empty dict rather than a boolean value makes recursive traversal easier.

    def search(self, word):
        """
        Returns if the word is in the trie.
        :type word: str
        :rtype: bool
        """
        curr = self.d
        for char in word:
            if char in curr:
                curr = curr[char]
            else:
                return False
        return '#' in curr

    def startsWith(self, prefix):
        """
        Returns if there is any word in the trie that starts with the given prefix.
        :type prefix: str
        :rtype: bool
        """
        curr = self.d
        for char in prefix:
            if char in curr:
                curr = curr[char]
            else:
                return False
        return True

    def searchRegex(self, word):
        """
        Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
        :type word: str
        :rtype: bool
        """
        def traverse(node, index):
            if len(word) == index:
                return '#' in node
            char = word[index]
            if char == '.':
                for key in node.keys():
                    if traverse(node[key], index+1):
                        return True
                return False
            else:
                if char not in node:
                    return False
                return traverse(node[char], index + 1)
        return traverse(self.d, 0)

# Example
trie = Trie()
trie.insert('hello')
print(trie.search('hello') == True)
print(trie.startsWith('hello') == True)
print(trie.startsWith('hel') == True)
print(trie.search('world') == False)
print(trie.startsWith('wor') == False)
print(trie.searchRegex('..llo') == True)
print(trie.searchRegex('..llx') == False)
print(trie.searchRegex('..') == False)
