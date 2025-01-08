import {Action} from "./Action";
import {BankAccount} from "../../models/BankAccount";
import {CLI} from "../../cli/CLI";
import {BankAccountActionType, BankAccountType} from "../../types/BankAccountTypes";
import {PersistenceService} from "../PersistenceService";

export class DepositAction implements Action {
    /**
     * Execute the deposit action for the user bank account
     * @param userBankAccount
     */
    async execute(userBankAccount: BankAccount): Promise<void> {
        const amount: number = await CLI.askValue("Entrez le montant à déposer :", "number");
        if (isNaN(amount) || amount <= 0) {
            console.log("Montant invalide. Veuillez entrer un nombre positif.");
            return;
        }
        const targetAccount: BankAccountType = await CLI.askChoice("Sélectionnez le compte cible :", [
            { title: "Compte courant", value: "main" },
            { title: "Compte épargne", value: "saving" },
        ]);
        userBankAccount.deposit(amount, targetAccount);
        userBankAccount.addToHistory(BankAccountActionType.Deposit, amount, targetAccount);
        userBankAccount.displayBalance();

        PersistenceService.saveBankAccount(userBankAccount);
    }
}
