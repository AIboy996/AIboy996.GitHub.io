# SAS的基本操作
## 1、SAS数据集概论

### 1.1 逻辑库library

#### ==临时逻辑库WORK和永久数据集==

libname语句——链接逻辑库，可以读取或是保存数据集

```sas
libname <name> '<path>';
```

同时存到多个位置

```SAS
libname <name> ('<path>' '<path>');
```

==物理文件夹必须事先已经存在，不会自动创建==

#### ==逻辑库命名要求==

+ 最多8字符
+ 以字母or下划线开始，只能包含数字、字母、下划线
+ 引用的时候不区分大小写，调用格式为**library.dataset**

### 1.2 SAS的基础语法

SAS程序分为两类：数据步data step和过程步proc step

a、data步可以输入输出数据、清理与整理数据

b、proc步可以分析、处理数据，展示数据和信息

c、每个step可以有多个==语句==通常以==关键词==开头必须以==；==结束，语句中用空格作为分隔符

### 1.3 SAS数据集结构

二维矩阵

第一行是变量名

每一行是一个观测

每一列是一个变量

## 2、数据的输入

### 2.1 数据集

#### ==数据集的命名规则==：

+ 最长32字符

+ 字母或下划线开始，只包含数字、字母、下划线

+ 储存时保留大小写但是引用时不区分大小写

==数据集的两部分==

  数据和描述

#### print过程——数据集数据部分

```sas
proc print data=<dataname> label noobs ;显示标签，不显示观测序号
	title 'title';
	footnote 'footnote';注意这是全局设置
	by var1;必须先sort过程之后再使用by语句
	sum var2;对变量进行求和
	id var1;用var1替代obs，当作第一列
	var var1 var2 var3;
	where var1=3;条件筛选
	format var1 date9.;
run;
```

#### contents过程——数据集描述部分

```sas
proc contents data=<dataname>;
run;
```

#### 变量的属性

- 类型：字符型or数值型，缺失值不同，字符型缺失值为空格，数值型缺失值为==( . )==
- 长度
- 标签——label语句
  - 每个变量一个标签
  - 长度不超过256
  - ==保存和引用的时候区分大小写==
  - 可以包含中文

### 2.2 数据的输入

两种数据文件：文本or二进制

三种数据输入方法：data步、import过程、import wizard（菜单操作）

#### data步——手动输入

```sas
data <libname>.<dataname>;
    infile cards;（可省略）
    input var1 var2$;
    informat var1 format1;
    #informat语句指定输入的格式！！！
    label var1='label1' var2='label2';
    datalines;
    dasta asdd
    asdad sada
    ;
run;
```

#### data步——文件读入

- dlm='09'x 制表符

```sas
data <dataname>;
    infile 'path' <选项>  dlm=','  dsd  firstobs=1  obs=10  pad（行尾补充空格）;
    length var1 n;（length必须放在input之前）
    input var1 var2;
    format var1 format1;
run;
```

==dsd选项==

1、分隔符从默认的空格改为逗号

2、每个分隔符都作为分隔符处理，连续的分隔符产生缺省值

3、文件中包含的引号读入时去掉引号

#### data步编译过程

1、创建缓冲区、描述信息、PDV（包括变量、\_N\_以及\_ERROR\_）

2、input读入一行数据，记录到缓冲区

3、根据input指令，把缓冲区内值赋给PDV中的变量

4、执行下面的其他语句

5、此次迭代结束，进入下一次迭代，清空缓冲区，\_N\_+=1否则\_ERROR\_+=1

6、重复直到没有其他数据

#### data步三种输入模式——input

**1、按列输入**

指定每个变量的列跨度，可以随意安排次序，可以重复也可以跳开

**2、格式输入**

使用@符号控制列指针，给出开始的列数但是不直接给出结束的列数，而是通过读入格式来读取指定列数

也可以使用+n来使得指针向前移动n列

==常用格式==

$w.	读入标准的字符数据

w.d	读入标准的数值数据

mmddyyw. 读入时间

**3、列举输入**

+ 同一个变量在不同行可以从不同列开始
+ 分隔符固定，默认是空格
+ 字符变量长度缺省值为8——length语句

**4、混合输入**

几个输入方式可以混合使用

==修饰符==

