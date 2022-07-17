// 상태패턴: 일련의 규칙에 따라 객체의 상태를 변화시켜, 객체가 할 수 있는 해우이를 바꾸는 패턴
// ex) 자판기 (물건의 가격은 1원, 1가지 종류)
//
// 요구사항:
// 동작             조건                       실행                    결과
// 동전을 넣음      동전이 없다면               금액을 증가              제품 선택 가능
// 동전을 넣음      제품을 선택할 수 있다면      금액을 증가              제품 선택 가능
// 제품 선택        동전이 없다면               아무 동작도 하지 않음     동전 없는 상태 유지
// 제품 선택        제품을 선택할 수 있다면      제품을 주고 잔액 감소    잔액이 있으면 제품 선택or 동전없음 상태로 변경

// state 사용 X
// 1. 자판기의 조건이 '동전 없음', '제품 선택 가능' => 상수화

const State = {
  NOCOIN: "no coin",
  SELECTABLE: "selectable",

  // 3: 추가
  SOLDOUT: "sold out",
};

// 2. 요구사항대로 구현
// 3. 만약 '자판기에 제품이 없는 경우, 동전을 넣으면 바로 동전을 되돌려준다' 라는 요구사항이 생기면 case를 추가함
class VendingMachine {
  private state = State.NOCOIN;
  private coin;
  // 3: 추가
  private product;

  constructor() {
    this.coin = 0;
    this.product = 2;
  }
  increaseCoin(coin) {
    this.coin += coin;
  }
  decreaseCoin() {
    this.coin--;
  }
  provideProduct() {
    this.product--;
    console.log("제품을 성공적으로 구매했습니다.");
  }
  hasNoCoin(): boolean {
    return this.coin == 0;
  }
  hasNoProduct(): boolean {
    return this.product == 0;
  }
  getState() {
    return this.state;
  }
  getCoin() {
    return this.coin;
  }
  getProduct() {
    return this.product;
  }
  // 3: 추가
  returnCoin(coin) {
    console.log("상품이 품절되었습니다.");
    console.log(`${coin}원을 다시 받으시길 바랍니다.`);
    this.coin--;
  }

  insertCoin(coin) {
    switch (this.state) {
      case State.NOCOIN:
        this.increaseCoin(coin);
        this.state = State.SELECTABLE;
        break;
      case State.SELECTABLE:
        this.increaseCoin(coin);
        break;
      // 3: 추가
      case State.SOLDOUT:
        this.returnCoin(coin);
        break;
    }
  }
  buyProduct() {
    switch (this.state) {
      case State.NOCOIN:
        break;
      case State.SELECTABLE:
        this.provideProduct();
        this.decreaseCoin();
        if (this.hasNoCoin()) {
          this.state = State.NOCOIN;
        } else if (this.hasNoProduct()) {
          this.state = State.SOLDOUT;
        }
        break;
      // 3: 추가
      case State.SOLDOUT:
        break;
    }
  }
}

const vendingMachine = new VendingMachine();

console.log(vendingMachine.getState());
console.log(vendingMachine.getCoin());
console.log(vendingMachine.getProduct());

vendingMachine.insertCoin(1);
vendingMachine.insertCoin(1);
vendingMachine.insertCoin(1);

console.log(vendingMachine.getState());
console.log(vendingMachine.getCoin());
console.log(vendingMachine.getProduct());

vendingMachine.buyProduct();
console.log(vendingMachine.getState());
console.log(vendingMachine.getCoin());
console.log(vendingMachine.getProduct());

vendingMachine.buyProduct();
console.log(vendingMachine.getState()); // sold out
console.log(vendingMachine.getCoin()); // coin: 1
console.log(vendingMachine.getProduct()); // 0

vendingMachine.insertCoin(1);
console.log(vendingMachine.getState());
console.log(vendingMachine.getCoin());
console.log(vendingMachine.getProduct());

// vendingMachine.insertCoin(1);

