import { BankAccount } from "../../models/BankAccount";
import { CLI } from "../../cli/CLI";
import { Action } from "./Action";

export class OverdraftAction implements Action {
    async execute(userBankAccount: BankAccount): Promise<void> {
        const overdraft = await CLI.askValue(`Entrez le montant du découvert autorisé (${userBankAccount.overdraft}€ actuellement) :`, "number");
        if (isNaN(overdraft) || overdraft < 0) {
            console.log("Montant invalide. Veuillez entrer un nombre positif.");
            return;
        }
        userBankAccount.setOverdraft(overdraft);
    }
}
