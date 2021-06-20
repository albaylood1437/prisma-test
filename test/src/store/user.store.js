import http from "./httpServices";
class Store {
  URL = "http://localhost:5000/register";
  reviewList = [
    { review: "This is a nice article", stars: 2 },
    { review: "A lovely review", stars: 4 },
  ];

  addUser(e) {
    http.post(e);
  }

  get reviewCount() {
    return this.reviewList.length;
  }
}

export default Store;
