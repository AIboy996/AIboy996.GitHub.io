"""
这里写一个python版的、文字版2048
"""

import os
import numpy as np
from copy import deepcopy

class Game:
    def __init__(self):
        """
        当创建一个游戏对象的时候初始化数据
        """
        # 矩阵
        self.data = np.zeros(shape=(4,4))
        # 游戏是否结束
        self.over = False

    @staticmethod
    def randomdelta(arr_raw):
        """
        选择为零的位置随机生成2
        """
        arr = deepcopy(arr_raw).reshape((16,))
        candidate = np.where(arr==0)[0]
        if candidate.size >= 2:
            # 等概率不放回抽两个为零的位置
            choices = np.random.choice(candidate, 2, replace=False)
        elif candidate.size ==1:
            # 若只有一个为0的位置，就直接赋值为2
            choices = candidate
        else:
            # 若没有为0的位置，说明没有移动成功
            print("You can't shift in this direction!")
            return arr.reshape((4,4))
        # 这里即使只剩下一个空位，也会正确赋值！！
        # arr多个相同的key赋值arr[[2,2],1]=1 相当于arr[2,1]=1
        arr[choices] = 2
        return arr.reshape((4,4))

    @staticmethod
    def shift(arr_raw):
        """
        游戏的核心算法函数——双指针
        """
        # 不要原地修改
        arr = deepcopy(arr_raw)
        head = 0 # 写指针
        tail = 1 # 读指针
        while tail < len(arr):
            # tail指向0，则tail ++，并且进入下一次循环
            if arr[tail] == 0:
                tail += 1
                continue
            # 此时tail一定指向非0
            if arr[head] == 0:
                arr[head] = arr[tail]
                arr[tail] = 0
                tail += 1
            elif arr[head] == arr[tail]:
                arr[head] *= 2
                arr[tail] = 0
                head += 1
                tail += 1
            else:
                head += 1
                if head == tail:
                    tail += 1
        return arr

    @staticmethod
    def test():
        """
        用于测试shift函数
        """
        cases = [
        [[2,2,2,2],[4,4,0,0]],
        [[0,0,0,0],[0,0,0,0]],
        [[2,0,2,0],[4,0,0,0]],
        [[0,0,2,2],[4,0,0,0]],
        [[2,0,4,2],[2,4,2,0]],
        [[2,4,8,16],[2,4,8,16]],
        [[2,0,4,8],[2,4,8,0]],
        [[2,0,4,4],[2,8,0,0]],
        [[2,0,0,2],[4,0,0,0]]
        ]
        errorflag = False
        for arr, result in cases:
            arr_raw = arr
            arr = Game.shift(arr)
            if  arr!= result:
                errorflag = True
                print("Error!")
                print(f"raw:{arr_raw}result:{arr}target:{result}")
        if not errorflag:
            print("All cases passed!")

    def cat(self):
        """
        输出游戏内容
        """
        # os.system("clear")
        print(f"Your score is {self.data.sum():n} now!")
        for row in self.data:
            print('  ',end='')
            print(' \t'.join(map(lambda x:str(int(x)), row)),end='\n\n')
    
    @staticmethod
    def trans(arr, command):
        """
        处理一个command
        """
        arr_raw = arr.copy()
        if command == 'a':
            # 左滑动最简单，直接使用shift函数
            res = np.array([Game.shift(arr[i,]) for i in range(4)])
        elif command == 'd':
            # 右滑动，先反转列，然后再重复a
            arr = arr[:,::-1]
            res = np.array([Game.shift(arr[i,]) for i in range(4)])[:,::-1]
        elif command == 'w':
            # 上滑动，每一列做shift，然后再转置
            res = np.array([Game.shift(arr[:,i]) for i in range(4)]).T
        elif command == 's':
            # 下滑动，先反转行，然后再重复w
            arr = arr[::-1,:]
            res = np.array([Game.shift(arr[:,i]) for i in range(4)]).T[::-1,:]
        return res, (res==arr_raw).sum()==16 # 是否一样的地方有16个（也就是trans失败

    def play(self):
        """
        游戏循环的逻辑
        """
        # 初始化
        self.data = self.randomdelta(self.data)
        # 输出最初的界面
        self.cat()
        # 只要游戏没结束
        while not self.over:
            # 然后根据用户的输入进行变换
            command = input('wasd?')
            if command =='q':
                break
            while command not in ['w','a','s','d','q']:
                print('invalid command')
                command = input('wasd?')
            # 对数据进行变换
            self.data, nontrans = self.trans(self.data, command)
            # 出现不能动的情况
            if nontrans:
                # 就判断所有方向是否能动
                wtrans = self.trans(self.data, 'w')[1]
                atrans = self.trans(self.data, 'a')[1]
                strans = self.trans(self.data, 's')[1]
                dtrans = self.trans(self.data, 'd')[1]
                print(f"w:{wtrans}, a:{atrans}, s:{strans}, d:{dtrans}")
                if all([wtrans, atrans, strans, dtrans]):
                    print("Game Over!!")
                    break
            # 同时生成新的2
            self.data = self.randomdelta(self.data)
            # 调用cat函数，把当前的内容输出
            self.cat()
        else:
            print("You have failed, press 'NG' for a new game!")

# shift函数测试
# Game.test()

# randomdelta函数测试
# x = np.array([[1]*4,[1]*4,[1]*4,[1,0,1,0]])
# print(Game.randomdelta(x))
# # 测试单个0能否正常生成2
# print(Game.randomdelta(np.array([[1]*4,[1]*4,[1]*4,[1,0,1,1]])))

# trans函数测试
# x = np.array([
#     [0,2,0,0],
#     [0,0,0,0],
#     [0,0,2,0],
#     [2,2,0,0]
# ])
# print(x)
# print(*Game.trans(x,'s'))


# 开始游戏
game = Game()
# game.cat()
game.play()
