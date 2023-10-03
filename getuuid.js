document.addEventListener("DOMContentLoaded", function () {
  // Отримати елемент кнопки закриття
  const compareArray = [];
  const closeButton = document.querySelector(".close");

  // Додати обробник події кліка до кнопки закриття
  closeButton.addEventListener("click", function () {
    // Закрити модальне вікно
    modal.classList.remove("active");
  });
  // знайдемо потрібні елементи
  const form = document.querySelector("#form");
  const apiKeyInput = document.querySelector("#api-key");
  const dataInput = document.querySelector("#data");
  const requestCountInput = document.querySelector("#request-count");
  const resultContainer = document.querySelector("#result-container");
  // const modal = document.querySelector("#modal");
  // const modalContent = document.querySelector("#modal-content");
  // const modalClose = document.querySelector("#modal-close");
  function showModal(message, enter, found, time) {
    const modalMessage = document.querySelector("#modal-message");
    modalMessage.innerText = `${message}
    Було вставлено ${enter}  імені
    Знайдено ${found} uuid
    `;
    modal.classList.add("active");
  }
  // встановимо подію на відправку форми
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо перезавантаженню сторінки при відправці форми
    const apiKEY = apiKeyInput.value.trim();
    const requestCount = requestCountInput.value.trim();
    const data = dataInput.value.split(" "); // розділяємо текст на окремі значення
    const inputData = data.join(","); // зведення масиву з розділеного тексту назад в один рядок з комами
    resultContainer.innerHTML = ""; // очистимо контейнер з результатами
    // console.log(inputData);

    // перевіримо, щоб обидва поля були заповнені
    if (!apiKeyInput.value || !dataInput.value || !requestCountInput.value) {
      showModal("Будь ласка, заповніть всі поля!");
      return;
    }

    // виконаємо запит до API
    const requests = [];
    for (let i = 0; i <= requestCount; i++) {
      const myHeaders = new Headers();
      myHeaders.append("X-Octo-Api-Token", apiKEY);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const request = fetch(
        `https://app.octobrowser.net/api/v2/automation/profiles?page_len=100&page=${i}&ordering=created&fields=title`,

        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          return JSON.parse(result).data;
        })
        .catch((error) => {
          console.log("Помилка при виконанні запиту:", error);
          showModal("Сталася помилка при виконанні запиту!");
        });
      requests.push(request);
    }

    Promise.all(requests)
      .then((data) => {
        const allData = data.flat();
        console.log(allData);
        if (allData.length === 0) {
          showModal("Запит повернув порожній список!");
        } else {
          var filteredUuids = allData
            .filter((obj) => {
              if (obj.title) {
                return inputData.includes(obj.title);
              } else {
                ("");
              }
              // return obj.title
              //   ? inputData.includes(obj.title)
              //   : '';
            })
            .map((obj) => {
              compareArray.push(obj.title);

              return obj.uuid;
            });

          filteredUuids.forEach((item) => {
            resultContainer.insertAdjacentHTML("beforeend", `<p>${item}</p>`);
          });
          compareArrays(inputData.split(","), compareArray);
          // console.log(inputData.split(",").length);
          // console.log(filteredUuids);
          showModal(
            "Запит був успішно виконаний!",
            inputData.split(",").length,
            filteredUuids.length,
            4000
          );
        }
      })
      .catch((error) => {
        console.log("Помилка при виконанні запиту:", error);
        showModal("Сталася помилка при виконанні запиту!");
      });
  });
});
const copyButton = document.querySelector("#copy-button");
copyButton.addEventListener("click", function (event) {
  const resultContainer = document.querySelector("#result-container");
  const items = resultContainer.querySelectorAll("p");
  let uuids = "";
  items.forEach((item) => {
    uuids += item.innerText.trim() + "\n";
  });
  navigator.clipboard.writeText(uuids).then(
    function () {
      const copyArrLeng =
        uuids.split("\n").map((item) => item.trim()).length - 1;
      showModal(
        `Унікальні ідентифікатори були скопійовані в буфер обміну в кількості ${copyArrLeng} !`,
        "",
        "",
        3000
      );
    },
    function () {
      showModal("Сталася помилка при копіюванні унікальних ідентифікаторів!");
    }
  );
});
function consoleOutput(message) {
  const consoleOutput = document.getElementById("console-output");
  const newOutput = document.createElement("pre");
  const clearButton = document.createElement("button");

  newOutput.innerText = JSON.stringify(message, null, 2);

  clearButton.innerText = "Clear";
  clearButton.addEventListener("click", function () {
    consoleOutput.innerHTML = "";
  });

  consoleOutput.appendChild(newOutput);
  // consoleOutput.appendChild(clearButton);
}

const clearConsole = () => {
  const consoleOutput = document.getElementById("console-output");
  consoleOutput.innerText = "";
};

const clearConsoleButton = document.getElementById("clear-console");
clearConsoleButton.addEventListener("click", clearConsole);

function compareArrays(mainArray, compareArray) {
  console.log(mainArray, compareArray);
  mainArray.forEach((elem) => {
    if (!compareArray.includes(elem)) {
      console.log(elem);
      consoleOutput(`Елемент не було знайдено на сервері ${elem}`);
    }
  });
}

// function searchInArray(array, key) {
//   const result = array.filter((element) => {
//     if (element.includes(key)) {
//       return key;
//     }
//   });
//   console.log(result);
// }
// Приклад використання функції consoleOutput

// функція для відображення модального вікна з повідомленням

// const copyButton = document.querySelector("#copy-button");
// copyButton.addEventListener("click", function (event) {
//   const uuids = allData.map((item) => item.uuid);
//   const resultText = uuids.join("\n");
//   navigator.clipboard.writeText(resultText).then(
//     function () {
//       showModal("UUID були скопійовані в буфер обміну!");
//     },
//     function () {
//       showModal("Сталася помилка при копіюванні UUID!");
//     }
//   );
// });

// filter

// var filteredUuids = ObjFullData.filter((obj) => {
//   return removeArr.includes(obj.title);
// }).map((obj) => {
//   return obj.uuid;
// });
