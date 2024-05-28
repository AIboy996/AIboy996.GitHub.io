---
tags:
- Go
---

# 为什么要学Go？

Go的协程语法太可爱了：

```go hl_lines="16"
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

就这一个理由足矣。