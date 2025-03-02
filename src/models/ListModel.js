export default class ListModel {
  constructor(id, title, items = [], ownerId, likes = [], dislikes = [], followers = [],
              category = "", subcategory = "", tags = [], image = "default_thumbnail.png",
              createdAt = new Date().toISOString(), visibility = "public", status = "draft") {
    this.id = id;
    this.title = title;
    this.items = items;
    this.ownerId = ownerId;
    this.likes = likes;
    this.dislikes = dislikes;
    this.followers = followers;
    this.category = category;
    this.subcategory = subcategory;
    this.tags = tags;
    this.image = image;
    this.createdAt = createdAt;
    this.visibility = visibility || "public"; 
    this.status = status || "draft"; 
  }

  toggleLike(userId) {
    if (this.likes.includes(userId)) {
      this.likes = this.likes.filter(id => id !== userId);
    } else {
      this.likes.push(userId);
      this.dislikes = this.dislikes.filter(id => id !== userId);
    }
  }

  toggleDislike(userId) {
    if (this.dislikes.includes(userId)) {
      this.dislikes = this.dislikes.filter(id => id !== userId);
    } else {
      this.dislikes.push(userId);
      this.likes = this.likes.filter(id => id !== userId);
    }
  }

  toggleFollow(userId) {
    if (this.followers.includes(userId)) {
      this.followers = this.followers.filter(id => id !== userId);
    } else {
      this.followers.push(userId);
    }
  }
}