- 冒号：——跳过分隔符开始读直到遇到分隔符，或者达到格式中的长度或者数据行结束
- 与号&——允许数据值中字符之间包含一个空格，直到遇到两个空格或者数据长度到达或者输入行结束
- 非号~——保持数据中的单引号、双引号

行保持符号@@——处理行混乱的数据，PDV长度！！

#### import过程

```sas
proc import out=temp
	datafile='path'  这里不可以用filename
	dbms = xls replace；
	#注意分号位置
	#replace覆盖写
	#dbms数据源类型——xls，xlsx，excel，access，csv
	range='Sheetname$A1:E5';   数据范围
	getnames=YES;是否读取第一行作为列名
	注意上面都是选项，分号得注意
run;
```

## 3、数据的输出

### 3.1 数据的导出

#### export过程

```sas
proc export;
	data=数据集
	outfile='path'
	dbms=<database_management_system>;
	#注意分号
	delimiter = ',';分隔符
	putnames=NO;是否将变量名作为第一行，默认为yes
run;
```

### 3.2 配合print

#### sort过程——排序

```sas
proc sort data=dataname out=asd;
    where family='asd';
    by var1 descending var2;
run;
```

#### title语句——标题

```sas
title 'title';
titlen 'titlen';第n级标题
title;取消标题
titlen;取消第n级其以上的标题
```

#### footnote语句——脚注

```sas
footnote 'footnote';
footnoten 'footnoten';第n级脚注
footnote;取消脚注
footnoten;取消第n级其以上的脚注
```

#### filename语句

固定路径，方便重复调用

```sas
filename <myfile> 'path';
```

- 用法

```sas
filename myfile 'C:\SataSoftData\';
data bank;
	infile myfile(bank1.txt);
	input ...;
run;
```

#### format过程——自定义格式

```sas
proc format;
	value var1 1='male'
			   2='fmale';
	value var2 ...;
run;
```

### 3.3 freq过程——制表，列联表contingency table

```sas
proc freq data=dataname;
	tables var1*(var2-4);
	var5;
	var6--var7;
	tables (var8-9)*(var10-11)/nocol norow nopercent out=data nocum nofreq ;
run;
```

## 4、运算操作

### 4.1 变量操作（列）

#### 添加新变量——直接运算

``` sas
data dataname;
	infile 'path';
	input var1;
	var2 = lot(var1);在原有数据的基础上变换
	var3 = 'sad';新的变量
run;
```

==注意含有缺失值的加减乘除计算结果为缺失值==

**使用sum函数可以计算缺失值之外的和**

#### 删除变量、修改变量——keep，drop，rename，set

```sas
data dataname;
	set dataname;
	keep var1;保留
	drop var2;删除
	rename total=all;重命名
	if score>90 then grade = 'A';条件判断，and or 与或
		else if score <60 then grade='C';
				else grade='B';
run;
```

or

```sas
data dataname;
    set dataname(drop=var2 rename=(total=all));
run;
```

or

```sas
data dataname(drop=var2 rename=(total=all));这种写法和语句一样，相当于写在最后的语句，最后执行
	set dataname;
run;
```

#### ==数据集选项和语句的区别==

set语句的数据集选项，影响PDV

而keep等语句只影响最终输出的数据集，不影响PDV

也就是，第二种如果想要total += 1需要使用all += 1,而第一种则是 total += 1（在rename语句之前） 

### 4.2 SAS函数和控制流

#### data \_NULL\_哑数据集

可以不创建数据集且执行操作

#### 函数和运算符

```sas
^= ~= NE  	不等于
GE  		不小于
LT  		不大于
IN  		存在于
& AND
| ! OR
^ ~ NOT
```

#### where语句

```sas
where age is missing;			匹配缺失值
where age between 20 and 40;	范围
where name contains Mac;		包含
where name like R_n%;			下划线匹配单个字符，百分号匹配任何字符————Ron,Run，Running
```

#### 数值函数

```sas
int
log log10
min max
mean
sum
n nmiss
round
sin cos tan
exp
```

#### 字符函数

```sas
lowcase upcase 	改变大小写
substr(s,p,n)	字符串s从p开始抽取n个字符
repeat(s,n)		字符串s重复n次
index(s,s1)		查找s1在s中的位置
length(s)		返回s的长度
tranwrd(s,s1,s2)返回把s中所有s1换成s2
cat(s1,s2,s3)	合并字符
```

