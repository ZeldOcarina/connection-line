import axios from "axios";
import Cookies from "js-cookie";

import { signupForm } from "../../model/model";
import { displayFlash } from "../../utils/display-alert";

function register() {
  if (signupForm) {
    const formContent = {};

    signupForm.addEventListener("input", e => {
      let { name, value } = e.target;
      formContent[name] = value;
    });

    signupForm.addEventListener("submit", async e => {
      try {
        e.preventDefault();

        if (window.location.pathname === "/register") {
          const { name, email, password, passwordConfirm } = formContent;

          if (password !== passwordConfirm)
            return displayFlash(
              "error",
              "La password e la conferma password non coincidono"
            );

          const response = await axios({
            method: "POST",
            url: "/api/v1/users/signup",
            data: {
              name,
              email,
              password,
              passwordConfirm
            }
          });
          if (response.status == 201) {
            displayFlash("success", "Registrazione Avvenuta con Successo");
            Cookies.set("jwt", response.data.token, { expires: 90 });
            setTimeout(() => {
              window.location.href = "/blog";
            }, 3000);
          }
        } else {
          const { email, password } = formContent;

          const response = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
              email,
              password
            }
          });

          console.log(response);
          if (response.status === 200) {
            displayFlash("success", "Login avvenuto con successo");
            Cookies.set("jwt", response.data.token, { expires: 90 });
            setTimeout(() => {
              window.location.href = "/blog";
            }, 3000);
          } else throw new Error(response);
        }
      } catch (err) {
        console.dir(err);
        if (err.response.data.message.startsWith("E11000"))
          err.response.data.message = "Utente già registrato!";
        if (
          err.response.data.message.startsWith(
            "User validation failed: password: Path `password`"
          )
        )
          err.response.data.message =
            "La password deve consistere di almeno otto caratteri.";
        displayFlash("error", err.response.data.message);
        console.log(err.response);
      }
    });
  }
}

export default register;
