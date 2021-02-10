console.log("Im working ok");
/*
# Login / Register app

1. Write a simple register program that will take new user's username and password and save it. Display the usernames of all existing users in a list.

- Users should be stored in array of User objects
- Array need to have one admin user by default when the application is started
- User need to have at least 3 properties: Username, Password and isAdmin

2. Write a simple login program that will require user's username and password to be entered. Display a message for the user that is logged in (ex. "Welcome Bob to our awesome app").

3. Add an option for logging out.

4. Add some further validation to all input fields for the usernames and passwords

- The user has to enter both username and password
- Register or login should not proceed with empty inputs
- Username needs to include more than 3 characters
- Password has to be longer than 6 characters

5. Add an admin panel that will check if the user is admin and display a message (ex. Welcome SuperAdmin). Display all usernames and passwords in a list or table.

# Flow

1. HTML!!! (Login form, Register form, Logout, Admin panel (unordered list or table))
2. Global variables array of users and currentUser object of user
3. Function constructor User(username, password, isAdmin)
4. Events and other function (don't forget the checks)*/

let inputUserName = document.getElementsByTagName("input")[0];
let inputPassword = document.getElementsByTagName("input")[1];
let btnLogIn = document.getElementsByTagName("button")[0];
let btnCreateNewAccount = document.getElementsByTagName("button")[1];
let showLoginMessage = document.getElementById("showLoginMessage");
let createAccountPartDiv = document.getElementById("createAccountPart");

let pageUsers = [];

function User(userName, password, isAdmin) {
  this.userName = userName;
  this.password = password;
  this.isAdmin = isAdmin;
}

let testAdmin = new User("firstAdmin", "passwordForAdmin", true);

pageUsers.push(testAdmin);

btnCreateNewAccount.addEventListener("click", function () {
  inputUserName.style.display = "none";
  inputPassword.style.display = "none";
  btnLogIn.style.display = "none";
  btnCreateNewAccount.style.display = "none";
  showLoginMessage.style.display = "none";
  createAccountPartDiv.innerHTML = `
  <h3>Create your account now!</h3><input type='text' placeholder='Your UserName' id='newUserName'> 
  <br></br> <input type='password'  placeholder='Your Password' id='newPassword' minlength="3" wavelength="6" required>
   <br></br> <input type='password' placeholder='Confirm Your Password' id='confirmPassword'
  minlength="3" required>
  <br></br> <button id='createAccount'>Create your account!</button><p id='message'></p><button id='backToLogInPage'>Back to log in page</button>`;

  document
    .getElementById("backToLogInPage")
    .addEventListener("click", function () {
      inputUserName.style.display = "inline";
      inputPassword.style.display = "inline";
      btnLogIn.style.display = "inline";
      btnCreateNewAccount.style.display = "inline";
      showLoginMessage.style.display = "inline";
      createAccountPartDiv.innerHTML = "";
    });

  let newUserName = document.getElementById("newUserName");
  let newPassword = document.getElementById("newPassword");
  let confirmPassword = document.getElementById("confirmPassword");
  let btnFinallyCreateYourAccount = document.getElementById("createAccount");
  let messageToUserWhenCreatingAccount = document.getElementById("message");

  btnFinallyCreateYourAccount.addEventListener("click", function () {
    if (
      newUserName.value !== "" ||
      newPassword.value !== "" ||
      confirmPassword.value !== ""
    ) {
      if (newUserName.value.length > 3) {
        if (newPassword.value.length > 6) {
          if (newPassword.value.length === confirmPassword.value.length) {
            pageUsers.push(
              new User(`${newUserName.value}`, `${newPassword.value}`, false)
            );
            createAccountPartDiv.innerHTML =
              "<h3>Your account has been created! Thank you for joining us! Please log in and check your account!</h3>";
            inputUserName.style.display = "inline";
            inputPassword.style.display = "inline";
            btnLogIn.style.display = "inline";
            btnCreateNewAccount.style.display = "block";
            showLoginMessage.style.display = "block";
          } else {
            messageToUserWhenCreatingAccount.innerText =
              "Please make sure that your password matches the confirmation password!";
          }
        } else {
          messageToUserWhenCreatingAccount.innerText =
            "The Password should contain more than 6 characters!";
        }
      } else {
        messageToUserWhenCreatingAccount.innerText =
          "User name should contain more than 3 characters!";
      }
    } else {
      messageToUserWhenCreatingAccount.innerText =
        "Please fill in the required fields!";
    }

    newUserName.value = "";
    newPassword.value = "";
    confirmPassword.value = "";

    console.log(pageUsers);
  });
});

