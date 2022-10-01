## Rabin-Karp Rolling Hash
## Implementation of: https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm#Hash_function_used
##
## This rolling hash function is useful when you need to compute the hash of successive substrings
## of text. E.g. note that going from 'abcd' to 'bcde', we drop the 'a' from the back and add an 'e'
## on the right. The rolling hash function thus allows us to update the hash in-place O(1) instead of
## recomputing the full hash of the substring O(m), where m is the length of the substring.
##
## NOTE: The implementation below takes in a tuple of integers, to be as general as possible. For use
## with strings, simply take the ASCII value of each character before passing into the functions.

BASE = 101  # Arbitrary prime number

def rk_hash_init(tpl):
    '''Initializes the hash with a tuple of integers.'''
    return sum(n * BASE ** i for i, n in enumerate(reversed(tpl)))

def rk_hash_update(curr_hash, size, add_n, rem_n):
    '''Updates the hash by removing an integer from the left and appending
    an integer to the right.

    curr_hash: The previous hash
    size: The size of the rolling window
    add_n: The integer appended to the right
    rem_n: The integer removed from the left'''
    return (curr_hash - (rem_n * BASE ** (size - 1))) * BASE + add_n



abc_hash = rk_hash_init(tuple(map(ord, 'abc')))     # Init the hash with 'abc'
print('abc:', abc_hash)
bcd_hash_1 = rk_hash_update(abc_hash, 3, ord('d'), ord('a'))    # Add a 'd' to the right, remove an 'a' from the left
print('bcd 1:', bcd_hash_1)

zbc_hash = rk_hash_init(tuple(map(ord, 'zbc')))     # Init the hash with 'zbc'
print('zbc:', zbc_hash)
bcd_hash_2 = rk_hash_update(zbc_hash, 3, ord('d'), ord('z'))    # Add a 'd' to the right, remove a 'z' from the left
print('bcd 2:', bcd_hash_2)

# Notice that both hash values are the same despite arriving via different paths
print(bcd_hash_1 == bcd_hash_2)
