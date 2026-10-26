---
tags:
- Java
- SE
- 可信认证
- 软件设计
---

# 软件设计

> 这是华为可信认证的一个科目，本版块将重点学习软件设计的知识，包括设计原则和设计模式；大部分语料由AI生成，我负责整理、发布

软件设计是在**需求与实现之间建立结构**的过程：把系统拆成合适的模块，明确模块之间的依赖与职责，并让结构在需求变化时仍然可控。

## 设计原则

设计原则是经验性的指导方针，不是硬性规则。它们共同的目标是**降低耦合、提高内聚、让变化的影响范围可控**。最基本的原则是 SOLID 原则：

| 原则 | 英文 | 核心思想 | 违反时的典型症状 |
| --- | --- | --- | --- |
| [单一职责原则](principles/single-responsibility.md) | SRP (Single Responsibility) | 一个模块应围绕一个主要职责进行组织，即只有一个引起它变化的原因 | 一个类里混着业务逻辑、持久化、格式化，改动一处牵连多处 |
| [开闭原则](principles/open-closed.md) | OCP (Open/Closed) | 尽量通过扩展来增加功能，而不是反复修改稳定的代码 | 每加一种类型就要改一遍 `switch` / `if-else` |
| [里氏替换原则](principles/liskov-substitution.md) | LSP (Liskov Substitution) | 子类型应能在约定的使用场景中替代父类型，且不破坏调用方的预期 | 子类抛出不支持的异常、静默改变父类语义 |
| [接口隔离原则](principles/interface-segregation.md) | ISP (Interface Segregation) | 不要强迫调用方依赖不需要的接口 | 一个庞大的接口，实现类被迫写一堆空方法 |
| [依赖倒置原则](principles/dependency-inversion.md) | DIP (Dependency Inversion) | 高层策略不应直接依赖低层实现细节，二者都应依赖抽象 | 业务层直接 `new` 具体的数据访问类，难以替换和测试 |

## 设计模式

设计模式是可复用的、针对特定上下文的解决方案模板。经典的 GoF（Gang of Four）设计模式共 23 种，按目的分为三大类。

??? question "四人帮是哪四人"
    这里的四个人是：

    - Erich Gamma
    - Richard Helm
    - Ralph Johnson
    - John Vlissides

    1994 年，他们共同出版了一本影响深远的书：《Design Patterns: Elements of Reusable Object-Oriented Software》

| 类别 | 关注点 | 包含模式 |
| --- | --- | --- |
| [创建型](patterns/creational.md) | 对象如何被创建，解耦"使用"与"实例化" | [单例](patterns/creational.md#singleton)、[工厂方法](patterns/creational.md#factory-method)、[抽象工厂](patterns/creational.md#abstract-factory)、[建造者](patterns/creational.md#builder)、[原型](patterns/creational.md#prototype) |
| [结构型](patterns/structural.md) | 类与对象如何组合成更大的结构 | [适配器](patterns/structural.md#adapter)、[桥接](patterns/structural.md#bridge)、[组合](patterns/structural.md#composite)、[装饰器](patterns/structural.md#decorator)、[外观](patterns/structural.md#facade)、[享元](patterns/structural.md#flyweight)、[代理](patterns/structural.md#proxy) |
| [行为型](patterns/behavioral.md) | 对象之间如何协作、如何分配职责 | [责任链](patterns/behavioral.md#chain-of-responsibility)、[命令](patterns/behavioral.md#command)、[解释器](patterns/behavioral.md#interpreter)、[迭代器](patterns/behavioral.md#iterator)、[中介者](patterns/behavioral.md#mediator)、[备忘录](patterns/behavioral.md#memento)、[观察者](patterns/behavioral.md#observer)、[状态](patterns/behavioral.md#state)、[策略](patterns/behavioral.md#strategy)、[模板方法](patterns/behavioral.md#template-method)、[访问者](patterns/behavioral.md#visitor) |
