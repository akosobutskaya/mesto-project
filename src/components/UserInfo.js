export class UserInfo {
    constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._name = document.querySelector(this._userNameSelector);
        this._about = document.querySelector(this._userInfoSelector);
        this._userAvatar = document.querySelector(this._userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo(data) {
        this._userId = data._id;
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }
}