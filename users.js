import read from "readline-sync";
import fs from "fs/promises";

async function registerUser() {
  let dbRead = await fs.readFile("db.json", "utf-8");

  let finalDb = JSON.parse(dbRead);

  let userInp = read.question("Enter a UserName: ");
  let userPass = read.question("Enter a Password: ", { hideEchoBack: true });

  let check = finalDb.users.find((x) => x.username === userInp);
  if (check) {
    console.log("Username Already exists!");
  } else {
    console.log("Account Created Successfully!");
  }

  let obj = {
    username: userInp,
    password: userPass ,
  };

  finalDb.users.push(obj);

  let convertDb = JSON.stringify(finalDb);

  await fs.writeFile("db.json", convertDb);
}

async function logInUser() {
  let readDb = await fs.readFile("db.json", "utf-8");
  console.log(readDb);

  let myDb = JSON.parse(readDb);
  console.log(myDb);

  let userInpUserName = read.question("enter your username: ");
  let userInpUserPass = read.question("enter your password: ");

  let checkUser = myDb.users.find((u) => {
    return u.username === userInpUserName && u.password === userInpUserPass;
  });
  console.log(checkUser);

  if (checkUser) {
    console.log("Loggedin Successfully!");

    return checkUser;
  } else {
    console.log("Invalid Username or password!");

    return null;
  }
}

async function addTask(loggedInUser){

    if(!loggedInUser){
      return  console.log('You need to login first!');
    }
    let readMyDb = await fs.readFile("db.json");
    
    let finalDb = JSON.parse(readMyDb);

    let title = read.question("give a title: ")
    let description = read.question("give the description: ");

    let userLoggedin = finalDb.users.find((x)=> {
      
      x.username = loggedInUser.username
    })
    let newTask = { id: Date.now(), title, description}

    finalDb.users.push(newTask);
    let convert = JSON.stringify(finalDb)

    await fs.writeFile("db.json", convert);

    console.log('Task added successfully!');
    
 }

export { registerUser, logInUser, addTask };
