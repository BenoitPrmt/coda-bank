import type { Choice, PromptType } from "prompts";
import prompts from "prompts";
import {BankAccount} from "../models/BankAccount";

export interface CLIChoice extends Choice {
  action: () => Promise<void|BankAccount|null>;
}

/**
 * Represents a Command Line Interface (CLI) utility.
 */
export class CLI {
  /**
   * An array of choices available in the CLI menu.
   */
  public choices: CLIChoice[] = [];

  /**
   * Creates an instance of the CLI class.
   * @param choices - An array of CLIChoice objects to initialize the CLI with.
   */
  constructor(choices: CLIChoice[] = []) {
    this.choices = choices;
  }

  /**
   * Prompts the user to input a value.
   * @param message - The message to display to the user.
   * @param type - The type of input expected ("text" or "number").
   * @returns A promise that resolves to the user's input, either a string or a number.
   */
  public static async askValue(message: string, type: "text"): Promise<string>;
  public static async askValue(message: string, type: "number"): Promise<number>;
  public static async askValue(
      message: string,
      type: PromptType = "text"
  ): Promise<string | number> {
    try {
      const response = await prompts({
        type,
        name: "value",
        message,
      });

      if (response.value === undefined) {
        throw new Error("Operation cancelled");
      }

      return response.value;
    } catch (error) {
      console.log("\nOpération annulée");
      return Promise.reject(error);
    }
  }

  public async menuWithReturn(): Promise<any> {
    try {
      const response = await prompts({
        type: "select",
        name: "action",
        message: "Que voulez-vous faire ?",
        choices: [
          ...this.choices.map((choice) => ({
            title: choice.title,
            value: choice.value,
          })),
          { title: "Quitter", value: "quit" },
        ],
      });

      if (response.action === undefined) {
        await this.quit();
        return null;
      }

      const choice = this.choices.find(
          (choice) => choice.value === response.action
      );

      if (choice) {
        try {
          return await choice.action();
        } catch (error) {
          console.log("\nUne erreur est survenue");
          return null;
        }
      } else {
        await this.quit();
        return null;
      }
    } catch (error) {
      console.log("\nUne erreur est survenue");
      return null;
    }
  }

  /**
   * Displays a menu to the user with the available choices.
   * If a choice is selected, its action is executed, then the menu is displayed again.
   * If "Quitter" is selected, calls the `quit` method.
   */
  public async menu() {
    while (true) {
      try {
        const response = await prompts({
          type: "select",
          name: "action",
          message: "Que voulez-vous faire ?",
          choices: [
            ...this.choices.map((choice) => ({
              title: choice.title,
              value: choice.value,
            })),
            { title: "Quitter", value: "quit" },
          ],
        });

        if (response.action === undefined) {
          await this.quit();
          return;
        }

        const choice = this.choices.find(
            (choice) => choice.value === response.action
        );

        if (choice) {
          try {
            await choice.action();
            // Wait for 1 second before displaying the menu again
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            console.log("\nUne erreur est survenue");
          }
        } else {
          await this.quit();
          return;
        }
      } catch (error) {
        console.log("\nUne erreur est survenue");
      }
    }
  }


  /**
   * Quit the CLI and exit the program.
   * Waits for a random time between 0 and 2 seconds before exiting.
   */
  private async quit() {
    const randomTime = Math.floor(Math.random() * 2);
    await new Promise((resolve) => setTimeout(resolve, randomTime * 1000));
    console.log("Au revoir !");
    process.exit(0);
  }
}