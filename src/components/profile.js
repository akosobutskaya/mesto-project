import { avatar, profileTitle, profileSubtitle} from "./constants.js";
import { getProfilInfo } from "./api.js";

export const user = await getProfilInfo().then((res) => res);

export function setUserInfo() {
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    avatar.src = user.avatar;
  }