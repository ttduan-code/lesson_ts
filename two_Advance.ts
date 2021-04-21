// tsc --init  --> tsconfig.json
// tsconfig.json: ts编译配置文件
// tsc xxx.ts 这种执行命令并不会走tsconfig.json,只有tsc才会走tsconfig.json
// ts-node xxx.ts 文件时，会走tsconfig.json文件

// 联合类型和类型保护
interface Bird {
  fly: boolean;
  sing: () => {};
}
interface Dog {
  fly: boolean;
  bark: () => {};
}
// 类型断言的方式进行类型保护
function trainAnimal(animal: Bird | Dog) {
  //  联合类型中只提示共有属性
  if (animal.fly) {
    return (animal as Bird).sing();
  }
  return (animal as Dog).bark();
}
// 用in的语法做类型保护
function trainAnimalSecond(animal: Bird | Dog) {
  //  联合类型中只提示共有属性
  if ('sing' in animal) {
    return animal.sing();
  } else {
    return animal.bark();
  }
}
// 用typeof语法做类型保护
function add(first: number | string, second: number | string) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`;
  }
  return first + second;
}
// 用instanceof做类型保护
class NumberObj {
  count: number;
  constructor(count: number) {
    this.count = count
  }
}

function add2(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}

// Enum 枚举类型  更灵活的数据结构
enum Status {
  OFFLINE,
  ONLINE,
  DELETED,
}
// enum Status {
//   OFFLINE = 1,
//   ONLINE = 4,
//   DELETED
// }
// status[1]   status.OFFLINE
// const Status = {
//   OFFLINE: 0,
//   ONLINE: 1,
//   DELETED: 2
// }
function getResult(status: number) {
  if (status === Status.OFFLINE) {
    return 'OFFLINE';
  } else if (status === Status.ONLINE) {
    return 'ONLINE';
  } else if (status === Status.DELETED) {
    return 'error';
  }
}

// 泛型 generic 泛指的类型
function join<T>(first: T, second: T): T {
  return first;
}
join<number>(1, 1);
function join1<T, P>(first: T, second: P): P {
  return second;
}
join1<number, string>(1, '2');
// Array<T>
function join2<T>(params: T[]) {
  return params[0];
}
join2<string>(['1']);

// 类中的泛型
// <T extends number | string>
class Join3<T> {
  constructor(private data: T[]) {}
  getItem(index: number) {
    return this.data[index];
  }
}
const data = new Join3<string>(['1']);

// namespace-命名空间
// 减少全局变量，提供类似模块化思想，把一组东西整合到一块，对外提供统一的接口

// 使用parcel打包ts代码  -- parcel类似webpack,是一个打包工具，但是它不用进行配置

// 描述文件中的全局类型
// 类型定义文件 .d.ts  帮助ts理解js库内容
// 定义全局变量和全局函数
// declare var $: (param: () => void) => void
// declare function $(selector: string): { html: (html: string) => {}}

// 泛型中keyof语法的使用
interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher1 {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key]
  }
}

const teacher2 = new Teacher1({
  name: 'dtt',
  age: 20,
  gender: 'female'
})
const info = teacher2.getInfo('name')
console.log(info)
