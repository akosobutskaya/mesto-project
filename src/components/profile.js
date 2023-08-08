import { profile, avatar, profileTitle, profileSubtitle } from "./constants.js";

export function setUserInfo(profileData) {
  profileTitle.textContent = profileData.name;
  profileSubtitle.textContent = profileData.about;
  avatar.src = profileData.avatar;
  profile.id = profileData._id;
}