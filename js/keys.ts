{
  document.body.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const focus = document.querySelector(":focus") as HTMLElement | null;
      if (focus) {
        focus.click();
      }
    } else if (event.keyCode === 27) {
      event.preventDefault();
      for (let popup of document.querySelectorAll(".popup") as NodeListOf<HTMLElement>) {
        popup.click();
      }
    }
  });
}
