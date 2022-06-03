import axios from "axios";

import {
  newPostForm,
  fileInput,
  fileInputLabel,
  editPostImage,
  seoDescriptionInput,
  pageTitleInput,
  postTitleInput,
} from "../model/model";
import { displayFlash } from "../utils/display-alert";
import lastURLWord from "../utils/LastURLWord";

const newPost = () => {
  if (window.location.pathname !== "/blog/post" && lastURLWord() !== "edit")
    return;
  const originalSlug = newPostForm.querySelector("#slug").value;
  const originalPageTitle = newPostForm.querySelector("#page-title").value;
  const originalTitle = newPostForm.querySelector("#post-title").value;
  const originalSubtitle = newPostForm.querySelector("#post-subtitle").value;
  const originalPostContent = newPostForm.querySelector("#post-textarea").value;
  const originalSeoDescription = newPostForm.querySelector(
    "#post-seo-description"
  ).value;
  const originalKeywords = newPostForm.querySelector("#keywords").value;
  const originalImageAltText = newPostForm.querySelector("#image-alt-text")
    .value;

  const originalContent = {
    slug: originalSlug,
    pageTitle: originalPageTitle,
    title: originalTitle,
    subtitle: originalSubtitle,
    content: originalPostContent,
    seoDescription: originalSeoDescription,
    keywords: originalKeywords,
    imageAltText: originalImageAltText,
  };

  const formContent = lastURLWord() === "edit" ? originalContent : {};

  tinymce.init({
    selector: ".new-post__textarea",
    height: "50rem",
    plugins: "code emoticons table link image imagetools",
    forced_root_block: "",
    force_br_newlines: true,
    force_p_newlines: false,
    toolbar:
      "undo redo | bold italic underline strikethrough removeformat | styleselect | link image | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | emoticons code",
    init_instance_callback: function (editor) {
      editor.on("input", function (e) {
        formContent.content = tinymce.activeEditor.getContent();
      });
    },
  });

  newPostForm.addEventListener("input", (e) => {
    let { name, value } = e.target;
    formContent[name] = value;
    if (
      document.querySelector(".form__input--label") &&
      e.target.files &&
      e.target.files > 0
    ) {
      document.querySelector(
        ".form__input--label"
      ).innerHTML = `<img class="form__input--file-icon" src="/assets/icons/upload.png">${e.target.files[0].name}`;
    }
  });

  fileInput.addEventListener("change", (e) => {
    const { files } = e.target;
    if (files.length > 0 && lastURLWord() !== "edit")
      fileInputLabel.textContent = files[0].name;
    if (files.length > 0 && lastURLWord() === "edit") {
      editPostImage.remove();
      const container = document.querySelector(
        ".new-post__input-container--edit-file-container"
      );
      container.innerHTML = `
					<input type="file" class="form__input form__input--file" id="post-image"
                	name="post-image" accept="image/*">
					<label class="form__input--label" for="post-image"><img class="form__input--file-icon" src="/assets/icons/upload.png">${files[0].name}</label>
				`;
    }
  });

  if (lastURLWord() === "edit") {
    editPostImage.addEventListener("click", () => {
      fileInput.click();
    });
  }

  newPostForm.addEventListener("submit", async (e) => {
    console.log(formContent);
    console.log(postTitleInput.value);
    try {
      e.preventDefault();
      if (
        formContent.seoDescription.length < 120 ||
        formContent.seoDescription.length > 320
      ) {
        return displayFlash(
          "error",
          "La descrizione SEO non è della lunghezza accettata"
        );
      }
      if (formContent.title.length > 60)
        return displayFlash("error", "Il titolo del post è troppo lungo");
      if (formContent.pageTitle.length > 60)
        return displayFlash("error", "Il titolo della pagina è troppo lungo");

      const form = new FormData();
      form.append("slug", formContent.slug);
      form.append("pageTitle", formContent.pageTitle);
      form.append("title", formContent.title);
      form.append("subtitle", formContent.subtitle);
      form.append("content", formContent.content);
      form.append("seoDescription", formContent.seoDescription);
      form.append("keywords", formContent.keywords);
      form.append("imageAltText", formContent.imageAltText);

      if (fileInput.files && fileInput.files.length > 0)
        form.append(
          "post-image",
          fileInput.files[0]
            ? fileInput.files[0]
            : editPostImage.getAttribute("src")
        );

      // for (var [key, value] of form.entries()) {
      //   console.log(key, value);
      // }

      let result;
      if (lastURLWord() !== "edit") {
        result = await axios({
          method: "POST",
          url: "/api/v1/blog",
          data: form,
        });
      } else {
        const slug = window.location.pathname.split("/")[2];
        result = await axios({
          method: "PATCH",
          url: `/api/v1/blog/${slug}`,
          data: form,
        });
      }

      function sendToBlogPost(message) {
        displayFlash("success", message);
        setTimeout(() => {
          window.location.pathname = `/blog/${result.data.data.post.slug}/`;
        }, 3000);
      }

      if (result.status === 201) {
        sendToBlogPost("Post creato con successo");
      } else if (result.status === 200) {
        sendToBlogPost("Post modificato con successo");
      }
    } catch (err) {
      let message = err.response.data.message;
      if (message.startsWith("E11000"))
        message = "Sembra che ci sia già un post con questo titolo.";
      displayFlash("error", message);
      console.dir(err);
    }
  });
};

export default newPost;
