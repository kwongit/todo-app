"use strict";
window.addEventListener("DOMContentLoaded", () => {
    function getElement(selector) {
        return document.querySelector(selector);
    }
    const listContainer = getElement(".list-container");
    const list = getElement("#unordered-list");
    const inputField = getElement(".input-item");
    const statusContainer = getElement(".status-container");
    const itemsLeftContainer = getElement("#items-left");
    const allFilter = getElement("#all");
    const activeFilter = getElement("#active");
    const completedFilter = getElement("#completed");
    const clearCompletedFilter = getElement("#clear-completed");
    const lightModeToggle = getElement("#light-mode-toggle");
    const blueTextColorClass = "blue-text";
    const deleteButtonImageSrc = "./images/icon-cross.svg";
    const lightModeImageSrc = "./images/bg-desktop-light.jpg";
    const darkModeImageSrc = "./images/bg-desktop-dark.jpg";
    const lightModeIconSrc = "./images/icon-moon.svg";
    const darkModeIconSrc = "./images/icon-sun.svg";
    function loadItemsFromLocalStorage() {
        const savedItems = localStorage.getItem("todoItems");
        if (savedItems) {
            const todoItems = JSON.parse(savedItems);
            todoItems.forEach((item) => {
                addListItem(item.text, item.completed);
            });
        }
    }
    function saveItemsToLocalStorage() {
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        if (listItems) {
            const todoItems = Array.from(listItems).map((item) => {
                const label = item.querySelector("label");
                const checkbox = item.querySelector(".checkbox");
                return {
                    text: (label === null || label === void 0 ? void 0 : label.innerText) || "",
                    completed: item.classList.contains("completed"),
                };
            });
            localStorage.setItem("todoItems", JSON.stringify(todoItems));
        }
    }
    loadItemsFromLocalStorage();
    function createNewListItem(text, completed) {
        const newListItem = document.createElement("li");
        newListItem.className = "list-item";
        if (completed) {
            newListItem.classList.add("completed");
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", (e) => {
            const target = e.target;
            const listItem = target.closest("li");
            listItem === null || listItem === void 0 ? void 0 : listItem.classList.toggle("completed", target.checked);
            updateItemsLeftCount();
            saveItemsToLocalStorage();
        });
        const label = document.createElement("label");
        label.innerText = text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.style.backgroundImage = `url(${deleteButtonImageSrc})`;
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
    function addListItem(text, completed = false) {
        const newListItem = createNewListItem(text, completed);
        list === null || list === void 0 ? void 0 : list.appendChild(newListItem);
        updateItemsLeftCount();
        saveItemsToLocalStorage();
    }
    function clearInputField() {
        if (inputField) {
            inputField.value = "";
            inputField.placeholder = "Create a new todo...";
            inputField.setAttribute("style", "");
        }
    }
    function displayInputError() {
        if (inputField) {
            inputField.placeholder = "Please Enter Text";
            inputField.style.outlineColor = "red";
            inputField.style.border = "2px solid red";
        }
    }
    function handleInputSubmission() {
        const trimmedValue = inputField === null || inputField === void 0 ? void 0 : inputField.value.trim();
        if (trimmedValue) {
            addListItem(trimmedValue);
            clearInputField();
        }
        else {
            displayInputError();
        }
    }
    inputField === null || inputField === void 0 ? void 0 : inputField.addEventListener("keypress", (e) => {
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
        if (itemsLeftContainer) {
            itemsLeftContainer.innerText = `${activeItemCount} item${activeItemCount !== 1 ? "s" : ""} left`;
        }
        saveItemsToLocalStorage();
    }
    updateItemsLeftCount();
    function removeBlueTextColorFromFilters() {
        allFilter === null || allFilter === void 0 ? void 0 : allFilter.classList.remove(blueTextColorClass);
        activeFilter === null || activeFilter === void 0 ? void 0 : activeFilter.classList.remove(blueTextColorClass);
        completedFilter === null || completedFilter === void 0 ? void 0 : completedFilter.classList.remove(blueTextColorClass);
    }
    activeFilter === null || activeFilter === void 0 ? void 0 : activeFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        activeFilter === null || activeFilter === void 0 ? void 0 : activeFilter.classList.add(blueTextColorClass);
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && !checkbox.checked) {
                item.style.display = "flex";
            }
            else {
                item.style.display = "none";
            }
        });
    });
    completedFilter === null || completedFilter === void 0 ? void 0 : completedFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        completedFilter === null || completedFilter === void 0 ? void 0 : completedFilter.classList.add(blueTextColorClass);
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && checkbox.checked) {
                item.style.display = "flex";
            }
            else {
                item.style.display = "none";
            }
        });
    });
    allFilter === null || allFilter === void 0 ? void 0 : allFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        allFilter === null || allFilter === void 0 ? void 0 : allFilter.classList.add(blueTextColorClass);
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            item.style.display = "flex";
        });
    });
    clearCompletedFilter === null || clearCompletedFilter === void 0 ? void 0 : clearCompletedFilter.addEventListener("click", (e) => {
        removeBlueTextColorFromFilters();
        const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll("li");
        listItems === null || listItems === void 0 ? void 0 : listItems.forEach((item) => {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox && checkbox.checked) {
                list === null || list === void 0 ? void 0 : list.removeChild(item);
                updateItemsLeftCount();
            }
        });
        saveItemsToLocalStorage();
    });
    lightModeToggle === null || lightModeToggle === void 0 ? void 0 : lightModeToggle.addEventListener("click", () => {
        const desktopBanner = document.querySelector("#desktop-banner");
        const body = document.body;
        if (desktopBanner) {
            const currentSrc = desktopBanner.getAttribute("src");
            if (currentSrc === darkModeImageSrc) {
                desktopBanner.setAttribute("src", lightModeImageSrc);
                lightModeToggle.setAttribute("src", lightModeIconSrc);
                body.classList.add("light-mode");
                inputField === null || inputField === void 0 ? void 0 : inputField.classList.add("light-mode");
                listContainer === null || listContainer === void 0 ? void 0 : listContainer.classList.add("light-mode");
            }
            else {
                desktopBanner.setAttribute("src", darkModeImageSrc);
                lightModeToggle.setAttribute("src", darkModeIconSrc);
                body.classList.remove("light-mode");
                inputField === null || inputField === void 0 ? void 0 : inputField.classList.remove("light-mode");
                listContainer === null || listContainer === void 0 ? void 0 : listContainer.classList.remove("light-mode");
            }
        }
        saveItemsToLocalStorage();
    });
});
