import { BankAccount } from "../../models/BankAccount";
import { CLI } from "../../cli/CLI";
import { Action } from "./Action";
import {PersistenceService} from "../PersistenceService";

export class OverdraftAction implements Action {
    /**
     * Execute the overdraft action for the user bank account
     * @param userBankAccount
     */
    async execute(userBankAccount: BankAccount): Promise<void> {
        const overdraft = await CLI.askValue(`Entrez le montant du découvert autorisé (${userBankAccount.overdraft}€ actuellement) :`, "number");
        if (isNaN(overdraft) || overdraft < 0) {
            console.log("Montant invalide. Veuillez entrer un nombre positif.");
            return;
        }
        userBankAccount.setOverdraft(overdraft);

        PersistenceService.saveBankAccount(userBankAccount);
    }
}
