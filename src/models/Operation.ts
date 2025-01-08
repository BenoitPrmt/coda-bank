import {BankAccountActionType, BankAccountType, OperationJsonType} from "../types/BankAccountTypes";
import {formatDate} from "../utils/formatDate";

export class Operation {
    public date: string = formatDate(new Date());
    public amount: number;
    public balance: number;
    public successful: boolean = true;
    public actionType: BankAccountActionType;
    public account: BankAccountType = "main";

    constructor(amount: number, balance: number, actionType: BankAccountActionType, successful: boolean = true, account: BankAccountType = "main", date: string = formatDate(new Date())) {
        this.amount = amount;
        this.balance = balance;
        this.actionType = actionType;
        this.successful = successful;
        this.account = account;
        this.date = date;
    }

    /**
     * Display the operation in a readable format
     */
    public toString(): string {
        const targetAccount: string = this.account === "main" ? "Compte courant" : "Compte épargne";
        return `${this.date} | ${this.successful ? '✅' : '❌'} | ${this.actionType} de ${this.amount}€ (solde : ${this.balance}€) | ${targetAccount}`;
    }

    /**
     * Convert the operation to a JSON object
     */
    public toJson(): OperationJsonType {
        return {
            amount: this.amount,
            targetBalance: this.balance,
            actionType: this.actionType,
            isSuccessful: this.successful,
            account: this.account,
            date: this.date
        };
    }
}