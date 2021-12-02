### 并发化举例

假设一个读服务是需要如下数据：

| name  | 获取时间 |
| ----- | -------- |
| 数据A | 10ms     |
| 数据B | 15ms     |
| 数据C | 5ms      |
| 数据D | 20ms     |
| 数据E | 10ms     |

那么如果串行获取那么需要`60ms`

而如果数据C依赖数据A和数据B、数据D谁也不依赖、数据E依赖数据C

那么我们可以这样子来获取数据：

```
A ----------

B ---------------

							 C -----

D --------------------

									  E ----------
```

那么如果并发化获取需要30ms，能提升1倍的性能

`Rxjs`, `Promise.all()`, `Promise.race()`， `async / await`

举个例子：事件发布-订阅模式中——利用事件队列解决雪崩问题

- 雪崩问题：高访问量、大并发量的情况下缓存失效的问题

  ```js
  const select = async () => {
    return await db.select('SQL');
  }
  ```

  如果站点刚好启动且缓存中不存在此数据，若访问量巨大，同一条SQL语句被发送到数据库中反复查询，影响服务的整体性能，可事先添加到事件队列中

  ```js
  const events = require( "events" );
  let emitter = new events.EventEmitter();
  let status = "ready";
  const select = (callback) => {
    	emitter.once( "selected", callback );
      if ( status === "ready" ) {
        status = "pending";
        db.select( "SQL", function ( results ) {
          emitter.emit( "selected", results );
          status = "ready";
        } );
      }
  };
  ```

  


