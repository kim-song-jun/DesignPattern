// interface
var ICommand = /** @class */ (function () {
    function ICommand() {
    }
    return ICommand;
}());
// Reciver
var State = /** @class */ (function () {
    function State(state) {
        this._state = state;
    }
    State.prototype.getState = function () {
        return this._state;
    };
    State.prototype.setState = function (value) {
        this._state = value;
    };
    return State;
}());
// Incoker
var BankManager = /** @class */ (function () {
    function BankManager(state) {
        this._commands = {};
        this._state = state;
    }
    BankManager.prototype.registerCommands = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var cmd = args_1[_a];
            this._commands[cmd.constructor.name] = cmd;
        }
    };
    BankManager.prototype.executeCmd = function (cmdName, param) {
        this._commands[cmdName].execute(this._state, param);
    };
    return BankManager;
}());
// command
var Deposit = /** @class */ (function () {
    function Deposit() {
    }
    Deposit.prototype.execute = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var state = params[0], amount = params[1];
        var prevState = state.getState();
        state.setState(prevState + amount);
    };
    return Deposit;
}());
var WithDrawal = /** @class */ (function () {
    function WithDrawal() {
    }
    WithDrawal.prototype.execute = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var state = params[0], amount = params[1];
        var prevState = state.getState();
        state.setState(prevState - amount);
    };
    return WithDrawal;
}());
// 1. command 생성
var deposit = new Deposit();
var withdrawal = new WithDrawal();
// 2. receiver 생성
var state = new State(0); // 계좌 or 통장 ,, 잔고는 0
// 3. invoker 인스턴스 & receiver 등록
var bankmanager = new BankManager(state);
// 4. command 등록
bankmanager.registerCommands(deposit, withdrawal);
// 5. command 지시  
bankmanager.executeCmd('Deposit', 100);
bankmanager.executeCmd('Deposit', 1000);
console.log(state.getState());
bankmanager.executeCmd('WithDrawal', 1000);
console.log(state.getState());
