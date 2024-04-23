// Event listener for when DOM content is loaded
window.addEventListener("DOMContentLoaded", () => {

  // Function to safely get an element by selector and assert its type
  function getElement<T extends HTMLElement>(selector: string): T | null {
    return document.querySelector<T>(selector);
  }

  // Get references to various elements using getElement function
  const listContainer = getElement<HTMLElement>(".list-container")
  const list = getElement<HTMLOListElement>("#unordered-list");
  const inputField = getElement<HTMLInputElement>(".input-item");
  const statusContainer = getElement<HTMLElement>(".status-container");
  const itemsLeftContainer = getElement<HTMLElement>("#items-left");
  const allFilter = getElement<HTMLElement>("#all");
  const activeFilter = getElement<HTMLElement>("#active");
  const completedFilter = getElement<HTMLElement>("#completed");
  const clearCompletedFilter = getElement<HTMLElement>("#clear-completed");
  const lightModeToggle = getElement<HTMLElement>("#light-mode-toggle");

  // Define constants for class names and image sources
  const blueTextColorClass: string = "blue-text";
  const deleteButtonImageSrc: string = "./images/icon-cross.svg";
  const lightModeImageSrc: string = "./images/bg-desktop-light.jpg";
  const darkModeImageSrc: string = "./images/bg-desktop-dark.jpg";
  const lightModeIconSrc: string = "./images/icon-moon.svg";
  const darkModeIconSrc: string = "./images/icon-sun.svg";

  // Load items from local storage on page load
  function loadItemsFromLocalStorage(): void {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
      const todoItems = JSON.parse(savedItems);
      todoItems.forEach((item: any) => {
        addListItem(item.text, item.completed);
      });
    }
  }

  // Function to save todo items to local storage
  function saveItemsToLocalStorage(): void {
    const listItems = list?.querySelectorAll<HTMLLIElement>("li");
    if (listItems) {
      const todoItems = Array.from(listItems).map((item) => {
        const label = item.querySelector("label");
        const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
        return {
          text: label?.innerText || "",
          completed: item.classList.contains("completed"),
        };
      });
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
    }
  }

  // Call loadItemsFromLocalStorage on page load
  loadItemsFromLocalStorage();

  // Function to create a new list item with given text
  function createNewListItem(text: string, completed: boolean): HTMLLIElement {
    const newListItem = document.createElement("li");
    newListItem.className = "list-item";

    if (completed) {
      newListItem.classList.add("completed");
    }

    // Create checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = completed;

    // Add change event listener to toggle 'completed' class and update items count
    checkbox.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const listItem = target.closest("li");
      listItem?.classList.toggle("completed", target.checked);
      updateItemsLeftCount();
      saveItemsToLocalStorage()
    });

    // Create label element with text
    const label = document.createElement("label");
    label.innerText = text;

    // Create delete button element
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.style.backgroundImage = `url(${deleteButtonImageSrc})`;
    deleteButton.style.display = "none";

    // Show delete button on mouse enter and hide on mouse leave
    newListItem.addEventListener("mouseenter", () => {
      deleteButton.style.display = "inline-block";
    });

    newListItem.addEventListener("mouseleave", () => {
      deleteButton.style.display = "none";
    });

    // Add click event listener to delete button to remove list item and update items count
    deleteButton.addEventListener("click", () => {
      const item = deleteButton.parentElement!;
      list?.removeChild(item);
      updateItemsLeftCount();
    });

    // Append checkbox, label, and delete button to the list item
    newListItem.appendChild(checkbox);
    newListItem.appendChild(label);
    newListItem.appendChild(deleteButton);

    return newListItem;
  }

  // Function to add a new list item with trimmed text to the list
  function addListItem(text: string, completed: boolean = false): void {
    const newListItem = createNewListItem(text, completed);
    list?.appendChild(newListItem);
    updateItemsLeftCount();
    saveItemsToLocalStorage();
  }

  // Function to clear input field value and reset placeholder
  function clearInputField(): void {
    if (inputField) {
      inputField.value = "";
      inputField.placeholder = "Create a new todo...";
      inputField.setAttribute("style", "");
    }
  }

  // Function to display input error by setting placeholder and border color
  function displayInputError(): void {
    if (inputField) {
      inputField.placeholder = "Please Enter Text";
      inputField.style.outlineColor = "red";
      inputField.style.border = "2px solid red";
    }
  }

  // Function to handle submission of input field on 'Enter' key press
  function handleInputSubmission(): void {
    const trimmedValue = inputField?.value.trim();
    if (trimmedValue) {
      addListItem(trimmedValue);
      clearInputField();
    } else {
      displayInputError();
    }
  }

  // Add key press event listener to input field to handle submission
  inputField?.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmission();
    }
  });

  // Function to update the count of active items
  function updateItemsLeftCount(): void {
    const listItems = list?.querySelectorAll<HTMLLIElement>("li");
    let activeItemCount = 0;

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && !checkbox.checked) {
        activeItemCount++;
      }
    });

    if (itemsLeftContainer) {
      // Update items left container text based on active item count
      itemsLeftContainer.innerText = `${activeItemCount} item${activeItemCount !== 1 ? "s" : ""} left`
    }

    saveItemsToLocalStorage();
  }

  // Initial call to update items count on load
  updateItemsLeftCount();

  // Function to remove blue text color from all filters
  function removeBlueTextColorFromFilters(): void {
    allFilter?.classList.remove(blueTextColorClass);
    activeFilter?.classList.remove(blueTextColorClass);
    completedFilter?.classList.remove(blueTextColorClass);
  }

  // Add click event listener to active filter to show active items
  activeFilter?.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();
    activeFilter?.classList.add(blueTextColorClass);

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && !checkbox.checked) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Add click event listener to completed filter to show completed items
  completedFilter?.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();
    completedFilter?.classList.add(blueTextColorClass);

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && checkbox.checked) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Add click event listener to 'All' filter to show all items
  allFilter?.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();
    allFilter?.classList.add(blueTextColorClass);

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      item.style.display = "flex";
    });
  });

  // Add click event listener to clear completed filter to remove completed items
  clearCompletedFilter?.addEventListener("click", (e: MouseEvent) => {
    removeBlueTextColorFromFilters();

    const listItems = list?.querySelectorAll<HTMLLIElement>("li");

    listItems?.forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(".checkbox");
      if (checkbox && checkbox.checked) {
        list?.removeChild(item);
        updateItemsLeftCount();
      }
    });

    saveItemsToLocalStorage();
  });

  // Add click event listener to light mode toggle button to switch between light/dark mode
  lightModeToggle?.addEventListener("click", () => {
    const desktopBanner = document.querySelector<HTMLImageElement>("#desktop-banner");
    const body = document.body;

    if (desktopBanner) {
      const currentSrc = desktopBanner.getAttribute("src");

      if (currentSrc === darkModeImageSrc) {
        // Switch to light mode
        desktopBanner.setAttribute("src", lightModeImageSrc);
        lightModeToggle.setAttribute("src", lightModeIconSrc);

        // Add light mode class to body and elements
        body.classList.add("light-mode");
        inputField?.classList.add("light-mode");
        listContainer?.classList.add("light-mode")
      } else {
        // Switch to dark mode
        desktopBanner.setAttribute("src", darkModeImageSrc);
        lightModeToggle.setAttribute("src", darkModeIconSrc);

        // Remove light mode class from body and elements
        body.classList.remove("light-mode");
        inputField?.classList.remove("light-mode");
        listContainer?.classList.remove("light-mode");
      }
    }

    saveItemsToLocalStorage();
  });
});
