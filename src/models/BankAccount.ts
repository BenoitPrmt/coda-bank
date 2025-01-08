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

    public loadFromJson(json: any): void {
        this.money = json.money;
        this.savings = json.savings;
        this.overdraft = json.overdraft;
        this.history = json.history.map((operation: any) => {
            return new Operation(operation.amount, operation.targetBalance, operation.actionType, operation.isSuccessful, operation.account);
        });
        this.pinCode = json.pinCode;
    }

    public toJson(): any {
        return {
            money: this.money,
            savings: this.savings,
            overdraft: this.overdraft,
            history: this.history.map(operation => operation.toJson()),
            username: this.username,
            pinCode: this.pinCode
        };
    }
}