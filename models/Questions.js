// Class chứa những thuộc tính chung cho các loại câu hỏi
class Question {
  constructor(id, questionType, content, answers) {
    this.id = id;
    this.questionType = questionType;
    this.content = content;
    this.answers = answers;
  }

  //   Xử lý hiển thị câu trả lời ra UI
  renderAnswer() {
    console.log("Render answer");
  }

  //   Xử lý đáp án cho câu hỏi
  checkQuestion() {}
}

export default Question;
