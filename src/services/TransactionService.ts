import {BankAccount} from "../models/BankAccount";
import {CLI} from "../cli/CLI";
import {BankAccountType} from "../types/BankAccountTypes";

/**
 * Service responsible for handling bank transactions
 */
export class TransactionService {
    /**
     * Deposits money into a user's bank account.
     * @param userBankAccount
     */
    public static async deposit(userBankAccount: BankAccount): Promise<void> {
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
    }

    /**
     * Withdraws money from a user's bank account.
     * @param userBankAccount
     */
    public static async withdraw(userBankAccount: BankAccount): Promise<void> {
        await CLI.askValue("Entrez le montant à retirer :", "number").then((amount: number) => {
            if (isNaN(amount) || amount <= 0) {
                console.log("Montant invalide. Veuillez entrer un nombre positif.");
                return;
            }
            userBankAccount.withdraw(amount);
        });
    }

    /**
     * Displays the transaction history of a user's bank account.
     * @param userBankAccount
     */
    public static async displayHistory(userBankAccount: BankAccount): Promise<void> {
        userBankAccount.displayHistory();
        await CLI.askValue("Appuyez sur Entrée pour revenir au menu", "text");
    }

    /**
     * Sets the overdraft limit for a user's bank account.
     * @param userBankAccount
     */
    public static async setOverdraft(userBankAccount: BankAccount): Promise<void> {
        const overdraft = await CLI.askValue(`Entrez le montant du découvert autorisé (${userBankAccount.overdraft}€ actuellement) :`, "number");
        if (isNaN(overdraft) || overdraft < 0) {
            console.log("Montant invalide. Veuillez entrer un nombre positif.");
            return;
        }
        userBankAccount.setOverdraft(overdraft);
    }
}