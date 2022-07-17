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
var State = {
    NOCOIN: "no coin",
    SELECTABLE: "selectable",
    // 3: 추가
    SOLDOUT: "sold out",
};
// 2. 요구사항대로 구현
// 3. 만약 '자판기에 제품이 없는 경우, 동전을 넣으면 바로 동전을 되돌려준다' 라는 요구사항이 생기면 case를 추가함
var VendingMachine = /** @class */ (function () {
    function VendingMachine() {
        this.state = State.NOCOIN;
        this.coin = 0;
        this.product = 2;
    }
    VendingMachine.prototype.increaseCoin = function (coin) {
        this.coin += coin;
    };
    VendingMachine.prototype.decreaseCoin = function () {
        this.coin--;
    };
    VendingMachine.prototype.provideProduct = function () {
        this.product--;
        console.log("제품을 성공적으로 구매했습니다.");
    };
    VendingMachine.prototype.hasNoCoin = function () {
        return this.coin == 0;
    };
    VendingMachine.prototype.hasNoProduct = function () {
        return this.product == 0;
    };
    VendingMachine.prototype.getState = function () {
        return this.state;
    };
    VendingMachine.prototype.getCoin = function () {
        return this.coin;
    };
    VendingMachine.prototype.getProduct = function () {
        return this.product;
    };
    // 3: 추가
    VendingMachine.prototype.returnCoin = function (coin) {
        console.log("상품이 품절되었습니다.");
        console.log("".concat(coin, "\uC6D0\uC744 \uB2E4\uC2DC \uBC1B\uC73C\uC2DC\uAE38 \uBC14\uB78D\uB2C8\uB2E4."));
        this.coin--;
    };
    VendingMachine.prototype.insertCoin = function (coin) {
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
    };
    VendingMachine.prototype.buyProduct = function () {
        switch (this.state) {
            case State.NOCOIN:
                break;
            case State.SELECTABLE:
                this.provideProduct();
                this.decreaseCoin();
                if (this.hasNoCoin()) {
                    this.state = State.NOCOIN;
                }
                else if (this.hasNoProduct()) {
                    this.state = State.SOLDOUT;
                }
                break;
            // 3: 추가
            case State.SOLDOUT:
                break;
        }
    };
    return VendingMachine;
}());
var vendingMachine = new VendingMachine();
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
var New_BandingMachine = /** @class */ (function () {
    function New_BandingMachine() {
        this.state = new NoCoinState();
        this.coin = 0;
        this.product = 2;
    }
    New_BandingMachine.prototype.insertCoin = function (coin) {
        this.state.increaseCoin(coin, this);
    };
    New_BandingMachine.prototype.increaseCoin = function (coin) {
        this.coin += coin;
    };
    New_BandingMachine.prototype.buyProduct = function () {
        this.state.buyProduct(this);
    };
    New_BandingMachine.prototype.changeState = function (state) {
        this.state = state;
    };
    New_BandingMachine.prototype.returnCoin = function (coin) {
        console.log("상품이 품절되었습니다.");
        console.log("".concat(coin, "\uC6D0\uC744 \uB2E4\uC2DC \uBC1B\uC73C\uC2DC\uAE38 \uBC14\uB78D\uB2C8\uB2E4."));
        this.coin--;
    };
    New_BandingMachine.prototype.provideProduct = function () {
        console.log("제품을 성공적으로 구매했습니다.");
        this.product--;
    };
    New_BandingMachine.prototype.decreaseCoin = function () {
        this.coin--;
    };
    New_BandingMachine.prototype.hasNoCoin = function () {
        return this.coin == 0;
    };
    New_BandingMachine.prototype.hasNoProduct = function () {
        return this.product == 0;
    };
    New_BandingMachine.prototype.getState = function () {
        return this.state;
    };
    New_BandingMachine.prototype.getCoin = function () {
        return this.coin;
    };
    New_BandingMachine.prototype.getProduct = function () {
        return this.product;
    };
    return New_BandingMachine;
}());
var NoCoinState = /** @class */ (function () {
    function NoCoinState() {
    }
    NoCoinState.prototype.increaseCoin = function (coin, machine) {
        machine.increaseCoin(coin);
        machine.changeState(new SelectableState());
    };
    NoCoinState.prototype.buyProduct = function (machine) {
        console.log("동전을 투입한 후 제품을 구매해주세요.");
    };
    return NoCoinState;
}());
var SelectableState = /** @class */ (function () {
    function SelectableState() {
    }
    SelectableState.prototype.increaseCoin = function (coin, machine) {
        machine.increaseCoin(coin);
    };
    SelectableState.prototype.buyProduct = function (machine) {
        machine.provideProduct();
        machine.decreaseCoin();
        if (machine.hasNoCoin()) {
            machine.changeState(new NoCoinState());
        }
        else if (machine.hasNoProduct()) {
            machine.changeState(new SoldOutState());
        }
    };
    return SelectableState;
}());
var SoldOutState = /** @class */ (function () {
    function SoldOutState() {
    }
    SoldOutState.prototype.increaseCoin = function (coin, machine) {
        machine.returnCoin(coin);
    };
    SoldOutState.prototype.buyProduct = function (machine) {
        console.log("상품이 품절되었습니다.");
    };
    return SoldOutState;
}());
var new_bandingMachine = new New_BandingMachine();
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
