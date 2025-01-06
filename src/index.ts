import { CLI } from "./cli/CLI";
import {onboarding} from "./data/onboarding";
import {BankAccount} from "./models/BankAccount";
import {deposit, withdraw} from "./data/transactions";

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
        deposit(userBankAccount);
      },
    },
    {
      title: "Retirer de l'argent",
      value: "with",
      action: () => {
        withdraw(userBankAccount);
      },
    },
    {
      title: "Voir le solde",
      value: "balance",
      action: () => {
        userBankAccount.displayBalance();
      },
    },
  ]);

  cli.menu();
})
