// Login logic
const user = skygear.currentUser;

const handler = skygear.onUserChanged(function (user) {
  if (user) {
    console.log('user logged in or signed up');
  } else {
    console.log('user logged out or the access token expired');
  }
  updateAppView();
});


function login (username, password) {
  skygear.loginWithUsername(username, password).then((user) => {
    console.log(user); // user object
  }, (error) => {
    console.error(error);
    swal({
      title: "Error!",
      text: "Hey, "+error.error.message,
      type: "error",
      confirmButtonText: "Okay"
    });
  })
}

function signup (username, password, passwordConfirm) {
  if (username.length < 1) {
    swal({
      title: "Error!",
      text: "Please input a username",
      type: "error",
      confirmButtonText: "Okay"
    });
    return;
  }
  if (password.length < 6) {
    swal({
      title: "Error!",
      text: "Password too short. Please make it 6 characters or more.",
      type: "error",
      confirmButtonText: "Okay"
    });
    return;
  }
  if (password !== passwordConfirm) {
    swal({
      title: "Error!",
      text: "Hey, the password is incorrect!",
      type: "error",
      confirmButtonText: "Okay"
    });
    return;
  }

  skygear.signupWithUsername(username, password).then((user) => {
    console.log(user); // user object
    swal({
      title: "Welcome",
      text: "Thanks for signing up!",
      type: "success",
      confirmButtonText: "Next"
    });

  }, (error) => {
    swal({
      title: "Error!",
      text: "Hey, "+error.error.message,
      type: "error",
      confirmButtonText: "Okay"
    });
  });
}

function logout () {
  skygear.logout().then(() => {
    console.log('logout successfully');
  }, (error) => {
    console.error(error);
  });
}

// User Profile
function getUserProfile () {
  const query = new skygear.Query(skygear.UserRecord);
  query.equalTo('_id', skygear.currentUser.id);
  skygear.publicDB.query(query).then((records) => {
    const profile = records[0];
    console.log(profile);
  }, (error) => {
    console.error(error);
  });

}

// Events subscription
loginLink.on("click", showLoginBox);
signupLink.on("click", showSignupBox);

loginSubmitBtn.on("click", function() {
  login(loginName.val(),loginPass.val());
})

signupSubmitBtn.on("click", function() {
  signup(signupName.val(),signupPass.val(),signupPassConfirm.val());
})

logoutButton.on("click", function() {
  logout();
})
