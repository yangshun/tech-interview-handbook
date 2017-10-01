from collections import defaultdict
import math

math.inf = float('Inf') #avoid crashing with python2

# initialize weighted graph
dist = [
    [0,   1,   2, math.inf],
    [math.inf, math.inf, math.inf, 1],
    [math.inf, math.inf, 0,   2],
    [2, math.inf, math.inf,   0],
]
#data structure to store distance vector
path = defaultdict(defaultdict)
v = 4 #number of vertices, now it is 4
#floyd warshall
for i in range(v):
    for j in range(v):
        for k in range(v):
            # addon code to generate path
            # else it is just dist[j][k] = min(dist[j][k], dist[j][i] + dist[i][k])
            val = dist[j][i] + dist[i][k]
            if dist[j][k] > val:
                path[j][k] = i
                dist[j][k] = val
            else:
                try:
                    path[j][k]
                except:
                    if dist[j][k] != math.inf:
                        path[j][k] = k
            #end addon

# get shortest path's total weight
def getWeight(g_dist, src, dst):
    '''
    type g_dist : 2d Integer weight list
    type src    : Integer
    type dst    : Integer
    '''
    return g_dist[src][dst]
    

def getPath(g, src, dst):
    '''
        path generator
        type g   : defaultdict(defaultdict)
        type src : Integer
        type dst : Integer
    '''
    # pythonic checking of no path since it is a default dict with two level
    # It should throw error
    try:
        g[src][dst]
    except:
        return
    # starting node
    yield src
    # all other
    while src != dst:
        src = g[src][dst]
        yield src
    pass

# result
print(list(getPath(path, 1, 0)))
print(getWeight(dist, 1,0))
