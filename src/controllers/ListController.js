import ListModel from "../models/ListModel";

class ListController {
  constructor() {
    this.lists = this.loadLists();
  }

  loadLists() {
    const storedLists = JSON.parse(localStorage.getItem("lists")) || [];
    return storedLists.map(list => new ListModel(
      list.id, list.title, list.items, list.ownerId, list.likes, list.dislikes,
      list.followers, list.category, list.subcategory, list.tags, list.image,
      list.createdAt, list.visibility, list.status
    ));
  }
  
  saveLists() {
    localStorage.setItem("lists", JSON.stringify(this.lists));
  }
  

  getListById(listId) {
    return this.lists.find(list => list.id === listId);
  }

  getListsByUser(userId) {
    return this.lists.filter(list => list.ownerId === userId);
  }

  createList(title, ownerId) {
    const newList = new ListModel(
      Date.now(),
      title,
      [],
      ownerId,
      [],
      [],
      [],
      "",
      "",
      [],
      "default_thumbnail.png",
      new Date().toISOString(),
      "public",  
      "draft"    
    ); 
    this.lists.push(newList);
    this.saveLists();
    return newList;
  }
  
  
  getAllLists() {
    return this.lists; 
  }
  

  deleteList(listId, userId) {
    this.lists = this.lists.filter(list => !(list.id === listId && list.ownerId === userId));
    this.saveLists();
  }

  getLatestPublicLists(limit = 10) {
    return this.lists
      .filter(list => list.visibility === "public" && list.status === "published") 
      .slice(-limit)
      .reverse();
  }
  

  getLatestLists(limit = 5) {
    return [...this.lists].slice(-limit).reverse();
  }

  toggleLikeList(listId, userId) {
    const list = this.getListById(listId);
    if (list) {
      list.toggleLike(userId);
      this.saveLists();
    }
  }

  toggleDislikeList(listId, userId) {
    const list = this.getListById(listId);
    if (list) {
      list.toggleDislike(userId);
      this.saveLists();
    }
  }


  toggleFollowList(listId, userId) {
    const list = this.getListById(listId);
    if (list) {
      if (list.followers.includes(userId)) {
        list.followers = list.followers.filter(id => id !== userId);
      } else {
        list.followers.push(userId);
      }
      this.saveLists();
    }
  }

  getListsFollowedByUser(userId) {
    return this.lists.filter(list => list.followers.includes(userId));
  }


}

const listControllerInstance = new ListController();
export default listControllerInstance;
