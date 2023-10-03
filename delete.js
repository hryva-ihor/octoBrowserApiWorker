const formdel = document.querySelector("#delform");
const modal = document.querySelector("#modal");
// Отримати елемент кнопки закриття
const closeButton = document.querySelector(".close");

// Додати обробник події кліка до кнопки закриття
closeButton.addEventListener("click", function () {
  // Закрити модальне вікно
  modal.classList.remove("active");
});
formdel.addEventListener("submit", function (event) {
  event.preventDefault();

  const apiKeyInput = document.querySelector("#api-key");
  const uuidsInput = document.querySelector("#uuids");

  const UUIDarray = uuidsInput.value.trim().split(/\s+/);
  const apiKEY = apiKeyInput.value.trim();

  if (!apiKEY) {
    showModal("Будь ласка введіть API");
    return;
  }

  if (!uuidsInput.value.trim()) {
    showModal("Будь ласка введіть хоча б 1 UUID.");
    return;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Octo-Api-Token", apiKEY);

  var raw = JSON.stringify({
    uuids: UUIDarray,
    skip_trash_bin: true,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://app.octobrowser.net/api/v2/automation/profiles",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      consoleOutput(result);
      console.log(result);
      showModal(`Було видалено ${UUIDarray.length} профіль(в).`);
    })
    .catch((error) => console.log("error", error));
});
function showModal(message, enter, found, time = 1000) {
  const modalMessage = document.querySelector("#modal-message");
  modalMessage.innerText = message;
  modal.classList.add("active");
}