btnLogIn.addEventListener("click", function () {
  createAccountPartDiv.innerHTML = "";
  for (i = 0; i < pageUsers.length; i++) {
    if (
      pageUsers[i].userName === inputUserName.value &&
      pageUsers[i].password === inputPassword.value
    ) {
      inputUserName.style.display = "none";
      inputPassword.style.display = "none";
      btnLogIn.style.display = "none";
      btnCreateNewAccount.style.display = "none";
      showLoginMessage.style.display = "none";

      if (pageUsers[i].isAdmin === false) {
        createAccountPartDiv.innerHTML = `<h3>Dear ${pageUsers[i].userName} welcome to our awesome page!</h3><br><br><button class='logOut'>Log out</button>`;

        let logOutBtns = document.querySelectorAll(".logOut");
        for (button of logOutBtns) {
          button.addEventListener("click", function () {
            inputUserName.style.display = "inline";
            inputPassword.style.display = "inline";
            btnLogIn.style.display = "inline";
            btnCreateNewAccount.style.display = "inline";
            showLoginMessage.style.display = "block";
            showLoginMessage.innerText = "";
            createAccountPartDiv.innerHTML = "";
          });
        }
      } else {
        createAccountPartDiv.innerHTML = `<h3>Dear admin ${pageUsers[i].userName} welcome to your awesome page!</h3> <button id='checkAllPageUsers'>Check all page users!</button>`;
        let btnCheckAllPageUsers = document.getElementById("checkAllPageUsers");
        btnCheckAllPageUsers.addEventListener("click", function () {
          btnCheckAllPageUsers.remove();
          createAccountPartDiv.innerHTML += `<table border='1'><thead><th>User with username</th><th>Password</th><th>isAdmin</th><th>Option to delete user</th><th>Change user status</th></thead><tbody></tbody></table><br><br><button class='logOut'>Log out</button>`;

          for (user of pageUsers) {
            document.getElementsByTagName(
              "tbody"
            )[0].innerHTML += `<tr><td>${user.userName}</td><td>${user.password}</td><td>${user.isAdmin}</td><td><button class='deleteUser'>Delete this user</button></td><td><button class='changeUserStatus'>Add user as admin</button></td></tr>`;

            let logOutBtns = document.querySelectorAll(".logOut");
            for (button of logOutBtns) {
              button.addEventListener("click", function () {
                inputUserName.style.display = "inline";
                inputPassword.style.display = "inline";
                btnLogIn.style.display = "inline";
                btnCreateNewAccount.style.display = "inline";
                showLoginMessage.style.display = "block";
                showLoginMessage.innerText = "";
                createAccountPartDiv.innerHTML = "";
              });
            }
            let deleteBtns = document.getElementsByClassName("deleteUser");
            for (button of deleteBtns) {
              button.addEventListener("click", function (event) {
                event.target.parentElement.parentElement.remove();
              });
            }

            let changeStatusBtns = document.getElementsByClassName(
              "changeUserStatus"
            );

            for (i = 0; i < changeStatusBtns.length; i++) {
              changeStatusBtns[i].addEventListener("click", function (event) {
                if (
                  button.parentElement.previousElementSibling
                    .previousElementSibling.innerText !== true
                ) {
                  event.target.parentElement.previousElementSibling.previousElementSibling.innerText =
                    "true";
                }
                let indexOfClickedObject = 0;
                arrayTr = document.getElementsByTagName("tr");

                for (i = 0; i < arrayTr.length; i++) {
                  if (arrayTr[i] === event.target.parentElement.parentElement) {
                    indexOfClickedObject = i;
                  }
                }
                console.log(indexOfClickedObject-1)
                pageUsers[indexOfClickedObject-1].isAdmin=true;
                
              });
            }
           
          }
        });
      }
    }
  }

  showLoginMessage.innerText =
    "Incorrect UserName or Password. Please try again!";
  inputUserName.value = "";
  inputPassword.value = "";
});
