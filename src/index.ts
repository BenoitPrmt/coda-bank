import { CLI } from "./CLI";
import {onboarding} from "./data/onboarding";
import {BankAccount} from "./models/BankAccount";

const startupParts = [
  "   __________  ____  ___       ____  ___    _   ____ __",
  "  / ____/ __ \\/ __ \\/   |     / __ )/   |  / | / / //_/",
  " / /   / / / / / / / /| |    / __  / /| | /  |/ / ,<   ",
  "/ /___/ /_/ / /_/ / ___ |   / /_/ / ___ |/ /|  / /| |  ",
  "\\____/\\____/_____/_/  |_|  /_____/_/  |_/_/ |_/_/ |_|",
  "",
  "La banque de demain, aujourd'hui.",
  "",
];

console.log(startupParts.join("\n"));

onboarding().then((userBankAccount: BankAccount) => {
  const cli = new CLI([
    {
      title: "Déposer de l'argent",
      value: "deposit",
      action: () => {
        userBankAccount.deposit(100);
      },
    },
    {
      title: "Retirer de l'argent",
      value: "with",
      action: () => {
        userBankAccount.withdraw(50);
      },
    },
    {
      title: "Voir le solde",
      value: "balance",
      action: () => {
        console.log(`Votre solde est de ${userBankAccount.checkBalance()} €`);
      },
    },
  ]);

  cli.menu();
})
