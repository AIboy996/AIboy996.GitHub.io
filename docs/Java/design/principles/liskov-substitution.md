---
tags:
- Java
- SE
- 可信认证
- 设计原则
---

# 里氏替换原则（LSP）

!!! abstract "一句话"
    子类型必须能够替换父类型，而不破坏调用方对父类型的预期。

**Liskov Substitution Principle** 来自 Barbara Liskov 的替换性定义：如果 `S` 是 `T` 的子类型，那么程序中所有使用 `T` 的地方，都应该能透明地换成 `S`，而程序行为不变。

继承表达的是 **"is-a"**，但仅有名词上的 is-a 不够，还必须是**行为上的可替换**。LSP 约束的正是后者。

## 契约规则

把父类型看作一份契约，子类型可以加强承诺，但不能削弱承诺：

| 规则 | 要求 | 违反示例 |
| --- | --- | --- |
| 前置条件不能加强 | 子类型不能要求调用方提供更多东西 | 父类方法接受任意 `String`，子类要求非空 |
| 后置条件不能削弱 | 子类型必须兑现父类承诺的结果 | 父类返回非空列表，子类返回 `null` |
| 不变式必须保持 | 父类型始终成立的约束，子类型也要成立 | 父类保证余额不为负，子类允许透支 |
| 历史约束 | 子类型不能引入父类型不允许的状态变化 | `ImmutableList` 的子类支持 `add` |
| 异常规则 | 子类型不能抛出父类型未声明的受检异常，也不能抛出新类型的运行时异常 | 父类 `withdraw` 不抛异常，子类抛 `UnsupportedOperationException` |

## 反例：正方形继承长方形

```java
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int area() { return width * height; }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}
```

调用方按 `Rectangle` 的契约使用：

```java
void resize(Rectangle r) {
    r.setWidth(5);
    r.setHeight(4);
    assert r.area() == 20; // 传入 Square 时得到 16
}
```

从几何直觉看"正方形是长方形"似乎成立，但从**可变对象的行为契约**看，`Square` 加强了 `setWidth` 的副作用，破坏了调用方的假设。这就是 LSP 违反。

!!! note "问题不在正方形，而在设计"
    LSP 违反通常说明**继承关系选错了**，而不是子类"写错了"。修复方式是调整抽象，而不是在子类里打补丁。

## 修复方式一：不可变对象

如果对象不可变，就不存在"设置宽高后面积被联动修改"的契约问题：

```java
public sealed interface Shape permits Rectangle, Square {
    int area();
}

public record Rectangle(int width, int height) implements Shape {
    @Override
    public int area() { return width * height; }
}

public record Square(int side) implements Shape {
    @Override
    public int area() { return side * side; }
}
```

`Square` 不再继承 `Rectangle`，二者都实现 `Shape`。调用方只依赖 `area()`，替换是安全的。

## 修复方式二：重新审视抽象

如果确实需要继承，父类应只暴露所有子类型都能兑现的行为：

```java
public interface Shape {
    int area();
    // 不提供 setWidth / setHeight 这类只对部分形状有意义的方法
}
```

这也引出了与 [接口隔离原则](interface-segregation.md) 的联系：父类型的方法越多，子类型越难完整兑现契约。

## 其他常见违反

```java
// 1. 用 UnsupportedOperationException 表示"这个操作我不支持"
public class ReadOnlyList<E> extends ArrayList<E> {
    @Override
    public boolean add(E e) {
        throw new UnsupportedOperationException();
    }
}

// 2. 子类静默改变语义
public class CachedRepository extends UserRepository {
    @Override
    public User findById(long id) {
        return cache.get(id); // 返回过期数据，父类承诺返回最新数据
    }
}

// 3. 子类加强前置条件
public class StrictValidator extends Validator {
    @Override
    public void validate(String input) {
        Objects.requireNonNull(input, "input 不能为空"); // 父类允许 null
    }
}
```

第一种应优先使用**组合 + 独立接口**（如 `List` 与 `Collections.unmodifiableList`），第二种要修正缓存语义或调整父类契约，第三种应把非空约束上移到父类型。

## 如何检查

!!! tip "用调用方视角测试"
    不要只测试子类自己的方法；**拿父类型的测试用例去跑子类型**。如果父类的契约测试在子类上失败，就存在 LSP 违反。

具体做法：

- 为父类型编写契约测试（contract test），所有实现都继承它；
- 检查子类是否抛出父类未声明的异常；
- 检查子类是否返回 `null` 或空集合而父类承诺非空；
- 检查子类是否要求额外的前置条件；
- 检查子类是否修改了父类方法带来的副作用。

## 与其他原则的关系

- 与 [开闭原则](open-closed.md)：只有子类型可替换，基于多态的扩展才是可靠的。
- 与 [接口隔离原则](interface-segregation.md)：接口越瘦，实现越容易完整兑现契约。
- 与 [依赖倒置原则](dependency-inversion.md)：依赖抽象的前提是抽象的实现彼此可替换。

## 检查清单

- [ ] 子类是否加强了前置条件（要求参数非空、范围更窄）？
- [ ] 子类是否削弱了后置条件（返回 `null`、丢数据、延迟更新）？
- [ ] 子类是否保持父类的不变式？
- [ ] 子类是否抛出父类未声明的异常？
- [ ] 父类的契约测试是否能在所有子类上通过？
- [ ] 继承是否只是为了复用代码，而非真正的行为替换关系？
