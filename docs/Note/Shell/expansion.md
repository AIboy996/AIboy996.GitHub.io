---
tags:
 - Shell
 - Linux
---

# Shell Expansion

在 Linux/Unix 的 Shell 环境中，"expansion" 指的是 Shell 在执行命令前对变量、通配符、命令替换等进行解析和替换的过程。常见的翻译方式包括：

- brace expansion
    - 例如`echo a{1,2,3}`
- tilde expansion
    - 例如`ls ~`
- parameter and variable expansion
    - 例如`echo ${v-unset}`，在v未定义的时候会输出unset
- arithmetic expansion
    - 例如`echo $(( 1+2 ))`
- command substitution
    - 例如`echo "now is $(date)"`
- word splitting
    - 注意IFS（内部字段分隔符）决定 Bash 如何拆分单词，默认是 空格、Tab、换行符。
    - 例如`file="a file.txt" && ls $file`，ls会把a和file.txt当成两个文件
    - 这时候只需要加上引号：`file="a file.txt" && ls "$file"`，ls就会正确识别`a file.txt`作为文件名了
- filename expansion
    - 文件名可以使用正则表达式
    - 例如`du -sh *.md`, `rm [0-9]*.txt`
- quote removal
    - 例如`echo "\""`


Expansion会按照上面的顺序依次执行，具体的内容建议查看[手册](https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html)。