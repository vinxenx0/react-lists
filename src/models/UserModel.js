export default class UserModel {
  constructor(id, username, password, email = "", bio = "", profilePic = "", followingUsers = [], followingLists = []) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.bio = bio;
    this.profilePic = profilePic;
    this.followingUsers = followingUsers;
    this.followingLists = followingLists;
  }
}
