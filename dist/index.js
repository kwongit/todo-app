"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("#unordered-list");
    const inputField = document.querySelector("#input-item");
    const itemsLeftContainer = document.querySelector("#items-left");
    const allFilter = document.querySelector("#all");
    const activeFilter = document.querySelector("#active");
    const completedFilter = document.querySelector("#completed");
    const clearCompletedFilter = document.querySelector("#clear-completed");
    const blueTextColorClass = "blue-text";
    function createNewListItem(text) {
        const newListItem = document.createElement("li");
        newListItem.className = "list-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", (e) => {
            const target = e.target;
            const listItem = target.closest("li");
            listItem === null || listItem === void 0 ? void 0 : listItem.classList.toggle("completed", target.checked);
            updateItemsLeftCount();
        });
        const label = document.createElement("label");
        label.innerText = text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";
        deleteButton.style.display = "none";
        newListItem.addEventListener("mouseenter", () => {
            deleteButton.style.display = "inline-block";
        });
        newListItem.addEventListener("mouseleave", () => {
            deleteButton.style.display = "none";
        });
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
        itemsLeftContainer.innerText = `${activeItemCount} item${activeItemCount !== 1 ? "s" : ""} left`;
    }
    updateItemsLeftCount();
    function removeBlueTextColorFromFilters() {
        allFilter.classList.remove(blueTextColorClass);
        activeFilter.classList.remove(blueTextColorClass);
        completedFilter.classList.remove(blueTextColorClass);
    }
    activeFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        activeFilter.classList.add(blueTextColorClass);
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && !checkbox.checked) {
                item.style.display = "block";
            }
            else {
                item.style.display = "none";
            }
        });
    });
    completedFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        completedFilter.classList.add(blueTextColorClass);
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && checkbox.checked) {
                item.style.display = "block";
            }
            else {
                item.style.display = "none";
            }
        });
    });
    allFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        allFilter.classList.add(blueTextColorClass);
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            item.style.display = "block";
        });
    });
    clearCompletedFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && checkbox.checked) {
                list === null || list === void 0 ? void 0 : list.removeChild(item);
                updateItemsLeftCount();
            }
        });
    });
});