// 4. 만약 이후에 '자판기가 점검중일 때는 동전을 넣으면 바로 돌려주어야 한다' 라는 요구사항이 추가된다면?
//    switch안에 case를 만들 수 도 있지만, 반복된 구조를 피할 수 가 없음
//    따라서 추상화를 통해 중복을 피해야 함
//    예를들어 insertCoin() 과 buyProduct() 는 상태에 따라 다르게 기능이 동작함

// state 사용 O
// 5. 기존 enum에 정의되어있던 상수를 각각 단일클래스로 생성 후 상위 인터페이스인 state에 정의
//    그리고 Context인 자판키 클래스는 state를 직접적으로 이용함
// 6. 필드로 state를 가지고 있으며 생성자를 통해서 NoCoinState로 초기화 해줌 따라서 반복되었던
//    insertCoin() 과 buyProduct()는 모두 state 객체에서 기능을 제공해줌
interface StateInterface {
  increaseCoin(coin, machine: New_BandingMachine): void;
  buyProduct(machine: New_BandingMachine): void;
}

class New_BandingMachine {
  private state;
  private coin;
  private product;

  constructor() {
    this.state = new NoCoinState();
    this.coin = 0;
    this.product = 2;
  }
  insertCoin(coin) {
    this.state.increaseCoin(coin, this);
  }
  increaseCoin(coin) {
    this.coin += coin;
  }
  buyProduct() {
    this.state.buyProduct(this);
  }
  changeState(state) {
    this.state = state;
  }
  returnCoin(coin) {
    console.log("상품이 품절되었습니다.");
    console.log(`${coin}원을 다시 받으시길 바랍니다.`);
    this.coin--;
  }
  provideProduct() {
    console.log("제품을 성공적으로 구매했습니다.");
    this.product--;
  }
  decreaseCoin() {
    this.coin--;
  }
  hasNoCoin(): boolean {
    return this.coin == 0;
  }
  hasNoProduct(): boolean {
    return this.product == 0;
  }
  getState() {
    return this.state;
  }
  getCoin() {
    return this.coin;
  }
  getProduct() {
    return this.product;
  }
}

class NoCoinState implements StateInterface {
  increaseCoin(coin, machine: New_BandingMachine) {
    machine.increaseCoin(coin);
    machine.changeState(new SelectableState());
  }
  buyProduct(machine: New_BandingMachine) {
    console.log("동전을 투입한 후 제품을 구매해주세요.");
  }
}

class SelectableState implements StateInterface {
  increaseCoin(coin, machine: New_BandingMachine) {
    machine.increaseCoin(coin);
  }
  buyProduct(machine: New_BandingMachine) {
    machine.provideProduct();
    machine.decreaseCoin();
    if (machine.hasNoCoin()) {
      machine.changeState(new NoCoinState());
    } else if (machine.hasNoProduct()) {
      machine.changeState(new SoldOutState());
    }
  }
}

class SoldOutState implements StateInterface {
  increaseCoin(coin, machine: New_BandingMachine) {
    machine.returnCoin(coin);
  }
  buyProduct(machine: New_BandingMachine) {
    console.log("상품이 품절되었습니다.");
  }
}

const new_bandingMachine = new New_BandingMachine();

console.log(new_bandingMachine.getState());
console.log(new_bandingMachine.getCoin());
console.log(new_bandingMachine.getProduct());

new_bandingMachine.insertCoin(1);
new_bandingMachine.insertCoin(1);
new_bandingMachine.insertCoin(1);

console.log(new_bandingMachine.getState());
console.log(new_bandingMachine.getCoin());
console.log(new_bandingMachine.getProduct());

new_bandingMachine.buyProduct();
console.log(new_bandingMachine.getState());
console.log(new_bandingMachine.getCoin());
console.log(new_bandingMachine.getProduct());

new_bandingMachine.buyProduct();
console.log(new_bandingMachine.getState());
console.log(new_bandingMachine.getCoin());
console.log(new_bandingMachine.getProduct());

new_bandingMachine.increaseCoin(1);
console.log(new_bandingMachine.getState());
console.log(new_bandingMachine.getCoin());
console.log(new_bandingMachine.getProduct());
