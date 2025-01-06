import {BankAccount} from "../models/BankAccount";
import {CLI} from "../cli/CLI";

export async function deposit(userBankAccount: BankAccount): Promise<void> {
    await CLI.askValue("Entrez le montant à déposer :", "number").then((amount: number) => {
        userBankAccount.deposit(amount);
    });
}

export async function withdraw(userBankAccount: BankAccount): Promise<void> {
    await CLI.askValue("Entrez le montant à retirer :", "number").then((amount: number) => {
        userBankAccount.withdraw(amount);
    });
}