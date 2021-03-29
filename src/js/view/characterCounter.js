import {
  seoDescriptionCharacterCounter,
  seoDescriptionInput,
  pageTitleCharacterCounter,
  pageTitleInput,
  postTitleInput,
  postTitleCharacterCounter,
} from "../model/model";

export default () => {
  if (!seoDescriptionCharacterCounter) return;

  const seoDescriptionCurrentCharactersText = seoDescriptionCharacterCounter.querySelector(
    ".new-post__current-characters"
  );

  const pageTitleCharacterCounterText = pageTitleCharacterCounter.querySelector(
    ".new-post__page-title-current-characters"
  );

  const postTitleCharacterCounterText = postTitleCharacterCounter.querySelector(
    ".new-post__post-title-current-characters"
  );

  function setCharacterCounter(
    element,
    counter,
    currentCharactersElement,
    min,
    max
  ) {
    const inputTextLength = element.value.length;
    currentCharactersElement.textContent = inputTextLength;

    if (
      Number(currentCharactersElement.textContent) >= min &&
      Number(currentCharactersElement.textContent) <= max
    ) {
      counter.classList.remove("red");
      counter.classList.add("green");
    } else {
      counter.classList.add("red");
      counter.classList.remove("green");
    }
  }

  setCharacterCounter(
    pageTitleInput,
    pageTitleCharacterCounter,
    pageTitleCharacterCounterText,
    0,
    60
  );

  setCharacterCounter(
    seoDescriptionInput,
    seoDescriptionCharacterCounter,
    seoDescriptionCurrentCharactersText,
    120,
    320
  );

  setCharacterCounter(
    postTitleInput,
    postTitleCharacterCounter,
    postTitleCharacterCounterText,
    0,
    60
  );

  pageTitleInput.addEventListener("input", () => {
    setCharacterCounter(
      pageTitleInput,
      pageTitleCharacterCounter,
      pageTitleCharacterCounterText,
      0,
      60
    );
  });

  seoDescriptionInput.addEventListener("input", () => {
    setCharacterCounter(
      seoDescriptionInput,
      seoDescriptionCharacterCounter,
      seoDescriptionCurrentCharactersText,
      120,
      320
    );
  });

  postTitleInput.addEventListener("input", () => {
    setCharacterCounter(
      postTitleInput,
      postTitleCharacterCounter,
      postTitleCharacterCounterText,
      0,
      60
    );
  });
};
