import categoryAPI from "../api/categoryApi";

const categoryUseCase = {
  getCategoryList: (categories) => {
    categoryAPI.GET_LIST(categories);
  },
};

export default categoryUseCase;
