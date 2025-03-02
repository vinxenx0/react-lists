import React, { useState } from "react";
import ItemController from "../controllers/ItemController";

const AddItemModal = ({ listId, onClose }) => {
  const [itemText, setItemText] = useState("");

  const handleAddItem = () => {
    if (!itemText.trim()) return;
    ItemController.addItemToList(listId, itemText);
    onClose();
  };

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Item</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input type="text" value={itemText} onChange={(e) => setItemText(e.target.value)} className="form-control" />
          </div>
          <div className="modal-footer">
            <button onClick={handleAddItem} className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
