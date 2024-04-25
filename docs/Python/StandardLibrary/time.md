---
tags:
- PyLib
---

# time

python中常用的时间相关的标准库有三个。

- time：提供更底层的接口
- datetime：提供更易用的接口
- calender：输出日历

我们一网打尽。

## time

time是用C编写的，为python提供时间处理功能的标准库。

### 时间是什么？

时间是人为定义出来的，什么是一秒钟，今天是哪天都是人为定义的（无意冒犯基督）。

并且这个定义随着人类技术水平的发展还在不断修正。

!!! cite "秒"
    秒是国际单位制中时间的基本单位，符号是s。秒在英文里的原始词义是计算小时的六十分之一（分钟）后，再计算六十分之一。
    
    - 在西元1000至1960年之间，秒的定义是平均太阳日的1/86,400（在一些天文及法律的定义中仍然适用）。
    - 在1960至1967年之间，定义为1960年地球自转一周时间的1/86,400。
    - 现在则是用原子的特性来定义。秒也可以用机械钟、电子钟或原子钟来计时。

有了一秒钟的定义，我们就可以定义某一刻的时间了。

高中的地理课上大家都学习过`时区`的概念，听说过`格林尼治天文台`和`本初子午线`这些名词。实际上这就是GMT（Greenwich Mean Time）：把格林尼治天文台所在地的地方平太阳时被定义为全世界的时间标准，然后各地按照时区做加减法。

但是这个定义有些问题：太阳时不是那么精准。19世纪，依赖原子钟技术的UTC（Coodinated Universal Time）出现了，取代GMT成为了新的时间标准。

!!! cite "UTC"
    1963年，CCIR在其发布的第374号建议案中给出了首个对协调世界时作出定义的国际规范，国际时间局则在1965年开始以当时的原子时A3（国际原子时的前身）来计量UTC。
    
    但由于UTC与原子时存在的频偏问题以及其时间单位与国际单位制下的秒长的不一致性，其后几年UTC经历了多次的调整。直到1970年，CCIR发布了第460号建议案，对上述两个问题进行了修正，且要求加入**跳秒机制**使UTC与原有世界时的偏移被控制在1秒以内，UTC的定义才得以稳定下来。这一新的UTC系统自1972年的1月1日零时开始使用，并沿用至今。

比较有意思的是这个跳秒机制（leap second，也叫闰秒）。

!!! cite "闰秒"
    闰秒是偶尔运用于协调世界时（UTC）的调整，经由增加或减少一秒，以消弥精确的时间（使用原子钟测量）和不精确的观测太阳时 （称为UT1)，之间的差异。这会由于地球自转的不规则和长期项的地球自转减慢而有所不同。UTC标准时间广泛用于国际计时，并在大多数国家用作民用时的参考，它使用精确的原子时，因此，除非根据需要将其重置为UT1，否则将超前运行在观测到的太阳时。闰秒的存在就是为了提供这样的调整。

OK，故事讲到这里你就可以理解为什么**时间戳**（timestamp）是从`1972年1月1日零时`开始计算至今经过的秒数了。这个零点其实就是UTC时间标准启用的时间。

### 时间的各种表示法

在python里，大概有这样几种：

- `#!python 1682676590.8083282`
- `#!python 'Fri Apr 28 18:10:07 2023'`
- `#!python time.struct_time(tm_year=2023, tm_mon=4, tm_mday=28, tm_hour=10, tm_min=10, tm_sec=40, tm_wday=4, tm_yday=118, tm_isdst=0)`

第一种是时间戳（浮点数），第二种是文本类型的表示法（字符串），第三种是结构化数据（元组）。

```python title="python中获取当前时间的方法"
>>> import time
>>> time.time() # 获取当前时间戳
1682676590.8083282
>>> time.strftime('%c') # 获取格式化的字符串时间
'Fri Apr 28 18:10:07 2023'
>>> time.localtime() # 获取结构化的时间
time.struct_time(
    tm_year=2023, tm_mon=4, tm_mday=28, 
    tm_hour=10, tm_min=10, tm_sec=40, 
    tm_wday=4, tm_yday=118, tm_isdst=0
)
>>> time.localtime()[0] # 可以通过指标来获取指定位置的数值
2023
>>> time.localtime().tm_mday # 也可以通过属性名来获取
28
```


### 各种时间类型的转化

python中的`time.struct_time`是比较理想的结构化数据（tuple），所以我们做时间类型转化可以用它作为中介。

#### 时间戳转化成元组
```python
time.gmtime([seconds]) -> (tm_year, tm_mon, tm_mday, tm_hour, tm_min,
                       tm_sec, tm_wday, tm_yday, tm_isdst)
```

特别的，`localtime`可以考虑夏令时、时区等因素
```python
time.localtime([seconds]) -> (tm_year,tm_mon,tm_mday,tm_hour,tm_min,
                          tm_sec,tm_wday,tm_yday,tm_isdst)
```
#### 元组转化成时间戳
```python
time.mktime(tuple) -> floating point number
```
#### 元组转化成字符串
```python
time.strftime(format[, tuple]) -> string
```
特别的，`asctime`可以把时间格式化成'Wed Mar 27 17:12:14 2024'样式：
```python
time.asctime([tuple]) -> string
```
#### 字符串转化成元组
```python
time.strptime(string, format) -> struct_time
```

