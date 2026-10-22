---
tags:
- Java
- SE
- 可信认证
---

# 软件设计

> 这是华为可信认证的一个科目，本版块将重点学习软件设计的知识，包括设计原则和设计模式；大部分语料由AI生成，我负责整理、发布

软件设计是在需求与实现之间建立结构的过程：把系统拆成合适的模块，明确模块之间的依赖与职责，并让结构在需求变化时仍然可控。

## 设计原则

设计原则是经验性的指导方针，不是硬性规则。它们共同的目标是**降低耦合、提高内聚、让变化的影响范围可控**。

### SOLID 原则

| 原则 | 英文 | 核心思想 | 违反时的典型症状 |
| --- | --- | --- | --- |
| 单一职责原则 | SRP (Single Responsibility) | 一个模块应围绕一个主要职责进行组织，即只有一个引起它变化的原因 | 一个类里混着业务逻辑、持久化、格式化，改动一处牵连多处 |
| 开闭原则 | OCP (Open/Closed) | 尽量通过扩展来增加功能，而不是反复修改稳定的代码 | 每加一种类型就要改一遍 `switch` / `if-else` |
| 里氏替换原则 | LSP (Liskov Substitution) | 子类型应能在约定的使用场景中替代父类型，且不破坏调用方的预期 | 子类抛出不支持的异常、静默改变父类语义 |
| 接口隔离原则 | ISP (Interface Segregation) | 不要强迫调用方依赖不需要的接口 | 一个庞大的接口，实现类被迫写一堆空方法 |
| 依赖倒置原则 | DIP (Dependency Inversion) | 高层策略不应直接依赖低层实现细节，二者都应依赖抽象 | 业务层直接 `new` 具体的数据访问类，难以替换和测试 |

补充说明：

- **SRP**：职责的划分依据是"变化的来源"，而不是代码行数。不是"一个类只能有一个方法"。
- **OCP**：绝对的"开闭"不存在，关键是识别出哪些维度会变，在那些维度上预留扩展点。
- **LSP**：契约包括前置条件、后置条件、不变量和异常语义。子类可以弱化前置条件、强化后置条件，反之则不行。
- **ISP**：接口按"调用方需要什么"来切分，而不是按"实现方能提供什么"来切分。
- **DIP**："倒置"指依赖方向与控制流方向相反——业务层调用数据层，但依赖的是数据层的抽象接口，由外部注入实现。

### 其他常见原则

| 原则 | 英文 | 核心思想 | 适用边界 |
| --- | --- | --- | --- |
| DRY | Don't Repeat Yourself | 避免重复维护相同的**知识或逻辑** | 重复的是知识，不是字面代码；语义不同的相似代码不应强行合并 |
| KISS | Keep It Simple, Stupid | 尽量采用简单、清晰的解决方案 | 简单不等于简陋，必要的抽象仍然要做 |
| YAGNI | You Aren't Gonna Need It | 不要过早实现尚无实际需要的功能 | 对已知必然到来的需求，可以预留接口，但不要提前实现 |
| 迪米特法则 | LoD (Law of Demeter) | 只与直接的朋友通信，减少对象间的链式依赖 | 过度使用会导致大量转发方法 |
| 组合优于继承 | Composition over Inheritance | 优先用组合复用行为，避免继承带来的强耦合 | 存在真正的"is-a"且契约稳定时，继承仍然合理 |

> 这些原则之间存在张力：DRY 与 KISS 可能冲突，YAGNI 与 OCP 也可能冲突。设计是在具体上下文中做权衡，而不是机械地同时满足所有原则。

## 设计模式

设计模式是可复用的、针对特定上下文的解决方案模板。经典的 GoF（Gang of Four）设计模式共 23 种，按目的分为三大类。

### 总览

| 类别 | 关注点 | 包含模式 |
| --- | --- | --- |
| 创建型 | 对象如何被创建，解耦"使用"与"实例化" | 单例、工厂方法、抽象工厂、建造者、原型 |
| 结构型 | 类与对象如何组合成更大的结构 | 适配器、桥接、组合、装饰器、外观、享元、代理 |
| 行为型 | 对象之间如何协作、如何分配职责 | 责任链、命令、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者 |

