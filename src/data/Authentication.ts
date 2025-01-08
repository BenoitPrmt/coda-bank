import { BankAccount } from "../models/BankAccount";
import { CLI } from "../cli/CLI";
import {PIN_CODE_LENGTH, PIN_CODE_MAX_ATTEMPTS} from "../config/constants";

/**
 * Represents the authentication process for users (registration and login).
 */
export class Authentication {
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
                    await Authentication.register();
                },
            },
            {
                title: "Me connecter",
                value: "login",
                action: async () => {
                    return await Authentication.login();
                },
            },
        ];

        const cli = new CLI(menu);
        let account: BankAccount | null = null;

        while (!account) {
            account = await cli.menuWithReturn() as BankAccount | null;
        }

        return account;
    }

    /**
     * Register a new user account.
     */
    public static async register(): Promise<void> {
        const username: string = await CLI.askValue("Entrez votre nom d'utilisateur :", "text");

        let pinCode: string;
        do {
            pinCode = await CLI.askValue(`Entrez un code pin à ${PIN_CODE_LENGTH} chiffres :`, "text");
        } while (isNaN(+pinCode) || pinCode.length !== PIN_CODE_LENGTH);

        const newAccount = new BankAccount(username, pinCode);
        Authentication.accounts.push(newAccount);
        console.log("Compte créé avec succès ! Veuillez vous connecter.");
    }

    /**
     * Log in an existing user account.
     */
    public static async login(): Promise<BankAccount | null> {
        if (this.accounts.length === 0) {
            console.log("Aucun compte n'a été créé. Veuillez d'abord créer un compte.");
            await this.register();
            return this.login();
        }

        let attempts = 0;
        do {
            const username: string = await CLI.askValue("Entrez votre nom d'utilisateur :", "text");
            this.currentAccount = this.accounts.find((account) => account.username === username) || null;
            if (!this.currentAccount) {
                console.log("Nom d'utilisateur introuvable.");
            }
        } while (!this.currentAccount);

        while (attempts < PIN_CODE_MAX_ATTEMPTS) {
            const pinCode: string = await CLI.askValue("Entrez votre code PIN :", "text");

            if (this.currentAccount.checkPinCode(pinCode)) {
                console.log(`Connexion réussie ! Bienvenue, ${this.currentAccount.username} !`);
                return this.currentAccount;
            } else {
                attempts++;
                console.log(`Code PIN incorrect. Tentative ${attempts}/${PIN_CODE_MAX_ATTEMPTS}.`);
            }

            if (attempts >= PIN_CODE_MAX_ATTEMPTS) {
                console.log("Nombre maximum de tentatives atteint.");
                process.exit(0);
            }
        }
        throw new Error("Une erreur inattendue est survenue lors de la connexion.");
    }
}
