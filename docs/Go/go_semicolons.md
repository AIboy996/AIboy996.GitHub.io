---
tags:
- Go
---

# go中的分号

在C语言中，语句的末尾需要明确的分号：
```c title="hello.c" hl_lines="3-4"
#include <stdio.h>
int main() {
    char hello[] = "Hello, World!";
    printf("%s", hello);
}
```
如果去掉这些分号，编译器会直接报错：

<div class='console'>

```console
$ gcc -o hello hello.c
<pre style="color: #fff;">
hello.c:3:35: error: expected ';' at end of declaration
    3 |     char hello[] = "Hello, World!"
      |                                   ^
      |                                   ;
1 error generated.

hello.c:4:24: error: expected ';' after expression
    4 |     printf("%s", hello)
      |                        ^
      |                        ;
1 error generated.


</pre>
```

</div>

在Go语言中，分号的作用是类似的，但并不强制（Effective Go官方建议：除了for循环之外，不要在代码里显示地加上分号）：

```go title="hello.go" hl_lines="6"
package main

import "fmt"

func main() {
    var hello string = "Hello, World!"
    fmt.Println(hello)
}
```

实际上Go的lexer会[自动把分号在行尾加上](https://go.dev/ref/spec#Semicolons)，如果一行的最后一个token是：

- **变量类型**（`int`、`string`等）
- **字面量**（`20`、`"hello"`等）
- 部分**关键字**（`break continue fallthrough return`）
- 部分**操作符和标点**（`++ -- ) ] }`）

根据这个规则，我们知道下面的代码也是合法的（因为`import`不会触发lexer自动添加分号）：

```go title="import语句换行"
package main

import 

"fmt"

func main() {
    var hello string = "Hello, World!"
    fmt.Println(hello)
}
```

以及我们可以写出类似C语言的结构体（可以把`{`放在下一行，因为`struct`不会触发lexer自动添加分号）：

```go title="出现在行首的 {"
package main

import "fmt"

type Book struct
{
	title  string
	author string
}

func main() {
	fmt.Println(Book{"活着", "余华"})
}

```

而下面的代码是不合法的：
```go title="出现在行首的 {"
package main

import "fmt"

func main() 
{
    fmt.Println("Hello, World!")
}
```

<div class='console'>

```console
$ go run hello.go

 # command-line-arguments
./hello.go:6:1: syntax error: unexpected semicolon or newline before {

```

</div>