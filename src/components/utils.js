function closeByEscape(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

/* Open popup */
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closeByEscape);
}

/* Close popup */
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closeByEscape); 
}