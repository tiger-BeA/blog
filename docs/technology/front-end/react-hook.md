---
title: React Hook
---

# React Hook

## Function Vs Class

### Class 组件的缺陷

1. this 的指向<br><img src="https://img-pub.fbcontent.cn/1634788362091_vlneswhzs.png" style="zoom:50%;" />
2. 编译后的可读性差且性能不好
   1. js 本身实现的类比较鸡肋
   2. class 组件在 react 内部实际还是当做 Function 类来处理的

### Function 组件的缺陷

1. function 本身无状态无存储，依赖 props 传入来响应变更，故而最外层还是得依赖一个 class component

### Function + hook

要解决 function 的缺陷，关键在于让 function 组件自身具备状态处理的能力，即组件首次 render 后，能够通过某种机制再次触发自身状态变更，实现 re-render，即 hooks

hooks 诞生的原因就是为了便于静态分析依赖，简化 immutable 数据流的使用成本

## Hooks 的实现和使用

### 介绍

#### Fiber 是什么？

Fiber 是 react16 中的协调引擎，主要目的是使 virtual dom 可以进行增量式渲染

#### 注意事项

- 只能在 function 组件中使用 hook
- 必须在函数组件顶部作用域调用 hooks api
  - state 是一个对象，对应 `FiberNode` 中的 `memoizedState`属性，在 class 组件中调用 `setState()`时等同于更新 `memoizedState`，但在 functino 组件中， `memoizedState`被设计成一个链表。首次 render 后，react 就初始化了一个 Fiber 链表结构，之后只能通过`useState`这个 hook 返回的 dispatch 修改对应 FiberNode` 的 `memoizedState，因此必须要保证 hooks 顺序不变（对应链表的结点不变，才能修改作用到正确的链表结点上），故而只有放在顶层调用才能保证各个 hooks 的执行顺序

### UseContext

#### API 示例

```react
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

// 提供默认值 themes.light
const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 获取最近父元素上 provider 上获取的值，这里为 dark
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

#### 应用场景

方便组件之间状态共享，不用再层层传递

#### Q&A

##### 状态管理方案如何选取？context 是否可以代替 redux？

### UseEffect

#### API 示例

```react
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  }
  // effect 的 deps 数组项，发生变化时才会触发重新创建
}, [props.source]);
```

需要在[]中声明所有在外部作用域中发生变化且在 effect 中使用到的变量，否则就会引用到先前渲染中的旧变量

#### 应用场景

处理 function 组件中的副作用，如异步操作、延迟操作等，可以替代 class 组件的 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 等生命周期，发生在**组件被渲染为真实 DOM 后执行**（所以可以用作 DOM 操作）

#### Q&A

##### 什么是副作用？

副作用的对立面是纯函数，纯函数的返回值只由入参决定。函数的行为不止依赖入参，且除了返回返回值之外还做了其他事情，这些事情就是副作用。

例如：i++ 除了输出表达式的值，还修改了 i，就是副作用

例如：在渲染阶段改变 dom、添加eventListener、设置定时器、记录日志等，这种要么改了除了入参之外的东西，要么是做了异步操作，组件生命周期无法捕获的，都算副作用

##### 副作用如何清理？

useEffect 传的的 callback 返回的函数，在 fiber 的清理阶段会执行该函数，达到清理上一次 effect 的效果

##### 为什么要写 deps 数组项？

- 默认 effect 在每次渲染结束后执行，传入 deps 用于在 re-render 时判断是否重新执行 callback，所以 deps 必须要按照实际依赖传入，不能少传也不要多传！
- deps 的比较是浅比较，故而传入对象、函数进去毫无意义
- deps 数组必须是 mutable 的，比如不能也不必传 useRef、dispatch 等进去

##### 为什么要把 effect 中所有引用的值都手动声明到 deps 数组项中，不会自动生成吗？

主要是因为目前 react 还没有这么智能的编译功能，是个未来的方向。从概念上来说它表现为：所有 effect 函数中引用的值都应该出现在依赖项数组中

##### 不写 deps 会有什么后果？

见如下代码，demo 希望利用 [] 依赖，将 useEffect 当做 didMount 使用，再结合 setInterval 达到每秒 count 的值自增 1 的效果

```react
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

