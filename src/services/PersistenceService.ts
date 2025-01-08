import {BankAccount} from "../models/BankAccount";
import * as fs from "node:fs";
import {BankAccountJsonType} from "../types/BankAccountTypes";

/**
 * Service for handling persistence of data in data.json
 */
export class PersistenceService {
    public static saveBankAccount(data: BankAccount): void {
        let accounts: BankAccountJsonType[] = this.loadBankAccounts();
        const account: BankAccountJsonType | undefined = accounts.find((account: BankAccountJsonType) => account.username === data.username);

        if (account) {
            accounts = accounts.filter((account: BankAccountJsonType) => account.username !== data.username);
        }
        accounts.push(data.toJson());

        fs.writeFileSync("data.json", JSON.stringify(accounts));
    }

    public static getBankAccountByUsername(username: string): BankAccount | null {
        const data: BankAccountJsonType[] = this.loadBankAccounts();

        const account: BankAccountJsonType | undefined = data.find((account: BankAccountJsonType) => account.username === username);
        if (account) {
            const bankAccount: BankAccount = new BankAccount(account.username, account.pinCode);
            bankAccount.loadFromJson(account);
            return bankAccount;
        }
        return null;
    }

    public static loadBankAccounts(): BankAccountJsonType[] {
        const data = fs.readFileSync("data.json", "utf-8");
        return JSON.parse(data);
    }
}
