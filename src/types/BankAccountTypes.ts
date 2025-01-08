export enum BankAccountActionType {
    Deposit = "Dépot",
    Withdraw = "Retrait"
}

export type BankAccountType = "main" | "saving";

export type BankAccountJsonType = {
    money: number;
    savings: number;
    overdraft: number;
    history: OperationJsonType[];
    username: string;
    pinCode: string;
}

type OperationJsonType = {
    amount: number;
    targetBalance: number;
    actionType: BankAccountActionType;
    isSuccessful: boolean;
    account: BankAccountType;
}