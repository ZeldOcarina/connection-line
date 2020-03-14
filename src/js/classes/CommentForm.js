import axios from "axios";
import lastURLWord from "../utils/LastURLWord";
import { displayFlash } from "../utils/display-alert";

class CommentForm {
  constructor(image, commentId = null) {
    this.commentId = commentId;
    this.div = document.createElement("div");
    this.form = document.createElement("form");
    this.textarea = document.createElement("textarea");
    this.img = image;
    this.submit = document.createElement("input");
  }

  createHtml(rootElement, type, text = "") {
    this.div.classList.add("comments__form-container");
    this.textarea.setAttribute("name", "comment");
    this.textarea.setAttribute("id", "comment-textarea");
    this.textarea.setAttribute("placeholder", "Scrivi il tuo commento!");
    this.textarea.classList.add("comments__textarea");
    this.textarea.value = text;

    this.submit.setAttribute("type", "submit");
    this.submit.classList.add("comments__submit");
    this.submit.classList.add("btn");
    this.submit.classList.add("btn--primary");
    this.submit.addEventListener("click", e => {
      e.preventDefault();
      if (type === "post") this.postComment(this.textarea.value);
      else if (type === "edit") this.editComment(this.textarea.value);
    });

    this.form.appendChild(this.textarea);
    this.form.appendChild(this.submit);
    rootElement.appendChild(this.div);

    if (this.img) {
      const img = document.createElement("img");
      img.setAttribute("src", this.img);
      img.classList.add("comments__avatar-img");
      this.div.appendChild(img);
    }

    this.div.appendChild(this.form);
  }

  async postComment(comment) {
    try {
      const {
        dataset: { postSlug: slug }
      } = document.querySelector(".blog-home__top-section");

      await axios({
        url: `/api/v1/blog/${slug}`,
        method: "POST",
        data: {
          comment
        }
      });
      window.location.reload();
    } catch (err) {
      console.dir(err);
    }
  }

  async editComment(comment) {
    try {
      const response = await axios({
        url: `/api/v1/blog/comments/${this.commentId}`,
        method: "PATCH",
        data: {
          comment
        }
      });

      if (response.data.status === "success")
        displayFlash("success", "Commento modificato con successo");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }
}

/*export class EditForm extends CommentForm {
	super();

}*/

export default CommentForm;
