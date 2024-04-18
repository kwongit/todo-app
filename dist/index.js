"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("#unordered-list");
    const inputField = document.querySelector("#input-item");
    const itemsLeftContainer = document.querySelector("#items-left");
    function createNewListItem(text) {
        const newListItem = document.createElement("li");
        newListItem.className = "list-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => {
            updateItemsLeftCount();
        });
        const label = document.createElement("label");
        label.innerText = text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            const item = deleteButton.parentElement;
            list === null || list === void 0 ? void 0 : list.removeChild(item);
            updateItemsLeftCount();
        });
        newListItem.appendChild(checkbox);
        newListItem.appendChild(label);
        newListItem.appendChild(deleteButton);
        return newListItem;
    }
    function addListItem(text) {
        const newListItem = createNewListItem(text);
        list === null || list === void 0 ? void 0 : list.appendChild(newListItem);
        updateItemsLeftCount();
    }
    function clearInputField() {
        inputField.value = "";
        inputField.placeholder = "Create a new todo...";
        inputField.setAttribute("style", "");
    }
    function displayInputError() {
        inputField.placeholder = "Please Enter Text";
        inputField.setAttribute("style", "outline-color:red; border: 2px solid red");
    }
    function handleInputSubmission() {
        const trimmedValue = inputField.value.trim();
        if (trimmedValue) {
            addListItem(trimmedValue);
            clearInputField();
        }
        else {
            displayInputError();
        }
    }
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleInputSubmission();
        }
    });
    function updateItemsLeftCount() {
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        let activeItemCount = 0;
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && !checkbox.checked) {
                activeItemCount++;
            }
        });
        itemsLeftContainer.textContent = `${activeItemCount} item${activeItemCount !== 1 ? "s" : ""} left`;
    }
    updateItemsLeftCount();
});
