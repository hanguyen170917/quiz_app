import Question from "./Questions.js";

// Kế thừa từ class Question
class MultipleChoice extends Question {
  // rest params: prop là 1 arr chưa các tham số đc truyền vào khi new MultipleChoice
  constructor(...props) {
    // Gọi super() chính là gọi tới constructor của class cha
    //  ...props: spread operator
    super(...props);
    // super(id, questionType, content, answers)
  }

  renderAnswer() {
    // Return về giao diện câu hỏi
    const answers = this.answers.reduce((result, answer) => {
      return (
        result +
        `
        <div class="col-6">
          <div class="custom-control custom-radio">
            <input type="radio" 
              id="multi${this.id}-mulAnswer${answer.id}" 
              name="multi-${this.id}" 
              class="custom-control-input" 
              value="${answer.content}" />
            <label class="custom-control-label" for="multi${this.id}-mulAnswer${answer.id}">
              ${answer.content}
            </label>
          </div>
        </div>
      `
      );
    }, "");
    return answers;
  }

  checkQuestion() {
    // Kiểm tra câu hỏi đúng hay sai
    // DOM tới 4 radio button để kiểm tra xem user đang chọn radio button nào
    const answerList = document.querySelectorAll(
      `input[name="multi-${this.id}"]`
    );
    // console.log(answerList);

    // Đáp án user chọn
    let userAnswer = "";
    answerList.forEach((item) => {
      if (item.checked) {
        userAnswer = item.value;
      }
    });
    // Đáp án đúng
    // Tìm ra object answer có exact là true
    // Tuy nhiên ta chỉ cần lấy giá trị content từ object nên ta sử dụng kĩ thuật destructuring để bóc tách
    let { content: correctAnswer } = this.answers.find((item) => {
      return item.exact;
    });

    // So sánh câu trả lời user đã chọn với câu trả lời đúng
    if (userAnswer === correctAnswer) {
      return true;
    }

    return false;
  }
}

export default MultipleChoice;

// const question = new MultipleChoice(id, questionType, content, answer);
