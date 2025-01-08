import {Action} from "./actions/Action";
import {DepositAction} from "./actions/DepositAction";
import {WithdrawAction} from "./actions/WithdrawAction";
import {BankAccount} from "../models/BankAccount";
import {HistoryAction} from "./actions/HistoryAction";
import {OverdraftAction} from "./actions/OverdraftAction";
import {BalanceAction} from "./actions/BalanceAction";

export class ActionService {
    private transactions: { [key: string]: Action };

    constructor() {
        this.transactions = {
            deposit: new DepositAction(),
            withdraw: new WithdrawAction(),
            history: new HistoryAction(),
            overdraft: new OverdraftAction(),
            balance: new BalanceAction(),
        };
    }

    async execute(action: string, userBankAccount: BankAccount): Promise<void> {
        const transaction = this.transactions[action];
        if (!transaction) {
            console.log("Action inconnue.");
            return;
        }
        await transaction.execute(userBankAccount);
    }
}
