import axios from "axios";
import { passwordRecoverForm } from "../../model/model";
import { displayFlash } from "../../utils/display-alert";

export default async function passwordRecover() {
  if (!passwordRecoverForm) return;
  const formContent = {};
  passwordRecoverForm.addEventListener("input", e => {
    let { name, value } = e.target;
    formContent[name] = value;
  });

  passwordRecoverForm.addEventListener("submit", async e => {
    try {
      e.preventDefault();
      const result = await axios({
        method: "POST",
        url: "/api/v1/users/forgotPassword",
        data: { email: formContent.email }
      });
      displayFlash(
        "success",
        "Controlla la tua email per resettare la password!"
      );
    } catch (err) {
      const errorMessage =
        err.response.status === 404
          ? "Indirizzo email non trovato"
          : err.message;
      displayFlash("error", errorMessage);
      console.dir(err);
    }
  });
}