然而结果却是：1 1 1 ....

因为 useEffect 形成了闭包环境，故而 setInterval 永远在第一次 render 的闭包里，故而 count 的值永远是 0，罪魁祸首就是**没有对依赖诚实**导致的，例子中 useEffect 明明依赖了 count，但是依赖项缺非要写 []，所以产生了难以理解的错误，唯一改正方法就是对依赖保持诚实

> 推荐启用 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 中的 [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) 规则。此规则会在添加错误依赖时发出警告并给出修复建议。

###### 如何不在每次 re-render 时重新实例化 setInterval？

最简单的方法是用 useState 的第二种赋值方法，用回调函数进行赋值

```react
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // 用回调函数进行赋值
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

该种写法做到了

- 不依赖 count，所以对依赖诚实
- 依赖项为[]，故而初始化会对 setInterval 进行实例化

故而输出是正确的 1 2 3...，因为 setCount 的回调函数中，c 值永远指向最新的 count 值，故而没有逻辑漏洞，但是如果存在两个以上变量需要使用时，就会存在问题

###### 同时使用两个以上变量时？

如果需要同时对 count 和 step 两个变量做累加时，那 useEffect 的依赖必然要写上其中某种值，故而频繁实例化的问题就又出现了

```react
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  return <h1>{count}</h1>;
}
```

由于 setCount 只能拿到最新的 count 的值，故而为了每次都能到最新的 step 的值，需要将 step 写到 useEffect 的依赖中，导致 setInterval 被频繁实例化，这就引出了 useReducer

### UseReducer

对上面 count + step 累加情况问题的解决如下：

#### API 示例

```react
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return <h1>{count}</h1>;
}

function reducer(state, action) {
  switch (action.type) {
    case "tick":
      return {
        ...state,
        count: state.count + state.step
      };
  }
}
```

#### 应用场景

是 `useState` 的替代方案，当 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖前一个 state 的值等。另外使用 useReducer 还能给触发深更新的组件做性能优化，因为可以**给子组件传递 dispatch 而不是回调函数**

#### Q&A

##### 对 dispatch 的依赖为什么不需要写在 deps 中？

如上例子也还是有个依赖的，那就是 dispatch，但是 dispatch 引用永远也不会变，故而可以忽略影响，这就体现了无论如何要对 deps 保持诚实

##### 所有函数为什么都必须写在 useEffect 中？

如上例子引发一个注意项，为了避免遗漏依赖，必须将函数写在 useEffect 内部，这样  [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 才能通过静态分析补齐依赖项，这就引发了新问题，所有函数写在 useEffect 内部显得非常难以维护

```react
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // getFetchUrl 依赖了 count，如果将其定义在 useEffect 外部，则难以看出 useEffect 的依赖项包含 count
    function getFetchUrl() {
      return "https://v?query=" + count;
    }

    getFetchUrl();
  }, [count]);

  return <h1>{count}</h1>;
}
```

##### 如何将函数抽到 useEffect 外部？

引出了一个新的 hook：`useCallback`，就是为了解决将函数抽到 useEffect 外部的问题

## 性能优化相关 Hooks

### UseCallback

#### API 示例

```react
function Counter() {
  const [count, setCount] = useState(0);

  const getFetchUrl = useCallback(() => {
    return "https://v?query=" + count;
  }, [count]);

  useEffect(() => {
    getFetchUrl();
  }, [getFetchUrl]);

  return <h1>{count}</h1>;
}
```

可以看到 useCallback 也有 deps 输入，将 getFetchUrl 函数的依赖项通过 useCallback 打包到 getFetchUrl 函数中，那么 useEffect 就只需要依赖 getFetchUrl 这个函数，实现了对 count 的间接依赖

#### 应用场景

返回一个 memoized 的回调函数，本质是仅在 deps 数组项发生变化时才会重新执行函数变化引用

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

#### Q&A

##### 为什么 useCallback 比 componentDidUpdate 更好用？

见如下例子，class 组件实现参数变化时重新执行函数

```react
class Parent extends Component {
  state = {
    count: 0,
    step: 0
  };
  fetchData = () => {
    const url =
      "https://v?query=" + this.state.count + "&step=" + this.state.step;
  };
  render() {
    return <Child fetchData={this.fetchData} count={count} step={step} />;
  }
}

