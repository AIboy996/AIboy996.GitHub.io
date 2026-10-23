---
tags:
- Java
- SE
- 可信认证
- 设计原则
---

# 依赖倒置原则（DIP）

!!! abstract "一句话"
    高层策略不应依赖低层细节，二者都应依赖抽象；抽象不应依赖细节，细节应依赖抽象。

**Dependency Inversion Principle** 包含两层含义：

1. **高层模块不依赖低层模块**，二者都依赖抽象；
2. **抽象不依赖具体实现**，具体实现依赖抽象。

这里的"倒置"指的是**依赖方向**和**接口所有权**的倒置：传统分层中，业务层直接调用数据库层；应用 DIP 后，业务层定义自己需要的接口，数据库层反过来实现这个接口。

## 为什么需要 DIP

```java
public class OrderService {
    private final MySQLOrderRepository repository = new MySQLOrderRepository();

    public void placeOrder(Order order) {
        repository.save(order);
    }
}
```

这段代码的问题：

- 业务规则（高层）绑死了 MySQL（低层细节）；
- 想换 PostgreSQL、内存存储或远程服务，必须改业务类；
- 单元测试必须启动数据库；
- 业务层编译依赖了 JDBC 驱动。

依赖方向是「业务 → 数据库」，业务层被基础设施牵着走。DIP 要把箭头反过来：**数据库实现业务层定义的接口**。

## 重构：把接口的所有权交给高层

```java
// 领域层定义接口：它只关心"能存取订单"，不关心怎么存
public interface OrderRepository {
    void save(Order order);
    Optional<Order> findById(String id);
}

// 高层策略依赖抽象
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) { // 构造器注入
        this.repository = repository;
    }

    public void placeOrder(Order order) {
        // 业务规则
        repository.save(order);
    }
}

// 低层细节实现高层定义的接口
public class MySQLOrderRepository implements OrderRepository {
    @Override
    public void save(Order order) { /* JDBC 实现 */ }

    @Override
    public Optional<Order> findById(String id) { /* JDBC 实现 */ }
}

// 测试时可以替换为内存实现
public class InMemoryOrderRepository implements OrderRepository {
    private final Map<String, Order> store = new HashMap<>();

    @Override
    public void save(Order order) { store.put(order.id(), order); }

    @Override
    public Optional<Order> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}
```

注意接口的位置：`OrderRepository` 属于**领域层**，而不是基础设施层。这正是"倒置"的关键——接口由使用方定义，实现方适配。

## 三种常见注入方式

```java
// 1. 构造器注入（推荐）
public OrderService(OrderRepository repository) {
    this.repository = Objects.requireNonNull(repository);
}

// 2. Setter 注入（可选依赖时使用）
public void setRepository(OrderRepository repository) {
    this.repository = repository;
}

// 3. 字段注入（不推荐：隐藏依赖、难以测试、无法用 final）
@Autowired
private OrderRepository repository;
```

构造器注入能保证对象创建完成时依赖已就绪，字段可以声明为 `final`，也便于在测试中直接 `new`。

## 不只是数据库

DIP 适用于所有跨层依赖：

| 高层 | 抽象 | 低层实现 |
| --- | --- | --- |
| 订单业务 | `OrderRepository` | MySQL / Redis / 内存 |
| 支付流程 | `PaymentGateway` | 支付宝 / 微信 / 测试桩 |
| 通知逻辑 | `Notifier` | 邮件 / 短信 / 站内信 |
| 文件处理 | `FileStorage` | 本地磁盘 / S3 / OSS |
| 时间逻辑 | `Clock` | 系统时钟 / 固定时钟（测试） |

`java.time.Clock` 就是一个很好的例子：业务代码依赖 `Clock` 抽象，测试时传入 `Clock.fixed(...)`，无需真的等待时间流逝。

## 边界：不是所有依赖都要倒置

!!! warning "别把 DI 做成仪式"
    - **稳定且无副作用的工具**（`Math`、`String`、`BigDecimal`）直接使用即可；
    - **语言标准库**（`List`、`Map`）本身就是抽象，不需要再包一层；
    - **只有一个实现且不太可能变化**的内部组件，强行抽接口只会增加跳转成本；
    - **框架已经提供的抽象**（如 `JdbcTemplate`）直接依赖通常没问题。

判断标准是：**这个依赖是否会阻碍测试、替换或独立演化**。会，就倒置；不会，就保持简单。

## 与其他原则的关系

- 与 [开闭原则](open-closed.md)：依赖抽象使得新增实现无需修改高层代码，是 OCP 的实现基础。
- 与 [里氏替换原则](liskov-substitution.md)：抽象的实现必须可替换，否则依赖抽象没有意义。
- 与 [接口隔离原则](interface-segregation.md)：高层定义的接口应当恰好满足自己的需要，而不是照搬低层能力。
- 与 [工厂方法模式](../patterns/creational.md#factory-method)、[策略模式](../patterns/behavioral.md#strategy) 密切相关：工厂负责提供抽象的实现，策略负责在运行时替换算法。

## 检查清单

- [ ] 高层模块中是否直接 `new` 了低层具体类？
- [ ] 业务代码是否 import 了 JDBC、HTTP 客户端、文件系统等基础设施类型？
- [ ] 接口是否由**使用方**定义，而不是由实现方定义？
- [ ] 能否在不启动数据库/网络的情况下对业务逻辑做单元测试？
- [ ] 依赖是否通过构造器显式传入，字段是否为 `final`？
- [ ] 是否为了"将来可能替换"而给稳定代码加了无意义的接口？
