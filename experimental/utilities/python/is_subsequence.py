def is_subsequence(s, t):
    """
    :type s: str
    :type t: str
    :rtype: bool
    """
    if len(s) > len(t):
        return False
    matched_s = 0
    for char in t:
        if matched_s < len(s) and s[matched_s] == char:
            matched_s += 1
    return matched_s == len(s)
