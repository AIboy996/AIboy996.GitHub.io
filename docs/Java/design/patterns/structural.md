---
tags:
- Java
- SE
- 可信认证
- 设计模式
---

# 结构型设计模式

结构型模式关注**类与对象如何组合成更大的结构**。它们不改变对象的行为本身，而是通过组合、包装、代理等方式，让结构更灵活、职责更清晰。

GoF 的结构型模式共 7 种：

| 模式 | 一句话意图 | 典型场景 |
| --- | --- | --- |
| [适配器 Adapter](#adapter) | 把一个类的接口转换成调用方期望的另一个接口 | 接入旧系统、第三方 SDK |
| [桥接 Bridge](#bridge) | 把抽象部分与实现部分分离，使二者可独立变化 | 多维度变化的业务（消息类型 × 发送渠道） |
| [组合 Composite](#composite) | 把对象组合成树形结构，统一对待单个对象和组合对象 | 文件系统、组织架构、UI 树 |
| [装饰器 Decorator](#decorator) | 动态地给对象附加职责，而不改变原类 | Java I/O、缓存、日志、限流 |
| [外观 Facade](#facade) | 为子系统提供统一的高层接口 | 下单流程、启动流程、SDK 封装 |
| [享元 Flyweight](#flyweight) | 共享大量细粒度对象中可复用的部分 | 文本编辑器字符格式、地图图元 |
| [代理 Proxy](#proxy) | 为另一个对象提供替身以控制访问 | 懒加载、权限校验、远程调用、事务 |

结构型模式大量使用**组合优于继承**的思想，可以看作 [开闭原则](../principles/open-closed.md) 与 [里氏替换原则](../principles/liskov-substitution.md) 的落地手段。

---

## 适配器（Adapter）

!!! abstract "意图"
    将一个类的接口转换成客户端期望的另一种接口，使原本不兼容的类可以协同工作。

### 适用场景

- 接入无法修改的第三方库或遗留系统；
- 系统迁移期间需要同时兼容新旧接口；
- 想把多个不同来源的数据统一成领域模型。

### 结构：对象适配器（推荐）

```java
// 调用方期望的接口
public interface JsonReporter {
    String toJson();
}

// 遗留系统：只能输出 XML
public class LegacyXmlService {
    public String exportXml(String data) {
        return "<data>" + data + "</data>";
    }
}

// 适配器：组合被适配对象
public class XmlToJsonAdapter implements JsonReporter {
    private final LegacyXmlService legacy;

    public XmlToJsonAdapter(LegacyXmlService legacy) {
        this.legacy = legacy;
    }

    @Override
    public String toJson() {
        String xml = legacy.exportXml("report");
        String inner = xml.replace("<data>", "").replace("</data>", "");
        return "{\"data\":\"" + inner + "\"}";
    }
}

// 客户端只依赖 JsonReporter
public class ReportClient {
    private final JsonReporter reporter;

    public ReportClient(JsonReporter reporter) {
        this.reporter = reporter;
    }

    public void print() {
        System.out.println(reporter.toJson());
    }
}
```

### 类适配器（多重继承）

Java 不支持类的多重继承，因此类适配器通常通过**继承被适配类 + 实现目标接口**实现：

```java
public class XmlToJsonClassAdapter extends LegacyXmlService implements JsonReporter {
    @Override
    public String toJson() {
        return "{\"data\":\"" + exportXml("report") + "\"}";
    }
}
```

缺点是耦合了具体类，且无法适配被适配类的子类。**优先使用对象适配器**。

### 易错点

- 在适配器里塞业务逻辑，适配器应只做**接口转换**；
- 双向适配导致职责混乱；
- 用适配器掩盖本应重构的接口设计——如果两边都能改，优先统一接口。

---

## 桥接（Bridge）

!!! abstract "意图"
    将抽象部分与它的实现部分分离，使它们都可以独立地变化。

当一个类存在**两个或以上独立变化的维度**时，继承会导致类数量爆炸（`UrgentEmailMessage`、`NormalSmsMessage`……）。桥接用组合替代多层继承。

### 结构

```java
// 实现维度：发送渠道
public interface MessageSender {
    void send(String title, String content);
}

public class EmailSender implements MessageSender {
    @Override public void send(String title, String content) {
        System.out.println("邮件 [" + title + "]: " + content);
    }
}

public class SmsSender implements MessageSender {
    @Override public void send(String title, String content) {
        System.out.println("短信 [" + title + "]: " + content);
    }
}

// 抽象维度：消息类型
public abstract class Message {
    protected final MessageSender sender; // 桥接点

    protected Message(MessageSender sender) {
        this.sender = sender;
    }

    public abstract void send(String content);
}

public class NormalMessage extends Message {
    public NormalMessage(MessageSender sender) { super(sender); }

    @Override public void send(String content) {
        sender.send("普通通知", content);
    }
}

public class UrgentMessage extends Message {
    public UrgentMessage(MessageSender sender) { super(sender); }

    @Override public void send(String content) {
        sender.send("【紧急】", content);
    }
}

// 两个维度自由组合
Message message = new UrgentMessage(new SmsSender());
message.send("服务宕机");
```

维度从 `2 × 2 = 4` 个类降为 `2 + 2 = 4` 个类看起来没差，但维度增长到 `5 × 8` 时，桥接只需 `5 + 8` 个类，继承需要 `40` 个。

### 与适配器的区别

- 适配器解决**已有接口不兼容**，是事后补救；
- 桥接是**设计之初**就把两个变化维度分开，是事前设计。

### 易错点

- 只有一个实现维度时使用桥接，纯属增加间接层；
- 抽象类仍泄漏实现细节（如直接操作 `MessageSender` 的具体类型）。

---

## 组合（Composite）

!!! abstract "意图"
    将对象组合成树形结构来表示"部分-整体"层次，使客户端可以一致地对待单个对象和组合对象。

### 结构

```java
public interface FileSystemNode {
    String name();
    long size();
    void print(String indent);
}

// 叶子节点
public class FileNode implements FileSystemNode {
    private final String name;
    private final long size;

    public FileNode(String name, long size) {
        this.name = name;
        this.size = size;
    }

    @Override public String name() { return name; }
    @Override public long size() { return size; }

    @Override
    public void print(String indent) {
        System.out.println(indent + name + " (" + size + " bytes)");
    }
}

// 组合节点
public class DirectoryNode implements FileSystemNode {
    private final String name;
    private final List<FileSystemNode> children = new ArrayList<>();

    public DirectoryNode(String name) { this.name = name; }

    public DirectoryNode add(FileSystemNode node) {
        children.add(node);
        return this;
    }

    @Override public String name() { return name; }

    @Override
    public long size() {
        return children.stream().mapToLong(FileSystemNode::size).sum();
    }

    @Override
    public void print(String indent) {
        System.out.println(indent + name + "/");
        children.forEach(child -> child.print(indent + "  "));
    }
}

// 客户端统一处理
FileSystemNode root = new DirectoryNode("project")
        .add(new FileNode("README.md", 1200))
        .add(new DirectoryNode("src")
                .add(new FileNode("Main.java", 800))
                .add(new FileNode("Util.java", 600)));

System.out.println(root.size()); // 2600
root.print("");
```

### 权衡

- 优点：客户端无需区分叶子与容器；新增节点类型符合开闭原则；天然表达递归结构。
- 缺点：树形结构可能让设计过度一般化；某些操作对叶子节点没有意义（如 `add`），需要在接口层面妥协。

### 易错点

- 在 `Component` 接口中放 `add/remove`，迫使叶子节点实现无意义的方法（违反 [接口隔离原则](../principles/interface-segregation.md)）；
- 忘记防止循环引用，导致无限递归；
- 组合节点遍历时修改子节点集合，触发 `ConcurrentModificationException`。

---

## 装饰器（Decorator）

!!! abstract "意图"
    动态地给一个对象添加额外职责，同时不改变其原有接口，比生成子类更灵活。

### 结构

```java
public interface Coffee {
    String description();
    BigDecimal price();
}

public class Espresso implements Coffee {
    @Override public String description() { return "浓缩咖啡"; }
    @Override public BigDecimal price() { return new BigDecimal("18"); }
}

// 装饰器基类：持有被装饰对象，并实现同一接口
public abstract class CoffeeDecorator implements Coffee {
    protected final Coffee delegate;

    protected CoffeeDecorator(Coffee delegate) {
        this.delegate = delegate;
    }

    @Override public String description() { return delegate.description(); }
    @Override public BigDecimal price() { return delegate.price(); }
}

public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee delegate) { super(delegate); }

    @Override
    public String description() {
        return delegate.description() + " + 牛奶";
    }

    @Override
    public BigDecimal price() {
        return delegate.price().add(new BigDecimal("3"));
    }
}

public class MochaDecorator extends CoffeeDecorator {
    public MochaDecorator(Coffee delegate) { super(delegate); }

    @Override
    public String description() {
        return delegate.description() + " + 摩卡";
    }

    @Override
    public BigDecimal price() {
        return delegate.price().add(new BigDecimal("5"));
    }
}

// 运行时任意叠加
Coffee coffee = new MochaDecorator(new MilkDecorator(new Espresso()));
System.out.println(coffee.description() + " = " + coffee.price());
// 浓缩咖啡 + 牛奶 + 摩卡 = 26
```

Java 标准库中的 `BufferedInputStream(new FileInputStream(...))`、`Collections.unmodifiableList(...)` 都是装饰器思想。

### 与继承的区别

| | 继承 | 装饰器 |
| --- | --- | --- |
| 时机 | 编译期确定 | 运行期动态组合 |
| 组合方式 | 静态、类爆炸 | 自由叠加 |
| 影响范围 | 改变整个类的行为 | 只影响被包装的实例 |
| 接口 | 可新增方法 | 必须保持原接口不变 |

### 与代理的区别

两者结构相似，但意图不同：装饰器**增强功能**，代理**控制访问**。装饰器通常由调用方显式叠加，代理通常对调用方透明。

### 易错点

- 装饰器改变了接口（新增方法），导致调用方必须知道具体装饰类型；
- 装饰顺序影响结果却没有文档说明；
- 多层装饰导致调试困难，堆栈变深；
- 用装饰器包装有状态对象时，状态共享出现问题。

---

## 外观（Facade）

!!! abstract "意图"
    为子系统中的一组接口提供一个一致的高层接口，使子系统更易使用。

### 结构

```java
// 子系统
public class InventoryService {
    public boolean reserve(String sku, int quantity) {
        System.out.println("锁定库存: " + sku + " x " + quantity);
        return true;
    }
}

public class PaymentService {
    public boolean charge(String userId, BigDecimal amount) {
        System.out.println("扣款: " + userId + " " + amount);
        return true;
    }
}

public class ShippingService {
    public String arrange(String sku, String address) {
        System.out.println("安排发货到: " + address);
        return "SF123456";
    }
}

// 外观：把复杂流程收口为一个方法
public class OrderFacade {
    private final InventoryService inventory;
    private final PaymentService payment;
    private final ShippingService shipping;

    public OrderFacade(InventoryService inventory,
                       PaymentService payment,
                       ShippingService shipping) {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
    }

    public String placeOrder(String userId, String sku,
                             int quantity, BigDecimal amount, String address) {
        if (!inventory.reserve(sku, quantity)) {
            throw new IllegalStateException("库存不足");
        }
        if (!payment.charge(userId, amount)) {
            throw new IllegalStateException("支付失败");
        }
        return shipping.arrange(sku, address);
    }
}
```

客户端从"协调三个子系统"简化为一次 `placeOrder` 调用。

### 权衡

- 优点：降低客户端与子系统的耦合；提供清晰的用例入口；便于统一处理事务、日志。
- 缺点：外观可能变成"上帝类"；过度封装会隐藏子系统的必要能力。

### 易错点

- 外观不是"禁止访问子系统"，有需要的客户端仍可直接使用子系统；
- 在外观里堆业务规则，导致外观本身难以维护；
- 把外观当成唯一入口，所有请求都从这里过，形成性能瓶颈。

---

## 享元（Flyweight）

!!! abstract "意图"
    运用共享技术有效地支持大量细粒度对象。

享元把对象状态拆成两部分：

- **内部状态（intrinsic）**：可共享、不随环境变化，存放在享元对象中；
- **外部状态（extrinsic）**：随环境变化、不能共享，由客户端在调用时传入。

### 结构

```java
// 享元：树的种类，可共享
public record TreeType(String name, String color, String texture) {
    public void draw(int x, int y) {
        System.out.printf("在 (%d, %d) 绘制 %s 色的 %s%n", x, y, color, name);
    }
}

// 享元工厂：缓存并复用
public class TreeTypeFactory {
    private final Map<String, TreeType> cache = new HashMap<>();

    public TreeType get(String name, String color, String texture) {
        String key = name + "|" + color + "|" + texture;
        return cache.computeIfAbsent(key,
                k -> new TreeType(name, color, texture));
    }
}

// 外部状态：位置，由客户端保存
public record Tree(int x, int y, TreeType type) {
    public void draw() { type.draw(x, y); }
}

// 使用
TreeTypeFactory factory = new TreeTypeFactory();
List<Tree> forest = new ArrayList<>();
for (int i = 0; i < 1_000_000; i++) {
    TreeType oak = factory.get("橡树", "绿色", "粗糙");
    forest.add(new Tree(i % 1000, i / 1000, oak));
}
```

一百万棵树只共享一个 `TreeType` 实例，内存占用从"每棵树存一份名称、颜色、纹理"降为"每棵树存坐标和引用"。

### 适用条件

!!! warning "不要滥用"
    享元只有在同时满足以下条件时才划算：

    - 对象数量非常大；
    - 对象中有大量可共享的重复状态；
    - 外部状态可以移到客户端；
    - 共享对象**不可变**，否则会互相污染。

### 易错点

- 享元对象可变，导致所有使用者互相影响；
- 缓存没有上限，变成了内存泄漏；
- 把外部状态也塞进享元，失去共享意义；
- 对象数量本就不多，引入缓存反而增加复杂度。

---

## 代理（Proxy）

!!! abstract "意图"
    为其他对象提供一种代理以控制对这个对象的访问。

### 常见类型

| 类型 | 作用 |
| --- | --- |
| 虚拟代理 | 延迟加载昂贵对象 |
| 保护代理 | 权限校验 |
| 远程代理 | 隐藏网络通信细节 |
| 日志/缓存代理 | 在不改原对象的前提下增加横切逻辑 |
| 智能引用 | 引用计数、事务管理 |

### 静态代理

```java
public interface Image {
    void display();
}

public class HighResolutionImage implements Image {
    private final String path;

    public HighResolutionImage(String path) {
        this.path = path;
        loadFromDisk(); // 昂贵操作
    }

    private void loadFromDisk() {
        System.out.println("从磁盘加载: " + path);
    }

    @Override
    public void display() {
        System.out.println("显示: " + path);
    }
}

public class LazyImageProxy implements Image {
    private final String path;
    private HighResolutionImage realImage;

    public LazyImageProxy(String path) {
        this.path = path;
    }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new HighResolutionImage(path); // 首次访问才加载
        }
        realImage.display();
    }
}
```

### 动态代理

JDK 动态代理基于接口，在运行时生成代理类：

```java
public class TimingInvocationHandler implements InvocationHandler {
    private final Object target;

    public TimingInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        long start = System.nanoTime();
        try {
            return method.invoke(target, args);
        } finally {
            long cost = System.nanoTime() - start;
            System.out.println(method.getName() + " 耗时 " + cost + " ns");
        }
    }
}

Image real = new HighResolutionImage("photo.jpg");
Image proxy = (Image) Proxy.newProxyInstance(
        Image.class.getClassLoader(),
        new Class<?>[]{Image.class},
        new TimingInvocationHandler(real));
proxy.display();
```

Spring AOP、MyBatis Mapper、RPC 框架都广泛使用动态代理。JDK 代理要求目标实现接口；CGLIB 通过生成子类支持无接口的类。

### 与装饰器的区别

| | 装饰器 | 代理 |
| --- | --- | --- |
| 目的 | 增强功能 | 控制访问 |
| 对象来源 | 调用方传入被装饰对象 | 代理通常自己创建或持有目标 |
| 接口 | 必须保持一致 | 通常保持一致 |
| 关注点 | 功能叠加 | 访问控制、生命周期、远程调用 |

### 易错点

- 代理中忘记处理异常，导致 `InvocationTargetException` 直接暴露给调用方；
- 动态代理的性能开销在极端场景下不可忽略；
- 代理对象与目标对象的生命周期不一致，导致内存泄漏；
- 在代理里实现业务逻辑，职责越界。

---

## 如何选择

| 需求 | 首选模式 |
| --- | --- |
| 接口不兼容，且被适配方无法修改 | 适配器 |
| 两个独立维度都需要扩展 | 桥接 |
| 树形结构，需要统一处理整体与部分 | 组合 |
| 运行时动态叠加功能 | 装饰器 |
| 简化复杂子系统的调用 | 外观 |
| 大量重复对象需要节省内存 | 享元 |
| 控制访问、延迟加载、横切逻辑 | 代理 |

!!! tip "结构型模式的共同点"
    它们大多通过**组合**而非继承来组织对象。组合让行为在运行时可变，也避免了继承层次膨胀。遇到"要不要继承"的犹豫时，先想想这七个模式里有没有更合适的组合方式。
