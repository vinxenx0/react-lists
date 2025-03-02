import UserModel from "../models/UserModel";

class AuthController {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  }

  register(username, password) {
    if (this.users.some(user => user.username === username)) {
      return { success: false, message: "Username already taken" };
    }

    const newUser = new UserModel(Date.now(), username, password);
    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));
    return { success: true, message: "User registered successfully" };
  }

  login(username, password) {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    this.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Login successful" };
  }

  updateProfile(updatedUser) {
    this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
    localStorage.setItem("users", JSON.stringify(this.users));
    this.currentUser = updatedUser;
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }

  deleteAccount(userId) {
    this.users = this.users.filter(user => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(this.users));
    this.logout();
  }


  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

const authControllerInstance = new AuthController();
export default authControllerInstance;
