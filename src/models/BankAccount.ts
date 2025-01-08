import {
    BankAccountActionType,
    BankAccountJsonType,
    BankAccountType,
    OperationJsonType
} from "../types/BankAccountTypes";
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

    /**
     * Check if the provided pin code is correct.
     * @param pinCode
     */
    public checkPinCode(pinCode: string): boolean {
        return EncryptionService.verify(pinCode, this.pinCode);
    }

    /**
     * Deposit money into the account specified
     * @param amount
     * @param targetAccount - main by default
     */
    public deposit(amount: number, targetAccount: BankAccountType = "main"): void {
        targetAccount === "main" ? this.money += amount : this.savings += amount;
    }

    /**
     * Withdraw money from the account specified
     * @param amount
     * @param targetAccount - main by default
     */
    public withdraw(amount: number, targetAccount: BankAccountType = "main"): void {
        targetAccount === "main" ? this.money -= amount : this.savings -= amount;
    }

    /**
     * Set the maximum amount of overdraft allowed
     * @param amount
     */
    public setOverdraft(amount: number): void {
        this.overdraft = amount;
        console.log(`Votre découvert autorisé est désormais de ${this.overdraft} €`);
    }

    /**
     * Display the balance of the main and savings accounts
     */
    public displayBalance(): void {
        console.log(`Compte courant : ${this.money}€ | Compte épargne : ${this.savings}€`);
    }

    /**
     * Display the history of operations
     * @param actionType
     * @param amount
     * @param account
     * @param isSuccessful
     */
    public addToHistory(actionType: BankAccountActionType, amount: number, account: BankAccountType = "main", isSuccessful: boolean = true): void {
        const targetBalance = account === "main" ? this.money : this.savings;
        const operation = new Operation(amount, targetBalance, actionType, isSuccessful, account);
        this.history.push(operation);
        console.log(`Transaction ${isSuccessful ? 'réussie' : 'échouée'}.`);
    }

    /**
     * Load the bank account data from a JSON object
     * @param json
     */
    public loadFromJson(json: BankAccountJsonType): void {
        this.money = json.money;
        this.savings = json.savings;
        this.overdraft = json.overdraft;
        this.history = json.history.map((operation: OperationJsonType) => {
            return new Operation(operation.amount, operation.targetBalance, operation.actionType, operation.isSuccessful, operation.account, operation.date);
        });
        this.pinCode = json.pinCode;
    }

    /**
     * Convert the bank account data to a JSON object
     */
    public toJson(): BankAccountJsonType {
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