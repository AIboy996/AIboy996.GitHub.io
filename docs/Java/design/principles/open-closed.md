---
tags:
- Java
- SE
- 可信认证
- 设计原则
---

# 开闭原则（OCP）

!!! abstract "一句话"
    软件实体应该对扩展开放、对修改关闭。

**Open/Closed Principle** 的含义是：增加新功能时，优先**新增代码**，而不是**改动已经稳定运行的代码**。已有代码不被修改，就自然不会破坏已有行为，回归测试的范围也可控。

## 为什么需要 OCP

需求一定会变。问题不在于"会不会改"，而在于**每次变化要动多少地方**。如果每加一种类型都要回头改一遍核心逻辑，核心逻辑就成了变化的汇集点，越改越危险。

OCP 的目标不是"永远不修改任何代码"——这不可能也不必要——而是**把变化收敛到扩展点上**。

## 反例：用 `switch` 枚举类型

```java
public enum ShapeType { CIRCLE, RECTANGLE, TRIANGLE }

public class AreaCalculator {
    public double area(Shape shape) {
        switch (shape.getType()) {
            case CIRCLE:
                return Math.PI * shape.getRadius() * shape.getRadius();
            case RECTANGLE:
                return shape.getWidth() * shape.getHeight();
            case TRIANGLE:
                return 0.5 * shape.getBase() * shape.getHeight();
            default:
                throw new IllegalArgumentException("未知类型");
        }
    }
}
```

每新增一种图形，都要：

1. 修改枚举 `ShapeType`；
2. 修改 `AreaCalculator` 的 `switch`；
3. 重新测试所有已有分支；
4. 承担改坏旧逻辑的风险。

这就是典型的"对修改开放、对扩展关闭"——正好反了。

## 重构：用多态把变化交给扩展点

```java
public interface Shape {
    double area();
}

public record Circle(double radius) implements Shape {
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public record Rectangle(double width, double height) implements Shape {
    @Override
    public double area() {
        return width * height;
    }
}

public record Triangle(double base, double height) implements Shape {
    @Override
    public double area() {
        return 0.5 * base * height;
    }
}
```

现在 `AreaCalculator` 甚至不需要存在，调用方直接 `shape.area()`；如果确实需要汇总：

```java
public class AreaCalculator {
    public double totalArea(List<Shape> shapes) {
        return shapes.stream().mapToDouble(Shape::area).sum();
    }
}
```

新增 `Pentagon` 时，只需新增一个类，`AreaCalculator` 一行都不用改。这就是**对扩展开放、对修改关闭**。

## 常见的扩展点

| 扩展点 | 做法 | 典型例子 |
| --- | --- | --- |
| 多态 | 接口 / 抽象类 + 实现类 | 图形面积、支付方式 |
| 策略 | 把算法封装成对象，运行时选择 | 折扣计算、排序策略 |
| 装饰器 | 在不改原类的前提下叠加行为 | Java I/O、日志增强 |
| 责任链 | 新增处理器即可扩展流程 | 审批流、过滤器链 |
| 注册表 / SPI | 按配置或约定发现实现 | JDBC 驱动、插件系统 |

## 边界：不要为了 OCP 预支抽象

!!! warning "过早抽象是另一种债务"
    OCP 的前提是**变化已经发生或可以确定会发生**。对只有一种实现、且看不到第二种可能的代码强行抽接口，只会增加阅读成本。

一个务实的做法是"三次法则"：同样类型的变化出现两三次后，再抽扩展点。抽象应该是从重复中提炼出来的，而不是凭空设计出来的。

此外，OCP 并不排斥 `switch`。对于**封闭的、由语言或业务规范固定的集合**（如星期、协议状态码），`switch` 反而更直观。Java 17 之后还可以用 `sealed interface` 配合模式匹配，让编译器检查穷尽性，这同样是可维护的写法。

## 与其他原则的关系

- 与 [单一职责原则](single-responsibility.md)：职责不清晰时，很难找到稳定的扩展点。
- 与 [里氏替换原则](liskov-substitution.md)：通过子类型扩展时，必须保证调用方不需要感知具体类型。
- 与 [依赖倒置原则](dependency-inversion.md)：OCP 常通过"依赖抽象"实现，扩展点通常就是抽象接口。
- 与 [策略模式](../patterns/behavioral.md#strategy)、[装饰器模式](../patterns/structural.md#decorator) 直接相关。

## 检查清单

- [ ] 新增一种类型时，需要修改多少个已有文件？
- [ ] 核心逻辑中是否存在按类型分支的 `switch` / `if-else` 长链？
- [ ] 变化点是否被收敛到接口或配置中？
- [ ] 抽象是否由真实需求驱动，而不是"以后可能会用到"？
- [ ] 新增扩展后，已有测试是否完全不需要修改？
