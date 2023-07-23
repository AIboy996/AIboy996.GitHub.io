---
tags:
- python案例
- 微软三件套
---
# 超大csv文件转xlsx文件
任务：把一个`shape=(10000, 44)`的csv文件转换成xlsx格式


```python
!ls ./tmp -al
```

    total 4104
    drwx------+ 1 yangz yangz       0 Mar  2 18:09 .
    drwx------+ 1 yangz yangz       0 Mar  2 18:11 ..
    drwx------+ 1 yangz yangz       0 Mar  2 17:39 .ipynb_checkpoints
    -rwx------+ 1 yangz yangz 4185300 Mar  2 16:35 tmp.csv
    

## pandas
在python中提到处理表格数据，最通用的工具就是pandas了。我们可以用`pd.read_csv`把数据读取成`pd.DataFrame`然后再保存为`.xlsx`文件。


```python
import pandas as pd
```

值得注意的是，在保存为`xlsx`文件的时候，可以选择不同的`ExcelWriter`引擎。
### 不同的引擎对比


```python
%%timeit
df = pd.read_csv('./tmp/tmp.csv', dtype=str, encoding='utf-8')
with pd.ExcelWriter("./tmp/xlsxwriter.xlsx", engine="xlsxwriter") as writer:
    df.to_excel(writer)
```

    6.36 s ± 338 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    


```python
%%timeit
df = pd.read_csv('./tmp/tmp.csv', dtype=str, encoding='utf-8')
with pd.ExcelWriter("./tmp/openpyxl.xlsx", engine="openpyxl") as writer:
    df.to_excel(writer)
```

    10.2 s ± 162 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    

如果需要批量处理多个文件，还可以直接写入到压缩包内，省去最后压缩的时间。
### 直接写入到压缩包


```python
import zipfile
```


```python
%%timeit
df = pd.read_csv('./tmp/tmp.csv', dtype=str, encoding='utf-8')
with zipfile.ZipFile("./tmp/tmp.zip", "w") as zf:
    with zf.open("zipfile.xlsx", "w") as buffer:
        with pd.ExcelWriter(buffer, engine="xlsxwriter") as writer:
            df.to_excel(writer)
```

    6.42 s ± 148 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    

而在Windows平台，还有一个强有力的工具：`pywin32`
## pywin32
我们可以通过`pywin32`直接使用Windows上的程序。在这里我们就要用`Excel`给的接口来完成任务。

> Windows默认的文件编码格式是gbk，需要转换一下


```python
with open('./tmp/gbk.csv', 'w+', encoding='gbk') as f:
    with open('./tmp/tmp.csv', 'r', encoding='utf8') as raw:
        f.write(raw.read())
```


```python
import win32com.client as wc
```


```python
%%time

excel = wc.gencache.EnsureDispatch("Excel.Application")
csv = excel.Workbooks.Open('c:/users/yangz/Desktop/tmp/gbk.csv')
csv.SaveAs(Filename='tmp.xlsx', FileFormat=51)
excel.Quit()
```

    CPU times: total: 46.9 ms
    Wall time: 3.65 s
    

这速度，可以说在写`xlsx`格式方面，各种开源库被Excel薄纱。

## csv2xlsx


```python
import os
```


```python
%%timeit
os.system("csv2xlsx.exe -o ./tmp/csv2xlsx.xlsx ./tmp/tmp.csv ")
```

    2.39 s ± 90.4 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    

这是[一个哥们](https://github.com/mentax/csv2xlsx)用go语言写的，也不错。但是经过我的亲测，如果是更大的文件（百万行），还是不如Excel好用。



## 一些参考资料

- [pandas的ExcelWriter](https://pandas.pydata.org/docs/reference/api/pandas.ExcelWriter.html)
- [Excel SaveAs函数手册](https://learn.microsoft.com/zh-cn/office/vba/api/excel.workbook.saveas)
- [gencache.EnsureDispatch和Dispatch的区别](https://stackoverflow.com/questions/50127959/win32-dispatch-vs-win32-gencache-in-python-what-are-the-pros-and-cons)
