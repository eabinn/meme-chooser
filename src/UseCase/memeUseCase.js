import memeApi from "../api/memeApi";

const memeUseCase = {
  copyUrl: () => {
    const tooltip = document.querySelector(".tooltip");
    tooltip.classList.add("show");
    setTimeout(() => {
      tooltip.classList.remove("show");
    }, 1000);

    const src = document.querySelector(".result-wrapper img").src;
    var dummy = document.createElement("input");
    var text = src;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  },
  getMeme: (category, meme) => {
    if (meme.value !== undefined) return;
    const selectSection = document.querySelector("section.select");
    const resultSection = document.querySelector("section.result");

    selectSection.classList.remove("show");
    resultSection.classList.add("show");

    memeApi.GET_ITEM(category);
  },
};

export default memeUseCase;
