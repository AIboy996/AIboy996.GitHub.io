---
tags:
- PyLib
- Leetcode
- 读源码
---

# bisect

> Array bisection algorithm

`bisect`是用纯Python[实现](https://github.com/python/cpython/tree/3.12/Lib/bisect.py)的**二分搜索**算法的封装。

在写算法题的时候，如果遇到了二分搜索的题目可以加速一下解题过程。

## api

`bisect`提供了如下api：

- bisect_left
- bisect_right
- bisect
- insort_left
- insort_right
- insort

### `bisect_left`

??? quote "bisect_left源代码"

    ```python
    def bisect_left(a, x, lo=0, hi=None, *, key=None):
        """Return the index where to insert item x in list a, assuming a is sorted.

        The return value i is such that all e in a[:i] have e < x, and all e in
        a[i:] have e >= x.  So if x already appears in the list, a.insert(i, x) will
        insert just before the leftmost x already there.

        Optional args lo (default 0) and hi (default len(a)) bound the
        slice of a to be searched.

        A custom key function can be supplied to customize the sort order.
        """

        if lo < 0:
            raise ValueError('lo must be non-negative')
        if hi is None:
            hi = len(a)
        # Note, the comparison uses "<" to match the
        # __lt__() logic in list.sort() and in heapq.
        if key is None:
            while lo < hi:
                mid = (lo + hi) // 2
                if a[mid] < x:
                    lo = mid + 1
                else:
                    hi = mid
        else:
            while lo < hi:
                mid = (lo + hi) // 2
                if key(a[mid]) < x:
                    lo = mid + 1
                else:
                    hi = mid
        return lo
    ```

函数签名：

- `bisect.bisect_right(a, x, lo=0, hi=len(a), *, key=None)`

其中a是一个**有序数组**，x是待插入的值，lo和hi分别是插入的index下限和上限。

默认情况下，`bisect_left`会返回一个index，它是保持数组有序的**可以插入的最左侧位置**。

!!! note
    如果x在a中，那么实际上返回的就是最左侧x的index。

例如：
```python
a = [2,4,4,5,6]
bisect_left(a,4) # 返回1
```

key参数是Python 3.10才引入的新特性，它允许我们对原始数组做一个变换，然后再和x进行比较，例如：

```python
a = [2,-4,4,-5,6]
bisect_left(a, 4, key=abs) # 还是返回1，key指明了我们只考虑绝对值
```

### `bisect_right`

`bisect_right`和`bisect_left`功能一致，但是它返回的是保持数组有序的**可以插入的最右侧位置**。

!!! note
    如果x已经在a中了，那么`bisect_right`返回的位置就是最右侧x的**index+1**。

    因为设计的时候考虑的是插入问题，我们尽可能保持原来的x不动。

    例如：

    ```python
    a = [2,4,4,5,6]
    bisect_right(a,4) # 返回3
    ```

### `bisect`

`bisect`是`bisect_right`的别名。

### `insort_left`

二分搜索+插入的封装。

!!! warning
    如果指定了key，那么insort_left会在搜索的时候对a和x同时施加变换：

    ```python
    lo = bisect_left(a, key(x), lo, hi, key=key)
    a.insert(lo, x)
    ```

??? quote "insort_left源代码"

    ```python
    def insort_left(a, x, lo=0, hi=None, *, key=None):
        """Insert item x in list a, and keep it sorted assuming a is sorted.

        If x is already in a, insert it to the left of the leftmost x.

        Optional args lo (default 0) and hi (default len(a)) bound the
        slice of a to be searched.

        A custom key function can be supplied to customize the sort order.
        """

        if key is None:
            lo = bisect_left(a, x, lo, hi)
        else:
            lo = bisect_left(a, key(x), lo, hi, key=key)
        a.insert(lo, x)
    ```

### `insort_right`

二分搜索+插入的封装。

??? quote "insort_right源代码"

    ```python
    def insort_right(a, x, lo=0, hi=None, *, key=None):
        """Insert item x in list a, and keep it sorted assuming a is sorted.

        If x is already in a, insert it to the right of the rightmost x.

        Optional args lo (default 0) and hi (default len(a)) bound the
        slice of a to be searched.

        A custom key function can be supplied to customize the sort order.
        """
        if key is None:
            lo = bisect_right(a, x, lo, hi)
        else:
            lo = bisect_right(a, key(x), lo, hi, key=key)
        a.insert(lo, x)
    ```

### `insort`

`insort`是`insort_right`的别名。

## 实战

### [Leetcode 287: 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number)

!!! quote "题目"
    给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。

    - 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
    - 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

可以考虑前缀数组：`pre[i]`，它的含义是`nums`中**有多少个数字小于等于`i`**。

不难发现前缀数组一定是**非降的**（换言之是个排序好的数组，可以二分查找），并且如果前缀数组`pre[i] > i`，就说明我们要找的重复数字小于等于`i`。

??? question "为啥"
    `pre[i]`的含义是`nums`中小于等于`i`的数字个数，如果这个个数比`i`大，那肯定存在重复数字（换言之我们找到了nums中重复数字的条件：它一定小于等于`i`）。
    
    这是因为小于等于`i`的正整数一共就`i`个，从而根据抽屉原理可以得出上述结论。

例如数组`nums=[1,2,4,2,2,5]`，我们定义的前缀数组是`pre=[0,1,4,4,5,6]`，检查条件`pre[i] > i`得到：`[False, False, True, True, True, True]`。

而后我们只需要找到第一个`True`的位置即可。这就刚好可以使用我们的`bisect_left`函数：

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        from bisect import bisect_left
        def f(i):
            """计算前缀数组"""
            return sum(v<=i for v in nums) > i
        return bisect_left(range(len(nums)), True, key=f)
```

### [Leetcode 33: 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array)

!!! quote "题目"
    起初，整数数组 `nums` 按升序排列，数组中的值**互不相同**。后来，数组经过了若干次旋转。每次旋转都会把数组第一个值移动到最后一个。

    例如：`[0,1,2,4,5,6,7]`旋转三次变成`[4,5,6,7,0,1,2]`。

    给你 旋转后 的数组 `nums` 和一个整数 `target` ，如果 `nums` 中存在这个目标值 `target` ，则返回它的下标，否则返回 -1 。

    你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。

**旋转数组**这类题目都是经典的二分搜索题：

- 初始化`l=0, r=len(nums)-1, mid=(l+r)//2`
- 如果`nums[l]<nums[mid]`，说明此时左侧区间是单调的，右侧区间是一个旋转数组。简单判断就可以知道`target`是在左侧还是右侧，然后继续二分即可
- 否则，右侧区间单调，同样继续二分即可

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l = 0
        r = len(nums) - 1
        while True:
            mid = (l + r) // 2
            if mid == l:
                break
            if nums[mid] > nums[l]:  # 说明左侧是有序的
                if nums[l] <= target <= nums[mid]:
                    l, r = l, mid
                else:
                    l, r = mid + 1, r
            else:  # 右侧是有序的
                if nums[mid] <= target <= nums[r]:
                    l, r = mid, r
                else:
                    l, r = l, mid - 1
        # 最终不确定落在左还是右
        if target==nums[l]:
            return l
        elif target==nums[r]:
            return r
        else:
            return -1
```

??? quote "小优化"
    加一点改动可以让答案一定落在left：

    ```python hl_lines="7 13 14 16"
    class Solution:
        def search(self, nums: List[int], target: int) -> int:
            l = 0
            r = len(nums) - 1
            while l < r:
                mid = (l + r) // 2
                if nums[mid] >= nums[0]:  # 说明左侧是有序的
                    if nums[l] <= target <= nums[mid]:
                        r = mid
                    else:
                        l = mid+1
                else:  # 右侧是有序的
                    if nums[mid] < target <= nums[-1]:
                        l = mid+1
                    else:
                        r = mid
            # 最终一定落在left
            return l if target==nums[l] else -1
    ```

    不过我感觉加了这些改动代码反而变得更难读了。

这题倒是不太好直接用`bisect`来简化了～ 二分搜索的经典写法还是得掌握，不能过分依赖标准库。
