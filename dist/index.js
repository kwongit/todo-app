"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("#unordered-list");
    const inputField = document.querySelector("#input-item");
    function createNewListItem(text) {
        const newListItem = document.createElement("li");
        newListItem.className = "list-item";
        newListItem.innerText = text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            const item = deleteButton.parentElement;
            list === null || list === void 0 ? void 0 : list.removeChild(item);
        });
        newListItem.appendChild(deleteButton);
        return newListItem;
    }
    function addListItem(text) {
        const newListItem = createNewListItem(text);
        list === null || list === void 0 ? void 0 : list.appendChild(newListItem);
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
});
