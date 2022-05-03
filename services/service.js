export function getQuestions() {
  return axios.get("../data/questions.json");
}
