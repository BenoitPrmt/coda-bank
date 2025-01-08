import {BankAccountActionType, BankAccountType} from "../types/BankAccountTypes";
import {Operation} from "./Operation";
import {EncryptionService} from "../services/EncryptionService";

export class BankAccount {
    public username: string;
    public pinCode: string;
    public money: number = 0;
    public savings: number = 0;
    public overdraft: number = 0;
    public history: Operation[] = [];

    constructor(username: string, pinCode: string) {
        this.username = username;
        this.pinCode = EncryptionService.hash(pinCode);
    }

    public checkPinCode(pinCode: string): boolean {
        return EncryptionService.verify(pinCode, this.pinCode);
    }

    public deposit(amount: number, targetAccount: BankAccountType = "main"): void {
        targetAccount === "main" ? this.money += amount : this.savings += amount;
    }

    public withdraw(amount: number, targetAccount: BankAccountType = "main"): void {
        targetAccount === "main" ? this.money -= amount : this.savings -= amount;
    }

    public setOverdraft(amount: number): void {
        this.overdraft = amount;
        console.log(`Votre découvert autorisé est désormais de ${this.overdraft} €`);
    }

    public displayBalance(): void {
        console.log(`Compte courant : ${this.money}€ | Compte épargne : ${this.savings}€`);
    }

    public addToHistory(actionType: BankAccountActionType, amount: number, account: BankAccountType = "main", isSuccessful: boolean = true): void {
        const targetBalance = account === "main" ? this.money : this.savings;
        const operation = new Operation(amount, targetBalance, actionType, isSuccessful, account);
        this.history.push(operation);
        console.log(`Transaction ${isSuccessful ? 'réussie' : 'échouée'}.`);
    }
}