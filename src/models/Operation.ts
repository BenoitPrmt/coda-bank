import {BankAccountActionType, BankAccountType, OperationJsonType} from "../types/BankAccountTypes";

export class Operation {
    public date: Date = new Date();
    public amount: number;
    public balance: number;
    public successful: boolean = true;
    public actionType: BankAccountActionType;
    public account: BankAccountType = "main";

    constructor(amount: number, balance: number, actionType: BankAccountActionType, successful: boolean = true, account: BankAccountType = "main") {
        this.amount = amount;
        this.balance = balance;
        this.actionType = actionType;
        this.successful = successful;
        this.account = account;
    }

    public toString(): string {
        const displayDate = `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()} à ${this.date.getHours()}h${this.date.getMinutes()}`;
        const targetAccount: string = this.account === "main" ? "Compte courant" : "Compte épargne";
        return `${displayDate} | ${this.successful ? '✅' : '❌'} | ${this.actionType} de ${this.amount}€ (solde : ${this.balance}€) | ${targetAccount}`;
    }

    public toJson(): OperationJsonType {
        return {
            amount: this.amount,
            targetBalance: this.balance,
            actionType: this.actionType,
            isSuccessful: this.successful,
            account: this.account
        };
    }
}