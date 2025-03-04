---
tags:
 - Shell
 - Linux
---

# Tmux

我并非tmux的资深用户，对它的使用只局限于替代`nohup`。

## nohup

nohup（全称 “no hang up”）是 Linux/Unix 系统中的一个命令，主要用于在 **不受挂起（SIGHUP 信号）影响的情况下** 运行进程。它常用于保持进程在用户注销或 SSH 断开连接后仍然继续运行。

用法是：
```bash
nohup 指令&
```

当 nohup 运行时，默认会把 标准输出（stdout）和标准错误（stderr） 重定向到 nohup.out 文件，以防止输出丢失。也可以手动重定向:

```bash
nohup my_program > my_output.log 2>&1 &
```

然而有的时候nohup会挂掉，重定向也很麻烦，关闭终端再找回之前的任务（一般是使用`jobs`命令）也很麻烦。

## tmux
所以，如果机器装了tmux我就会用它来代替nohup。

```bash
# 创建一个session
tmux new -s $session_name
tmux                        #直接使用tmux会创建并且进入一个新的session 

# 重命名session
tmux rename-session [-t current-name] [new-name]

# 列出所有的session
tmux ls

# 挂起当前的sesstion
tmux detach                  # 快捷键：Ctrl+b d

# 进入之前挂起的session
tmux attach -t $session_name
tmux a -t $session_name      # 也可以简写
tmux a                       # 如果只有一个session也可以不指定name

# 关闭特定session
tmux kill-session -t $session_name
```

这些就够用了！

至于tmux花里胡哨的分屏、切换终端等操作，我一般是不用的。那太过geek了，我还是离不开触控板和鼠标。

```
error connecting to /tmp/tmux-1000/default (No such file or directory)
```