import { BankAccount } from "../../models/BankAccount";
import { CLI } from "../../cli/CLI";
import { Action } from "./Action";
import {BankAccountActionType, BankAccountType} from "../../types/BankAccountTypes";
import {PersistenceService} from "../PersistenceService";

export class WithdrawAction implements Action {
    /**
     * Execute the withdraw action for the user bank account
     * @param userBankAccount
     */
    async execute(userBankAccount: BankAccount): Promise<void> {
        await CLI.askValue("Entrez le montant à retirer :", "number").then(async (amount: number) => {
            if (isNaN(amount) || amount <= 0) {
                console.log("Montant invalide. Veuillez entrer un nombre positif.");
                return;
            }
            const targetAccount: BankAccountType = await CLI.askChoice("Sélectionnez le compte cible :", [
                {title: "Compte courant", value: "main"},
                {title: "Compte épargne", value: "saving"},
            ]);

            const targetMoney = targetAccount === "main" ? userBankAccount.money : userBankAccount.savings;
            if ((amount - targetMoney) > userBankAccount.overdraft) {
                console.log("Solde insuffisant, opération annulée.");
                userBankAccount.addToHistory(BankAccountActionType.Withdraw, amount, targetAccount, false);
                return;
            }

            userBankAccount.withdraw(amount, targetAccount);
            userBankAccount.addToHistory(BankAccountActionType.Withdraw, amount, targetAccount);
            userBankAccount.displayBalance();

            PersistenceService.saveBankAccount(userBankAccount);
        });
    }
}
