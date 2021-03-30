import lastURLWord from "./LastURLWord";
import { input, label } from "./UiElements";

const inputFile = () => {
  if (
    lastURLWord() === "en" ||
    lastURLWord() === "it" ||
    lastURLWord() === "de" ||
    lastURLWord() === "fr"
  ) {
    if (!input) return;
    input.addEventListener("change", function (e) {
      let fileName = "";
      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute("data-multiple-caption") || "").replace(
          "{count}",
          this.files.length
        );
      else fileName = e.target.value.split("\\").pop();
      if (fileName) label.textContent = fileName;
    });
  }
};

export default inputFile;
