import bcrypt from "bcrypt";
import {BankAccountActionType, BankAccountHistory} from "../types/BankAccountTypes";

export class BankAccount {
    public username: string;
    public pinCode: string;
    public money: number = 0;
    public history: BankAccountHistory[] = [];

    constructor(username: string, pinCode: string) {
        this.username = username;
        this.pinCode = bcrypt.hashSync(pinCode, 10);
    }

    public checkPinCode(pinCode: string): boolean {
        return bcrypt.compareSync(pinCode, this.pinCode);
    }

    public deposit(amount: number): void {
        this.money += amount;
        this.addToHistory(BankAccountActionType.Deposit, amount);
        this.displayBalance();
    }

    public withdraw(amount: number): void {
        if (amount > this.money) {
            console.log("Solde insuffisant, opération annulée.");
            this.addToHistory(BankAccountActionType.Withdraw, amount, false);
            return;
        }
        this.money -= amount;
        this.addToHistory(BankAccountActionType.Withdraw, amount);
        this.displayBalance();
    }

    public checkBalance(): number {
        return this.money;
    }

    public displayBalance(): void {
        console.log(`${this.username}, votre solde est de ${this.money} €`);
    }

    public addToHistory(actionType: BankAccountActionType, amount: number, isSuccessful: boolean = true): void  {
        const transaction: BankAccountHistory = {
            date: new Date(),
            amount,
            balance: this.money,
            successful: isSuccessful,
            actionType
        };
        this.history.push(transaction);
        console.log(`Transaction ${isSuccessful ? 'réussie' : 'échouée'}.`);
    }

    public displayHistory(): void {
        console.log('-'.repeat(50));
        console.log("Date | Etat - Type de transaction - Montant (solde)");

        const history = this.history.slice(-10);
        history.forEach((transaction: BankAccountHistory) => {
            const date = new Date(transaction.date);
            const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}h${date.getMinutes()}`;
            console.log(`${displayDate} | ${transaction.successful ? '✅' : '❌'} - ${transaction.actionType} de ${transaction.amount}€ (solde : ${transaction.balance}€)`);
        });
        console.log('-'.repeat(50));
    }
}