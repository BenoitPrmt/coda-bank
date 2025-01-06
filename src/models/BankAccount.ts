import bcrypt from "bcrypt";

export class BankAccount {
    public username: string;
    public pinCode: string;
    public money: number = 0;

    constructor(username: string, pinCode: string) {
        this.username = username;
        this.pinCode = bcrypt.hashSync(pinCode, 10);
    }

    public checkPinCode(pinCode: string): boolean {
        return bcrypt.compareSync(pinCode, this.pinCode);
    }

    public deposit(amount: number): void {
        this.money += amount;
        this.displayBalance();
    }

    public withdraw(amount: number): void {
        if (amount > this.money) {
            console.log("Solde insuffisant, opération annulée.");
            return;
        }
        this.money -= amount;
        this.displayBalance();
    }

    public checkBalance(): number {
        return this.money;
    }

    public displayBalance(): void {
        console.log(`${this.username}, votre solde est de ${this.money} €`);
    }
}