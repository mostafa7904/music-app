export default class History {
  constructor() {}
  async addHistory(item) {
    try {
      let savedHistory = window.localStorage.getItem("history");
      if (!savedHistory) {
        window.localStorage.setItem("history", "[]");
        savedHistory = window.localStorage.getItem("history");
      }
      const history = await this.parse(savedHistory);
      history.unshift(item);
      const data = await this.stringify(history);
      window.localStorage.setItem("history", data);
    } catch (e) {
      console.log("An error occured in addHistory");
      console.error(e);
    }
  }
  async getHistory() {
    try {
      return await this.parse(window.localStorage.getItem("history"));
    } catch (e) {
      console.log("An error occured in getHistory");
      console.error(e);
    }
  }
  async parse(data) {
    return JSON.parse(data);
  }
  async stringify(data) {
    return JSON.stringify(data);
  }
}