class Child extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    this.props.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.count !== prevProps.count &&
      this.props.step !== prevProps.step // 别漏了！
    ) {
      this.props.fetchData();
    }
  }
  render() {
    // ...
  }
}
```

父级的 fetchData 函数依赖 count 和 step 两个参数，child 中需要判断 count 和 step 变化后重新执行 fetchData 函数，那么存在严重的无法维护问题：

- 其他人在 child 中看到 fetchData 时怎么知道依赖了props.count 和 props.step 这两个参数？
- 如果 fetchData 某天又加了一个新的参数依赖，那么下游所有 child 组件都需要更新对依赖参数的判断逻辑，否则新的参数变化时 child 中不会重新执行 fetchData

换成 function + useCallback 则会十分简单：

```react
function Parent() {
  const [ count, setCount ] = useState(0);
  const [ step, setStep ] = useState(0);

  const fetchData = useCallback(() => {
    const url = 'https://v/search?query=' + count + "&step=" + step;
  }, [count, step])

  return (
    <Child fetchData={fetchData} />
  )
}

function Child(props) {
  useEffect(() => {
    props.fetchData()
  }, [props.fetchData])

  return (
    // ...
  )
}
```

当 fetchData 依赖更新后，[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 会自动补上更新后的依赖，下游不需要关心 fetchData 函数依赖了什么参数，只需要关心依赖了 fetchData 这个函数即可

##### 如何将函数抽离到整个组件的外部？

可以使用 useCallback 将函数抽离到 useEffect 外部，那如何将函数抽离到整个组件的外部？

可以用自定义 Hooks 实现，如下，将上述例子的 fetchData 函数抽离到整个组件外部

```react
function useFetch(count, step) {
  return useCallback(() => {
    const url = "https://v/search?query=" + count + "&step=" + step;
  }, [count, step]);
}

function Parent() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const [other, setOther] = useState(0);
  const fetch = useFetch(count, step); // 封装了 useFetch

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>setCount {count}</button>
      <button onClick={() => setStep(c => c + 1)}>setStep {step}</button>
      <button onClick={() => setOther(c => c + 1)}>setOther {other}</button>
    </div>
  );
}
```

观察可以发现，count 和 step 都会频繁变化，导致 useFetch 中 useCallback 依赖的变化，进而导致重新生成函数，然而这个函数没必要每次都重新生成，换个频繁切换的例子观察一下性能损耗有多大

```react
function useDraggable(dom, count, step) {
  return useCallback(() => {
    // 上报日志
    report(count, step);

    // 对区域进行初始化，非常耗时
    // ... 省略耗时代码
  }, [dom, count, step]);
}

