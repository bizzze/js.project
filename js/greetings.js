// const loginForm = document.querySelector(".login-form");
// // 자, 우리는 여기서 login form을 끌어왔잖아, by querySelector, 그럼, 우리는 login-form을 통해서
// // input이랑 button을 끌어올 수 있어 like 밑에 처럼

// const loginInput = loginform.querySelector("input");
// const loginButton = loginform.querySelector("button");  이게 1번 방법이야
// ---------------------------------------------------------------------
// const loginInput = document.querySelector(".login-form input");
// const loginButton = document.querySelector(".login-form button");

// function loginBtnClick() {
//   const username = loginInput.value;
//   console.log(username);
// }
// loginButton.addEventListener("click", loginBtnClick);

// 자, 우리는 이제 html에서 input의 유효성 검사를 진행할 수 있어 하지만,
// form이 submit이 되버려서 우리가 user의 정보를 저장할 수 없게 되었어
// 하지만, btn의 클릭을 통한 유효성 검사의 필요성은 없어졌어
// 왜냐? form에 input을 넣게 되면 btn을 클릭하든, submit type의 input을
// 누르게 되면 form이 submit 되면서 browser가 website를 refresh해버리거든!
// 그럼 우리는 form의 submit event를 막을거야. 그렇기 위해서 일단 우리는
// form 자체가 필요하니까 그걸 끌어오자.

const loginForm = document.querySelector(".login-form");
const loginInput = document.querySelector(".login-form input");
const greeting = document.querySelector(".greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  printGreeting(username);
}

function printGreeting(username) {
  greeting.innerText = `Hello! ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
// 일단, 받아온 value값을 저장할 변수가 필요하겠지 -> stroage에 정보가 있는지 없는지 확인해야하니까

const savedUsername = localStorage.getItem(USERNAME_KEY); //  저장되어 있던 value값을 불러오는 변수
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  printGreeting(savedUsername);
}
