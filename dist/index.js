"use strict";
window.addEventListener("DOMContentLoaded", () => {
    function getElement(selector) {
        return document.querySelector(selector);
    }
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
    const deleteButtonImageSrc = "../images/icon-cross.svg";
    const lightModeImageSrc = "../images/bg-desktop-light.jpg";
    const darkModeImageSrc = "../images/bg-desktop-dark.jpg";
    const lightModeIconSrc = "../images/icon-moon.svg";
    const darkModeIconSrc = "../images/icon-sun.svg";
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
    function addListItem(text) {
        const newListItem = createNewListItem(text);
        list === null || list === void 0 ? void 0 : list.appendChild(newListItem);
        updateItemsLeftCount();
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
                item.style.display = "block";
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
                item.style.display = "block";
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
            item.style.display = "block";
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
    });
    lightModeToggle === null || lightModeToggle === void 0 ? void 0 : lightModeToggle.addEventListener("click", () => {
        const desktopBanner = document.querySelector("#desktop-banner");
        const body = document.body;
        if (desktopBanner) {
            const currentSrc = desktopBanner.getAttribute("src");
            if (currentSrc === darkModeImageSrc) {
                desktopBanner.setAttribute("src", lightModeImageSrc);
                lightModeToggle.setAttribute("src", lightModeIconSrc);
                body.classList.remove("dark-mode");
                body.classList.add("light-mode");
                list === null || list === void 0 ? void 0 : list.classList.remove("dark-mode");
                list === null || list === void 0 ? void 0 : list.classList.add("light-mode");
                inputField === null || inputField === void 0 ? void 0 : inputField.classList.remove("dark-mode");
                inputField === null || inputField === void 0 ? void 0 : inputField.classList.add("light-mode");
                statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.classList.remove("dark-mode");
                statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.classList.add("light-mode");
            }
            else {
                desktopBanner.setAttribute("src", darkModeImageSrc);
                lightModeToggle.setAttribute("src", darkModeIconSrc);
                body.classList.remove("light-mode");
                list === null || list === void 0 ? void 0 : list.classList.remove("light-mode");
                inputField === null || inputField === void 0 ? void 0 : inputField.classList.remove("light-mode");
                statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.classList.remove("light-mode");
            }
        }
    });
});
