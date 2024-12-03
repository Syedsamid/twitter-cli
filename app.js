import readline from "readline-sync";
import { registerUser,logInUser,addTask } from "./users.js";

async function main() {
  let loggInUser = null;

  while (true) {
    console.clear();
    console.log("-----------------------------------");
    console.log("---------Twitter cli------------------");
    console.log("-----------------------------------");

    const options = ["Exit", "Register", "Login", "Add Post"];
    options.map((x, index) => console.log(`${index}. ${x}`));
    const userInput = readline.questionInt("Select your option: ");

    switch (userInput) {
      case 0:
        console.log("Exit ... Goodbyee");
        process.exit(0);
      case 1:
        await registerUser();
        break;
      case 2:
        loggInUser = await logInUser();
        break;
      case 3:
        await addTask(loggInUser);
        break;
      
      default:
        console.log("Invalid option! Please select a valid option.");
    }
    readline.question("Press Enter to continue...");
  }
}
main();
