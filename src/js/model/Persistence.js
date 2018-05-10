class Persistence {
  static writeToLocalStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  static readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default Persistence;
