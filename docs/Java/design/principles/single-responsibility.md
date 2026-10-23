---
tags:
- Java
- SE
- 可信认证
- 设计原则
---

# 单一职责原则（SRP）

!!! abstract "一句话"
    一个模块应该只有一个引起它变化的原因。

SRP 的英文是 **Single Responsibility Principle**，它是 SOLID 中最容易被误解的一条。"职责"不是"一个方法"或"一件小事"，而是**一个变化的原因**，更准确地说，是**一类使用者（actor）的诉求**。

## 为什么需要 SRP

当多个互不相关的需求挤在同一个类里时，它们的变化会互相牵连：

- 财务要改税率计算 → 改动订单类；
- 运维要换数据库 → 还是改订单类；
- 运营要调整小票格式 → 仍然改订单类。

结果是这个类被三拨人同时修改，合并冲突、回归风险、测试成本全部上升。SRP 想做的，是把"被同一类人、因同一个原因修改的代码"聚在一起，把无关的变化隔离开。

## 反例：一个类承担三种职责

```java
public class OrderProcessor {

    public BigDecimal calculateTotal(Order order) {
        BigDecimal total = BigDecimal.ZERO;
        for (Item item : order.getItems()) {
            total = total.add(item.getPrice().multiply(
                    BigDecimal.valueOf(item.getQuantity())));
        }
        return total.multiply(BigDecimal.valueOf(1.13)); // 税率硬编码
    }

    public void save(Order order) {
        try (Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/shop", "root", "123456")) {
            // 拼 SQL、写数据库
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public String render(Order order) {
        return "订单号：" + order.getId() + "\n合计：" + calculateTotal(order);
    }
}
```

这段代码至少有四个问题：

1. **业务规则**（金额、税率）、**持久化**（JDBC）、**展示**（文本格式）耦合在一起；
2. 税率一变，业务类要改；数据库一换，业务类还要改；
3. 无法在没有数据库的情况下单测金额计算；
4. `render` 为了拿总额又依赖了 `calculateTotal`，展示格式和计算规则被绑死。

## 重构：按变化原因拆分

```java
public record Order(String id, List<Item> items) {}
public record Item(String name, BigDecimal price, int quantity) {}

// 职责一：订单金额与税务规则
public class OrderCalculator {
    private final TaxPolicy taxPolicy;

    public OrderCalculator(TaxPolicy taxPolicy) {
        this.taxPolicy = taxPolicy;
    }

    public BigDecimal total(Order order) {
        BigDecimal subtotal = order.items().stream()
                .map(i -> i.price().multiply(BigDecimal.valueOf(i.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return taxPolicy.apply(subtotal);
    }
}

// 职责二：持久化
public interface OrderRepository {
    void save(Order order);
}

// 职责三：展示
public class ReceiptPrinter {
    private final OrderCalculator calculator;

    public ReceiptPrinter(OrderCalculator calculator) {
        this.calculator = calculator;
    }

    public String print(Order order) {
        return "订单号：" + order.id() + "\n合计：" + calculator.total(order);
    }
}
```

拆分后：

| 类 | 变化的原因 | 谁关心它 |
| --- | --- | --- |
| `OrderCalculator` | 税率、优惠规则变化 | 财务 |
| `OrderRepository` | 存储介质、表结构变化 | 运维 / DBA |
| `ReceiptPrinter` | 小票样式变化 | 运营 |

三者可以独立修改、独立测试，也可以分别被替换。

## 如何判断职责是否过多

!!! tip "几个实用信号"
    - 类名里出现 `And`、`Manager`、`Util`、`Handler` 却说不清它到底负责什么；
    - 类的字段来自不同层次：既有 `Connection`，又有 `BigDecimal`，还有 `StringBuilder`；
    - 描述这个类时需要用"并且"连接多个动词；
    - 修改一个需求时，需要同时改这个类的多个不相关方法；
    - 测试这个类时，不得不 mock 数据库、HTTP、文件系统。

需要强调的是，**SRP 不是按方法数量切分**。一个类可以有几十个方法，只要它们服务于同一个变化原因，就仍然符合 SRP；反过来，两个方法也可能分属不同职责。

## 边界：不要过度拆分

SRP 的代价是类变多、调用链变长。判断是否值得拆，看两个变化是否**真的会独立发生**。如果两个职责永远一起变化，硬拆只会制造无意义的间接层。

另外，职责的粒度取决于所处层次：在领域层，"订单"可以是一个聚合根；在展示层，"订单"可能只是一个 DTO。不要拿一个层次的职责划分去套另一个层次。

## 与其他原则的关系

- 与 [接口隔离原则](interface-segregation.md)：SRP 管"类的变化原因"，ISP 管"接口给调用方的最少承诺"，二者常一起使用。
- 与 [开闭原则](open-closed.md)：职责清晰的类更容易通过扩展来应对变化。
- 与 [依赖倒置原则](dependency-inversion.md)：把持久化抽成接口，本身就是 DIP 的应用，同时让 SRP 的拆分落地。

## 检查清单

- [ ] 能否用一句话说清这个类的职责，且不需要"并且"？
- [ ] 类的依赖是否来自同一个层次（都偏业务、或都偏基础设施）？
- [ ] 修改某类需求时，是否只影响一个类？
- [ ] 是否能为这个类写出不依赖外部系统的单元测试？
- [ ] 拆分是否对应真实存在的变化，而不是为了"看起来整洁"？
