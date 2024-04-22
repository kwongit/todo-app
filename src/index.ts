window.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector<HTMLOListElement>("#unordered-list");
  const inputField = document.querySelector<HTMLInputElement>("#input-item")!;
  const itemsLeftContainer = document.querySelector<HTMLElement>("#items-left")!;
  const allFilter = document.querySelector<HTMLElement>("#all")!;
  const activeFilter = document.querySelector<HTMLElement>("#active")!;
  const completedFilter = document.querySelector<HTMLElement>("#completed")!;
  const clearCompletedFilter = document.querySelector<HTMLElement>("#clear-completed")!;
  const lightModeToggle = document.querySelector<HTMLElement>("#light-mode-toggle");

  const blueTextColorClass = "blue-text";

  function createNewListItem(text: string): HTMLLIElement {
    const newListItem = document.createElement("li");
    newListItem.className = "list-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const listItem = target.closest("li");
      listItem?.classList.toggle("completed", target.checked);
      updateItemsLeftCount();
    });

    const label = document.createElement("label");
    label.innerText = text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.style.backgroundImage = 'url("../images/icon-cross.svg")';
    deleteButton.style.display = "none";

    newListItem.addEventListener("mouseenter", () => {
      deleteButton.style.display = "inline-block";
    });

    newListItem.addEventListener("mouseleave", () => {
      deleteButton.style.display = "none";
    });

    deleteButton.addEventListener("click", () => {
      const item = deleteButton.parentElement!;
      list?.removeChild(item);
      updateItemsLeftCount();
    });

    newListItem.appendChild(checkbox);
    newListItem.appendChild(label);
    newListItem.appendChild(deleteButton);

    return newListItem;
  }

  function addListItem(text: string): void {
    const newListItem = createNewListItem(text);
    list?.appendChild(newListItem);
    updateItemsLeftCount();
  }

  function clearInputField(): void {
    inputField.value = "";
    inputField.placeholder = "Create a new todo...";
    inputField.setAttribute("style", "");
  }

  function displayInputError(): void {
    inputField.placeholder = "Please Enter Text";
    inputField.setAttribute("style", "outline-color:red; border: 2px solid red");
  }

  function handleInputSubmission(): void {
    const trimmedValue = inputField.value.trim();
    if (trimmedValue) {
      addListItem(trimmedValue);
      clearInputField();
    } else {
      displayInputError();
    }
  }

  inputField.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmission();
    }
  });

  function updateItemsLeftCount(): void {
    const listItems = list?.querySelectorAll<HTMLLIElement>("li");
    let activeItemCount = 0;

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && !checkbox.checked) {
        activeItemCount++;
      }
    });

    itemsLeftContainer.innerText = `${activeItemCount} item${activeItemCount !== 1 ? "s" : ""} left`
  }

  updateItemsLeftCount();

  function removeBlueTextColorFromFilters(): void {
    allFilter.classList.remove(blueTextColorClass);
    activeFilter.classList.remove(blueTextColorClass);
    completedFilter.classList.remove(blueTextColorClass);
  }

  activeFilter.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();
    activeFilter.classList.add(blueTextColorClass);

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && !checkbox.checked) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  completedFilter.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();
    completedFilter.classList.add(blueTextColorClass);

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && checkbox.checked) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  allFilter.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();
    allFilter.classList.add(blueTextColorClass);

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      item.style.display = "block";
    });
  });

  clearCompletedFilter.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && checkbox.checked) {
        list?.removeChild(item);
        updateItemsLeftCount();
      }
    });
  });

  lightModeToggle?.addEventListener("click", () => {
    const desktopBanner = document.querySelector<HTMLImageElement>("#desktop-banner");
    const body = document.body;

    if (desktopBanner) {
      const currentSrc = desktopBanner.getAttribute("src");
      const lightModeImageSrc = "../images/bg-desktop-light.jpg";
      const darkModeImageSrc = "../images/bg-desktop-dark.jpg";

      if (currentSrc === darkModeImageSrc) {
        // switch to light mode
        desktopBanner.setAttribute("src", lightModeImageSrc);
        lightModeToggle.setAttribute("src", "../images/icon-moon.svg");

        // Remove dark mode class and add light mode class to body
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
      } else {
        // switch to dark mode
        desktopBanner.setAttribute("src", darkModeImageSrc);
        lightModeToggle.setAttribute("src", "../images/icon-sun.svg");

        // Remove light mode class and add dark mode class to body
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
      }
    }
  });
});
