---
tags:
- PyLib
- Leetcode
---

# heapq

> Heap queue algorithm

`heapq`是用纯Python[实现](https://github.com/python/cpython/tree/3.12/Lib/heapq.py)的**优先队列**（也叫堆队列）算法的封装。

!!! deepseek-summary "优先队列的简短介绍"
    优先队列是一种特殊的队列，其中的元素按照**优先级出队**，而非先进先出。通常用**堆**（如二叉堆）实现，支持高效插入和删除最高（或最低）优先级元素。  

    **核心操作**：  
    1. 插入（push）：添加元素并调整结构。  
    2. 删除（pop）：移除优先级最高/最低的元素。  

    **时间复杂度**（以二叉堆为例）：  
    - 插入和删除：O(log n)  
    - 查看队首：O(1)  

    **应用场景**：任务调度、Dijkstra算法、哈夫曼编码等。  

    **特点**：优先级可自定义（如数值大小、任务紧急程度），灵活性高。

`heapq`提供下面的api：

- `heapify`
- `merge`
- `heappop`
- `heappush`
- `heappushpop`
- `heapreplace`
- `nlargest`
- `nsmallest`

## 创建

### heapify

把一个列表传入`heapify`即可创建一个优先队列：

> “创建优先队列”只是一个**逻辑概念**，本质上数据还是存在一个列表里。只不过顺序会按照二叉堆的方式来安排。

```python
l = [1, 2, 3, 1, 4]
heapify(l)
print(l) # [1,1,3,2,4]，注意这个顺序！
```

> `heapify`会原地修改列表，构建的时间复杂度为`O(n)`

### merge

`merge`可以合并多个有序的可迭代对象：

```python
a = [1,3,5]
b = [1,2,3,4,6]
l = merge(a,b)
print(list(l)) # [1, 1, 2, 3, 3, 4, 5, 6]
```

## 使用

### heappop

`heappop`会弹出当前队列中最小的元素。例如：

```python
heappop([1,1,3,2,4]) # 弹出 1
```

!!! warning
    这个函数不会检查列表是否真的是优先队列。

    ```python
    heappop([3, 2, 4]) # 会弹出3
    ```

    因此，我们需要自己确保传入的列表是由heapq构建的优先队列。千万不要手动修改创建好的优先队列。

### heappush

`heappush`可以把一个元素添加到队列中。

```python
l = [1,1,3,2,4]
heappush(l, 2)
print(l) # [1,1,2,2,4,3]，依然注意这个顺序！
```

### heappushpop

等价于先`heappush`再`heappop`，但是效率更高。

### heapreplace

等价于先`heappop`再`heappush`，但是效率更高。

### nlargest, nsmallest

返回最大或者最小的n个元素。

!!! warning
    The latter two functions perform best for smaller values of n. For larger values, it is more efficient to use the sorted() function. Also, when n==1, it is more efficient to use the built-in min() and max() functions. If repeated usage of these functions is required, consider turning the iterable into an actual heap.

    这俩函数在**n比较大的时候性能不行**。

    源代码里给了一些分析：

    ```text
    # Measured performance for random inputs:
    #
    #                                   number of comparisons
    #    n inputs     k-extreme values  (average of 5 trials)   % more than min()
    # -------------   ----------------  ---------------------   -----------------
    #      1,000           100                  3,317               231.7%
    #     10,000           100                 14,046                40.5%
    #    100,000           100                105,749                 5.7%
    #  1,000,000           100              1,007,751                 0.8%
    # 10,000,000           100             10,009,401                 0.1%
    ```

## 实战

### [Leetcode 787: K站中转内最便宜的航班](https://leetcode.cn/problems/cheapest-flights-within-k-stops/description/)

!!! quote "题目"
    给定城市之间的航班中转图`flights`，问从`src`到`dst`，在至多中转`k`次的情况下，最便宜的航线是什么样的。

Dijkstra算法是优先队列一个经典的应用：

```python
import collections
import heapq

class Solution(object):
    def findCheapestPrice(self, n, flights, src, dst, K):
        # 构建邻接矩阵
        graph = collections.defaultdict(dict)
        for u, v, w in flights:
            graph[u][v] = w

        best = {} # 记录已经找到的最佳中转
        pq = [(0, 0, src)] # 距离（累计价格），中转次数，站点
        while pq:
            cost, k, place = heapq.heappop(pq)
            if k > K+1 or cost > best.get((k, place), float('inf')):
                continue
            if place == dst:
                return cost
            for nei, wt in graph[place].iteritems():
                newcost = cost + wt
                if newcost < best.get((k+1, nei), float('inf')): # 剪枝
                    # 把邻居都放到队列里，以便后续遍历
                    heapq.heappush(pq, (newcost, k+1, nei))
                    best[k+1, nei] = newcost
        return -1
```

### [Leetcode 407: 接雨水2](https://leetcode.cn/problems/trapping-rain-water-ii)

[接雨水1](https://leetcode.cn/problems/trapping-rain-water)的进阶版：

!!! quote "题目"
    给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。

    例如:

    ```python
    3, 3, 3, 3, 3
    3, 2, 2, 2, 3
    3, 2, 1, 2, 3
    3, 2, 2, 2, 3
    3, 3, 3, 3, 3
    ```

    最外层肯定不能接水，我们考虑倒数第二层：

    ```python
    2, 2, 2
    2, 1, 2
    2, 2, 2
    ```

    每一个都可以接1单位的水，我们记录下这些并且把最高的高度传递到内层：
    ```python
    3, 3, 3
    3, 1, 3
    3, 3, 3
    ```
    可以看到，最内层可以接2单位的水。综上，共计可以接10单位的水。

不难发现，一个柱子可以接多少水仅仅和它上下左右（`t, d, l, r`）**四个方向的最大高度**有关系：

```text
? t ?
l x r
? d ?
```

于是我们只需要从边界开始，按照高度低的优先队列来遍历所有的柱子，并且在遍历的过程中**传递最大高度**即可。

```python
from heapq import heappush, heappop
from itertools import pairwise
class Solution:
    def trapRainWater(self, heightMap: List[List[int]]) -> int:
        m, n = len(heightMap), len(heightMap[0])
        vis = [[False] * n for _ in range(m)]
        # 先把边界上的柱子都加入队列
        pq = []
        for i in range(m):
            for j in range(n):
                if i == 0 or i == m - 1 or j == 0 or j == n - 1:
                    heappush(pq, (heightMap[i][j], i, j)) # 高度，坐标
                    vis[i][j] = True
        ans = 0
        dirs = (-1, 0, 1, 0, -1)
        while pq:
            h, i, j = heappop(pq)
            for a, b in pairwise(dirs): 
                # 其实就是遍历上下左右四个柱子
                # [(-1, 0), (0, 1), (1, 0), (0, -1)]
                x, y = i + a, j + b
                if x >= 0 and x < m and y >= 0 and y < n and not vis[x][y]:
                    ans += max(0, h - heightMap[x][y])
                    vis[x][y] = True
                    # 把外层的最高值传递到内层
                    heappush(pq, (max(h, heightMap[x][y]), x, y))
        return ans
```
