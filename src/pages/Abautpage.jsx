import React, { useState } from "react";
import "./style.scss";
import ModalMessage from "components/ModalMessage";

function App() {
  const [compareArray, setCompareArray] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [allData, setAllData] = useState(null);

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const apiKey = document.querySelector("#api-key").value.trim();
    const requestCount = document.querySelector("#request-count").value.trim();
    const data = document.querySelector("#data").value.split(" ");
    const inputData = data.join(",");
    document.querySelector("#result-container").innerHTML = "";

    var textarea = document.querySelector("textarea");

    textarea.addEventListener("keyup", function () {
      if (this.scrollTop > 0) {
        this.style.height = this.scrollHeight + "px";
      }
    });

    if (!apiKey || !data || !requestCount) {
      showModal("Будь ласка, заповніть всі поля!");
      return;
    }

    const requests = [];
    for (let i = 0; i <= requestCount; i++) {
      const myHeaders = new Headers();
      myHeaders.append("X-Octo-Api-Token", apiKey);

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
        .then((result) => JSON.parse(result).data)
        .catch((error) => {
          console.log("Помилка при виконанні запиту:", error);
          showModal("Сталася помилка при виконанні запиту!");
        });

      requests.push(request);
    }

    try {
      const data = await Promise.all(requests);
      const allData = data.flat();
      console.log(allData);
      if (allData.length === 0) {
        showModal("Запит повернув порожній список!");
      } else {
        const filteredUuids = allData
          .filter((obj) => {
            if (obj.title) {
              return inputData.includes(obj.title);
            } else {
              return "";
            }
          })
          .map((obj) => {
            compareArray.push(obj.title);

            return obj.uuid;
          });

        filteredUuids.forEach((item) => {
          document
            .querySelector("#result-container")
            .insertAdjacentHTML("beforeend", `<p>${item}</p>`);
        });

        compareArrays(inputData.split(","), compareArray);
        showModal(
          "Запит був успішно виконаний!",
          inputData.split(",").length,
          filteredUuids.length || "0",
          4000
        );
      }
    } catch (error) {
      console.log("Помилка при виконанні запиту:", error);
      showModal("Сталася помилка при виконанні запиту!");
    }
  };

  const handleCopyButton = async () => {
    const items = document.querySelectorAll("#result-container p");
    let copiedUuids = "";
    items.forEach((item) => {
      copiedUuids += item.innerText.trim() + "\n";
    });

    try {
      await navigator.clipboard.writeText(copiedUuids);
      const copyArrLength =
        copiedUuids.split("\n").map((item) => item.trim()).length - 1;
      showModal(
        `Унікальні ідентифікатори були скопійовані в буфер обміну в кількості ${copyArrLength} !`
      );
    } catch (error) {
      showModal("Сталася помилка при копіюванні унікальних ідентифікаторів!");
    }
  };

  const consoleOutput = (message) => {
    const consoleOutput = document.getElementById("console-output");
    const newOutput = document.createElement("pre");

    newOutput.innerText = JSON.stringify(message, null, 2);

    consoleOutput.appendChild(newOutput);
  };

  const clearConsole = () => {
    const consoleOutput = document.getElementById("console-output");
    consoleOutput.innerText = "";
  };

  const handleClearConsoleButton = () => {
    clearConsole();
  };

  const compareArrays = (mainArray, compareArray) => {
    mainArray.forEach((elem) => {
      console.log(elem);
      if (!compareArray.includes(elem)) {
        consoleOutput(`Елемент не було знайдено на сервері ${elem}`);
      }
    });
  };

  const handleDeleteFormSubmit = async (event) => {
    event.preventDefault();

    const apiKey = document.querySelector("#api-key").value.trim();
    const uuidsInput = document.querySelector("#uuids").value.trim();
    const UUIDarray = uuidsInput.split(/\s+/);

    if (!apiKey) {
      showModal("Будь ласка введіть API");
      return;
    }

    if (!uuidsInput) {
      showModal("Будь ласка введіть хоча б 1 UUID.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Octo-Api-Token", apiKey);

    const raw = JSON.stringify({
      uuids: UUIDarray,
      skip_trash_bin: true,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://app.octobrowser.net/api/v2/automation/profiles",
        requestOptions
      );
      const result = await response.text();
      consoleOutput(result);
      showModal(`Було видалено ${UUIDarray.length} профіль(в).`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleProfileFormSubmit = async (event) => {
    event.preventDefault();

    const myUUIDs = "";
    const profileName = document.getElementById("profileName").value;
    const newTag = document.getElementById("newTag").value;

    if (!profileName || !newTag) {
      showModal("Будь ласка, заповніть усі поля");
      return;
    }

    const profileNames = profileName
      .split(/\s+/)
      .map((name) => name.trim())
      .filter((name) => name !== "");

    const apiKEY = document.querySelector("#api-key").value.trim();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Octo-Api-Token", apiKEY);

    const raw = JSON.stringify({
      tags: [newTag],
    });

    profileNames.forEach(async (name) => {
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://app.octobrowser.net/api/v2/automation/profiles/${name}?uuid=${myUUIDs}`,
          requestOptions
        );
        const result = await response.text();
        console.log(result);
        consoleOutput(result);
        showModal("Запит був успішно виконаний!");
      } catch (error) {
        console.log("error", error);
        showModal("Сталася помилка при виконанні запиту!");
      }
    });
  };

  const showModal = (message, enter, found, time = 3000) => {
    setModalMessage(
      <ModalMessage message={message} enter={enter} found={found} />
    );

    setModalActive(true);
    setTimeout(() => setModalActive(false), time);
  };

  return (
    <div className="container">
      <h1>Octobrowser API Request</h1>
      <form id="form" onSubmit={handleFormSubmit}>
        <label htmlFor="api-key-input">API ключ:</label>
        <input type="text" id="api-key" name="api-key-input" />
        <label htmlFor="data-input">Імена профілів:</label>
        <input
          type="text"
          id="data"
          name="data[]"
          placeholder="Enter profile's names"
        />
        <label htmlFor="request-count-input">Кількість запитів:</label>
        <input
          defaultValue="50"
          type="text"
          placeholder="all profiles count / 100"
          pattern="\d{1,2}"
          maxLength="2"
          id="request-count"
          name="request-count-input"
        />
        <br />
        <br />
        <button type="submit" id="submit-button">
          Submit
        </button>
      </form>
      <button id="copy-button" onClick={handleCopyButton}>
        Copy result
      </button>
      <div id="result-container"></div>
      <div id="modal" className={`modal ${modalActive ? "active" : ""}`}>
        <div className="modal-content">
          <p className="close" onClick={handleCloseModal}>
            &times;
          </p>
          <div id="modal-message">{modalMessage}</div>
        </div>
      </div>
      <div className="tabs">
        <form id="myForm" onSubmit={handleProfileFormSubmit}>
          <label htmlFor="profileName">Змінити тег профілів</label>
          <br />
          <textarea
            placeholder="UUIDs"
            id="profileName"
            name="profileName"
          ></textarea>
          <br />
          <label style={{ marginTop: "20px" }} htmlFor="newTag">
            Новий тег:
          </label>
          <br />
          <select id="newTag" name="newTag" className="dropdown">
            <option value="">-- Виберіть тег --</option>
            <option value="бан">бан</option>
            <option value="готовые">готовые</option>
          </select>
          <br />
          <br />
          <button type="submit" value="Submit">
            Change tags
          </button>
        </form>
        <form id="delform" onSubmit={handleDeleteFormSubmit}>
          <label htmlFor="uuids">Видалити профілі за UUID:</label>
          <br />
          <textarea placeholder="UUIDs" id="uuids" name="uuids"></textarea>
          <br />
          <button style={{ marginTop: "auto" }} type="submit">
            Delete Profiles
          </button>
        </form>
      </div>
      <div className="tabs">
        <div>
          <button id="clear-console" onClick={handleClearConsoleButton}>
            Clear console
          </button>
          <div id="console-output"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