#### 日期函数

```sas
year(date)		年
month(date)		月
day(date)		日
weekday(date)	得到周几
mdy(m,d,yr)		生成日期值
today()			当前日期
```

#### 类型转换函数

```sas
put(源，格式)	#把数值型或者字符型转化为字符型
input(源，格式)	#把字符型转换为数值型(或字符型）
```

==注意input、put函数和input、put语句的区别==

#### sum语句

```sas
data revenue; 
  retain Total 0; 
  input Day : $3. 
  Revenue : dollar6.; 
  Total = Total+Revenue; 
  format Revenue Total dollar8.; 
  datalines; 
Mon $1,000 
Tue $1,500 
Wed . 
Thu $2,000 
Fri $3,000 
; 
run; 
```

简写为==Total+Revenue==，也就是sum语句

写法是**variable+increment**

它包含了初始化且==retain==的功能

并且为缺失值的增量会被自动忽略!!

**上面的写法,从wed开始之后都是缺失值!!**

```sas
retain Total 0;
功能是 初始化为0,且在迭代过程中保持清除(全局变量差不多的意思)
```

sum语句简写如下:

```sas
data revenue; 
  input Day : $3. 
  Revenue : dollar6.; 
  Total+Revenue; 
  format Revenue Total dollar8.; 
  datalines; 
Mon $1,000 
Tue $1,500 
Wed . 
Thu $2,000 
Fri $3,000 
; 
run; 
```

##### sum语句计数器

```sas
data test; 
  input x; 
  if missing(x) then MissCounter + 1; 
  datalines; 
2 
. 
7 
. 
; 
run; 
```

#### do循环

不用循环写法

```sas
data compound; 
  Interest=.0375; 
  Total=100; 
  Year + 1; #sum语句
  Total + Interest*Total; 
  output; 
  Year + 1; 
  Total + Interest*Total; 
  output; 
  Year + 1; 
  Total + Interest*Total; 
  output; 
  format Total dollar10.2; 
run; 
```

循环写法

```sas
data compound; 
  Interest=.0375; 
  Total=100; 
  do Year=1 to 3 by 1; 
    Total+Interest*Total; 
    output; 
  end; 
  format Total dollar10.2; 
run; 
```

do循环其他写法

```sas
do x=1,2,5,10;
do n=1 to 9 by 2, 100 to 200 by 50;
```

##### do until

```sas
data double; 
  Interest=.0375; 
  Total=100; 
  do until (Total ge 200); #until，这里改成90也会执行一次
    Year + 1; 
    Total = Total + Interest*Total; 
    output; 
  end; 
  format Total dollar10.2; 
run; 
```

##### do while

```sas
data double; 
  Interest=.0375; 
  Total=100; 
  do while (Total ge 200); #while，这里改成90就不会执行了
    Year + 1; 
    Total = Total + Interest*Total; 
    output; 
  end; 
  format Total dollar10.2; 
run; 
```

##### 防止陷入死循环

```sas
data continue_on; 
  Interest=.0375; 
  Total=100; 
  do year=1 to 100 until (Total gt 200); 
    Total=Total+Interest*Total; 
      if Total le 150 then continue; 
    output; 
  end; 
  format total dollar10.2; 
run; 
```

#### leave和continue语句

==leave相当于break，跳出循环==

==continue跳过这一次循环下面的语句==

### 4.3 观测操作（行）

#### 排序sort过程

#### 指定条件的观测——if，where语句

```sas
data dataname;
	set dataname;
	if family ~='sad' then delete;
run;
```

or

```sas
data dataname;
	set dataname;
	if family ='sad';（这种没有then的用法只有data步可以使用
run;
```

or

```sas
data dataname;
	set dataname;
	where family ='sad';（where适用性更强
run;
```

#### 随机抽取挂测——surveyselect

```sas
proc surveyselect data=dataname
    method = SRS #简单随机抽样
    N=5 
    out=dataname
    seed=1
    ;
run;
```

#### 添加新观测——append

```sas
proc append base=datain data=temp;
run;
```

append==变量名必须完全一致，顺序可以不同==

#### 删除观测——if-then delete

```sas
data dataname;
	set dataname;
	if family ='' then delete;#删除缺失值
	if _N_ = 2 OR _N_ = 3 then delete;#删除第二第三个观测
	if family = 'then' then family='unknown';#修改缺失值
run;
```

