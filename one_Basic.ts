// ts的定义：ts是js的超级，且拥有类型机制，不能被浏览器直接运行，需编译成js运行
// ES5 --> ES6 --> TS
// js中的类型是动态类型，ts中的类型是静态类型
let a = 123;
a = 456;
let b: number = 123;
b = 456;
// let c = 123
// c = '456'              js写法，ts报错

// ts的优势是什么？
// 1、ts的静态类型可以在编写的时候快速定义潜在问题，更好的错误提示
// 2、在写ts代码时，编辑器可以给友好的代码提示，可以更快速地编写代码
// 3、类型可推断出潜在的语义，可读性更好
function demo1(data: { x: number; y: number }) {
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}
demo1({ x: 123, y: 456 });

// prettier插件代码格式化
// ts不能在node环境下运行，运行有两种方式
// 1、安装ts --- tsc xxx.ts --- 生成js文件 --- node xxx.js
// 2、ts-node xxx.ts

// ts静态类型的深度理解?
// ts静态类型不仅标志着count已经确定了number类型，且count还具备了number类型的所有属性和方法
const count: number = 123.333;
count.toFixed(2); // 返回字符串格式的值

// 基础类型 对象类型 类型注解 类型推断？
// 基础类型：number string null undefined symbol boolean void
const age: number = 18;
const studentName: string = 'Nancy';
// 对象类型：object array class类 function
const teacher: {
  name: string;
  age: number;
} = {
  name: 'Alice',
  age: 30,
};
const arr: number[] = [1, 2];
const getTotal: () => number = () => {
  return 123;
};
class Person {}
const nancy: Person = new Person();
// 如果TS能够分析变量类型，我们则不需定义
// 如果TS无法分析变量类型，我们需要定义变量类型
// 类型注解 type annotation  我们定义了TS的类型
let total: number;
total = 123;
function getTotalOne(firstNumber: number, secondNumber: number) {
  // 当前情况需要进行类型注解，默认参数是any
  return firstNumber + secondNumber;
}
const total1 = getTotalOne(1, 2);
// 类型推断 type inference  TS自动分析出了变量的类型
let countInference = 123;

// ts函数相关类型
function hello() {}
const hello1 = function () {};
const hello2 = () => {};
function add0(first: number, second: number): number {
  return first + second;
}
const total2 = add0(1, 2);
function sayHello(): void {
  // void类型代表函数没有返回值
  console.log('hello');
  return;
}
function errorEmitter(): never {
  // never类型代表函数永远处于执行中 不能完全执行完
  throw new Error();
  console.log(123);
}
function add1({ first, second }: { first: number; second: number }): number {
  return first + second;
}
const total3 = add1({ first: 1, second: 2 });

// ts细节点
let num; // any类型
num = 123;
let num1 = 123; // number类型
const func = (str: string): number => {
  return parseInt(str, 10);
};
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10);
};
const data1: Date = new Date();
const rawData = '{name: "John"}';
interface Person1 {
  name: 'string';
}
const newData: Person1 = JSON.parse(rawData);
let temp: number | string = 123;
temp = '456';

// 数组
const arr1: (number | string)[] = [1, '2'];
const undefinedArr: undefined[] = [undefined, undefined];
// type alias 类型别名
type User = { name: string; age: number };
class Teacher {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age
  }
}
// class类和{}可以一起使用
const arr2: Teacher[] = [
  {
    name: 'dtt',
    age: 20,
  },
  new Teacher('dtt', 10),
];
// 元组的定义：[]的长度和数组每一项类型确定
const teacherInfo: [string, number, string] = ['1', 2, '3'];
// csv
const teacherList: [string, number][] = [
  ['tt', 20],
  ['yun', 12],
];

// interface接口
// interface和type的区别：interface只能代表一个对象，而type可以代表对象和基础类型
interface Person2 {
  // readonly name: string; // name只读
  name: string;
  age?: number; // age属性可有可无
  [props: string]: any; // 可以添加其他参数
  say(): string;
}
type Person3 = string;
const getPersonName = (person: Person2): void => {
  console.log(person.name);
};
const setPersonName = (person: Person2, name: string): void => {
  person.name = name;
};
const person = {
  name: 'dtt',
  say() {
    return 'hello';
  },
};
getPersonName(person);
// 字面量的传参方式会进行强校验
getPersonName({
  name: 'dell',
  say() {
    return 'hi';
  },
});
// class类应用接口，需具备接口的属性和方法
class User1 implements Person2 {
  name = 'dtt';
  say() {
    return 'hello world';
  }
}
// interface的继承
interface Teacher1 extends Person2 {
  teach(): string;
}
// interface可以定义函数类型
interface sayhi {
  (word: string): string;
}
const say: sayhi = (world) => {
  return world;
};
// tsc --init --> 生成tsconfig.json，变成一个ts的工程项目
// interface只是帮助我们做语法校验的工具，在ts编译为js文件时，interface会被全部剔除

// 类的定义与继承
class Person4 {
  name = 'dtt';
  getName() {
    return this.name;
  }
}
class Student extends Person4 {
  getStudentName() {
    return 'student';
  }
  getName() {
    return super.getName() + 'haha';
  }
}
const student = new Student();
console.log(student.getStudentName());
console.log(student.getName());

// 类中的访问类型和构造器
// 访问类型有：public private protected
// public允许在类内和类外被调用
// private允许在类内被调用
// protected允许在类内及继承的子类中使用
// constructor
class Person5 {
  // 传统写法
  // public readonly name: string   只读
  // public name: string;
  // constructor(name: string) {
  //   this.name = name;
  // }
  // 简化写法
  constructor(public name: string) {}
}
const person1 = new Person5('dtt');
console.log(person1.name);
class Person6 {
  constructor(public name: string) {}
}
class Teacher2 extends Person6 {
  constructor(public age: number) {
    super('dtt');
    // super() 如果父类没有constructor,子类也得调用super()
  }
}
const teacher1 = new Teacher2(20);

// 静态属性 Setter和Getter
class Person7 {
  constructor(private _name: string) {}
  get name() {
    return this.name + 'hi'; // 把_name做加密处理，暴露出去
  }
  set name(name: string) {
    this._name = name;
  }
}
const person2 = new Person7('dtt');
console.log(person2.name);
person2.name = 'ttd';

// 单例模式
class Demo {
  private static instance: Demo;
  private constructor(public name: string) {}
  static getInstance() {
    if (!Demo.instance) {
      Demo.instance = new Demo('dtt');
    }
    return Demo.instance;
  }
}

const demo2 = Demo.getInstance();
const demo3 = Demo.getInstance();

// 抽象类 只能被继承，不能被实例化 把class公用的东西抽离出来
abstract class Geom {
  width: number;
  constructor(width: number) {
    this.width = width
  }
  getType() {
    return 'Geom';
  }
  abstract getArea(): number;
}
class Cirtcle extends Geom {
  getArea() {
    return 123;
  }
}
class Square extends Geom {
  getArea() {
    return 345;
  }
}
