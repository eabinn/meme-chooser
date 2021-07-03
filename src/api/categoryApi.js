import axios from "axios";

const categoryAPI = {
  GET_LIST: async (categories) => {
    let tags = [];
    axios.get("https://g.tenor.com/v1/categories?key=LIVDSRZULELA").then((res) => {
      res.data.tags.forEach((tag) => {
        categories.value.push(tag);
      });
    });
  },
};

export default categoryAPI;
