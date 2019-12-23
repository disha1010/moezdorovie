const emailForm = document.getElementById("emailForm");
const email = document.getElementById("email");
const emailMessage = document.getElementById("emailMessage");

if (emailForm) {
  emailForm.addEventListener("submit", onEmailSubmit);
}

function onEmailSubmit(e) {
  e.preventDefault();
  if (email.validity.valid) {
    submitEmail();
  } else {
    showMessage("Введите корректый Email", false);
  }
}

function submitEmail() {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        showMessage("Ссылка на предоставление доступа отправлена на ваш Email", true);
      } else {
        showMessage("Введите корректый Email", false);
      }
    }
  };

  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
  xhr.send(new FormData(emailForm));
}

function showMessage(text, success) {
  emailMessage.innerHTML = text;
  emailMessage.className = "form-input-msg " + (success 
                          ? "form-input-msg--success" 
                          : "form-input-msg--error");

  setTimeout(hideMessage, 5000);
}

function hideMessage() {
  emailMessage.innerHTML = " ";
}
