import categoryAPI from "../api/categoryApi";
import axios from "axios";

const categoryUseCase = {
  getCategoryList: (categories) => {
    let tags = [];
    axios.get("https://g.tenor.com/v1/categories?key=LIVDSRZULELA").then((res) => {
      res.data.tags.forEach((tag) => {
        categories.value.push(tag);
      });
    });
  },
};

export default categoryUseCase;