### 创建型模式

| 模式 | 意图 | 典型场景 | 注意点 |
| --- | --- | --- | --- |
| 单例 Singleton | 保证一个类只有一个实例，并提供全局访问点 | 配置中心、连接池、日志器 | 注意线程安全、可测试性与隐式全局状态 |
| 工厂方法 Factory Method | 定义创建对象的接口，由子类决定实例化哪个类 | 框架扩展点，如 `Collection.iterator()` | 每新增产品通常要新增一个工厂子类 |
| 抽象工厂 Abstract Factory | 创建一系列相关或相互依赖的对象，而无需指定具体类 | 跨平台 UI 组件族、不同数据库的 DAO 族 | 新增"产品族"容易，新增"产品种类"困难 |
| 建造者 Builder | 将复杂对象的构建过程与表示分离，分步构造 | 参数多、可选参数多的对象，如 `StringBuilder`、HTTP 请求 | 参数较少时反而增加复杂度 |
| 原型 Prototype | 通过复制已有实例来创建新对象 | 创建成本高、状态初始化复杂，如大对象、依赖快照 | 浅拷贝/深拷贝语义必须明确 |

```java
// 单例：静态内部类实现，兼顾懒加载与线程安全
public final class Config {
    private Config() {}

    private static class Holder {
        static final Config INSTANCE = new Config();
    }

    public static Config getInstance() {
        return Holder.INSTANCE;
    }
}

// 建造者：链式构造，避免超长参数列表
public final class HttpRequest {
    private final String url;
    private final Map<String, String> headers;

    private HttpRequest(Builder b) {
        this.url = b.url;
        this.headers = Map.copyOf(b.headers);
    }

    public static class Builder {
        private String url;
        private final Map<String, String> headers = new HashMap<>();

        public Builder url(String url) { this.url = url; return this; }
        public Builder header(String k, String v) { headers.put(k, v); return this; }
        public HttpRequest build() {
            Objects.requireNonNull(url, "url");
            return new HttpRequest(this);
        }
    }
}
```

### 结构型模式

| 模式 | 意图 | 典型场景 | 注意点 |
| --- | --- | --- | --- |
| 适配器 Adapter | 将一个类的接口转换成调用方期望的另一种接口 | 接入第三方 SDK、兼容旧接口 | 只做接口转换，不承担额外业务逻辑 |
| 桥接 Bridge | 将抽象部分与实现部分分离，使二者可以独立变化 | 两个以上独立变化的维度，如图形 × 渲染 API | 识别变化维度是前提，过早使用会增加复杂度 |
| 组合 Composite | 将对象组合成树形结构，统一处理单个对象与组合对象 | 文件系统、组织架构、UI 组件树 | 需要统一的叶子/容器接口，可能牺牲类型安全 |
| 装饰器 Decorator | 动态地给对象添加职责，比继承更灵活 | Java I/O 流、缓存/日志/重试的层层包装 | 会产生较多小对象，包装顺序影响语义 |
| 外观 Facade | 为子系统提供一致的高层接口，简化使用 | 复杂 SDK 的入口类、模块门面 | 不要演变成"上帝类"，避免吞掉子系统的能力 |
| 享元 Flyweight | 共享细粒度对象的内部状态，减少内存占用 | 大量相同对象，如字符、图标、棋盘棋子 | 内外部状态要清晰分离，线程安全需额外处理 |
| 代理 Proxy | 为对象提供替身以控制访问 | 远程代理、虚拟代理、保护代理、AOP | 注意与装饰器的区别：代理强调访问控制，装饰器强调增强 |

```java
// 装饰器：在不改动原有类的前提下叠加职责
public interface Reader {
    String read();
}

public class PlainReader implements Reader {
    public String read() { return "data"; }
}

public class CachedReader implements Reader {
    private final Reader delegate;
    public CachedReader(Reader delegate) { this.delegate = delegate; }
    public String read() { /* 先查缓存，未命中再 delegate.read() */ return delegate.read(); }
}
```

