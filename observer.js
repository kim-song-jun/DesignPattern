class Subject {
  constructor() {
    this.observers = [];
  }
  getObserverList() {
    return this.observers;
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notifiyAll() {
    this.observers.forEach((subscriber) => {
      try {
        subscriber.update(this.name);
      } catch (e) {
        console.error('error', e);
      }
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(subj) {
    console.log(`${this.name}: notified from ${subj} class`);
  }
}

const subj = new Subject();

subj.__proto__.name = 'Master';

const dog = new Observer('Dog');
const cat = new Observer('Cat');
const rabbit = new Observer('Rabbit');

subj.subscribe(dog);
subj.subscribe(cat);
subj.subscribe(rabbit);

console.log(subj.getObserverList());
// (3) [Observer, Observer, Observer]

subj.notifiyAll();
// Dog: notified from Master class
// Cat: notified from Master class
// Rabbit: notified from Master class

// 1:n 관계, 하나의 주제가 연결체(구독)을 통해 상태를 알려줌
// 객체간의 관계를 인터페이스를 활용하기 때문에 느슨한 결합이 가능함