### 4.4 多数据集操作

#### 纵向拆分数据集(分类)——output语句

```sas
data whale shark;
	set marine;
	if family='1' then output whale;
	else if family = '2' then output shark;
		 else if family='3' then output;
		 	#output后不加数据集输出到全部的数据集,实际上写不写这句话都是一样的
run;
```

or

```sas
data whale(where=(family='1')) shark(where=(family='2'));
	set marine;
run;
```

#### 横向拆分数据集——keep或drop选项

```sas
data whale(keep=name family);
	set marine;
run;
```

or

```sas
data whale(drop=length);
	set marine;
run;
```

#### 纵向合并数据集——set

```sas
data marine;
	set shark wahle;#一致的变量会合并,前者有后者没有的后者会是缺失值
run;
```

#### 横向合并数据集——merge

```sas
data shark2;
	merge sharkla sharklb;
	by name; #必须是排完序之后的
run;
```

or

```sas
data shark2;
	merge sharkla sharklb;没有by语句,按照obs来排序
run;
```



## 5、作图

### 5.1 条形图

```sas
proc gchart data=dataname;
    vbar	var1/discrete;
    vbar3d	var1;
    hbar	var1/sumvar=weight type=mean descending;
    hbar3d	var1/midpoints=0 to 3 by 1;
run;
quit;
```

#### 常规选项

```sas
discrete选项，离散柱状图
midpoints选项，列举中点取值及次序
level=n选项，变量分为n类
range选项，显示取值范围
```

#### 分析变量选项

```sas
sumvar=指定分析变量,type=指定分析统计量,默认为sum,descending按照bar的高度降序排列
```

#### 分组选项

```sas
group = var1	#先分组再作图
subgroup = var1	#先作图再分组————堆叠柱状图
```

### 5.2 饼图

```sas
proc gchart data=dataname;
    pie var1/sumvary=var2;
    run;
quit;
```

### 5.3 直方图

```sas
proc sgplot data=dataname;
	histogram var1/scale=count;(默认显示频率,scale选项显示频数
	density var1;  密度拟合曲线
run;
```

### 5.4 盒子图

```sas
proc sgplot data=dataname;
	vbox var1/category=var2;并列的盒子图,按照var2分类
	hbox var2;
run;
```

### 5.5 散点图

```sas
proc gplot data=dataname;
	plot var1*var2/haxis=axis1; (plot   纵坐标*横坐标/选项
run;
quit;
```

### 5.6 多个散点图

#### 分组作图

```sas
proc gplot data=dataname;
	plot var1*var2=var3/legend1; 纵坐标*横坐标=分组变量
run;
quit;
```

#### 不重叠

```sas
proc gplot data=dataname;
	plot var1*var2;
	plot var3*var4;
run;
quit;
```

or

```sas
proc gplot data=dataname;
	plot var1*var2 var3*var4;
run;
quit;
```

#### 重叠

```sas
proc gplot data=dataname;
	plot var1*var2 var3*var4/overlay legend1;
				#legendn选项，overlay为覆盖模式
run;
quit;
```

### 5.7 新过程sgplot画散点图

```sas
proc sgplot data=dataname;
	scatter x=var1 y=var2;#散点
	series x=var1 y=var2;
	step x=var1 y=var2;
run;
```

### 5.8 全局绘图设置语句

#### 重置绘图设置

```sas
goptions reset=all;
```

#### symbol语句

```sas
symbol2 value=x cv=red interpol=join ci=blue;
```

==value== 散点的形状———x（任意字母，star，diamond，dot，circle

==cv== 散点颜色

==interpol=None== 默认值，不连线  Join直线链接  Spline曲线链接

==ci== 连线的颜色

==line=n==连线的现状，n=1~46

#### axis语句

```sas
axis1 order=(1 to 10 by 2);
```

plot 可以使用==haxis=axisn==选项来定义坐标轴样式

#### legend语句

```sas
legend1 order=descending;
```

### 5.9 univariate过程绘图——直方图、qq图

```sas
proc univariate data=dataname;
	var 分析变量;
	class 分类变量;
	histogram 分析变量;
	inset 统计量;#在直方图中插入统计量
	qqplot 分析变量;画qq图
	qqplot var1/normal(mu=est sigma=est);估计正态
run;
```
