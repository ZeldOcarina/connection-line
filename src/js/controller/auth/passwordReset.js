import axios from "axios";
import Cookies from "js-cookie";
import { passwordResetForm } from "../../model/model";
import { displayFlash } from "../../utils/display-alert";

export default async function passwordRecover() {
  if (!passwordResetForm) return;
  const formContent = {};
  passwordResetForm.addEventListener("input", e => {
    let { name, value } = e.target;
    formContent[name] = value;
  });

  passwordResetForm.addEventListener("submit", async e => {
    const {
      location: { href }
    } = window;
    const query = href.split("?")[1];
    const resetToken =
      query.split("=")[0] === "resetToken" ? query.split("=")[1] : undefined;
    if (!resetToken) throw new Error("token mancante nella richiesta");
    if (window.location.href.split("?")[1].split("=")[0] === "resetToken")
      resetToken;
    try {
      e.preventDefault();
      const result = await axios({
        method: "PATCH",
        url: `/api/v1/users/reset-password/${resetToken}`,
        data: {
          email: formContent.email,
          password: formContent.password,
          passwordConfirm: formContent.passwordConfirm
        }
      });
      displayFlash("success", "Password reimpostata con successo!");
      Cookies.set("jwt", result.data.token, { expires: 90 });
      setTimeout(() => {
        window.location.href = "/blog";
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response && err.response.status === 404
          ? "Indirizzo email non trovato"
          : err.message;
      displayFlash("error", errorMessage);
    }
  });
}
