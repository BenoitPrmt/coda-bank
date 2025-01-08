import {BankAccount} from "../../models/BankAccount";

export interface Action {
    execute(userBankAccount: BankAccount): Promise<void>;
}
