export enum BankAccountActionType {
    Deposit = "Dépot",
    Withdraw = "Retrait"
}

export type BankAccountHistory = {
    date: Date;
    amount: number;
    balance: number;
    successful: boolean;
    actionType: BankAccountActionType;
}