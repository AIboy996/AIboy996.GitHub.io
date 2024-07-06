---
tags:
- 数论
- 加密
include:
- math
---

# 同余理论

## 同余

### 定义
我们首先给出同余的定义：

!!! definition "同余"
    设$m\ne 0$，如果$m\mid a-b$，则称$a$同余于$b$模$m$。记作：
    $$
    a \equiv b \pmod m
    $$
    其中$m$称为模，$b$称为$a$对模$m$对剩余。

    实际上
    $$
    a \equiv b \pmod m \iff a \equiv b \pmod {-m}
    $$
    所以我们总假设模$m$是正整数。

同余一词可以解释为“余数相同”，也就是下述定理：

!!! theorem "同余的充要条件"
    对于整数$a,b$，分别做带余除法：
    $$
    a = q_1m+r_1,\quad b =q_2m+r_2
    $$
    其中$0\le r_1 \lt m, \quad 0\le r_2 \lt m$
    那么
    $$
    a \equiv b \pmod m \iff r_1=r_2
    $$

### 性质
同余有以下性质：

1. 同余是等价关系，满足：
    - 自反性：$a\equiv a \pmod m$
    - 对称性：$a \equiv b \pmod m \iff b\equiv a \pmod m$
    - 传递性：$a \equiv b \pmod m ,\quad  b \equiv c \pmod m  \implies a\equiv c \pmod m$
2. 和加法相容：$a \equiv b \pmod m ,\quad  c \equiv d \pmod m \implies a+c\equiv b+d \pmod m$
3. 和乘法相容：$a \equiv b \pmod m ,\quad  c \equiv d \pmod m \implies ac\equiv bd \pmod m$
4. 如果$f(x) = a_nx^n+\cdots+a_0$和$g(x) = b_nx^n+\cdots+b_0$是两个整系数多项式，系数满足
    $$
    a_i \equiv b_i \pmod m \quad 0\le i \le n
    $$
    这时候我们称，这两个多项式是**对模$m$同余的**，记作
    $$
    f(x)\equiv g(x) \pmod m
    $$
    那么显然有
    $$
    a\equiv b \pmod m \implies f(a)\equiv g(b) \pmod m
    $$
    特别的（下式也称为恒等同余式）：
    $$
    f(x)\equiv g(x) \pmod m \quad \forall x \in \mathbb{Z}
    $$
    满足上式的两个多项式称**对模$m$同余等价**。

    注意，两个多项式对模$m$同余等价（任意取值同余）并不一定同余（对应系数同余），反之一定成立。

5. $a\equiv b \pmod m, \quad d\mid m \implies a\equiv b \pmod d$
6. $d\ne0$那么$a\equiv b \pmod m \iff da\equiv db \pmod {|d|m}$
7. $ca \equiv cb \pmod m \iff a\equiv b \pmod {m/(c,m)}$
8. 如果$m\ge 1,\quad (a,m)=1$那么存在$c$，使得
    $$ac\equiv 1 \pmod m$$
    其中的$c$称为对模$m$的**逆元**，记作$c = a^{-1}$。注意，$a^{-1}$是整数，而非$a$的倒数。

    注意到
    $$
    (a,m)=1 \iff \exists x,y\quad xa+ym = 1 
    $$
    这个性质立即得证。此外容易证明：$(a^{-1},m)=1$以及$(a^{-1})^{-1}\equiv a \pmod m$

9. 同余式组$a \equiv b \pmod {m_j} \quad j=1,2,\cdots, k \iff a\equiv b \pmod {[m_1,\cdots,m_k]}$

### 一例

求$1978$对模$25$的**指数**，也即求最小的正整数$k$使得$25\mid 1978^k-1$。

首先我们知道
$$
1978 \equiv 3 \pmod 5
$$
所以
$$
1978^4 \equiv 3^4 \equiv 1 \pmod 5
$$

所以$1978$对模$5$的指数是$4$，那么
$$
5 \mid 1978^k-1 \implies 4\mid k
$$
而
$$
25 \mid 1978^k -1 \implies 5 \mid 1978^k-1
$$
所以$4\mid k$。

其次，我们知道
$$
1978 \equiv 3 \pmod {25}
$$
只需要寻找3的$4m$次方除25余1即可。