注意到涉及到字符串的转化时需要指定字符串时间的格式（format），诸如：

- `#!python "2023-01-01 10:21 AM"`
- `#!python 'Thu, 28 Jun 2001 14:17:15 +0000'`
- `#!python "2023年10月20日 21时30分"`

他们的格式参数分别是：
<div id="hook"></div>

- `%Y-%m-%d %H:%M %p`
- `%a, %d %b %Y %H:%M:%S +0000`
- `%Y年%m月%d日 %H时%M分`

其中用`%`开头的是转义字符，他们的含义如下：


|指令|含意|
|--|--|
|%a|本地化的缩写星期中每日的名称。|
|%A|本地化的星期中每日的完整名称。|
|%b|本地化的月缩写名称。|
|%B|本地化的月完整名称。|
|%c|本地化的适当日期和时间表示。|
|%d|十进制数 [01,31] 表示的月中日。|
|%H|十进制数 [00,23] 表示的小时（24小时制）。|
|%I|十进制数 [01,12] 表示的小时（12小时制）。|
|%j|十进制数 [001,366] 表示的年中日。|
|%m|十进制数 [01,12] 表示的月。|
|%M|十进制数 [00,59] 表示的分钟。|
|%p|本地化的 AM 或 PM 。|
|%S|十进制数 [00,61] 表示的秒。|
|%U|十进制数 [00,53] 表示的一年中的周数（星期日作为一周的第一天）。 在第一个星期日之前的新年中的所有日子都被认为是在第 0 周。|
|%w|十进制数 [0(星期日),6] 表示的周中日。|
|%W|十进制数 [00,53] 表示的一年中的周数（星期一作为一周的第一天）。 在第一个星期一之前的新年中的所有日子被认为是在第 0 周。|
|%x|本地化的适当日期表示。|
|%X|本地化的适当时间表示。|
|%y|十进制数 [00,99] 表示的没有世纪的年份。|
|%Y|十进制数表示的带世纪的年份。|
|%z|时区偏移以格式 +HHMM 或 -HHMM 形式的 UTC/GMT 的正或负时差指示，其中H表示十进制小时数字，M表示小数分钟数字 [-23:59, +23:59] 。|
|%Z|时区名称（如果不存在时区，则不包含字符）。|
|%%|字面的 '%' 字符。|


### 其他有用的函数
让程序睡一会儿
```python
time.sleep(seconds)
```
但并不总是可靠！

## datetime
datetime 模块提供了用于操作日期和时间的类。

在支持日期时间数学运算的同时，实现的关注点更着重于如何能够更有效地解析其属性用于格式化输出和数据操作。

datetime实现了以下的类：
```
object
    timedelta：时间跨度，实现时间的计算
    tzinfo：抽象基类
        timezone：时区类
    time：时间类（不特定于某一天，独立于日期）
    date：日期类（不包含时间）
        datetime：日期+时间
```
其中`datetime`是最常用的接口。

### date类

#### 创建对象
- 我们可以直接用`datetime.date`创建特定的`date`对象：
    - `#!python class datetime.date(year, month, day)`
- 可以创建今天的日期：
    - `#!python classmethod date.today()`
- 可以指定从公元 1 年 1 月 1 日开始的第n天：
    - `#!python classmethod date.fromordinal(ordinal)`
- 还可以从时间戳创建：
    - `#!python classmethod date.fromtimestamp(timestamp)`
- 也可以从字符串创建：
    - `#!python classmethod date.fromisoformat(date_string)`
    - 支持大部分 ISO 8601 格式给出的日期。

#### 实例属性
`year`，`month`和`day`

#### 实例方法

包括

- `replace`：改变`year`、`month`或者`day`属性
- `timetuple`：返回元组形式的日期
- `toordinal`：返回从公元 1 年 1 月 1 日开始计算的天数
- `weekday`：返回星期几（0-6）
- `isoweekday`：返回星期几（1-7）
- `isocalendar`：返回ISO历法（XXXX年，第XX周，第XX天）
- `isoformat`：返回日期字符串（YYYY-MM-DD）
- `ctime`：返回日期字符串（'Wed Dec  4 00:00:00 2002'）
- `strftime`：返回特定格式的日期字符串，和之前讲的[time.strftime](./#hook)行为类似
- `__str__`：等价于`isoformat`
    - 控制了`str()`的行为，例如直接打印的行为`#!python print(date)`
- `__format__`：和`strftime`类似
    - 控制了`format()`的行为，例如f-string中的行为：`#!python print(f"{date:%X}")`
### time类
这个类不怎么用，它实现的是不特定于某一天的时间，例如`下午三点`。

### timedelta类
`#!python class datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)`
时间跨度，可以用来做加减乘除

例如
```python
>>> import datetime
>>> datetime.timedelta(days=1)+datetime.timedelta(seconds=300000)
datetime.timedelta(days=4, seconds=40800)
```

`date`和`datetime`对象之间的加减法返回值都是`timedelta`：
```python
>>> import datetime
>>> datetime.date(2023,2,28) - datetime.date(2023,1,9)
datetime.timedelta(days=50)
```

`time`对象不能做加减法。

### datetime类
就是带了具体时间的`date`类，属性、方法都稍微丰富一点。


## calender
纯Python实现的很有趣的一个库，可以查查日历：

<div class="console">

```console
$ python -m calendar 2024 03
     March 2024
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31
```

</div>