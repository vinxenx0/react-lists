import ListController from "./ListController";

class ItemController {
  addItemToList(listId, itemText) {
    const list = ListController.getListById(listId);
    if (list) {
      list.items.push({ id: Date.now(), text: itemText });
      ListController.saveLists();
    }
  }

  removeItemFromList(listId, itemId) {
    const list = ListController.getListById(listId);
    if (list) {
      list.items = list.items.filter(item => item.id !== itemId);
      ListController.saveLists();
    }
  }

  editItemInList(listId, itemId, newText) {
    const list = ListController.getListById(listId);
    if (list) {
      const item = list.items.find(item => item.id === itemId);
      if (item) item.text = newText;
      ListController.saveLists();
    }
  }


}


const itemControllerInstance = new ItemController();
export default itemControllerInstance;