实际上
$$
\begin{aligned}
&3^4 \equiv 6 \pmod {25}\\\\
&3^8 \equiv 6^2 \equiv 11 \pmod {25}\\\\
&3^{12} \equiv 6\cdot 11 \equiv 16 \pmod {25}\\\\
&3^{16} \equiv 11^2 \equiv 21 \pmod {25}\\\\
&3^{20} \equiv 11\cdot 16 \equiv 1 \pmod {25}\\\\
\end{aligned}
$$
于是我们知道：
$$
1978^{20} \equiv 1 \pmod {25}
$$
求$1978$对模$25$的指数就是20.

## 同余类
从同余的概念出发，我们可以定义：

!!! definition "同余类"
    定义集合：
    $$
    r \bmod m = \\{n: n\equiv r \pmod m \quad \forall n\in \mathbb{Z}\\}
    $$
    这个集合就称为$r$所属的模$m$同余类（或称剩余系）

    显然有等价定义：
    $$
    r \bmod m = \\{n: n = mk+r \quad \forall k\in \mathbb{Z}\\}
    $$

    很多时候我们也用记号：
    $$
    r + m \mathbb{Z}
    $$
    来代表同余类。

同余类是对整数集合的一个**拆分**，不同的同余类之间互不相交：
$$
r \not\equiv s \pmod m \iff r \bmod m \cap s \bmod m = \emptyset
$$
当然还有：
$$
r \equiv s \pmod m \iff r \bmod m = s \bmod m
$$

给定模$m$，共有$m$个互不相交的同余类：
$$
0 \bmod m, 1\bmod m, \cdots , (m-1) \bmod m
$$
这些**同余类的集合**记作：
$$
\mathbb{Z}/m\mathbb{Z} = \mathbb{Z}_m = \\{j\bmod m : 0\le j \le m-1\\}
$$
(这是集合的集合！)

### 完全剩余系

特别的，我们定义：

!!! definition "完全剩余系"
    一组数$y_1,y_2\cdots, y_s$称为模$m$的完全剩余系，如果对于任意的$a$，有且仅有一个$j$使得
    $$
    y_j \equiv a \pmod m
    $$

    容易验证，这个定义要求$y_i \not \equiv y_j \pmod m \quad \forall i\ne j$

显然$0,1,2,\cdots,m-1$是一个完全剩余系。

对任意的$m$个整数$k_1,k_2\cdots,k_m$，都有$r+k_rm\quad r=0,1,2,\cdots,m-1$是完全剩余系。

如果模之间有整除关系，那么他们的同余类有如下关系：

!!! theorem
    如果$m_1 \mid m$那么对于$d = m/m_1$的任何一组完全剩余系$l_j,\quad j=1,2,\cdots,d$都有
    $$
    r+ m_1 \mathbb{Z} = \bigcup_{j=1}^d (r+l_jm_1+m\mathbb{Z})
    $$

    推论：

    $$
    r+ m\mathbb{Z} \subset r+m_1\mathbb{Z}
    $$

证明：

$$
\begin{aligned}
r + m_1\mathbb{Z} = r+m_1 \bigcup_{l\bmod d} (l+d\mathbb{Z})=\bigcup_{l\bmod d}(r+m_1l+dm_1\mathbb{Z})
\end{aligned}
$$

推论：
由完全剩余系的定义，$l_j$中一定存在$l\equiv 0 \pmod d$，那么存在$s$使得$lm_1 = sdm_1 = sm$
$$
r+lm_1+m\mathbb{Z} \subset r+ m_1 \mathbb{Z}
$$
可以写成
$$
r+sm+m\mathbb{Z} \subset r+ m_1 \mathbb{Z}
$$
也就是
$$
r+ m\mathbb{Z} \subset r+m_1\mathbb{Z}
$$

举例来说：取$m=4,m_1=d=2,r=1$

那么$l_1=0,l_2=1$有
$$
1+2\mathbb{Z} = (1+4\mathbb{Z}) \cup (3+4\mathbb{Z})
$$

按照定义同一模$m$同余类内的数字模$m$的余数相同，实际上他们和$m$的最大公约数也相同：

!!! theorem
    $\forall a_1,a_2\in r+m\mathbb{Z}\implies (m,a_1) = (m,a_2) = (m,r)$

