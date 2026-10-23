---
tags:
- Java
- SE
- 可信认证
- 设计原则
---

# 接口隔离原则（ISP）

!!! abstract "一句话"
    调用方不应该被迫依赖它用不到的方法。

**Interface Segregation Principle** 的核心是：接口应该按**使用者的需求**来划分，而不是按实现者的方便来堆砌。一个"大而全"的接口，会让实现类背负无关的方法，让调用方暴露在无关的变化之中。

## 为什么需要 ISP

胖接口带来三类问题：

1. **实现负担**：实现类被迫写空方法或抛 `UnsupportedOperationException`；
2. **编译期耦合**：调用方依赖了接口，就依赖了接口上的所有方法签名，接口任何变化都会触发重编译；
3. **语义污染**：调用方从接口上看不出自己真正需要什么，也难以 mock 测试。

ISP 与 [单一职责原则](single-responsibility.md) 经常被混为一谈：SRP 关注**类的变化原因**，ISP 关注**接口对调用方的承诺范围**。一个类可以同时实现多个小接口，从而既保持职责内聚，又避免让某个调用方看到全部能力。

## 反例：万能 `Worker` 接口

```java
public interface Worker {
    void work();
    void eat();
    void sleep();
    void attendMeeting();
}

public class RobotWorker implements Worker {
    @Override public void work() { /* 正常工作 */ }
    @Override public void eat() { throw new UnsupportedOperationException(); }
    @Override public void sleep() { throw new UnsupportedOperationException(); }
    @Override public void attendMeeting() { throw new UnsupportedOperationException(); }
}
```

`RobotWorker` 被迫实现了三个无意义的方法。更隐蔽的问题是：任何只想调用 `work()` 的客户端，也被迫依赖了 `eat/sleep/attendMeeting` 的存在。

## 重构：按角色拆分接口

```java
public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public interface Sleepable {
    void sleep();
}

public interface MeetingAttendee {
    void attendMeeting();
}

public class HumanWorker implements Workable, Eatable, Sleepable, MeetingAttendee {
    @Override public void work() { /* ... */ }
    @Override public void eat() { /* ... */ }
    @Override public void sleep() { /* ... */ }
    @Override public void attendMeeting() { /* ... */ }
}

public class RobotWorker implements Workable {
    @Override public void work() { /* ... */ }
}
```

客户端只依赖自己需要的角色：

```java
public class AssemblyLine {
    private final List<Workable> workers;

    public AssemblyLine(List<Workable> workers) {
        this.workers = workers;
    }

    public void start() {
        workers.forEach(Workable::work);
    }
}
```

`AssemblyLine` 不需要知道工人会不会吃饭，也不会因为 `Eatable` 接口变化而重新编译。

## 接口设计建议

!!! tip "让接口从调用方出发"
    - **角色接口**：以调用方的需求命名（`Workable`、`PaymentProcessor`），而不是以实体命名（`UserService` 里塞进几十个方法）。
    - **小接口 + 组合**：一个类实现多个小接口，比让所有调用方共享一个大接口更好。
    - **只在需要处声明**：入参类型尽量窄。`save(List<? extends Item>)` 比 `save(MyBigService)` 更灵活。
    - **默认方法不是隔离手段**：给胖接口加 `default` 方法只能减轻实现负担，不能减少调用方对接口的依赖。

## 常见误区

**误区一：接口方法越少越好。** 不是。接口应当**围绕一个角色内聚**。把 `work()` 和 `workOvertime()` 拆成两个接口，如果它们总是一起被调用，反而增加了使用成本。

**误区二：一个实现类只应实现一个接口。** 不是。`ArrayList` 实现了 `List`、`RandomAccess`、`Cloneable`、`Serializable` 等多个接口，每个接口服务于不同调用方，这是合理的。

**误区三：拆分接口等于拆分实现。** 不是。接口可以拆得很细，实现类仍可以是一个，只要它同时实现这些接口。ISP 约束的是**依赖面**，不是**代码组织**。

## 一个典型场景：服务接口膨胀

```java
// 反例：随着需求增长不断加方法
public interface UserService {
    User findById(long id);
    List<User> findAll();
    void register(User user);
    void updateProfile(User user);
    void resetPassword(long id);
    void exportToExcel(OutputStream out);
    void sendMarketingEmail(long id);
}
```

后台管理、注册流程、报表导出三类调用方共享同一个接口。更好的划分：

```java
public interface UserQueryService {
    User findById(long id);
    List<User> findAll();
}

public interface UserCommandService {
    void register(User user);
    void updateProfile(User user);
    void resetPassword(long id);
}

public interface UserExportService {
    void exportToExcel(OutputStream out);
}
```

## 与其他原则的关系

- 与 [单一职责原则](single-responsibility.md)：SRP 约束类，ISP 约束接口；二者共同降低耦合。
- 与 [里氏替换原则](liskov-substitution.md)：接口越窄，实现类越容易完整兑现契约。
- 与 [依赖倒置原则](dependency-inversion.md)：依赖的抽象应当恰好是调用方需要的那个抽象。
- 与 [适配器模式](../patterns/structural.md#adapter)：当无法修改胖接口时，适配器可以把宽接口收窄成调用方需要的窄接口。

## 检查清单

- [ ] 是否有实现类被迫写空方法或抛 `UnsupportedOperationException`？
- [ ] 接口名是否以实体为中心，而不是以调用方的角色为中心？
- [ ] 调用方是否依赖了它根本不调用的方法？
- [ ] 接口变化时，是否会导致无关的调用方重新编译或修改？
- [ ] 拆出的接口是否围绕同一角色内聚，而不是机械地"一方法一接口"？
