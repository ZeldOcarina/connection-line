import axios from "axios";

import CommentForm from "../classes/CommentForm";
//import { EditForm } from '../classes/EditForm';
import { displayFlash } from "../utils/display-alert";

const blogComments = () => {
  const commentsContainer = document.querySelector(".comments");
  const newCommentBtn = document.querySelector(".comments > btn");

  const avatarUrl = document.getElementById("user-data")
    ? document.getElementById("user-data").dataset.userImage
    : undefined;
  const modifyCommentBtns = document.getElementsByClassName(
    "modify-comment-btn"
  );
  const deleteCommentBtns = document.getElementsByClassName(
    "delete-comment-btn"
  );

  if (!newCommentBtn) return;
  if (modifyCommentBtns && modifyCommentBtns.length > 0) {
    for (const btn of modifyCommentBtns)
      btn.addEventListener("click", async e => {
        const { commentId } = e.target.dataset;
        const root = e.target.closest(
          ".comments__comment__name-and-btn-container"
        );
        const text = root.querySelector("p").textContent;
        const form = new CommentForm(null, commentId);
        root.innerHTML = "";
        form.createHtml(root, "edit", text);
        /*await axios({
					url: `/api/v1/blog/comments/${ commentId }`,
					method: 'PATCH'
				});*/
      });

    for (const btn of deleteCommentBtns)
      btn.addEventListener("click", async e => {
        try {
          const { commentId } = e.target.dataset;

          const response = await axios({
            method: "DELETE",
            url: `/api/v1/blog/comments/${commentId}`
          });

          if (response.data === "")
            displayFlash("success", "Commento cancellato correttamente");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (err) {
          console.dir(err);
        }
      });
  }

  newCommentBtn.addEventListener("click", () => {
    console.log("click");
    const form = new CommentForm(avatarUrl);
    newCommentBtn.remove();
    form.createHtml(commentsContainer, "post");
  });
};

export default blogComments;
