import FillInBlank from "../models/FillInBlank.js";
import MultipleChoice from "../models/MultipleChoice.js";
import { getQuestions } from "../services/service.js";

// Hàm mặc định đc gọi đầu tiên khi app khởi chạy
init();
let questions = [];

function init() {
  // B1: Gọi hàm getQuestions call API lấy data
  getQuestions()
    .then((result) => {
      console.log(result.data);
      // Xử lý dùng data từ API để tạo ra các đối tượng Question
      questions = generateQuestion(result.data);
      console.log(questions);

      // Hiển thị danh sách câu hỏi ra giao diện
      renderQuestions(questions);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm duyệt mảng câu hỏi từ API và trả ra mảng các đối tượng câu hỏi
function generateQuestion(payload) {
  const questions = payload.map((item) => {
    const { id, questionType, content, answers } = item; // destructuring

    switch (questionType) {
      case 1:
        return new MultipleChoice(id, questionType, content, answers);
      case 2:
        return new FillInBlank(id, questionType, content, answers);
      default:
        break;
    }
  });

  return questions;
}

function renderQuestions(payload) {
  const html = payload.reduce((result, question, index) => {
    const { length } = payload; // Độ dài của mảng
    const nextItem = payload[index + 1];

    const btn =
      index < length - 1
        ? `<a href="#quiz-${nextItem.id}" class="quiz__btn quiz__next">NEXT</a>`
        : `<a href="#quizResult" 
            class="quiz__btn quiz__next"
            id="submit"
           >
              SUBMIT
            </a>`;

    return (
      result +
      `
      <div class="quizSection" id="quiz-${question.id}">
        <div class="quiz__main">
          <div class="quiz__header">
            <p>${question.content}</p>
          </div>
          <div class="quiz__body row">${question.renderAnswer()}</div>
          <div class="quiz__footer">
            <p class="quiz__current">Question ${index + 1} of ${length} </p>
            ${btn}
          </div>
        </div>
      </div>
    `
    );
  }, "");

  document.getElementById("quizList").innerHTML = html;
}

// DOM tới div#quizList để lắng nghe all event clcik phát sinh bên trong div này

// event delegation
document.getElementById("quizList").addEventListener("click", handleSubmit);

// Bất kì sự kiện nào trong JS khi xảy ra đèu trả ra 1 đối tượng event
function handleSubmit(ev) {
  // truy xuất đến element gốc phát sinh ra event này
  console.log(ev.target);
  // alert("submit");

  // Kiểm tra xem element phát sinh ra event có phải là thẻ a submit hay k, để bắt đầu xử lý tính điểm
  if (ev.target.id !== "submit") return;

  // Cần duyệt qua danh sách câu hỏi để gọi hàm checkQuestion
  let count = 0; //Tính số câu đúng
  questions.forEach((question) => {
    // checkQuestion return về boolean
    const isCorrect = question.checkQuestion();
    // Nếu isCorrect là true => tăng count lên 1
    if (isCorrect) {
      count += 1;
    }
  });

  // Hiển thị kết quả:
  document.getElementById("correct").innerHTML = count;
  document.getElementById("incorrect").innerHTML = questions.length - count;
}
