const userUseCase = {
  start: () => {
    const greetSection = document.querySelector("section.greet");
    const selectSection = document.querySelector("section.select");

    greetSection.classList.remove("show");
    selectSection.classList.add("show");
  },
  showResult: () => {
    const selectSection = document.querySelector("section.select");
    const resultSection = document.querySelector("section.result");

    selectSection.classList.remove("show");
    resultSection.classList.add("show");
  },
  goBackToSelect: () => {
    const img = document.querySelector(".result-wrapper img");
    img.classList.remove("show");
    img.src = "";

    const selectSection = document.querySelector("section.select");
    const resultSection = document.querySelector("section.result");

    selectSection.classList.add("show");
    resultSection.classList.remove("show");
  },
  showGreetMessage: (message) => {
    const greetMessage = document.querySelector(".greet-message .message");
    const messages = message.split("");
    let index = 0;

    let interval = setInterval(() => {
      greetMessage.innerHTML += messages[index++];
      if (messages[index - 1] === ".") greetMessage.innerHTML += "<br>";
      if (messages.length === index) {
        const button = document.querySelector(".greet-btn");
        button.classList.add("show");
        clearInterval(interval);
      }
    }, 5);
  },
};

export default userUseCase;
