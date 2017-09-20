# For mapping a lowercase character to a prime number.
# Useful for checking whether two strings are anagram or permutations of each other.
primes = {
    'a': 2, 'b': 3, 'c': 5, 'd': 7, 'e': 11, 'f': 13,
    'g': 17, 'h': 19, 'i': 23, 'j': 29, 'k': 31, 'l': 37,
    'm': 41, 'n': 43, 'o': 47, 'p': 53, 'q': 59, 'r': 61,
    's': 67, 't': 71, 'u': 73, 'v': 79, 'w': 83, 'x': 89,
    'y': 97, 'z': 101, ' ': 103,
}

import functools

def mul(seq):
    return functools.reduce(lambda a, b: a * b, seq, 1)

def prime_value_of_string(string):
    return mul([primes[c] for c in string])

print(prime_value_of_string('abcde'))
