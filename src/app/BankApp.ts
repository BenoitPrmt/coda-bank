import {BankAccount} from "../models/BankAccount";
import {AuthenticationService} from "../services/AuthenticationService";
import {CLI} from "../cli/CLI";
import {TransactionService} from "../services/TransactionService";

export class BankApp {
    /**
     * Main menu of BankApp for authenticated users
     */
    private static mainMenu(userBankAccount: BankAccount) {
        return [
            {
                title: "Déposer de l'argent",
                value: "deposit",
                action: async () => {
                    try {
                        await TransactionService.deposit(userBankAccount);
                    } catch (error) {
                        // Error already handled in deposit
                    }
                },
            },
            {
                title: "Retirer de l'argent",
                value: "withdraw",
                action: async () => {
                    try {
                        await TransactionService.withdraw(userBankAccount);
                    } catch (error) {
                        // Error already handled in withdraw
                    }
                },
            },
            {
                title: "Voir le solde",
                value: "balance",
                action: async () => {
                    userBankAccount.displayBalance();
                },
            },
            {
                title: "Voir l'historique des transactions",
                value: "history",
                action: async () => {
                    await TransactionService.displayHistory(userBankAccount);
                },
            },
            {
                title: "Gérer le découvert autorisé",
                value: "overdraft",
                action: async () => {
                    await TransactionService.setOverdraft(userBankAccount);
                },
            },
            {
                title: "Se déconnecter",
                value: "logout",
                action: async () => {
                    await BankApp.start(); // Redémarrage de l'application
                },
            },
        ];
    }

    /**
     * Starts the BankApp application and the onboarding process
     */
    private static async start(): Promise<void> {
        try {
            const account = await AuthenticationService.onboarding();
            if (account) {
                const cli = new CLI(this.mainMenu(account));
                await cli.menu();
            } else {
                console.log("L'authentification a échoué. Veuillez réessayer.");
                await this.start();
            }
        } catch (error) {
            console.log("\nUne erreur est survenue, redémarrage de l'application...");
            await this.start();
        }
    }

    /**
     * Main entry point of the BankApp application
     */
    public static async run(): Promise<void> {
        console.log("Démarrage de l'application...");
        await this.start();
    }
}