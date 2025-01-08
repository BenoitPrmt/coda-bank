import { BankAccount } from "../models/BankAccount";
import { CLI } from "../cli/CLI";

/**
 * Represents the onboarding process for users (registration and login).
 */
export class Onboarding {
    private static accounts: BankAccount[] = [];
    private static currentAccount: BankAccount | null = null;

    /**
     * Starts the onboarding process for users.
     * @returns A promise that resolves to the user's BankAccount instance
     * or null if the user exits the application.
     * */
    public static async onboarding(): Promise<BankAccount | null> {
        const menu = [
            {
                title: "Créer mon compte",
                value: "createAccount",
                action: async () => {
                    await Onboarding.register();
                },
            },
            {
                title: "Me connecter",
                value: "login",
                action: async () => {
                    return await Onboarding.login();
                },
            },
        ];

        const cli = new CLI(menu);
        let account: BankAccount | null = null;

        while (!account) {
            account = await cli.menuWithReturn();
        }

        return account;
    }

    /**
     * Registers a new user account.
     */
    public static async register(): Promise<void> {
        const username: string = await CLI.askValue("Entrez votre nom d'utilisateur :", "text");

        let pinCode: string;
        do {
            pinCode = await CLI.askValue("Entrez un code pin à 4 chiffres :", "text");
        } while (isNaN(+pinCode) || pinCode.length !== 4);

        const newAccount = new BankAccount(username, pinCode);
        Onboarding.accounts.push(newAccount);
        console.log("Compte créé avec succès ! Veuillez vous connecter.");
    }

    /**
     * Log in an existing user account.
     */
    public static async login(): Promise<BankAccount | null> {
        console.log(this.accounts.length);
        if (this.accounts.length === 0) {
            console.log("Aucun compte n'a été créé. Veuillez d'abord créer un compte.");
            await this.register();
            return this.login();
        }

        let attempts = 0;
        const maxAttempts = 3;

        do {
            const username: string = await CLI.askValue("Entrez votre nom d'utilisateur :", "text");
            this.currentAccount = this.accounts.find((account) => account.username === username) || null;
            if (!this.currentAccount) {
                console.log("Nom d'utilisateur introuvable.");
            }
        } while (!this.currentAccount);

        while (attempts < maxAttempts) {
            const pinCode: string = await CLI.askValue("Entrez votre code PIN :", "text");

            if (this.currentAccount.checkPinCode(pinCode)) {
                console.log(`Connexion réussie ! Bienvenue, ${this.currentAccount.username} !`);
                return this.currentAccount;
            } else {
                attempts++;
                console.log(`Code PIN incorrect. Tentative ${attempts}/${maxAttempts}.`);
            }

            if (attempts >= maxAttempts) {
                console.log("Nombre maximum de tentatives atteint.");
                process.exit(0);
            }
        }
        throw new Error("Une erreur inattendue est survenue lors de la connexion.");
    }
}
