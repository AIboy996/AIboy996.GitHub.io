---
tags:
- PyLib
---

# os

!!! info "注意"
    标准库`os`的源代码是`Lib/os.py`。

    而`os.path`是另外一个相对独立的子模块，源代码是`Lib/posixpath.py` (用于 POSIX) 和`Lib/ntpath.py`(用于 Windows)。

    当然，`os.path`还是通过`os`来进行导出的。

标准库os就是operating system的简写，是Python提供的操作系统接口。

## 操作系统信息
`os.uname()`会返回当前操作系统的识别信息，包括：

- sysname - 操作系统名
- nodename - 机器在网络上的名称（需要先设定）
- release - 操作系统发行信息
- version - 操作系统版本信息
- machine - 硬件标识符

例如：
```python
> os.uname()
posix.uname_result(sysname='Darwin', nodename='YangZhangMBA.local', release='23.6.0', version='Darwin Kernel Version 23.6.0: Wed Jul 31 20:53:05 PDT 2024; root:xnu-10063.141.1.700.5~1/RELEASE_ARM64_T8112', machine='arm64')
```

## 环境变量
`os.environ`是环境变量的字典。

这个映射是在第一次导入 os 模块时捕获的，通常作为 Python 启动时处理 site.py 的一部分。除了通过直接修改 os.environ 之外，在此之后对环境所做的更改不会反映在 os.environ 中。

!!! warning "迷惑行为"
    我们知道

    - `os.putenv()`可以用来设置环境变量。
    - `os.unsetent()`可以用来删除环境变量。

    迷惑的是：

    删除 os.environ 中的项目会自动转化为对 unsetenv() 的相应调用；然而，对 unsetenv() 的调用**并不更新** os.environ ，所以实际上最好是删除 os.environ 的项目。

    `os.putenv()`也是同理

## 文件和目录操作

os提供了一系列的函数来对文件和目录进行操作。

包括但不限于：

- `os.chdir()`
    - 类似Unix Shell的`cd`
- `os.mkdir()`
    - 类似Unix Shell的`mkdir`
- `os.link()`
    - 类似Unix Shell的`link`
- `os.listdir()`
    - 类似Unix Shell的`ls`

等。

当然，与其调用这些我更喜欢使用操作系统原生的命令。

## 进程信息
可以通过`os.getppid()`以及`os.getpid()`来获取父进程、进程的pid。

可以通过`os.getcwd()`来获取当前的工作目录。

## 进程管理

- `os.fork()`
- `os.kill()`
- `os.posix_spawn()`
- `os.execve()`
- `os.plock()`
- `os.wait()`
- `os.system()`
- `os.startfile()`

等。

其中`os.system(command)`比较常用。

我们可以用它来直接使用操作系统提供的api，而不是Python包装的api。

例如
```python
> os.system('curl baidu.com')
<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>
0
```

如此一来，我们就可以用Shell提供的接口完成任何事情了。

!!! info "上位替代"
    `subprocess` 模块可以构建新的进程，连接它们的输入、输出、错误管道，并且获取它们的返回码。
    
    是`os`模块中`os.spawn*()`和`os.system()`的上位替代。