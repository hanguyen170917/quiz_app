import Question from "./Questions.js";

class FillInBlank extends Question {
  constructor(...props) {
    super(...props);
  }
  renderAnswer() {
    const [answer] = this.answers; //bóc tách phần tử thứ 0 của array answers
    console.log(answer);
    return `
      <div class="col-12">
        <textarea
          class="form-control"
          id="fill${this.id}-fillAnswer${answer.id}"
          rows="3"
        ></textarea>
      </div>
    `;
  }

  checkQuestion() {
    const [answer] = this.answers; //bóc tách phần tử thứ 0 của array answers
    // Đáp án user điền vào
    const userAnswer = document.getElementById(
      `fill${this.id}-fillAnswer${answer.id}`
    ).value;

    // Đáp án đúng
    const { content: correctAnswer } = answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      return true;
    }

    return false;
  }
}

export default FillInBlank;
