# 「要吃饱」商家管理员平台

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

因为此展示代码项目没有后端，所以默认提交的代码是无法获取数据的。但在测试中对 HTTP API 做了 mock，所以直接跑 ng test 看测试是没问题的。

如果想在浏览器中看展示效果，需要更改 src/app/orders/orders.service.ts 中从 API 获取数据的相关代码，改为获取项目中的 mock data。相关代码做以下修改。

```
getOrders(): Observable<Order[]> {
    // return this.http
    //   .get<{ payload: Order[] }>('/selling-order-contracts')
    //   .pipe(map((res) => res.payload));

    return of(ORDERS);
  }

  getOrderDetailsById(id: string): Observable<Order> {
    // return this.http.get<{ payload: Order }>(`/selling-order-contracts/${id}`).pipe(
    //   map(res => res.payload)
    // );

    return of(ORDERS.find((order) => order.id === id));
  }
```
