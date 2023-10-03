const myUUIDs = "";
const form = document.getElementById("myForm");
const apiKeyInput = document.querySelector("#api-key");

// Додати обробник події кліка до кнопки закриття
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const profileName = document.getElementById("profileName").value;
  const newTag = document.getElementById("newTag").value;

  // Перевірка на пустий ввід
  if (!profileName || !newTag) {
    showModal("Будь ласка, заповніть усі поля");
    return;
  }

  const profileNames = profileName
    .split(/\s+/) // змінив роздільник на пробіл або перенос рядка
    .map((name) => name.trim())
    .filter((name) => name !== "");

  var myHeaders = new Headers();
  const apiKEY = apiKeyInput.value.trim();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Octo-Api-Token", apiKEY);

  var raw = JSON.stringify({
    tags: [newTag],
  });

  profileNames.forEach((name) => {
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://app.octobrowser.net/api/v2/automation/profiles/" +
        name +
        "?uuid=" +
        myUUIDs,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        consoleOutput(result);
        showModal("Запит був успішно виконаний!");
      })
      .catch((error) => {
        console.log("error", error);
        showModal("Сталася помилка при виконанні запиту!");
      });
  });
});
