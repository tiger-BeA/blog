---
title: Clean Code

---

# Clean Code

## 第一章 · 整洁代码

> 代码需要严谨、精确、规范和详细

### 为什么需要花时间保持代码整洁？

- 有关效率

  Lelanc法则(Late equals never) -> 混乱代码的恶性循环

  > 辩证看待TODO，自己写的和旧有的代码区别，慎重看待修改

- 有关生存

  新人加入 -> 不熟悉设计，难以理解和修改这些糟糕代码 -> 制造更多混乱 -> 团队生产力持续下降

### 赶进度 or 保证代码质量？

- 有卫护代码的热情
- 养成代码整洁思维：制造混乱无助于赶上期限，开发快的唯一办法——始终尽可能保持代码整洁

### 什么是整洁代码的艺术？

代码的质量是日积月累设计的结果

需要遵循大量小技巧，并日常刻苦习得"代码感"  -> 达到可判断代码优劣，借戒尺之力化劣为优 -> 可以选出最好方案，按图索骥

### 如何写整洁代码？

消除重复、提高表达力、提早构建简单抽象

- 减少重复代码
- 力求集中：每个函数、每个类和每个模块都专注于一件事（对象功能凝练(extract method重构）
- 有意义的命名(注释尽量表明代码为什么这样写，而不是解释这段代码在干什么，用命名去表达代码的意图)
- 干净利落的抽象(只包含必需之物)：可随需应变，方便持续改进；也可提醒自己，避免随意实现集合行为

### 易读 or 易修改？

- 易读：(后续开发代码时理解更快，能更快上手开发)
    - 代码应通过字面表达含义
    - 代码逻辑应当直截了当
    - 应有单元测试和验收测试(保证绝对的干净)

- 易修改：整洁的代码便于其他人增补，但不必过分强调

- 如何整洁代码 === 如何在意代码

> clean code is your dear baby which is designed by yourself.

## 第二章 有意义的命名

取个好名字，省下的时间比花掉的多，最难的地方在于需要良好的描述技巧和共有的文化背景。

> 总结一下“原则列表”，取一个能清楚表达其功能的、说人话的名字
>
> 最好团队成员之间有一个共用的取名习惯（规范文档 + 习惯）

### 原则列表

- 名副其实，见名知意

  最好不加注释，看名称就能知道其功能用处

- 避免误导

  譬如易误解的字母(l, o)，又或是变量命中包含名不副实的数据结构

- 做有意义的区分

  避免数字系列区分 / 冗余前后缀 / 废话修饰（以从读者角度能鉴别不同之处的方式区分）

  > 个人认为数字系列命名有时候也挺清楚的，比如传入变量的地位同等时
  >
  > checkCollide(shape1, shape2) { }
  >
  > 这部分指出的“有意义”，仁者见仁智者见智叭

- 使用读得出来的名称

- 使用方便搜索的名称

  例如用const的变量存起来多处会用到的数字/字符串之类的，变量名特殊些

- 避免使用编码

  避免把类型或作用域编进名称里，不易于他人理解，自找麻烦

  无意义的前后缀

- 避免思维映射

  善用其能，编写其他人能理解的代码（例如避免写耍宝的误导名称或者单字母变量名之类的）

- 类名和对象名应该是名词或名词短语，方法名应当是动词或动词短语

- 每个概念对应一个词

  例如fetch, retrieve, get混杂用于命名同类方法

- 别用双关语

  比如用add词命名，这块用于拼接或相加，那块用于添加新属性之类的，不易于理解和区分

- 添加有意义的语境

## 第三章 函数

###  函数要短小再短小

- 三四行，每个函数都一目了然，依序将你带到下一个函数
- 每行都不应过长
- if, else, while语句等，其中的代码块应该只有一行函数调用语句
  - 调用的函数应该有一个较具说明性的名称，一方面可以保持函数短小，另一方面函数名也具有说明解释作用
- 函数的嵌套不应多于两层

###  一个函数只做一件事，做好这件事

- 函数只做该函数名下同一抽象层上的步骤
- 如何判断函数是否只做了一件事？
  - 确保函数不能再被拆分

> 每个函数是如何引出下一个函数，如何保持在同一抽象层上的？

###  每个函数一个抽象层级

- 自顶向下读代码
  - 每个函数后面都跟着位于下一抽象层级的函数，让代码读起来像是一系列自定向下的TO起头段落
  - 人对于纵深信息的处理能力 远大于 对广度信息量

###  switch语句

- 很难写出短小的switch语句（if/else语句同样如是）——就事论事，不必强迫遵守
  - 将switch语句都埋藏在较低的抽象层级
  - 永不重复，只出现一次，用于创建多态对象
- 很难100%的执行

###  函数命名

- 函数越短，功能越凝练，越便于取一个好名字

- 确保函数功能与函数名的描述保持一致
  - 长且具有描述性的名称 > 短名称 + 描述性的长注释（将参数的名称编码成函数名）

    > `assertEqual(expeacted, actual)`改成`assertExpectedEqualsActual(expeacted, actual)`减轻了记忆参数顺序的负担

  - 良好的动词/名词对的形式

    > `write(name)`改成`writeField(name)`，告诉我们`name`是个`field`

- 命名方式保持一致（团队规范文档）

  - 使用与模块名一脉相承的短语、名词和动词给函数命名

- 选择描述性的名称有助于

  - 摸清模块的设计思路
  - 代码的改善重构

###  函数参数

零参数 > 单参数 > 双参数 > 三参数，应尽量避免三参数及以上函数

- 不要传递标识参数，向函数传入布尔值用于区分不同业务的做法很丑陋，应该拆分为多个函数

- 二元函数：

  - 有时两个参数正好，例如：`Point p = new Point(x, y)`
  - 两个参数的函数比一元函数难懂
  - 两个参数的前后顺序往往被搞错
  - 大多数情况应尽量将其转换为一元函数

- 参数对象，如果一个函数看起来需要三个以上的参数，就说明其中一些需要封装为类了

```js
  // bad
  Circle drawCircle(x: Number, y: Number, radius: Number);
  // good
  Circle drawCircle(point: Point, radius: Number);
```

  ```js
  // 也有必要的三元函数，例如计算斐波那契数列(极少数情况，不必钻牛角)
  function Fibonacci(n) {
      if (n <= 1) return 1;
      return Fibonacci(n - 1) * Fibonacci(n - 1);
  }
  Fibonacci(10) // 89
  Fibonacci(100) // 堆栈溢出
  Fibonacci(500) // 堆栈溢出
  
  function Fibonacci2(n, ac1 = 1, ac2 = 1) {
      if (n <= 1) return ac2;
      return Fibonacci2(n - 1, ac2, ac1 + ac2);
  }
  Fibonacci2(100) // 573147844013817200000
  Fibonacci2(1000) // 7.0330367711422765e+208
  Fibonacci2(10000) // Infinity
  ```

- 参数列表

```c
  // bad
  String.format('%s worked %.2f hours.', name, hours);
  
  // good
  public String format(String format, Object... args);
  ```

### 无副作用

- 避免使用输出参数

  - 信息从参数输入函数，再通过返回值从函数输出，而不是通过参数输出
  - 如果函数必须修改某种状态，就修改所属对象的状态

- 函数承诺只做一件事，但还是会做其他被藏起来的事（**纯函数的概念！！！**）
  - 会导致古怪的时序性耦合及顺序依赖

```js
/*
  我们要追求的是那种可靠的，每次能返回同样结果的函数
  而不是像`splice`这样每次调用后都把数据弄得一团糟的函数
*/
let xs = [1, 2, 3, 4, 5];

// 纯的
xs.slice(0, 3); // => [1,2,3]
xs.slice(0, 3); // => [1,2,3]

// 不纯的
xs.splice(0, 3); // => [1,2,3]
xs.splice(0, 3); // => [4,5]
```

### 命令与查询分离

函数要么做什么事，要么回答什么事，二者不可兼得

- 函数应该修改某对象的状态，或是返回该对象有关信息
- 两者都干会导致混乱

### 异常与错误

- 使用异常替代返回错误码
  - 使用`throw new Error(...)`代替`用主代码处理返回错误码`，这样就可以将错误处理代码从主路径中分离出来
- 抽离try/catch包含的代码块，将这个代码块抽象为一个函数
- 处理错误的函数(catch中的函数)只做错误处理，不作其他
  - try是该函数的第一个单词，在catch/finally后也不该有其他内容
- 不要将系统错误归咎于偶然事件

### 别重复自己

重复可能是软件中一切邪恶的根源，会导致

- 代码臃肿
- 当算法改变时，多出需要修改
- 增加了多次放过错误的可能性

### 结构化编程

- 只要函数够短小，偶尔出现`return`, `break`, `continue`语句没有坏处，甚至比单入单出原则更具表达力
- `goto`函数只有在大函数中才有道理，所以应该尽量避免使用

### 如何写出这样的函数

- 先写代码
  - 可能冗长且复杂，不过用单元测试，覆盖每行丑陋的代码
- 再反复打磨
  - 分解函数，修改名称，消除重复
  - 缩短和重新安置方法
  - 保持测试通过
- 遵循本章的规则，组装好这些函数

> 编写的函数必须干净利落地拼装到一起，形成一种准确而清晰的语言

## 第四章 注释

**注释总是一种失败，是为了弥补我们代码表达意图时的失败**

**注释一定是表达代码之外的东西，代码可以包含的内容，注释中一定不要出现**

- 一个好名字比好注释更重要

- 好代码 > 坏代码 + 好注释

  > 与其花事件编写解释糟糕代码的注释，不如花时间整理这堆代码

- 用代码阐述行为

  - 命名 -> 这段代码的功能
  - 简单明了的代码 -> 表明代码的行为
  - 注释 -> 表达代码以外的东西，解释代码为什么这么写（意图 / 警示），注释的是why而不是how

  > 只要多花点时间，就能用代码解释你大部分的意图

- 好注释：

  唯一真正好的注释，就是想办法不去写的注释

  - 法律信息——用链接一份外部文档/标准许可来干掉这块注释？
  - 提供函数基本信息
    - 在注释中用精心挑选的输入输出的例子进行说明
    - 尽量还是用函数名称表达意图
  - 解释意图
    - 提供有关实现的有用信息
    - 提供某个决定后面的意图
  - 将某些晦涩难明的参数 / 返回值翻译为某种可读形式
    - 尽量让参数/返回值足够清除
    - 如果参数/返回值是某个库/不可修改代码，阐述代码有用
  - 团队同一定义标记（**推荐**：vscode的标记高亮插件 [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)）
    - `TODO` 待处理的问题
    - `FIXME` 已知有问题的代码
    - `HACK` 不得不采用的粗糙的解决方案
    - `NOTE` 用于警示这样写的原因 / 某种不合理之物的重要性
  - 良好描述的公共API

- 典型的烂注释

  - 不恰当的信息
  - 废弃的注释
  - 冗余注释
  - 糟糕的注释
  - 注释掉的代码
  - 不要有循规式注释，比如setter/getter注释
  - 不要添加日志式注释，比如修改时间等信息（git可以做的事情）

```shell
# git技巧
git log -- filepath# 查看文件对应的commits

git blame -- filepath # 查看该文件所有提交者

git bisect (good / bad commitId) # 给commit打good/bad标记分组二叉树，方便日后查找commit 
```

## 第五章 格式

> - 选用一套管理代码格式的简单规则`eslint检测`
> - 团队应一致遵守某套简单的格式规则
> - 代码格式关乎沟通，沟通是开发者的头等大事(**格式就是为了可读性**)

### 垂直格式

- 垂直尺寸：源代码该有多大？普遍200行、最长500行，短文件通常比长文件易于理解
- 源文件要像报纸文章那样，名称简单且一目了然(TODO List般的写法)
- 不同思路的代码行之间，用空白行隔开
  - 每行表达一个表达式与字句，每组代码行展示一条完整的思路
  - 每条思路之间用空白行隔开，标识出新的独立概念
- 紧密相关的代码相互靠近
  - 对于那些关系紧密、放置在同一文件中的概念，它们之间的区隔应该成为相互的依赖度有多重要的衡量标准。应该避免迫使读者在源文件和类中跳来跳去
  - 变量声明靠近使用位置，本地变量在函数顶部，相关函数、概念相关代码放在一起，按调用顺序放置

### 横向格式

- 一行代码应该有多宽？尽力保持代码行短小，上限100-120个字符
- 空格字符的使用：强调运算符、强调相关性
- 水平对齐：没有必要
- 源文件是一种继承结构，要用缩进使其结构清晰可见

## 第六章 对象和数据结构

> 数据为何设为私有？不想暴露给别人，自己又能修改
>
> 为何要给私有变量添加set和get方法，将其公之于众，如同公共变量一般呢？

### 数据抽象

```java
// 具象点：非常清楚是在矩形坐标系中实现
public class Point{
    public double x;
    public double y;
}
```

```java
// 抽象点：不知道会实现在矩形坐标系还是极坐标系
public interface Point{
    double getX();
    double getY();
    void setCartesian(double x, double y);
    double getR();
    double getTheta();
    void setPolar(double r, double theta)
}
```

- 隐藏实现关乎抽象：只暴露抽象接口，以便用户无需了解数据的实现就可以操作数据本体
- 可以以更好的方式呈现某个对象包含的数据( **用函数名说明自己的目的** ）
- 不要乱加setter和getter

### 数据、对象的反对称性

- 对象
  - 将数据隐藏再抽象之后
  - 暴露操作数据的函数
- 数据结构
  - 暴露数据
  - 不提供有意义的函数
- 他们是对立的

```java
/* 过程式形状代码 */
public class Square{
    public Point topLeft;
    public double side;
}

public class Rectangle{
    public Point topLeft;
    public double height;
    public double width;
}

public class Geometry{
    public final double PI = 3.141592653589793;
    
    public double area(Object shape) throw NoSuchShapeException
    {
        if(shape instanceof Square){
            Square s = (Square)shape;
            return s.side * s.side;
        }
        else if(shape instanceof Rectangle){
            Square r = (Recangle)shape;
            return r.height * r.width;
        }
        else if(shape instanceof Circle){
            Square c = (Circle)shape;
            return PI * c.radius * c.radius;
        }
        throw new NoSuchShapeException();
    }
}

// 如果给Geometry类添加一个primeter()函数，那些形状类根本不会受它影响。
// 如果添加加一个新形状，就得修改Geometry中的所有函数来处理它。
```

```java
/* 多态式形状代码 */
public class Square implements Shape{
    private Point topLeft;
    private double side;
    
    public double area(){
        return side*side;
    }
}

public class Rectangle implements Shape{
    private Point topLeft;
    private double height;
    private double width;
    
    public double area(){
        return height * width;
    }
}
// area()方法是多态的。
// 如果添加一个新形状，现有函数一个也不会受影响。
// 如果添加一个新函数的话，所有形状都得做修改。
```

- 需要添加新数据类型而不是新函数——对象和面向对象
- 添加新函数而不是数据类型——过程式代码和数据结构

### The Law of Demeter

> - the law of demeter：模块不应了解它所操作对象的内部情形
>   - 对象不应通过存取器暴露其内部结构
> - 对于`class C`中的`f()`方法只应该调用以下对象的方法
>   - `C`
>   - 由`f`创造的对象
>   - 作为参数传给`f`的对象
>   - `C`的本地变量持有的对象
> - 方法不应调用由任何函数返回的对象的方法

### 火车失事

```java
// bad: 连串调用上个函数返回对象的方法
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();

// good
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();s
```

### 混杂

- 一半是对象，一半是数据结构
  - 既增加了添加新函数的难度，也增加了添加新数据结构的难度

### 隐藏结构

- 假如 ctxt、Options 和 ScratchDir 是拥有真实行为的对象呢？

  - 我们不应该能够看到内部结构，如何才能取得临时目录的绝对路径呢？

  ```java
  ctxt.getAbsolutePathOfScratchDirectoryOption();
  // 可能导致ctxt对象中方法的曝露
  ```

  或者

  ```java
  ctxt.getAbsolutePathOfScratchDirectoryOption();
  // 可能导致ctxt对象中方法的曝露
  ```

  所以，直接让 ctxt 对象来做这件事！

  ```java
  BufferedOuputStream bos = ctxt.createScratchFileStream(classFileName);
  // ctxt隐藏了其内部结构，防止当前函数因为浏览它不该知道的对象而违反得墨忒耳律
  ```

### 数据传送对象

- 数据传送对象**DTO**：最为精炼的数据结构，只有公共变量、没有函数的类

  - 在与数据库通信/解析套接字传递的消息之类的场景中

- bean结构：

  - 拥有由赋值器和取值器操作的私有变量

    ```java
    public class Address{
        private String street;
        private String streetExtra;
        private String city;
        private String state;
        private String zip;
        
        public Address(String street, String streetExtra, 
                       String city, String state, String zip){
            this.street = street;
            this.streetExtra = streetExtra;
            this.city = city;
            this.state = state;
            this.zip = zip;
        }
        
        public String getStreet(){
            return street;
        }
        
        public String getStreetExtra(){
            return streetExtra;
        }
        
        public String getCity(){
            return city;
        }
        
        public String getState(){
            return state;
        }
        
        public String getZip(){
            return zip;
        }
    }
    ```

  - Active Record是一种特殊的DTO形式
    - 拥有公共(或bean-accessed, 即自定义setter和getter方法访问)变量的数据结构，通常也有类似save和fint这样可浏览的方法
    - 一般是用于对数据库表/其他数据源的直接翻译

### 小结

- 对象曝露行为，隐藏数据。便于添加新对象类型而无需修改既有行为，同时也难以在既有对象中添加新行为
- 数据结构曝露数据，没有明显的行为。便于向既有数据结构添加新行为，同时也难以向既有函数添加新数据结构

## Thinkings

### Lombok

#### 使用方法

通过注解的方式，在编译时自动为属性生成构造器、getter/setter，equals，hashcode，toString方法，省去了手动重建这些代码的麻烦，使代码看起来更简洁

#### 原理

1. javac对源码进行分析，生成一颗AST
2. lombok对得到的AST进行处理，找到@Data注解锁在类对应的AST，然后修改该AST，添加getter/setter方法定义的相应树节点
3. javac使用修改后的AST生成字节码文件，即给class增加新的节点(代码块)

#### 副作用

- @Data注解

  - 会为类的所有属性自动生成getter/setter，equals，hashcode，toString方法，若为final属性，则不会为该属性生成setter方法
  - 太过残暴：因为集合了@ToString，@EqualsAndHashCode，@Getter/@Setter，@RequiredArgsConstructor所有特性，不够精细

- [@Builder注解的副作用](https://wiki.zhenguanyu.com/Dev/PrivilegeApplication)

  - 目的：为Lombok Builder提供默认值的方法

    - 为了实现一个可用的类，需要给每个字段实现一个getter，另外，如果希望将这个类用于ORM，还需要一个默认构造函数

    ```java
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class Pojo {
      private String  name;
    	private boolean original;
    }
    ```

  - 副作用：针对无参构造函数会有Builder.Default和无参构造函数的矛盾

    - 双重初始化 / 代码重复 / 强制添加实例化类为了创建一个Builder实例

### 链式调用和demeter定律的关系

demeter定律：人可以命令一条狗行走，但不应该直接指挥狗的腿行走，应该由狗自己去指挥控制自己的腿如何行走

- demeter定律不鼓励使用多个点
  - 第一个点是从ObjectA调用的方法，返回ObjectB类型的对象
  - 下一个点是只在ObjectB中可用的方法，返回ObjectC类型的对象
  - 下一个点是只在ObjectC中可用的属性
  - ….

在我看来，**如果每个点的返回对象与原始调用者的类型仍然相同，则不违反Demeter法则**

```typescript
const numbers: number[] = new Array<SomeObj>();
// initialize data here...
return numbers.filter(val => val == someValue).sort(someOperation);
```

### 如何看待带业务逻辑的getter和setter

1. 与其频繁写getter/setter，为何不直接public?
   - 两者的主要区别在于保持对该属性的控制
   - 如果你把某个字段公开，意味着你可以直接访问调用方，例如，可以将字段设置为空值，如果在另一个方法中使用该字段，该方法可能会因空指针而崩溃
   - getter/setter起到保险丝与熔断器的作用，电流必须通过保险丝，如果发生故障，熔断器与主电路分离，电路是安全的。如果出现任何错误，setter不会将值传给该成员字段

2. 最好不写任何东西在getter和setter中
   - 我们只返回并设置字段，就像public一样，通过编写getter和setter，我们创建了一个用于将来添加任何验证方法的条款。如果将来出现任何错误，我们只是在setter中添加验证逻辑
     - 当一个字段没有这样的验证约束时，为什么要麻烦的写getter/setter？我可以简单地公开它
   - 问题的症结在于避免使代码变得不必要的复杂。当有人试图使他们的代码基础更加通用，适用于任何变化。虽然他想到的大部分变化永远不会到来，所以无业务逻辑getter/setter不会使代码复杂
   - 不要为了少写`()`而将逻辑写在getter中：用函数来处理逻辑，用getter来单纯获取数据

## 第七章 错误处理

> 错误处理很重要，但如果搞乱了代码逻辑就是错误做法——整洁又强固的代码

### 异常处理

- 遇到错误，抛出一个异常
  - 调用代码很整洁，逻辑不会被错误处理搞乱
- 先写`try-catch-finally`语句
  - 用try-catch定义事务范围 -> 用`TDD`(测试驱动)方法构建剩余的代码逻辑 -> 帮助维护好该范围内的事物特征
    - 尝试编写强行抛出异常的测试
    - 再往处理器中添加行为，使之满足测试要求
- 给异常发生的环境说明，来判断错误的来源和处所
- 依(调用者)需要定义异常类
- 如果一段代码的异常只是一个特殊情况，可以用特例模式，比如当`length < 0`时直接`return`这种情况应干什么即可

### 别返回和传递`null`值

- 返回`null`会使后面代码不断检查是否为`null`以防止程序崩掉
- 我们对`null`值几乎没有什么好的既优雅又完美解决了问题的方法，所以这时候禁止传递`null`值会大大避免这种无心之失

### 小结

- 整洁代码是可读的，但也要强固。可读和强固并不冲突
- 将错误处理隔离看待，独立于主要逻辑之外，就能写出强固而整洁的代码

## 第八章 边界(引用库或他人代码)

### 优雅使用第三方库

- 大多数人是通过花好几天阅读文档，再决定如何使用，然后编写。最后不免陷入漫长调试中。因为学习第三方库代码很难，整合第三方代码也很难
- 优雅使用第三方库，应该换一种方法

### 优雅使用的方式——编写学习性测试

- 初步罗列功能
  - 找到最基础的文档(用来给初次使用者阅读的)，开始阅读文档
  - 每读完几个api，便开始整合完成你想要的一个功能，写一个类的一个函数将其封装起来
- 开始测试
  - 如果不需要深入理解他人代码，测试所需功能即可
  - 如果想要开发超过百行的有关代码，还是将最基础文档的api全部测试一遍好
- 测试
  - 对函数分别调用，从中弄懂参数和返回值的真正意义，并以此弄清当前函数整合的所有api干了什么
- 封装自己的函数
  - 测试完成后应该只用自己封装起来的函数写自己的函数
  - 当需要调用新的api，如果这个api属于之前的某个功能，就写进那个功能对应的函数
  - 如果是新的功能，则应该考虑写新的类、新的函数

### 编写学习性测试的好处

- 减少了学习成本，减少了混乱的调试，比以前的方法更有效
- 当他人的代码更新后，API作用可能会发生改变，此时可能产生兼容性问题，造成你的程序大范围的出错，并且不易于定位错误，修改代码的代价巨大
- 但是通过编写学习性测试，我们只需将之前编写的函数重新测试一遍，再把出错的函数修改即可
- 使用尚不存在的代码
  - 在写代码之前，先编写类似学习性测试的代码（即所需功能的函数）
  - 这样一切我们程序所需调用的函数皆在掌控之中，通过这个过渡层，将不同人编写的代码融合
  - 有助于保持多方开发的代码更可读
  - 有助于集中它该完成的工作

### 整洁的边界

- 有良好的软件设计，无需巨大投入和重写即可进行修改
- 边界上的代码需要清晰地分割和定义了期望的测试
  - 避免我们的代码过多的了解第三方代码中的特定信息
  - 通过代码中少数几处引用第三方边界接口的位置来管理第三方边界

## 第9章 单元测试

### 单元测试代码的要求

- 测试应与生产代码应在同一个时间段内编写
  - 先写测试代码再写生产代码
  - 每编玩一个新的功能，就应该写测试来检验功能的是否实现
  - 每次更改生产代码，也应修改测试代码

- 保持测试代码的整洁
  - 不要以为只是测试就不写整洁的代码，脏测试等同于没测试
  - 测试必须随生产代码的演进修改，测试代码越脏，越难修
  - 修改生产代码后，测试就会开始失败，随着版本的演进，团队维护测试代码的代价也在上升，而随着开发的进行，开发压力的一直增大，最终会导致开发者扔掉整个测试
  - 一旦没了测试代码，程序员就失去了确保对代码的改动能如愿工作的能力——整个生产代码开始腐坏！！

### 编写单元测试的技巧

- 每个测试一个断言
  - 每个测试中的断言，要尽可能少！不能把不同的测试放在一起
- 我们通过**打造一套包装这些api的函数和工具代码**，这样就可以更方便的编写测试，写出来的测试可读性高
  - 我们通过测试那些函数和工具代码，从而测试那些api
- 函数和工具代码也以功能为构建目标，不同的功能用不同的函数
- 这种测试的函数和代码工具并非当初就设计出来，而是在对那些充满令人迷惑细节的测试代码进行后续重构时逐渐演进

### 测试带来的好处

- 单元测试让你的代码可扩展，可维护，可复用
- 没有测试，每次修改都可能带来缺陷

### 编写单元测试的模式

- 单元测试可以采取构造-操作-检验模式写成一个函数，也就是将测试拆分为三个环节
  - 第一个环节：构造测试数据
  - 第二个环节：操作测试数据的
  - 第三个环节：检验操作是否得到期望的结果

### 测试代码与生产代码的不同

- 测试代码应当简单精悍足具表达力
  - 有些事你大概永远不会在生产环境中做，而在测试环境中做却完全没问题，通常这关乎内存和upu效率的问题(比方要求在多少秒内，内存不应该超过多少多少)。
- 测试代码应该极具阅读性

### 整洁的测试遵循的规则

- 快速：测试应该足够快
  - 测试过于缓慢 -> 你就会不想频繁地测试 -> 不能尽早发现问题 -> 导致代码将腐化

- 独立：测试之间应该相互独立，一个功能一个功能的测试，不会相互依赖，可以以任何顺序运行测试

- 可重复：测试应当可在任何反应中重复通过。

- 自足验证：测试的结果应该明显，最好是boolean值，不应通过查看日志这种低效率的方法来判断测试是否通过。应当由程序来判断
- 及时：测试应该及时编写。单元测试，应该恰好在使其通过的生产代码之前编写。

## 第10章 类

> 系统应该由许多短小的类而不是少量巨大的类组成。每个小类封装一个权责，只有一个修改的原因，并与少数其他类一起协同达成期望的系统行为

- 原则一：合理地分布类中的代码，类中代码的分布顺序大致是：(符合自顶向下的原则，让程序读起来像一篇报纸文章)
  - 公有静态常量
  - 私有静态变量
  - 公有普通变量
  - 私有普通变量
  - 公共函数
  - 私有函数
- 原则二：尽可能地保持类的封装
  - 尽可能使函数或变量保持私有，不对外暴露太多细节
- 原则三：类应该短小，尽量保持**单一权责原则**
  - 类或模块应有且只有一条加以修改的理由
  - 保持函数和参数短小的策略，有时候会导致为一组子集方法所用的实体变量增加。我们应该尝试将这些方法拆分到两个或者多个类中，让新的类更为内聚
- 原则四：合理提高类的内聚性
  - 我们希望类的内聚性保持在较高的水平
  - 内聚性高，表示类中方法和变量相互依赖，相互结合成一个逻辑整体
- 原则五：有效地隔离修改
  - **依赖倒置原则**(类应该依赖于抽象，而不是依赖于具体细节)
  - 尽量对设计解耦，做好系统中的元素的相互隔离，做到更加灵活与可复用

## 第11章 系统

> 城市能运转，是因为它演化出恰当的抽象等级和模块，好让个人和他们所管理的"组件"，即便在不了解全局时也能有效运作。
>
> 目的：如何在较高的抽象层级——系统层级——上保持整洁

### 将系统的构造与使用分开

> 将对象构造的启始和设置过程，从正常运行时逻辑中分离出来，确保拥有解决主要依赖问题的全局性一贯策略

方法罗列：

- main函数创建系统所需的对象，再传递给应用程序，应用程序只管使用
- 用抽象工厂模式让应用自行控制何时创建对象，而构造的细节却隔离于应用程序代码之外
- 依赖注入
  - 对象不应负责实体化对自身的依赖，应当将其转交给其他专注于此的对象(即main例程或特定目的容器)
  - ….

### 最佳系统架构实现

- 分离构造与使用
- 模块化和关注面切分 -> 分散化管理和决策 -> 可延迟决策 -> 复杂性降低，质量上升
- 无侵害性整合不同领域(举例：`ytk-jsbridge`)
- 在所有抽象层级上，意图清晰可辨，使用类方面的机制来无损地组合其他关注面

## 第12章 迭代

> 简单设计四大原则：
>
> - 运行所有测试
> - 不可重复
> - 保证表达力
> - 尽可能减少类和方法的数量

### 原则1: 运行所有测试

- 系统可测试，就会导向保持短小且目的单一的设计方案
- 测试编写越多，就越能持续走向编写较易测试的代码
- 测试消除对清理代码就会破坏代码的恐惧
- 产出更好更简单的设计

### 原则2-4: 重构

- 提升内聚性，降低耦合度，切缝关注面，模块化系统性关注面，缩小函数和类的尺寸，选用更好的名称等等

### 不可重复

- 重复表示额外工作 + 额外风险 + 不必要的复杂度
- 发现重复 -> 共性抽取 -> 将新方法分解到另外的类中提升可见性 -> 发现更好的抽象方法 -> 有更多场景可复用

### 表达力

- 软件项目的主要成本在于长期维护
- 为了在修改时尽量降低出现缺陷的可能性, 很有必要理解系统是做什么的
- 当系统变得越来越复杂, 开发者就需要越来越多的时间来理解它, 而且也极有可能误解
- 所以, 代码应当清晰地表达其作者的意图(好的命名 + 良好的单元尝试 + 不断尝试优化)

## 第13章 并发编程

> 并发是一种解耦策略，它帮助我们把做什么（目的）和何时（时机）分解开

### 误解

- 并发总能改进性能
  - 并发在CPU有很多空闲时间时能明显改进程序性能，但当线程数量较多时，线程间频繁调度切换反而会让系统性能下降
- 编写并发程序无需修改设计
  - 目的与时机的解耦往往会对系统结构产生巨大影响
- 在采用Web或EJB容器时，理解并发问题并不重要
  - 只有了解容器在做什么，才能更好使用容器

### 中肯说法

- 并发会在性能和编写额外代码上增加一些开销
- 正确的并发是复杂的，即便对于简单问题也是如此
- 并发中的缺陷因为不易重现也不易被发现，往往被忽略
- 并发常常需要对设计策略的根本性修改

### 并发编程的原则和技巧

- 单一职责原则
  - 分离并发相关代码和其他代码(并发相关代码有自己的开发、修改和调优生命周期)
- 限制数据作用域
  - 两个现成修改共享对象的同一字段时可能会互相干扰，导致不可预期的行为，解决方案之一时构造临界区，但是必须限制临界区的数量
- 使用数据副本
  - 可以避免共享数据
  - 复制出来的对象以只读的方式对待
  - 可能要补偿额外的创建成本和垃圾数据开销
- 线程尽可能独立
  - 让线程存在于自己的世界中，不与其他线程共享数据

### 并发模型

- 生产者 - 消费者
- 读者 - 写者
- 哲学家进餐

## 第17章 味道与启发

> 决定去学习一件事情，首要就是认同其跟从的价值，作者提到
>
> “这份启发与味道的清单很难说已完备无缺。我不能确定这样一份清单会不会完备无缺。但或许完整性不该是目标，因为该清单确实给出了一套价值体系。这套价值体系才该是目标。”
>
> clean code首先需要程序员在意自己的代码，且有心去逐步提升自己代码的质量。有了这样相同的价值认知，剩下的就是反复改进自己的代码，按照书中的建议或者自己收获的心得，一步步提高自己代码的质量

### 代码的坏味道

- 膨胀剂
  - 太长的方法
  - 太大的类
  - 基本类型偏执：-> 简单地为一些经常出现的基本类型建立对象，如开始/结束时间表示一个时间范围
  - 太多参数
  - 数据泥团：一些数据项总是一起出现使用 -> 可以单独提出来
- 滥用OO
  - Switch语句
  - 令人迷惑的临时字段
  - 被拒绝的馈赠：继承情况下，子类可能存在不支持父类的情况，或者不全支持，那可能是继承关系出现问题了
  - 异曲同工的类
- 难以修改
  - 发散式变化：类的职责过多，有很多因素会引起其变化(不同的需求都会修改同一个文件，导致经常冲突，不能顺利地并行开发)
  - 散弹式修改：改一个需求要修改很多文件，说明没有将强内聚的代码归拢到一起
  - 平行继承体系：比如一个类中的方法，复制来复制去，如果需求要改动时，要改动所有这些类
- 可有可无
  - 注释：大部分注释无用，注释应该描述`为什么这样做`，而不是`怎么做`，方法体内的注释基本都可以通过抽取方法 + 一个有意义的名字来解决
  - 重复代码
  - 冗余类
  - 数据类
  - 死代码：永不被调用的方法应该丢弃，纯属浪费，别害怕删除函数，记住，源代码控制系统还会记得它
  - 夸夸其谈其未来性：有时候我们会为类/方法加上一些不需要的东西，期待应对未来需求变化，但事实上基本永远不会被执行
- 耦合
  - 特性依恋
  - 狎昵关系
  - 消息链
  - 中间人
  - 不完整的类库

### 味道处理清单

- 注释
  - 不恰当的注释 —— 注释只应该描述有关代码和设计的技术性信息
  - 废弃的注释 —— 注释也需要维护，避免误导
  - 冗余的注释 —— 注释应该谈及代码自身没提到的东西
  - 糟糕的注释 —— 保持简洁和正确拼写
  - 注释掉的代码 —— 结合git的用法
- 环境
  - 用单个命令签出系统，用单个指令构建它
  - 发出单个指令就可以运行全部测试
- 函数
  - 过多参数——避免三个以上
  - 输出参数——参数用于输入而且输出，非要修改，就修改对象状态
  - 标识参数——布尔值说明函数不止做了一件事
  - 死函数——永不调用的方法要废弃
- 一般性问题
  - 一个源文件多种语言
  - 明显的行为未被实现——（最小惊异原则）考虑读者依靠对函数名的直觉，觉得理应被实现的行为，增强信赖度
  - 不正确的边界行为——追索每种边界条件，并编写测试
  - 忽视安全——认真看待每条warning
  - 重复——将重复代码放进类似的抽象中，提升抽象层级，例如用多态代替重复的判断代码块
  - 错误抽象层级上的代码——分离位于不同层级的概念，将其放到不同容器中，分离要完整
  - 基类依赖于派生类——基类应该对其派生类一无所知，有限状态机除外
  - 信息过多——尽量保持接口紧凑，耦合度较低，暴露依赖方法少
  - 死代码——例如不会发生的if条件，不会有异常的catch块，永不调用的方法，删掉
  - 垂直分隔——相关函数/变量的位置要接近其被调用的位置
  - 前后不一致——fetch/get
  - 混淆视听——不被实现的默认构造器 / 不被用到的变量函数 / 无用的注释，删掉
  - 人为耦合 —— 没有直接目的的模块间的耦合，不要随时放置
  - 特性依恋 —— 将一个类的内部情形暴露给其他类，类方法只应对其所属类中的变量和函数感兴趣
  - 选择算子参数 —— 用标识参数使函数有不同行为，应拆分成多个函数行为
  - 晦涩的意图——代码要短小紧凑，具有表达力
  - 位置错误的权责 —— (最小惊异原则)代码应该放在读者自然而然期待其所在地方
  - 不恰当的静态方法——静态函数不要有多态行为
  - 使用解释性变量 —— 将计算过程打散成用有意义的单词命名变量作为中间值，提升表达力
  - 函数名称应该表达其行为
  - 理解算法——重构函数，得到某种整洁且足具表达力，清楚表达如何工作的代码(不确定算法是否恰当是正常的，而不确定代码做什么却是一种懒惰行为)
  - 将逻辑依赖改为物理依赖 —— 依赖者模块不应对被依赖者有假定的逻辑依赖，而应该创建一个方法来物理化这种依赖
  - 用多态替代多次出现的if/switch语句
  - 一个团队内应该遵循一套约定
  - 用良好命名的常量代替不知所谓的数字表达
  - 准确——代码中含糊不准确的，要消除
  - 结构甚于约定——命名约定很好，但却次于强制性的结构，例如基类优于重复的switch语句
  - 封装条件——把判断条件中，解释条件意图的函数封装成命名良好的函数
  - 避免否定条件——尽量将条件表达为肯定形式
  - 函数只做一件事
  - 掩蔽时序耦合——通过创建顺序队列暴露时序耦合，增加函数复杂度其次，暴露真正的时序复杂性更重要
  - 别随意——构建代码需要理由，应和代码结构相契合，减少他人的对你代码的发挥
  - 封装边界条件——将处理边界条件的代码集中到一处
  - 函数中的语句应该在同一抽象层级上——拆分不同抽象层级是重构最重要功能之一
  - 在较高层级放置可配置数据——高层级的配置常量易于修改
  - 避免火车失事——遵守demeter定律
- 命名
  - 采用描述性命名
  - 名称应与抽象层级相符
  - 团队内命名标准应一致
  - 长且描述性好的命名
  - 名称和作用范围广度有关：越广越长越准确
  - 避免编码
  - 名称应说明函数、变量或类的一切信息，不要遮蔽副作用
- 测试
  - 测试边界条件
  - 使用覆盖率工具
  - 测试速度快

## 总结

#### clean code的大前提

- 代码大部分时候是用来维护的，而不是用来实现功能的
  - 代码一方面为了编译好让机器执行，完成功能需求
  - 一方面写给团队的其他人/自己看，需要长期维护
  - 清晰好看代码的追求精神，比所有技巧都重要
- 优秀的代码大部分是可以自描述的，比文档和注释都好
  - 适合写注释的场景：
  - public interface，向别人明确发布你功能的语义，输入输出，且不需要关注实现
  - 功能容易有歧义的点，或者涉及比较深层专业知识的时候
- 设计模式只是手段，代码清晰永远是第一准则
  - 无论你用了如何高大上的设计，如果大多数人不能理解你的代码或者读起来费劲的话，其实是失败的设计
  - 如果系统内大部分的抽象只有一个实现，各种工程，各种继承，需要想想是否设计过度了

### clean code常见手段

- code review
  - 提出意见和重构方式：除了基本功能逻辑合理没有bug外，代码的设计与风格也很重要，例如相似功能是否可以抽取出来复用，代码太过冗余难懂
  - 通过看他人代码，也是个学习和相互借鉴的过程
- 勤于重构 —— 如何避免重构带来的负面影响(好的代码不是一蹴而就的，好的设计也有可能随着业务的快速迭代被改的面目全非)
  - 掌握一些常见的"无痛"重构技巧
  - 小步快跑，改一点，测试一点，一方面减少代码merge的痛苦，另一方面减少上线的风险
  - 建立自动化测试机制，要做到即使代码改坏了，也能保证系统最小核心功能的可用，并且保证自己修改的部分被测试覆盖到
  - 熟练掌握IDE的自动重构功能
- 静态检查
  - 静态检查工具：发现bug和风格不好比较容易的方式
- 多读开源代码和身边优秀同学的代码

### clean code常见技巧

#### 通用技巧

- 单一职责——要定义的东西，如果不能用一句话描述清楚职责，就将其拆掉
- 优先定义整体框架(**广度优先 > 深度优先**)
  - 先写很多空实现，将整体业务流程串联起来
  - 用良好的方法签名，用入参和出参来控制整体流程
  - 为每个阶段编写合适的方法/类归属
  - 即使开始写代码时不清晰，也要通过不断重构，使代码达到这样的成色
- 清晰的命名
  - 是代码自描述最重要的基础
- 避免过长的参数
  - 通过构造paramObject来解决
- 避免过长的方法和类——简单地将方法和类按职责拆细，常见的拆分维度是横向/纵向。例如service类，处理和一个库表对象相关的所有逻辑
  - 横向拆分就是根据业务将建立/更新/修改/通知等逻辑拆到不同类中
  - 纵向拆分就是将数据库操作/canche操作/对象校验等，拆到不同对象中去，让主流程简单可控，让同一个类表达同个纬度的东西
- 让相同长度的代码表示相同粒度的逻辑
  - 尽量多的抽取private方法，让代码具有自描述能力

#### 面向对象设计技巧

- 贫血与领域驱动

  - 一个好的系统，离不开一套好的模型定义
  - 梳理清楚系统中的核心模型，清楚的定义每个方法的类归属，无论对于代码的可读性、可交流性，还是和产品的沟通，都是有莫大好处的
- 为每个方法找到合适的类归属，数据和行为尽量要在一起

  - 如果一个类的所有方法，都是在操作另一个类的对象。这时候就要仔细想一想类的设计是否合理了。理论上讲，面向对象的设计，主张数据和行为在一起。这样，对象之间的结构才是清晰的，也能减少很多不必要的参数传递
  - 例外——service对象：如果一个行为，无法明确属于哪个领域对象，牵强地融入领域对象里，会显得很不自然。这时候，无状态的service可以发挥出它的作用（但一定要把握好这个度，回归本质，我们要把属于每个模型的行为合理的去划定归属）
- 警惕static方法
  - static方法，本质上来讲是面向过程的，无法清晰地反馈对象之间的关系
  - static真正适用的场景：工具方法，而不是业务方法
- 巧用method object方法
  - method object是大型重构的常用技巧
  - 当一段逻辑特别复杂的代码，充斥着各种参数传递和是非因果判断的时候，首先想到的重构手段是提取method object
  - 所谓method object，是一个有数据有行为的对象，依赖的数据会成为这个对象的变量，所有的行为会成为这个对象的内部方法
  - 利用成员变量代替参数传递，会让代码简洁清爽很多
  - 并且，把一段过程式的代码转换成对象代码，为很多面向对象编程才可以使用的继承／封装／多态等提供了基础

- 面向接口编程
  - 便于实现替换
  - 可以避免public方法的膨胀
  - 代码会自然变得清晰易读，只有关注的人才会去看实现，一般使用者者关注接口实现就可
- 正确使用继承和组合
  - 组合的使用一般情况下比继承更为灵活，尤其是单继承的体系里，所以倾向于使用组合，会让子类承载很多不属于自己的职能
  - 继承更多的是为扩展提供便利，为复用而存在的方法最好使用组合的方式

#### 代码复用技巧

- 模板方法
- 责任链
  - 很多通用的代码可以在责任链原子对象的基类里实现
  - 代码清晰，开闭原则，每当有新的行为产生的时候，只需要定义行的实现类并添加到集合里即可
  - 为并行提供了基础
- 为集合显式定义其行为
  - 对于有明确语义的集合的一些操作，尤其是全局的集合或者被经常使用的集合，做一些封装和抽象
  - 如把Map封装成一个Cache类或者一个config类，再提供GetFromCache这样的方法





















