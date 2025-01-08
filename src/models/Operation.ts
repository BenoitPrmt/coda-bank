import {BankAccountActionType} from "../types/BankAccountTypes";

export class Operation {
    public date: Date = new Date();
    public amount: number;
    public balance: number;
    public successful: boolean = true;
    public actionType: BankAccountActionType;

    constructor(amount: number, balance: number, actionType: BankAccountActionType, successful: boolean = true) {
        this.amount = amount;
        this.balance = balance;
        this.actionType = actionType;
        this.successful = successful;
    }

    public toString(): string {
        const displayDate = `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()} à ${this.date.getHours()}h${this.date.getMinutes()}`;
        return `${displayDate} | ${this.successful ? '✅' : '❌'} - ${this.actionType} de ${this.amount}€ (solde : ${this.balance}€)`;
    }
}