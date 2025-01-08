import {BankAccountActionType} from "../types/BankAccountTypes";
import {Operation} from "./Operation";
import {EncryptionService} from "../services/EncryptionService";

export class BankAccount {
    public username: string;
    public pinCode: string;
    public money: number = 0;
    public overdraft: number = 0;
    public history: Operation[] = [];

    constructor(username: string, pinCode: string) {
        this.username = username;
        this.pinCode = EncryptionService.hash(pinCode);
    }

    public checkPinCode(pinCode: string): boolean {
        return EncryptionService.verify(pinCode, this.pinCode);
    }

    public deposit(amount: number): void {
        this.money += amount;
        this.addToHistory(BankAccountActionType.Deposit, amount);
        this.displayBalance();
    }

    public withdraw(amount: number): void {
        if ((amount - this.money) > this.overdraft) {
            console.log("Solde insuffisant, opération annulée.");
            this.addToHistory(BankAccountActionType.Withdraw, amount, false);
            return;
        }
        this.money -= amount;
        this.addToHistory(BankAccountActionType.Withdraw, amount);
        this.displayBalance();
    }

    public setOverdraft(amount: number): void {
        this.overdraft = amount;
        console.log(`Votre découvert autorisé est désormais de ${this.overdraft} €`);
    }

    public displayBalance(): void {
        console.log(`${this.username}, votre solde est de ${this.money} €`);
    }

    public addToHistory(actionType: BankAccountActionType, amount: number, isSuccessful: boolean = true): void  {
        const operation = new Operation(amount, this.money, actionType, isSuccessful);
        this.history.push(operation);
        console.log(`Transaction ${isSuccessful ? 'réussie' : 'échouée'}.`);
    }

    public displayHistory(): void {
        console.log('-'.repeat(50));
        console.log("Date | Etat - Type de transaction - Montant (solde)");

        const history = this.history.slice(-10);
        history.forEach((transaction: Operation) => {
            console.log(transaction.toString());
        });
        console.log('-'.repeat(50));
    }
}