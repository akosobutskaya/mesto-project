import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__mesto-img');
        this._popupImageTitle = this._popup.querySelector('.popup__mesto-title');
    }

    open(data) {
        super.open();
        this._popupImage.src = `${data.link}`;
        this._popupImage.alt = `${data.name}`;
        this._popupImageTitle.textContent = `${data.name}`;
    }
}