### 即约剩余系
由此，我们定义即约同余类：

!!! definition "即约同余类"
    如果$(r,m)=1$，$r+m\mathbb{Z}$称为即约同余类（互素同余类）。
    
    模$m$的即约同余类的个数记作$\phi(m)$，称为欧拉函数。

类似的，我们定义即约剩余系

!!! definition "即约剩余系"
    $z_1,z_2,\cdots,z_t$称为即约剩余系，如果$(z_j,m)=1\quad 1\le j \le t$并且
    $$
    (a,m)=1\implies \exists ! 1\le j \le t \quad z_j \equiv a \pmod m
    $$

例如，考虑模$6$，即约同余类有两个（$\phi(6)=2$）：
$$
1+6\mathbb{Z},5+6\mathbb{Z}
$$
那么$1,5$就是一组模$6$的即约剩余系。

### 剩余系的性质
> 下面除非特别说明，都考虑模$m$的剩余系

比较显然的是：

- 任取固定的整数$c$，那么$x_1,\cdots,x_{m}$是完全剩余系等价于$x_1+c,\cdots,x_{m}+c$是完全剩余系。
- 任取固定的整数$k_1,k_2,\cdots,k_{\phi(m)}$，那么$y_1,\cdots,y_{\phi(m)}$是即约剩余系等价于$y_1+k_1m,\cdots,y_{\phi(m)}+k_{\phi(m)}m$是即约剩余系。
- 如果$(a,m)=1$那么$x_1,\cdots,x_{m}$是完全（即约）剩余系等价于$ax_1,\cdots,ax_{m}$是完全（即约）剩余系。

下述定理给出了剩余系的结构（某种分解）：

!!! theorem
    如果$m=m_1m_2$，并且$x_i(1\le i \le m_1)$是模$m_1$的完全剩余系，$x_j'(1\le j \le m_2)$是模$m_2$的完全剩余系。

    那么
    $$
    x_{ij} = x_i + m_1 x_j'
    $$
    是模$m$的完全剩余系。

只要证明$x_{ij} = x_i + m_1 x_j'$这个$m=m_1m_2$个数字模$m$互不同余即可。

