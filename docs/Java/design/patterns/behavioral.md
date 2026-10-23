---
tags:
- Java
- SE
- 可信认证
- 设计模式
---

# 行为型设计模式

行为型模式关注**对象之间如何协作、如何分配职责**。它们描述的不只是对象的结构，更是运行时的交互方式：谁发起请求、谁处理请求、状态如何流转、算法如何替换。

GoF 的行为型模式共 11 种，可以再分为三类：

| 关注点 | 模式 |
| --- | --- |
| 对象间的通信与职责传递 | [责任链](#chain-of-responsibility)、[命令](#command)、[中介者](#mediator)、[观察者](#observer) |
| 对象的状态与算法变化 | [状态](#state)、[策略](#strategy)、[模板方法](#template-method)、[访问者](#visitor) |
| 对集合与结构的遍历、解释、快照 | [迭代器](#iterator)、[解释器](#interpreter)、[备忘录](#memento) |

---

## 责任链（Chain of Responsibility）

!!! abstract "意图"
    将请求沿处理者链传递，直到有一个处理者处理它。发送者无需知道谁会处理。

### 适用场景

- 审批流、过滤器链、中间件；
- 多个对象可能处理同一个请求，但处理者不确定；
- 需要动态调整处理顺序。

### 结构

```java
public abstract class Approver {
    private Approver next;

    public Approver setNext(Approver next) {
        this.next = next;
        return next; // 便于链式组装
    }

    public abstract void approve(String request, int days);

    protected void forward(String request, int days) {
        if (next != null) {
            next.approve(request, days);
        } else {
            System.out.println("无人能处理: " + request);
        }
    }
}

public class TeamLead extends Approver {
    @Override
    public void approve(String request, int days) {
        if (days <= 3) {
            System.out.println("组长批准: " + request);
        } else {
            forward(request, days);
        }
    }
}

public class Manager extends Approver {
    @Override
    public void approve(String request, int days) {
        if (days <= 7) {
            System.out.println("经理批准: " + request);
        } else {
            forward(request, days);
        }
    }
}

public class Director extends Approver {
    @Override
    public void approve(String request, int days) {
        System.out.println("总监批准: " + request);
    }
}

// 组装链
Approver chain = new TeamLead();
chain.setNext(new Manager()).setNext(new Director());
chain.approve("年假", 5); // 经理批准
chain.approve("年假", 15); // 总监批准
```

### 权衡

- 优点：解耦发送者与处理者；可动态增删处理者；符合开闭原则。
- 缺点：请求可能无人处理；链过长影响性能；调试时难以追踪请求流向。

### 易错点

- 没有兜底处理者，请求被静默丢弃；
- 处理者之间互相依赖，形成隐式耦合；
- 链中出现环，导致无限循环。

---

## 命令（Command）

!!! abstract "意图"
    将请求封装成对象，从而可以用不同请求对客户端参数化，并支持排队、记录日志、撤销。

### 结构

```java
public interface Command {
    void execute();
    void undo();
}

// 接收者
public class Light {
    public void on() { System.out.println("灯亮"); }
    public void off() { System.out.println("灯灭"); }
}

// 具体命令
public class LightOnCommand implements Command {
    private final Light light;

    public LightOnCommand(Light light) { this.light = light; }

    @Override public void execute() { light.on(); }
    @Override public void undo() { light.off(); }
}

// 调用者（Invoker）：不关心命令细节
public class RemoteControl {
    private final Deque<Command> history = new ArrayDeque<>();

    public void press(Command command) {
        command.execute();
        history.push(command);
    }

    public void undoLast() {
        if (!history.isEmpty()) {
            history.pop().undo();
        }
    }
}

// 使用
Light light = new Light();
RemoteControl remote = new RemoteControl();
remote.press(new LightOnCommand(light));
remote.undoLast(); // 灯灭
```

### 适用场景

- 需要撤销/重做；
- 需要把操作排队、延迟执行或异步执行；
- 需要记录操作日志、支持事务回滚；
- 需要把"触发者"与"执行者"解耦。

### 易错点

- `undo` 没有完整恢复状态（尤其是多步操作）；
- 命令对象持有可变上下文，导致重放结果不一致；
- 为简单调用强行套命令模式，增加无谓的类。

---

## 解释器（Interpreter）

!!! abstract "意图"
    给定一个语言，定义它的文法表示，并定义一个解释器来解释语言中的句子。

### 适用场景

- 简单的领域特定语言（DSL）、规则表达式；
- 文法相对稳定、句子结构可递归组合；
- 复杂文法应使用解析器生成器（ANTLR 等），而不是手写解释器。

### 结构

```java
public interface Expression {
    int interpret(Map<String, Integer> context);
}

public record NumberExpression(int value) implements Expression {
    @Override public int interpret(Map<String, Integer> context) { return value; }
}

public record VariableExpression(String name) implements Expression {
    @Override
    public int interpret(Map<String, Integer> context) {
        Integer value = context.get(name);
        if (value == null) {
            throw new IllegalArgumentException("未定义的变量: " + name);
        }
        return value;
    }
}

public record AddExpression(Expression left, Expression right) implements Expression {
    @Override
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) + right.interpret(context);
    }
}

public record MultiplyExpression(Expression left, Expression right) implements Expression {
    @Override
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) * right.interpret(context);
    }
}

// 表达式 (a + 10) * b
Expression expr = new MultiplyExpression(
        new AddExpression(new VariableExpression("a"), new NumberExpression(10)),
        new VariableExpression("b"));

int result = expr.interpret(Map.of("a", 5, "b", 3)); // 45
```

### 权衡

- 优点：文法易于扩展（新增一个表达式类即可）；实现直观。
- 缺点：复杂文法会导致类爆炸；解释效率低；通常需要额外实现词法/语法分析。

### 易错点

- 用解释器实现本可以用配置或脚本引擎解决的问题；
- 没有处理运算符优先级，完全依赖手工组装语法树；
- 递归过深导致栈溢出。

---

## 迭代器（Iterator）

!!! abstract "意图"
    提供一种方法顺序访问聚合对象中的元素，而不暴露其内部表示。

### 结构

```java
public class NumberRange implements Iterable<Integer> {
    private final int start;
    private final int end;

    public NumberRange(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current <= end;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                return current++;
            }
        };
    }
}

// for-each 自动使用迭代器
for (int n : new NumberRange(1, 5)) {
    System.out.print(n + " ");
}
// 1 2 3 4 5
```

### 适用场景

- 集合的内部结构需要隐藏；
- 需要多种遍历方式（正序、逆序、过滤）；
- 需要统一不同集合的遍历接口。

### Java 中的迭代器

- `Iterator` / `Iterable` / for-each 是语言级支持；
- 集合的 `iterator()` 通常是 **fail-fast** 的：遍历过程中结构被修改会抛 `ConcurrentModificationException`；
- `ListIterator` 支持双向遍历和修改；
- `Stream` 可以看作更高级的惰性遍历抽象。

### 易错点

- 在 for-each 中调用 `remove()`，应使用 `iterator.remove()`；
- 迭代器与集合的生命周期不一致，集合修改后继续使用旧迭代器；
- 自定义迭代器的 `next()` 不检查边界。

---

## 中介者（Mediator）

!!! abstract "意图"
    用一个中介对象封装一系列对象之间的交互，使对象之间不再显式互相引用，从而降低耦合。

### 结构

```java
public interface ChatMediator {
    void addUser(User user);
    void send(String message, User sender);
}

public class ChatRoom implements ChatMediator {
    private final List<User> users = new ArrayList<>();

    @Override
    public void addUser(User user) { users.add(user); }

    @Override
    public void send(String message, User sender) {
        for (User user : users) {
            if (user != sender) {
                user.receive(sender.getName() + ": " + message);
            }
        }
    }
}

public class User {
    private final String name;
    private final ChatMediator mediator;

    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
        mediator.addUser(this);
    }

    public String getName() { return name; }

    public void send(String message) { mediator.send(message, this); }

    public void receive(String message) {
        System.out.println(name + " 收到 -> " + message);
    }
}

// 使用
ChatMediator room = new ChatRoom();
User alice = new User("Alice", room);
User bob = new User("Bob", room);
alice.send("大家好");
```

如果没有中介者，每个用户都要持有其他所有用户的引用，关系数从 `n` 变成 `n(n-1)/2`。中介者把多对多变成一对多。

### 适用场景

- 多个对象之间存在复杂的网状引用；
- 交互逻辑集中管理比分散在对象中更清晰；
- 典型例子：聊天室、UI 对话框（控件之间通过对话框协调）、事件总线、微服务网关。

### 与外观的区别

- 外观是**单向**的：客户端 → 子系统，子系统不知道外观；
- 中介者是**双向**的：同事对象与中介者互相通信。

### 易错点

- 中介者承担过多逻辑，退化成"上帝对象"；
- 所有交互都强制经过中介者，即使两个对象本可直接通信；
- 中介者成为单点故障或性能瓶颈。

---

## 备忘录（Memento）

!!! abstract "意图"
    在不破坏封装的前提下，捕获并保存一个对象的内部状态，以便之后恢复。

### 结构

```java
// 备忘录：对外不可变，只能由原发器读取
public record EditorSnapshot(String content, int cursor) {}

// 原发器：负责创建和恢复快照
public class Editor {
    private String content = "";
    private int cursor = 0;

    public void type(String text) {
        content += text;
        cursor = content.length();
    }

    public EditorSnapshot save() {
        return new EditorSnapshot(content, cursor);
    }

    public void restore(EditorSnapshot snapshot) {
        this.content = snapshot.content();
        this.cursor = snapshot.cursor();
    }

    @Override
    public String toString() {
        return content + " (cursor=" + cursor + ")";
    }
}

// 管理者：只负责保存快照，不关心内容
public class History {
    private final Deque<EditorSnapshot> snapshots = new ArrayDeque<>();

    public void push(EditorSnapshot snapshot) {
        snapshots.push(snapshot);
    }

    public EditorSnapshot pop() {
        return snapshots.pop();
    }

    public boolean isEmpty() { return snapshots.isEmpty(); }
}

// 使用
Editor editor = new Editor();
History history = new History();

history.push(editor.save());
editor.type("Hello");
history.push(editor.save());
editor.type(" World");

editor.restore(history.pop());
System.out.println(editor); // Hello
```

### 适用场景

- 撤销/重做、事务回滚；
- 保存检查点、游戏存档；
- 需要快照但不想暴露对象内部结构。

### 权衡

- 优点：封装性好；状态恢复逻辑集中在原发器。
- 缺点：快照可能占用大量内存；频繁保存影响性能；需要处理深拷贝。

### 易错点

- 快照只做了浅拷贝，内部可变对象仍被共享；
- 无限保存快照导致内存泄漏，应限制历史长度或使用增量快照；
- 管理者直接修改备忘录内容，破坏封装。

---

## 观察者（Observer）

!!! abstract "意图"
    定义对象间的一对多依赖：当一个对象状态改变时，所有依赖它的对象都自动收到通知。

### 结构

```java
public interface Observer {
    void update(double temperature, double humidity);
}

public interface Subject {
    void register(Observer observer);
    void unregister(Observer observer);
    void notifyObservers();
}

public class WeatherStation implements Subject {
    private final List<Observer> observers = new CopyOnWriteArrayList<>();
    private double temperature;
    private double humidity;

    @Override
    public void register(Observer observer) { observers.add(observer); }

    @Override
    public void unregister(Observer observer) { observers.remove(observer); }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity);
        }
    }

    public void setMeasurements(double temperature, double humidity) {
        this.temperature = temperature;
        this.humidity = humidity;
        notifyObservers();
    }
}

public class PhoneDisplay implements Observer {
    @Override
    public void update(double temperature, double humidity) {
        System.out.printf("手机显示: %.1f°C, %.0f%%%n", temperature, humidity);
    }
}

// 使用
WeatherStation station = new WeatherStation();
station.register(new PhoneDisplay());
station.setMeasurements(26.5, 60);
```

### 推模型 vs 拉模型

| | 推模型 | 拉模型 |
| --- | --- | --- |
| 通知内容 | 直接把数据传给观察者 | 只通知"变了"，观察者自己来取 |
| 耦合 | 观察者依赖数据结构 | 观察者依赖 Subject 接口 |
| 灵活性 | 数据变化时接口要改 | 观察者按需获取 |

Java 内置的 `PropertyChangeSupport`、`java.util.Observable`（已废弃）、Spring 的 `ApplicationEvent`、响应式框架的 `Flow` API 都属于观察者思想的演化。

### 易错点

- 通知过程中修改观察者列表，导致 `ConcurrentModificationException`（用 `CopyOnWriteArrayList` 或先拷贝）；
- 观察者未注销，造成内存泄漏（长生命周期的 Subject 持有短生命周期对象）；
- 通知顺序被隐式依赖；
- 同步通知中观察者抛异常，导致后续观察者收不到通知——需要决定隔离策略；
- 观察者之间形成循环通知。

---

## 状态（State）

!!! abstract "意图"
    允许对象在内部状态改变时改变它的行为，看起来像修改了它的类。

### 结构

```java
public interface OrderState {
    void pay(Order order);
    void ship(Order order);
    void cancel(Order order);
}

public class Order {
    private OrderState state = new NewState();
    private String id;

    public Order(String id) { this.id = id; }

    public void setState(OrderState state) { this.state = state; }

    public void pay() { state.pay(this); }
    public void ship() { state.ship(this); }
    public void cancel() { state.cancel(this); }
}

public class NewState implements OrderState {
    @Override
    public void pay(Order order) {
        System.out.println("支付成功");
        order.setState(new PaidState());
    }

    @Override public void ship(Order order) {
        throw new IllegalStateException("未支付不能发货");
    }

    @Override
    public void cancel(Order order) {
        System.out.println("订单已取消");
        order.setState(new CancelledState());
    }
}

public class PaidState implements OrderState {
    @Override public void pay(Order order) {
        throw new IllegalStateException("已支付，请勿重复支付");
    }

    @Override
    public void ship(Order order) {
        System.out.println("已发货");
        order.setState(new ShippedState());
    }

    @Override
    public void cancel(Order order) {
        System.out.println("退款后取消");
        order.setState(new CancelledState());
    }
}
```

每个状态只处理自己允许的操作，非法操作在状态内部拒绝，避免出现散落各处的 `if (status == ...)`。

### 与策略的区别

两者结构几乎相同，区别在**谁决定切换**：

| | 状态 | 策略 |
| --- | --- | --- |
| 切换时机 | 状态对象内部根据事件自动切换 | 由客户端显式选择 |
| 关注点 | 对象生命周期中的状态流转 | 同一任务的不同算法 |
| 对象关系 | 状态之间通常知道彼此 | 策略之间通常互不知道 |
| 典型场景 | 订单、工单、电梯 | 折扣、排序、压缩 |

### 易错点

- 状态类之间互相创建，形成强耦合；可以用状态工厂或枚举管理；
- 状态转换散落在多个方法里，缺少统一的状态机定义；
- 把状态数据放在 Context 里又让 State 直接修改，破坏封装。

---

## 策略（Strategy）

!!! abstract "意图"
    定义一系列算法，把每个算法封装起来，并使它们可以互相替换。

### 结构

```java
public interface DiscountStrategy {
    BigDecimal apply(BigDecimal original);
}

public class NoDiscount implements DiscountStrategy {
    @Override public BigDecimal apply(BigDecimal original) { return original; }
}

public class PercentageDiscount implements DiscountStrategy {
    private final BigDecimal rate;

    public PercentageDiscount(BigDecimal rate) { this.rate = rate; }

    @Override
    public BigDecimal apply(BigDecimal original) {
        return original.multiply(BigDecimal.ONE.subtract(rate));
    }
}

public class FullReduction implements DiscountStrategy {
    private final BigDecimal threshold;
    private final BigDecimal reduction;

    public FullReduction(BigDecimal threshold, BigDecimal reduction) {
        this.threshold = threshold;
        this.reduction = reduction;
    }

    @Override
    public BigDecimal apply(BigDecimal original) {
        return original.compareTo(threshold) >= 0
                ? original.subtract(reduction)
                : original;
    }
}

// 上下文
public class Checkout {
    private DiscountStrategy strategy = new NoDiscount();

    public void setStrategy(DiscountStrategy strategy) {
        this.strategy = strategy;
    }

    public BigDecimal total(BigDecimal original) {
        return strategy.apply(original);
    }
}

// 使用
Checkout checkout = new Checkout();
checkout.setStrategy(new PercentageDiscount(new BigDecimal("0.2")));
System.out.println(checkout.total(new BigDecimal("100"))); // 80
```

### 替代 `if-else` 的正确姿势

策略模式常被用来消除长 `if-else`，但不要机械化：

- 如果分支很少且稳定，`if-else` 更直观；
- 如果分支对应不同算法且会持续增加，策略更合适；
- 用 `Map<String, Strategy>` 或 Spring 注入可以避免新增策略时修改选择逻辑。

Java 8 之后，只有一个方法的策略接口可以用函数式接口 + Lambda 简化：

```java
Map<String, UnaryOperator<BigDecimal>> discounts = Map.of(
        "none", x -> x,
        "vip", x -> x.multiply(new BigDecimal("0.9")),
        "sale", x -> x.subtract(new BigDecimal("10"))
);
```

### 易错点

- 客户端必须了解各策略的差异，选择逻辑仍然散落在客户端；
- 策略需要访问大量上下文数据，导致参数列表膨胀（可以把上下文封装成对象传入）；
- 策略对象有状态却被多个客户端共享。

---

## 模板方法（Template Method）

!!! abstract "意图"
    在父类中定义算法骨架，把某些步骤延迟到子类实现，使子类可以在不改变算法结构的情况下重定义特定步骤。

### 结构

```java
public abstract class DataImporter {
    // 模板方法：定义流程，声明 final 防止子类改变骨架
    public final void importData(String path) {
        String raw = read(path);
        if (!validate(raw)) {
            throw new IllegalArgumentException("数据校验失败");
        }
        List<Record> records = parse(raw);
        beforeSave(records);   // 钩子，可选
        save(records);
    }

    protected abstract String read(String path);
    protected abstract List<Record> parse(String raw);
    protected abstract void save(List<Record> records);

    protected boolean validate(String raw) {
        return raw != null && !raw.isBlank();
    }

    // 钩子方法：子类可选择性覆盖
    protected void beforeSave(List<Record> records) {}
}

public class CsvImporter extends DataImporter {
    @Override protected String read(String path) { /* 读文件 */ return ""; }
    @Override protected boolean validate(String raw) { return !raw.isEmpty(); }
    @Override protected List<Record> parse(String raw) { /* 解析 CSV */ return List.of(); }
    @Override protected void save(List<Record> records) { /* 写数据库 */ }
}
```

### 好莱坞原则

"Don't call us, we'll call you." 父类控制流程，在合适的时机回调子类。子类只提供步骤实现，不控制整体流程。

Java 中的例子：

- `AbstractList`、`AbstractMap`；
- `InputStream.read()` 与子类实现的 `read(byte[], int, int)`；
- JUnit 生命周期（`@BeforeEach` 等）；
- Servlet 的 `service()` 调用 `doGet()` / `doPost()`。

### 与策略的区别

| | 模板方法 | 策略 |
| --- | --- | --- |
| 复用方式 | 继承，父类控制流程 | 组合，客户端选择算法 |
| 扩展点 | 覆盖步骤方法 | 实现整个算法接口 |
| 运行时变化 | 固定（编译期确定子类） | 可动态切换 |
| 耦合 | 子类依赖父类 | 上下文只依赖策略接口 |

两者可以结合：模板方法中的某个步骤委托给策略对象。

### 易错点

- 模板方法没有声明 `final`，子类覆盖后破坏流程；
- 抽象方法过多，子类被迫实现不需要的步骤（违反 [接口隔离原则](../principles/interface-segregation.md)）；
- 父类调用子类方法时使用了子类尚未初始化的字段（构造器中调用模板方法是典型陷阱）。

---

## 访问者（Visitor）

!!! abstract "意图"
    表示一个作用于某对象结构各元素的操作。它使你可以在不改变各元素类的前提下定义新操作。

### 结构

```java
public interface ShapeVisitor<R> {
    R visit(Circle circle);
    R visit(Rectangle rectangle);
}

public sealed interface Shape permits Circle, Rectangle {
    <R> R accept(ShapeVisitor<R> visitor);
}

public record Circle(double radius) implements Shape {
    @Override
    public <R> R accept(ShapeVisitor<R> visitor) {
        return visitor.visit(this);
    }
}

public record Rectangle(double width, double height) implements Shape {
    @Override
    public <R> R accept(ShapeVisitor<R> visitor) {
        return visitor.visit(this);
    }
}

// 新操作：计算面积
public class AreaVisitor implements ShapeVisitor<Double> {
    @Override
    public Double visit(Circle circle) {
        return Math.PI * circle.radius() * circle.radius();
    }

    @Override
    public Double visit(Rectangle rectangle) {
        return rectangle.width() * rectangle.height();
    }
}

// 新操作：导出 SVG
public class SvgVisitor implements ShapeVisitor<String> {
    @Override
    public String visit(Circle circle) {
        return "<circle r=\"" + circle.radius() + "\"/>";
    }

    @Override
    public String visit(Rectangle rectangle) {
        return "<rect width=\"" + rectangle.width()
                + "\" height=\"" + rectangle.height() + "\"/>";
    }
}

// 使用
List<Shape> shapes = List.of(new Circle(2), new Rectangle(3, 4));
ShapeVisitor<Double> area = new AreaVisitor();
double total = shapes.stream().mapToDouble(s -> s.accept(area)).sum();
```

### 双重分派

`shape.accept(visitor)` 先根据 `shape` 的运行时类型分派到具体 `accept`，再由 `accept` 调用 `visitor.visit(this)`，根据参数类型分派到具体 `visit`。两次动态分派让操作与元素类型正确匹配。

### 适用场景

- 对象结构稳定，但需要频繁新增操作（编译器 AST、报表导出、序列化）；
- 需要对一组异构对象执行统一操作；
- 不希望把每个操作都塞进元素类。

### 权衡

| 变化方向 | 访问者模式 |
| --- | --- |
| 新增操作 | 容易，新增 Visitor 即可 |
| 新增元素类型 | 困难，所有 Visitor 都要改 |

这与 [开闭原则](../principles/open-closed.md) 形成取舍：访问者用"元素类型封闭"换取"操作开放"。

### 易错点

- 元素类型频繁增加时使用访问者，导致所有访问者反复修改；
- 访问者需要访问元素内部状态，破坏封装；
- 元素层次没有封闭（非 `sealed`），新增类型时编译器无法提醒。

---

## 如何选择

| 需求 | 推荐模式 |
| --- | --- |
| 请求需要多个处理者依次尝试 | 责任链 |
| 需要撤销、排队、记录操作 | 命令 |
| 简单 DSL / 规则表达式 | 解释器 |
| 隐藏集合内部结构，统一遍历 | 迭代器 |
| 对象间网状依赖需要收口 | 中介者 |
| 需要保存和恢复对象状态 | 备忘录 |
| 状态变化需要通知多个订阅者 | 观察者 |
| 对象行为随内部状态变化 | 状态 |
| 同一任务需要可替换的算法 | 策略 |
| 固定流程、部分步骤可变 | 模板方法 |
| 元素类型稳定、操作频繁增加 | 访问者 |

!!! tip "行为型模式的核心"
    它们几乎都在回答同一个问题：**把"变化"放到哪里**。责任链把处理者变成可扩展的链，策略把算法变成可替换的对象，状态把分支变成状态对象，观察者把依赖变成订阅关系。找到变化点，再选择模式，而不是反过来。
