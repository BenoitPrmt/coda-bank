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
      action: async () => {
        try {
          await deposit(userBankAccount);
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
          await withdraw(userBankAccount);
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
  ]);

  cli.menu();
});