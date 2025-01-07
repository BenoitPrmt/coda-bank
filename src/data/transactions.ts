import {BankAccount} from "../models/BankAccount";
import {CLI} from "../cli/CLI";

export async function deposit(userBankAccount: BankAccount): Promise<void> {
    const amount = await CLI.askValue("Entrez le montant à déposer :", "number");
    if (isNaN(amount) || amount <= 0) {
        console.log("Montant invalide. Veuillez entrer un nombre positif.");
        return;
    }
    userBankAccount.deposit(amount);
}

export async function withdraw(userBankAccount: BankAccount): Promise<void> {
    await CLI.askValue("Entrez le montant à retirer :", "number").then((amount: number) => {
        if (isNaN(amount) || amount <= 0) {
            console.log("Montant invalide. Veuillez entrer un nombre positif.");
            return;
        }
        userBankAccount.withdraw(amount);
    });
}

export async function displayHistory(userBankAccount: BankAccount): Promise<void> {
    userBankAccount.displayHistory();
    await CLI.askValue("Appuyez sur Entrée pour revenir au menu", "text");
}