function Parent(props) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const [other, setOther] = useState(0);
  const drag = useDraggable(props.dom, count, step); // 封装了拖拽函数

  useEffect(() => {
    // dom 变化时重新实例化
    drag()
  }, [drag])
}
```

这种情况下函数依赖就特别不合理，依赖变化触发函数的重新执行，但只是为了上报一些日志而整体执行函数，十分耗时，得不偿失。所以可以利用 useRef 来保证耗时函数的依赖不变

### UseRef

#### API 示例

```react
function useFetch(count, step) {
  const countRef = useRef(count);
  const stepRef = useRef(step);

  useEffect(() => {
    countRef.current = count;
    stepRef.current = step;
  });

  return useCallback(() => {
    const url =
      "https://v/search?query=" + countRef.current + "&step=" + stepRef.current;
  }, [countRef, stepRef]); // 依赖不会变，却能每次拿到最新的值
}
```

如上，useRef 的引用是不变的，故而函数不会每次都重新执行，但又能在函数中拿到 ref 的最新值，但这样对函数改动成本较高，故而有更通用的做法解决此类问题，那就是利用自定义 hooks 解决函数重新实例化问题

#### 通用的自定义 Hooks 解决函数重新实例化问题

课利用 useRef 创造一个自定义 hook 代替 useCallback，使其 deps 变化时回调不会重新执行，但却能拿到最新值

```react
function useEventCallback(fn, dependencies) {
  const ref = useRef(null);

  useEffect(() => {
    // fn 回调函数变化时，ref.current 指向最新的 fn
    ref.current = fn;
  }, [fn, ...deps]); // deps 变化时，也为 ref.current 重新赋值，此时 fn 内部的 deps 也是最新的

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]); // 依赖不会变，所以每次都可以返回 deps 最新的 fn，且 fn 不会重新执行
}
```

以上代码还是利用了capture values 的概念，即每次渲染的闭包中，回调函数拿到的总是最新 render 闭包中的那个，所以 deps 的值永远是最新的，且函数不会被重新初始化

#### 应用场景

- useRef 是所有 Hooks API 中唯一一个返回 mutable 数据的
- 修改 useRef 值的唯一方法是修改其 current 的值，且值的变更不会引起 re-render
- 每次组件 re-render 时 iseRef 都返回固定不变的值

#### Q&A

##### 为什么 useRef 是唯一一个返回 mutable 数据的 hook？

- 非 useRef 相关的 hooks api，本质都形成了闭包，闭包有自己独立的状态，这就是 capture values 的本质
- 所有 hooks api 都具有 capture values 特性，除了 useRef
  - 见如下代码（始终能拿到 state 最新值），state 是 immutable 的（setState 后一定会生成一个全新的 state 引用，故而每次`setTimeout`都读取了当前渲染闭包环境的数据，虽然新的值跟着最新的渲染变了，但旧的渲染中状态仍然是旧值），ref 是 mutable 的
  - 通过 useRef 创建的对象，其值只有一份，且在每次的 render 中都共享

```react
function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  console.log('组件重新渲染', count);

  useEffect(() => {
    // 改变 useRef 的原始值
    countRef.current = count;

    setTimeout(() => {
      // setTimeout useRef.current 里边始终能拿到 state 最新值，快速点击 3 次执行结果为 3 3 3
      console.log(`current count is ${countRef.current}`);
      // setTimeout state 每次都读取了当前闭包环境的数据，快速点击 3 次执行结果为 1 2 3
      console.log(`current count is ${state}`);
    }, 3000);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### UseMemo

#### API 示例

##### 使用 useMemo 做局部 pureRender

用 useMemo 包裹渲染代码，这样就算 Child 因为 props 变动而 re-render 了，只要 useMemo 的 deps 中声明的参数 props.fetchData 经过浅对比后发现相等，就不会 re-render 渲染函数

```react
const Child = (props) => {
  useEffect(() => {
    props.fetchData()
  }, [props.fetchData])

  return useMemo(() => (
    // ... 渲染代码
  ), [props.fetchData])
}
```

#### 应用场景

##### memo + useContext 做 function 组件间共享参数 / 函数

```react
// 这样就不需要在每个函数间进行参数透传了，公共函数可以都放在 Context 里
const Store = createContext(null);

function Parent() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const fetchData = useFetch(count, step);

  return (
    <Store.Provider value={{ setCount, setStep, fetchData }}>
      <Child />
    </Store.Provider>
  );
}

// 用 memo 包裹的组件在 re-render 时会对 props 进行浅对比，没有变化就不会触发重渲染
const Child = memo((props) => {
  const { setCount } = useContext(Store)

  function onClick() {
    setCount(count => count + 1)
  }

  return (
    // ...
  )
})
```

但当函数多了之后，provider 的 value 会非常臃肿，故而启用 useReducer 为 context 传递的内容进行瘦身

```react
const Store = createContext(null);

// 所有回调函数都通过调用 dispatch 完成，则 provider 仅需传递 dispatch 一个函数
function Parent() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 0 });

  return (
    <Store.Provider value={dispatch}>
      <Child />
    </Store.Provider>
  );
}

const Child = useMemo((props) => {
  const dispatch = useContext(Store)

  function onClick() {
    dispatch({
      type: 'countInc'
    })
  }

  return (
    // ...
  )
})

function reducer(state, action) {
  switch (action.type) {
    case "tick":
      return {
        ...state,
        count: state.count + state.step
      };
  }
}
```

既然赋值的 dispatch 函数能共享，那么把 state 也放到 provider 的 value 里，赋值和读取岂不是变得更简单了？但 **state 放到 context 中会存在潜在性能问题！！ **

```react
const Store = createContext(null);

function Parent() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 0 });

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Count />
      <Step />
    </Store.Provider>
  );
}

const Count = memo(() => {
  const { state, dispatch } = useContext(Store);
  return (
    <button onClick={() => dispatch("incCount")}>incCount {state.count}</button>
  );
});

const Step = memo(() => {
  const { state, dispatch } = useContext(Store);
  return (
    <button onClick={() => dispatch("incStep")}>incStep {state.step}</button>
  );
});

function reducer(state, action) {
  switch (action.type) {
    case "tick":
      return {
        ...state,
        count: state.count + state.step
      };
  }
}
```

出现的结果是无论点击 `incCount` 还是 `incStep`，都会同时触发两个组件的 re-render，其问题在于 memo 只能挡住最外层的 props 传入，但通过 useContext 注入在函数内部的数据，会绕过 memo

当触发 dispatch 导致 state 的引用变化时，所有使用了 state 的组件都会触发 re-render，那么就需要用 useMemo 了

##### useMemo + useContext 做 function 组件间共享参数 / 函数

如果组件使用了 useContext，且不使用 props，就可以完全使用 useMemo 来做性能优化

```react
const Store = createContext(null);

function Parent() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 0 });

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Count />
      <Step />
    </Store.Provider>
  );
}

const Count = () => {
  const { state, dispatch } = useContext(Store);
  return useMemo(
    () => (
      <button onClick={() => dispatch("incCount")}>
        incCount {state.count}
      </button>
    ),
    [state.count, dispatch]
  );
};

const Step = () => {
  const { state, dispatch } = useContext(Store);
  return useMemo(
    () => (
      <button onClick={() => dispatch("incStep")}>incStep {state.step}</button>
    ),
    [state.step, dispatch]
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "tick":
      return {
        ...state,
        count: state.count + state.step
      };
  }
}
```

> useMemo 类似 redux 的 connect

#### Q&A

##### useMemo 和 memo 有什么区别

- memo 包裹的函数会对 props 的每一项进行浅对比，没有变化就不会触发组件的 re-render
- useMemo(() => {}, []) 可以结合 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)  实现更细粒度的性能优化，可指定个别 props 参数作为 deps，deps 没有变化就不会触发函数的 re-render



## 其他 Hooks API

### UseLayoutEffect

和 useEffect 一致，区别只有执行时机，是在 dom 绘制之前执行的（和 `componentDidMount`、`componentDidUpdate`执行时机相同）

### UseDebugValue

用于开发者工具调试

### UseImperativeHandle

配合 forwardRef 使用，用于自定义通过 ref 给父组件暴露的值

## 自定义 Hook

只要函数名遵循以 `use`开头，且返回非 JSX 元素，就可以创建自定义的 hooks。自定义 hooks 内还可以调用包括内置 hooks 在内的所有自定义 hooks，如下：

```react
function useCurrentValue(value) {
  const ref = useRef(0)l
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref;
}

function Counter() {
  const [count, setCount] = useState(0);
  const currentCount = useCurrentValue(count);

  const log = () => {
    setCount(count + 1);
    setTimeout(() => {
      console.log(currentCount.current);
    }, 3000);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={log}>Click me</button>
    </div>
  );
}
```

#### 自定义 Hook 处理副作用

举例：异步从接口里获取数据，最佳的做法是封装成一个自定义 hook

```react
const useDataApi<T> = (initialUrl: string, initialData: T) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const doFetch = url => setUrl(url);

  return { ...state, doFetch };
};
```

可以看到，自定义 Hook 拥有完整生命周期，我们可以将取数过程封装起来，只暴露状态 

- 是否在加载中：`isLoading` 
- 是否取数失败：`isError` 
- 数据：`data`

在组件中使用非常方便

```react
function App() {
  const { data, isLoading, isError } = useDataApi("https://v", {
    showLog: true
  });
}
```

如果这个值需要存储到数据流，在所有组件之间共享，可以结合 useEffect 和 useReducer

```react
function App(props) {
  const { dispatch } = useContext(Store);

  const { data, isLoading, isError } = useDataApi("https://v", {
    showLog: true
  });

  useEffect(() => {
    dispatch({
      type: "updateLoading",
      data,
      isLoading,
      isError
    });
  }, [dispatch, data, isLoading, isError]);
}
```

## Function 组件的 defaultProps

先举个例子，用 es6 特性给参数定义阶段赋值

```react
// 每次父组件刷新时，Child 组件跟着刷新，看起来 log 只会打印一次，实际每次渲染都会打印 log，证明 type 每次的引用都是不同的
const Child = memo(({ type = { a: 1 } }) => {
  useEffect(() => {
    console.log("type", type);
  }, [type]);

  return <div>Child</div>;
});
```

这种方法看似优雅，实际有个重大隐患：没有命中的 props 每次渲染引用都不同

### 使用 React 内置方案

```react
// 不断刷新父组件，只会打印一次 log
const Child = ({ type }) => {
  useEffect(() => {
    console.log("type", type);
  }, [type]);

  return <div>Child</div>;
};

Child.defaultProps = {
  type: { a: 1 }
};
```

建议使用 react 的内置方案，因为纯函数的方案不利于保持引用不变

## 注意事项

### 父组件传对象给子组件导致的问题

```react
// 做一个点击累加的按钮作为父组件，那么父组件每次点击后都会刷新
function Parent() {
  const [count, forceUpdate] = useState(0);

  const schema = { b: 1 };

  return (
    <div>
      <Child schema={schema} />
      <div onClick={() => forceUpdate(count + 1)}>Count {count}</div>
    </div>
  );
}

const Child = memo(props => {
  useEffect(() => {
    console.log("schema", props.schema);
  // props.schema 声明失效
  }, [props.schema]);

  return <div>Child</div>;
});
```

我们希望只有当 props.schema 变化就会触发 child 组件打印 log，但实际每次父组件刷新时 Child 就会打印 log，即 [props.schema] 完全失效，因为每次刷新后，props.schema 的值虽然不变，但引用都在变，而 hook 函数的 deps 是浅对比

解法一：改写子组件的依赖

```react
const Child = memo(props => {
  useEffect(() => {
    console.log("schema", props.schema);
  // props.schema 声明失效
  }, [JSON.stringfy(props.schema)]);

  return <div>Child</div>;
});
```

解法二：ref 优化父组件传值

```react
function Parent() {
  const [count, forceUpdate] = useState(0);

  const schema = useRef({ b: 1 });

  return (
    <div>
      <Child schema={schema.current} />
      <div onClick={() => forceUpdate(count + 1)}>Count {count}</div>
    </div>
  );
}
```

