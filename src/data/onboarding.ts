import {CLI} from "../CLI";
import {BankAccount} from "../models/BankAccount";

export async function onboarding(): Promise<BankAccount> {
    console.log("Bienvenue sur Coda Bank !\nCréez votre compte pour continuer.");

    const username: string = await CLI.askValue("Entrez votre nom d'utilisateur :", "text");

    let pinCode: string;
    do {
        pinCode = await CLI.askValue("Entrez un code pin à 4 chiffres :", "text");
    } while (isNaN(+pinCode) || pinCode.length > 4);

    console.log(`Bienvenue, ${username} ! Choisissez une action pour continuer.`);

    return new BankAccount(username, pinCode);
}
