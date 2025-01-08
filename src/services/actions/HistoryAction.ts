import {Action} from "./Action";
import {BankAccount} from "../../models/BankAccount";
import {CLI} from "../../cli/CLI";
import {Operation} from "../../models/Operation";

export class HistoryAction implements Action {
    async execute(userBankAccount: BankAccount): Promise<void> {
        console.log("Date | Etat | Type de transaction - Montant (solde) | Compte");
        console.log('-'.repeat(50));

        const history = userBankAccount.history.slice(-10);
        history.forEach((transaction: Operation) => {
            console.log(transaction.toString());
        });

        await CLI.askValue("Appuyez sur Entrée pour revenir au menu", "text");
    }
}
