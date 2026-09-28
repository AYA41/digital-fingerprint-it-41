document.addEventListener("DOMContentLoaded", function () {
  const quizItems = document.querySelectorAll(".quiz-item");
  const resultBox = document.getElementById("quiz-result");
  const scoreEl = document.getElementById("score");
  const messageEl = document.getElementById("result-message");
  const resetBtn = document.getElementById("quiz-reset");

  let answered = 0;
  let correct = 0;

  quizItems.forEach(function (item) {
    const buttons = item.querySelectorAll(".quiz-btn");
    const feedback = item.querySelector(".quiz-feedback");
    const correctAnswer = item.dataset.correct;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Блокируем повторные ответы на этот вопрос
        if (item.dataset.done === "true") return;
        item.dataset.done = "true";

        const chosen = btn.dataset.answer;

        // Подсветка выбранной кнопки
        buttons.forEach(function (b) {
          b.disabled = true;
          if (b.dataset.answer === correctAnswer) {
            b.classList.add("correct");
          } else if (b === btn) {
            b.classList.add("wrong");
          }
        });

        // Показ пояснения
        if (chosen === correctAnswer) {
          feedback.textContent = "✅ " + feedback.dataset[correctAnswer];
          feedback.classList.add("feedback-correct");
          correct++;
        } else {
          feedback.textContent = "❌ " + feedback.dataset[correctAnswer];
          feedback.classList.add("feedback-wrong");
        }
        feedback.classList.add("visible");

        answered++;

        // Если ответили на все — показываем итог
        if (answered === quizItems.length) {
          showResult();
        }
      });
    });
  });

  function showResult() {
    scoreEl.textContent = correct;
    let msg = "";

    if (correct === 5) {
      msg = "🏆 Отлично! Вы отлично распознаёте фишинг.";
    } else if (correct === 4) {
      msg = "👍 Хороший результат. Осталось закрепить пару моментов.";
    } else if (correct === 3) {
      msg = "🙂 Неплохо, но стоит перечитать разделы о признаках фишинга.";
    } else {
      msg = "⚠️ Стоит внимательно изучить памятку — фишинг очень опасен.";
    }

    messageEl.textContent = msg;
    resultBox.classList.remove("hidden");
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  resetBtn.addEventListener("click", function () {
    answered = 0;
    correct = 0;

    quizItems.forEach(function (item) {
      item.dataset.done = "false";
      const feedback = item.querySelector(".quiz-feedback");
      feedback.textContent = "";
      feedback.className = "quiz-feedback";

      item.querySelectorAll(".quiz-btn").forEach(function (b) {
        b.disabled = false;
        b.classList.remove("correct", "wrong");
      });
    });

    resultBox.classList.add("hidden");
    document
      .getElementById("quiz")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
