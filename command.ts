// // interface
// abstract class ICommand {
//   abstract execute(args): void;
// }
// // Reciver
// class State {
//   private _state: number;
//   constructor(state) {
//     this._state = state;
//   }
//   getState() {
//     return this._state;
//   }
//   setState(value) {
//     this._state = value;
//   }
// }
// // Incoker
// class BankManager {
//   private _state;
//   private _commands = {};
//   constructor(state) {
//     this._state = state;
//   }
//   registerCommands(...args) {
//     for (const cmd of args) {
//       this._commands[cmd.constructor.name] = cmd;
//     }
//   }
//   executeCmd(cmdName, param) {
//     this._commands[cmdName].execute(this._state, param);
//   }
// }
// // command
// class Deposit implements ICommand {
//   execute(...params): void {
//     const [state, amount] = params;
//     const prevState = state.getState();
//     state.setState(prevState + amount);
//   }
// }
// class WithDrawal implements ICommand {
//   execute(...params): void {
//     const [state, amount] = params;
//     const prevState = state.getState();
//     state.setState(prevState - amount);
//   }
// }

// // 1. command 생성
// const deposit = new Deposit();
// const withdrawal = new WithDrawal();

// // 2. receiver 생성
// const state = new State(0); // 계좌 or 통장 ,, 잔고는 0

// // 3. invoker 인스턴스 & receiver 등록
// const bankmanager = new BankManager(state);

// // 4. command 등록
// bankmanager.registerCommands(deposit, withdrawal);

// // 5. command 지시
// bankmanager.executeCmd('Deposit', 100);
// bankmanager.executeCmd('Deposit', 1000);

// console.log(state.getState());

// bankmanager.executeCmd('WithDrawal', 1000);
// console.log(state.getState());
