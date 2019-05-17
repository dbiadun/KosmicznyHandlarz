{
  let button = document.getElementsByClassName("start-button")[0] as HTMLButtonElement;
  let loginPopup = document.getElementById("login-popup") as HTMLElement;
  let main = document.querySelector("#login-popup > .main") as HTMLElement;
  let open = false;

  button.addEventListener("click", function() {
    open = true;
    loginPopup.classList.add("visible");
    if (loginPopup.parentElement) {
      loginPopup.parentElement.classList.add("visible");
    }
  });

  loginPopup.addEventListener("click", () => {
    if (open) {
      open = false;
      loginPopup.classList.remove("visible");
      if (loginPopup.parentElement) {
        loginPopup.parentElement.classList.remove("visible");
      }
    }
  });

  main.addEventListener("click", (event: Event) => {
    if (open) {
      event.stopPropagation();
    }
  });
}
