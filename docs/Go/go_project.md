---
tags:
- Go
---

# go项目的组织形式
> 参考[Managing module source](https://go.dev/doc/modules/managing-source)

一般而言，go项目以module为组织单位，每个module可以有多个package，其中main package是特殊的。

## 单文件

对于初学者来说，所有的代码都保存在一个文件里即可。

```go title="main.go" hl_lines="1"
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

注意第一行，需要声明`package main`（只有main package才能运行）。

然后直接运行该文件即可

<div class='console'>

```console
$ go run main.go
Hello, World!

```

</div>

## 单module

### 单package
为了逻辑的分离，我们可以把同一个package的代码分到不同的文件。

> 和Python不同，在go语言里，文件的名字是无关紧要的。文件所属的package才是至关重要的。

这时候则需要把他们都纳入到同一个module下：

```bash
mkdir go_project
cd go_project
# 把当前文件夹初始化为一个module
go mod init hello
# 创建两个 .go 文件
touch main.go
touch hello.go
```

两个文件的内容分别如下：

```go title="hello.go"
package main

var hello string = "Hello, World!"

```

```go title="main.go"
package main

import "fmt"

func main() {
	fmt.Println(hello)
}

```

这时候我们就需要`go run [文件目录]`了：

<div class='console'>

```console
$ go run .
Hello, World!

```

</div>

### 多package
当然，也可以分不同的package

例如下面的文件结构（依然，文件的名字不重要）：
```
.
├── add
│   └── main.go
├── constant
│   └── main.go
├── go.mod
└── main
    └── main.go

4 directories, 4 files
```

```go title="add/main.go"
package add

func Add(a, b int) int {
	return a + b
}

```

```go title="constant/main.go"
package constant

const Hello string = "Hello, World!"

```

```go title="go.mod"
module hello

go 1.22.3

```


```go title="main/main.go"
package main

import (
	"fmt"
	"hello/add"
	"hello/constant"
)

func main() {
	fmt.Println(add.Add(2, 3))
	fmt.Println(constant.Hello)
}

```

使用`go run ./main`即可运行：

<div class='console'>

```console
$ go run ./main
5
Hello, World!

```

</div>

## 多module
这时候可以使用workspace来进行开发。

例如如下的文件结构：
```
.
├── go.work
├── module1
│   ├── go.mod
│   └── main.go
└── module2
    ├── add
    │   └── add.go
    ├── constant
    │   └── hello.go
    └── go.mod

5 directories, 6 files
```
目录中有两个文件夹，分别是两个module：`mod1`和`mod2`

`go.work`文件注明了这个workspace使用到的module：
```go title="go.work"
go 1.22.3

use (
    ./module1
    ./module2
)
```

我们在`mod1`的main.go中调用了`mod2`的代码：
```go title="module1/main.go"
package main

import (
	"fmt"
	"mod2/add"
	"mod2/constant"
)

func main() {
	fmt.Println(constant.Hello)
	fmt.Println(add.Add(2, 3))
}

```

这时候我们可以在workspace的根目录直接运行`mod1`：

<div class='console'>

```console
$ go run mod1
Hello, World!
5

```

</div>