如果
$$
x_i + m_1 x_j' \equiv x_{i'} + m_1 x_{j'}' \pmod m
$$
那么
$$
x_i + m_1 x_j' \equiv x_{i'} + m_1 x_{j'}' \pmod {m_1}
$$
于是
$$
x_i\equiv x_{i'} \pmod {m_1}
$$
而$x_i(1\le i \le m_1)$是模$m_1$的完全剩余系，要同余只能相等$x_i=x_{i'}$也就是$i=i'$。

所以
$$
m_1 x_j' \equiv m_1 x_{j'}' \pmod m
$$
得到
$$
x_j' \equiv x_{j'}' \pmod {m_2}
$$
同理可得$j=j'$，证毕。

一般地，有如下推广：

!!! theorem
    $m=m_1m_2\cdots m_k$那么当$x^{(i)}$遍历模$x_i$的完全剩余系时，
    $$
    x = x^{(1)}+ m_1 x^{(2)}+m_1m_2 x^{(3)}+\cdots+m_1m_2\cdots m_{k-1}x^{(k)}
    $$
    遍历模$m$的完全剩余系。

如果$m$的**分解是即约的**，那么有更强的充分必要性定理如下：

!!! theorem
    如果$m=m_1m_2$并且$(m_1,m_2)=1$，那么
    $$
    x = m_2x^{(1)}+m_1x^{(2)}
    $$
    遍历模$m$的完全（即约）剩余系，当且仅当$x^{(1)}, x^{(2)}$分别遍历模$m_1,m_2$的完全（即约）剩余系。

证明的过程和之前的类似，重点在于“$x_{ij}$两两互不相同”，此处略去。

上述定理也有相应的推广形式：

!!! theorem
    $m=m_1m_2\cdots m_k$，设$M_j = m/m_j$，那么
    $$
    x = \sum_j M_jx^{(j)}
    $$
    遍历模$m$的完全（即约）剩余系当且仅当$\forall j \quad x^{(j)}$遍历模$m_j$的完全（即约）剩余系。

最后再给出一个重要的定理：

!!! theorem
    如果$n \mid m$，并且$m,n$有相同的素因数，那么当$y$遍历模$n$的完全（即约）剩余系、$z$遍历模$m/m$的完全剩余系时
    $$
    x = y+nz
    $$
    遍历模$m$的完全（即约）剩余系。

证明略去。

## 欧拉函数
欧拉函数是模$m$即约剩余系的计数函数。

### 欧拉函数的计算

如果$m$可以做一些分解，那么$\phi(m)$就会有相应的分解：

- $m=m_1m_2$
    - 如果$m_1$和$m$有相同的素因数，那么$\phi(m) = m_2\phi(m_1)$
    - 如果$(m_1,m_2)=1$，那么$\phi(m) = \phi(m_1)\phi(m_2)$

这些结论可以直接从即约剩余系的定理得到。

一般的，如果有标准素因数分解：
$$
m = p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_r^{\alpha_r}
$$
那么
$$
\phi(m) = \prod_{i=1}^r p_i^{\alpha_i -1}(p_i-1) =m\prod_{p \mid m} (1-\frac{1}{p})
$$

不难发现，$2\mid \phi(m)\quad \forall m\ge 3$。

有一个很漂亮的定理：

!!! theorem
    对任意正整数$m$都有：
    $$
    \sum_{d\mid m} \phi(d) = m
    $$

也就是，$m$的所有（正）因数的欧拉函数取值加起来等于$m$。

例如
$$
6 = \phi(1)+\phi(2)+\phi(3)+\phi(6) = 1+1+2+2
$$

我们可以从即约剩余系的角度来证明此定理。

考虑把
$$
1,2,\cdots, j,\cdots, m
$$
按照和$m$的最大公约数分类，每一类对应一个正因数$d$。
> 例如$\\{1,2,3,4,5,6\\}$分为四类$\\{1,5\\},\\{2,4\\},\\{3\\},\\{6\\},$

如果
$$
(j,m) = d \quad 1\le j \le m
$$
那么
$$
(j/d, m/d) = 1 \quad 1\le j/d \le m/d
$$

在$1\le j/d \le m/d$的范围内满足上述条件的数字实际上就是$m/d$的即约剩余系。所以满足$(j,m) = d$的$j$的个数为：
$$
\phi(m/d)
$$

所以
$$
m = \sum_{d\mid m} \phi(m/d)
$$
把$d$替换成$m/d$即可得到要证明的式子：
$$
m = \sum_{d\mid m} \phi(d)
$$

下面我们来证明著名的费马-欧拉定理：

!!! theorem "费马-欧拉定理"
    设$(a,m)=1$那么
    $$
    a^{\phi(m)} \equiv 1 \pmod m
    $$

证明的过程非常巧妙。

考虑模$m$的即约剩余系：$r_1,r_2\cdots,r_{\phi(m)}$，那么$ar_1,ar_2\cdots,ar_{\phi(m)}$也是一组即约剩余系。他们之间必然存在一一对应的同余关系。

那么根据同余和乘法的相容性：
$$
\prod_{i=1}^{\phi(m)} r_i \equiv \prod_{i=1}^{\phi(m)} (ar_i) \pmod m
$$

根据即约剩余系的定义，$(r_i,m)=1$，所以可以在上式两边消去$r_i$即可得到得到：
$$
a^{\phi(m)} \equiv 1 \pmod m
$$

值得一提的是，这个定理给出了同余逆元的一个形式：
$$
a a^{\phi(m)-1} \equiv 1 \pmod m
$$
所以
$$
a^{-1} \equiv a^{\phi(m)-1} \pmod m
$$

我们之前证明过的费马小定理是它的特殊情形（$m$为素数）。

### 即约剩余系的构造

我们之前定义过$a$对模$m$的**指数**$d_0=\delta_m(a)$，那么费马-欧拉定理就说明了：
$$
\delta_m(a) \mid \phi(m)
$$

下面的定理给出了这两者相等的充要条件：

!!! theorem
    设$(a,m)=1$，那么$d_0=\delta_m(a)$的充分必要条件是
    $$
    a^{d_0} \equiv 1\pmod m
    $$
    并且
    $$
    a^0,a^1,\cdots,a^{d_0-1}
    $$
    对$m$对模两两不同余。

    特别的
    $$
    \begin{aligned}
    d_0 = \delta_m(a) = \phi(m) \iff a^0,a^1,\cdots,a^{d_0-1} \text{是模m的一组即约剩余系}
    \end{aligned}
    $$

定理的证明不难，只需要抓住$d_0$是满足$m\mid a^d-1$的最小正整数$d$这一定义即可。

这个定理说明在$d_0=\phi(m)$时，$a^0,a^1,\cdots,a^{d_0-1}$就是即约剩余系。这是我们首次给出即约剩余系的构造。

例如：
$$
m=5, 2^4 \equiv 1 \pmod 5 \implies \phi(5) = \delta_5(2) = 4
$$
所以
$$
2^0,2^1,2^2,2^3
$$
是模$5$的即约剩余系。

一般地，对于$m=2^l\quad l\ge 3$这样的模，我们都可以给出即约剩余系的构造：

!!! theorem
    对于模$m=2^l\quad l\ge 3$，下面的$2^{l-1}$个数字给出了一组即约剩余系：
    $$
    5^0,5^1,\cdots,5^{2^{l-2}},-5^0,-5^1,\cdots,-5^{2^{l-2}}
    $$

    一般地对于$l\ge 4$取
    $$
    2 \nmid g_0
    $$
    对于$l=3$，取
    $$
    2 \nmid g_0,\quad g_0\ne 8k-1
    $$
    那么
    $$
    (-1)^xg_0^{y}\quad x\in \\{0,1\\}, 0\le y \lt 2^{l-2}
    $$
    都是模$2^l$的即约剩余系。

证明略去。

### RSA加密算法

- 公钥和私钥的生成：
    - 取素数$p,q$，计算$n=pq$以及欧拉函数$m=\phi(n)=(p-1)(q-1)$
    - 选取一个和$m$互素的数字$\alpha$（以便使用欧拉定理求模逆元）
    - 求$\alpha$的对模$m$的逆元$\beta$，也即是$\alpha \beta \equiv 1 \pmod m$
    - $N,\alpha$和$N,\beta$就可以作为**一对钥匙**。

- 加密：
    - 要发送的明文：$x$
    - 计算密文：$0\le y \lt n$，满足$y\equiv x^\alpha \pmod n$，也就是$x^\alpha$除以$n$的余数。
- 解密：
    - 接收到密文：$y$
    - 计算明文：$0\le x\lt n$，满足$x\equiv y^\beta \pmod n$，也就是$y^\beta$除以$n$的余数。

算法正确性证明：

实际上**只需要证明**解密的过程是正确的，也就是：
$$
y^\beta \equiv x \pmod n
$$
即可。

也就是要证：
$$
x^{\alpha \beta} \equiv x \pmod n
$$
我们知道
$$
\alpha \beta \equiv 1 \pmod m
$$
不妨设
$$
\alpha \beta = km+1
$$
根据欧拉定理
$$
x^m \equiv 1 \pmod n\implies x^{km} \equiv 1 \pmod n 
$$
于是
$$
x^{\alpha \beta} \equiv x^{km+1}  \equiv x \pmod n
$$
证毕。

例子：

小白想给小红告白，要发送“**520**”。

他取
$$
p=13,\quad q = 101
$$
也就是说：
$$
n=1313, \quad m = 1200
$$

他选了$\alpha = 7$，使用欧拉定理计算对模$1200$对逆元：
```python title="python求解逆元"
>>> 7**1199 % 1200
343
```
于是，取了$\beta = 343$。

然后他先把公钥$1313,7$发送给了小红。又发送了密文：
``` python title="python加密"
>>> 520 ** 343 % 1313
455
```

小红收到了$455$这个密文，稍微算了一下：
```python title="python解密"
>>> 455 ** 7 % 1313
520
```
会心一笑。

如果要发送汉字就复杂一些：

例如要发送“**小红，我爱你**”。

先取这些字符的Unicode编码：
```python title="Unicode编码"
>>> [ord(s) for s in "小红我爱你"]
[23567, 32418, 65292, 25105, 29233, 20320]
```

然后进行加密：
```python
>>> [i**343%1313 for i in [23567, 32418, 25105, 29233, 20320]]
[1146, 984, 1272, 243, 989]
```

小红收到了可以进行解密：
```python
>>> [chr(i**7%1313) for i in [1146, 984, 1272, 243, 989]]
['Ӟ', 'Ί', '\x9e', 'ś', 'ɱ']
```
似乎不太对，这是因为我们的加密算法**会把所有传输的内容限制在0～1313这个范围**。而汉字的Unicode编码范围大概是19968至40869。所以需要手动调整一下：
```python
>>> [[chr(i**7%1313+k*1313) for i in [1146, 984, 1272, 243, 989]] for k in range(19968//1313, 40869//1313)]
[['凍', '偹', '䶍', '乊', '你'], #         你
 ['囮', '喚', '劮', '卫', '咁'],
 ['小', '媻', '埏', '墌', '妢'], # 小
 ['愰', '応', '峰', '嶭', '廃'],
 ['晑', '擽', '我', '拎', '揤'], #     我
 ['歲', '樞', '朲', '柯', '椅'],
 ['炓', '漿', '汓', '洐', '渦'],
 ['疴', '瑠', '煴', '爱', '獇'], #       爱
 ['竕', '禁', '皕', '睒', '硨'],
 ['翶', '红', '箶', '米', '綉'], #   红
 ['蔗', '菃', '胗', '膔', '芪'],
 ['訸', '裤', '藸', '蚵', '蟋'],
 ['轙', '踅', '謙', '诖', '賬'],
 ['鑺', '錦', '逺', '郷', '鈍'],
 ['馛', '顇', '镛', '阘', '霮'],
 ['麼', '鵨', '驼', '鬹', '鱏']]
```

这几行就有我们的密文了。

当然如果使用的密钥$n$比较大就不会出现这个问题了。

## 威尔逊定理
下面我们继续讨论之前提到过的，$m$的即约剩余系的乘积模$m$的问题。

也就是
$$
\prod_{r\bmod m}{\vphantom\prod}' r \equiv ? \pmod m
$$
> 这里的符号$\prod_{r\bmod m}{\vphantom\prod}'$代表一组即约剩余系的乘积。

可以证明：

!!! theorem "威尔逊定理"
    $$(p-1)! \equiv -1 \pmod p \iff p\text{为素数}$$

证明：

$p=2$显然成立，下面考虑$p\ge 3$。

不妨取即约剩余系
$$
r_1,r_2,\cdots,r_{p-1}
$$
任何一个$1\le r_i \le p-1$都和$p$互素，那么总存在模逆元$1\le r_j\le p-1$使得：
$$
r_ir_j \equiv 1 \pmod p
$$
如果$r_i=r_j$，也就是说它的逆元是自己：
$$
(r_i+1)(r_i-1)\equiv 0 \pmod p
$$
也就是
$$
r_i\equiv 1 \pmod p
$$
或者
$$
r_i\equiv -1 \pmod p
$$
$p\ge3$，所以两式不能同时成立。

综上，即约剩余系中，仅有一项$r_i\equiv -1\pmod p$和一项$r_j \equiv 1 \pmod p$，余下的是$(p-3)/2$对互逆元。也就是说：
$$
r_1r_2\cdots r_{p-1} \equiv 1\cdot (-1) \cdots 1^{\frac{p-3}{2}} \equiv -1 \pmod p
$$
证毕。

例如$p=13$：

1的逆元是自己，12的逆元也是自己。其余的均成对出现：
$$
2\cdot 7 \equiv 3\cdot 9 \equiv 4\cdot 10 \equiv 5\cdot 8 \equiv 6\cdot 11 \equiv 1 \pmod {13}
$$

实际上从威尔逊定理的证明过程，我们不难发现，$m$的即约剩余系的乘积模$m$要么和$1$同余，要么和$-1$同余。（其中成对的互逆元可以消去，只需要考虑$r^2\equiv 1 \pmod m$这样的元素）

最一般的情况总结如下：

!!! theorem "即约剩余系乘积的模"
    如果$m=2,4,p^l,2p^l$（$p\ge3$为素数），那么
    $$
    \prod_{r\bmod m}{\vphantom\prod}' r \equiv -1 \pmod{m}
    $$
    其余情况下：
    $$
    \prod_{r\bmod m}{\vphantom\prod}' r \equiv 1 \pmod{m}
    $$