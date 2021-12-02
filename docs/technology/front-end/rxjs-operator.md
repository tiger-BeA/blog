---
title: RxJs 操作符
---

# RxJs 操作符

## 组合

1. combineLatest

   多个长期活动的Observable，依靠彼此进行一些计算，很合适
   
   > `combineLatest`直到每个Observable至少发出一个值后，才会发出初始值，和`withLastestForm`一致，这常成为陷阱，没有输出也没有报错，但是会无法工作或者订阅延迟
   >
   > 如果只需要Observables发出一个值，或者只需要它们完成前的最新值时，用`forkJoin`更好
   
2. withLastestFrom

   ```typescript
   // RxJS v6+
   import { withLatestFrom, map } from 'rxjs/operators';
   import { interval } from 'rxjs';
   
   // 每5秒发出值
   const source = interval(5000);
   
   // 每1秒发出值
   const secondSource = interval(1000);
   const example = source.pipe(
     withLatestFrom(secondSource),
     map(([first, second]) => {
       return `First Source (5s): ${first} Second Source (1s): ${second}`;
     })
   );
   /*
     输出:
     "First Source (5s): 0 Second Source (1s): 4"
     "First Source (5s): 1 Second Source (1s): 9"
     "First Source (5s): 2 Second Source (1s): 14"
     ...
   */
   const subscribe = example.subscribe(val => console.log(val));
   
   ```

3. forkJoin

      当有一组Observables，只关心每个Observable*最后发出的值*，比如希望发完多个请求得到响应后再采取行动，类型promise.all

      > 注意，如果Observable发出项多于1个请求的话，且你只关心前一个发出项的话，应该用`combineLatest` 和`zip`比较合适
      >
      > 如果内部Observable不完成的话，forkJoin永不发出值

4. zip

      当有一组Observables，订阅所有Observable，每次当所有Observable发出一次值后，发出数组值
   
      ```typescript
      let age$ = Observable.of<number>(27, 25, 29);
      let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
      let isDev$ = Observable.of<boolean>(true, true, false);
      
      // NOTE: 如果最后一个参数是函数, 这个函数被用来计算最终发出的值.否则, 返回一个顺序包含所有输入值的数组
      Observable
          .zip(age$,
               name$,
               isDev$,
               (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
          .subscribe(x => console.log(x));
      // 输出：
      // { age: 27, name: 'Foo', isDev: true }
      // { age: 25, name: 'Bar', isDev: true }
      // { age: 29, name: 'Beer', isDev: false }
      ```
   
5. concat
  
      按照顺序，前一个Observable完成了再订阅下一个Observable并发出值
   
      ``` typescript
      // RxJS v6+
      import { delay, concat } from 'rxjs/operators';
      import { of } from 'rxjs';
      
      // 发出 1,2,3
      const sourceOne = of(1, 2, 3);
      // 发出 4,5,6
      const sourceTwo = of(4, 5, 6);
      
      // 延迟3秒，然后发出
      const sourceThree = sourceOne.pipe(delay(3000));
      // sourceTwo 要等待 sourceOne 完成才能订阅
      const example = sourceThree.pipe(concat(sourceTwo));
      // 输出: 1,2,3,4,5,6
      const subscribe = example.subscribe(val =>
        console.log('Example: Delayed source one:', val)
      );
      ```
   
      > 如果不用关心产生值的顺序，用merge代替
   
6. merge
  
      将多个Observable转为单个Observable，所有的输入Observable完成了，才会输出
   
7. pairwise
  
      将前一个值和当前值作为数组发出
   
      ```typescript
      每次点击(从第二次开始)，都会发出与前一次点击的相对距离
      var clicks = Rx.Observable.fromEvent(document, 'click');
      var pairs = clicks.pairwise();
      var distance = pairs.map(pair => {
        var x0 = pair[0].clientX;
        var y0 = pair[0].clientY;
        var x1 = pair[1].clientX;
        var y1 = pair[1].clientY;
        return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
      });
      distance.subscribe(x => console.log(x));
      ```

##  创建

1. from

   将数组、字符串、promise或迭代器转换成Observable，将值按序列发出

2. formEvent

   将事件转换成Observable序列

3. fromPromise

   返回一个仅仅发出 Promise resolve 过的值然后完成的 Observable。

   > 和from的效果一样

4. interval

   给予给定时间间隔发出自增数字序列

5. of(...value)

   按顺序发出任意数量的值

6. range

   依次发出给定区间内的数字

## 错误处理

1. retry(count: number)

   如果发生错误后，以指定次数重试

2. #### `retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable`

   当发生错误时，基于自定义的标准来重试
