window.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector<HTMLOListElement>("#unordered-list");
  const inputField = document.querySelector<HTMLInputElement>("#input-item")!;
  const itemsLeftContainer = document.querySelector<HTMLElement>("#items-left")!;

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
    deleteButton.innerText = "Delete";
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
});
