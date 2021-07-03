import axios from "axios";

const memeAPI = {
  GET_ITEM: async (category) => {
    axios.get(`https://g.tenor.com/v1/search?q=${category}&key=LIVDSRZULELA&limit=50`).then((res) => {
      const result = res.data.results[Math.floor(Math.random() * 50)].media[0].tinygif.url;
      const img = document.querySelector(".result-wrapper img");
      img.classList.add("show");
      img.src = result;
    });
  },
};

export default memeAPI;