### 行为型模式

| 模式 | 意图 | 典型场景 | 注意点 |
| --- | --- | --- | --- |
| 责任链 Chain of Responsibility | 让多个处理器依次处理请求，直到被处理或传递到链尾 | 过滤器、拦截器、审批流、异常处理 | 链过长会影响性能，注意断链与兜底处理 |
| 命令 Command | 将请求封装为对象，从而参数化调用方、排队或记录请求 | 撤销/重做、任务队列、宏命令 | 命令类数量可能膨胀 |
| 迭代器 Iterator | 顺序访问聚合对象中的元素，而不暴露其内部表示 | 集合遍历、自定义数据结构 | 遍历过程中修改集合需要明确的失败策略 |
| 中介者 Mediator | 用一个中介对象封装一系列对象之间的交互 | 聊天室、GUI 事件调度、消息总线 | 中介者容易演变为难以维护的巨型类 |
| 备忘录 Memento | 在不破坏封装的前提下捕获并恢复对象状态 | 撤销操作、事务回滚 | 快照的内存开销需要评估 |
| 观察者 Observer | 定义一对多依赖，主题变化时自动通知所有观察者 | 事件监听、发布订阅、响应式更新 | 注意通知顺序、异常隔离与循环通知 |
| 状态 State | 允许对象在内部状态改变时改变其行为 | 订单状态机、连接状态、工作流 | 状态过多时应考虑用表驱动替代 |
| 策略 Strategy | 定义一系列算法并使其可互相替换 | 多种支付方式、多种排序/压缩算法 | 策略与调用方的选择逻辑需要解耦（结合工厂） |
| 模板方法 Template Method | 在父类中定义算法骨架，将部分步骤延迟到子类 | 框架回调、`AbstractList` 等 | 依赖继承，钩子方法不宜过多 |
| 访问者 Visitor | 在不修改元素类的前提下，为其定义新的操作 | 编译器 AST 处理、报表导出 | 元素类增加时需要在所有访问者中同步修改（双分派） |

```java
// 策略：把"做什么"从"怎么选"中抽离
public interface PricingStrategy {
    BigDecimal price(BigDecimal base);
}

public class VipPricing implements PricingStrategy {
    public BigDecimal price(BigDecimal base) { return base.multiply(new BigDecimal("0.8")); }
}

public class OrderService {
    private final PricingStrategy strategy;
    public OrderService(PricingStrategy strategy) { this.strategy = strategy; }
    public BigDecimal total(BigDecimal base) { return strategy.price(base); }
}
```

### 模式选择速查

- **对象创建太复杂**：先考虑工厂方法；对象族要成套创建时用抽象工厂；参数多且可选时用建造者。
- **想在运行时叠加能力**：装饰器；想控制访问或增加间接层：代理；想简化子系统调用：外观。
- **行为随类型/状态变化**：状态（状态间有迁移）或策略（可自由选择算法）。
- **一对多通知**：观察者；请求沿链传递：责任链。
- **两个维度独立变化**：桥接；大量相似小对象：享元。

> 不要为了"用模式"而用模式。模式的价值在于提供共同词汇、降低沟通成本；如果问题简单，直接写清楚的代码就是最好的方案。

## 常见反模式

| 反模式 | 表现 | 改进方向 |
| --- | --- | --- |
| 上帝类 God Object | 一个类承担了系统中大部分职责 | 按职责拆分，引入协作对象 |
| 过度设计 Over-engineering | 为假设中的未来需求堆叠抽象层 | 遵循 YAGNI，先让简单版本通过测试 |
| 单例滥用 | 任何东西都做成全局单例 | 改用依赖注入，显式传递依赖 |
| 意大利面条代码 Spaghetti | 控制流跳转混乱、跨模块直接访问 | 分层、收敛入口、统一依赖方向 |
| 贫血模型 vs 充血模型偏执 | 要么全是 Getter/Setter，要么业务逻辑散落各处 | 根据领域复杂度选择，保持职责边界一致 |
