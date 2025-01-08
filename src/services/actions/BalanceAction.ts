import {Action} from "./Action";
import {BankAccount} from "../../models/BankAccount";
import {CLI} from "../../cli/CLI";

export class BalanceAction implements Action {
    async execute(userBankAccount: BankAccount): Promise<void> {
        userBankAccount.displayBalance();
        await CLI.askValue("Appuyez sur Entrée pour revenir au menu", "text");
    }
}
