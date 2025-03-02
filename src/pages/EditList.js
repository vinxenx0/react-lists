import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListController from "../controllers/ListController";
import ItemController from "../controllers/ItemController";
import { AuthContext } from "../contexts/AuthContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EditList = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItemText, setNewItemText] = useState("");
  const [newItemImage, setNewItemImage] = useState("default_thumbnail.png");

  // Estados de la lista
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("default_thumbnail.png");
  const [status, setStatus] = useState("draft");
  const [permissions, setPermissions] = useState("private");
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    const fetchedList = ListController.getListById(parseInt(id));
    if (fetchedList) {
      setList(fetchedList);
      setTitle(fetchedList.title);
      setDescription(fetchedList.description || "");
      setCategory(fetchedList.category);
      setSubcategory(fetchedList.subcategory);
      setTags(fetchedList.tags.join(", "));
      setImage(fetchedList.image || "default_thumbnail.png");
      setStatus(fetchedList.status);
      setPermissions(fetchedList.permissions);
      setVisibility(fetchedList.visibility);
    }
    setLoading(false);
  }, [id]);

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    ItemController.addItemToList(list.id, newItemText, newItemImage);
    setList({ ...list, items: ListController.getListById(parseInt(id)).items });
    setNewItemText("");
    setNewItemImage("default_thumbnail.png");
  };

  const handleDeleteItem = (itemId) => {
    ItemController.removeItemFromList(list.id, itemId);
    setList({ ...list, items: ListController.getListById(parseInt(id)).items });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(list.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setList({ ...list, items });
  };

  const handleSave = () => {
    if (!list) return;
    list.title = title;
    list.description = description;
    list.category = category;
    list.subcategory = subcategory;
    list.tags = tags.split(",").map(tag => tag.trim());
    list.image = image;
    list.status = status;
    list.permissions = permissions;
    list.visibility = visibility;
    ListController.saveLists();
    navigate("/dashboard");
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (!list) return <p className="text-center text-danger">List not found.</p>;
  if (list.ownerId !== user?.id) return <p className="text-center text-danger">You do not have permission to edit this list.</p>;

  return (
    <div className="container">
      <h2>Edit List</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control mb-2" placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control mb-2" placeholder="Description"></textarea>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control mb-2" placeholder="Category" />
      <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="form-control mb-2" placeholder="Subcategory" />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="form-control mb-2" placeholder="Tags (comma-separated)" />

      <h4>List Image</h4>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="form-control mb-2" placeholder="Image URL" />
      <img src={`/images/${image}`} className="img-thumbnail mb-3" alt="List" width="200" />

      <h4>Manage Items</h4>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items-list">
          {(provided) => (
            <ul className="list-group mb-3" {...provided.droppableProps} ref={provided.innerRef}>
              {list.items.map((item, index) => (
                <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
                  {(provided) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <i className="bi bi-list me-2 text-muted" title="Drag to reorder"></i>
                      <input
                        type="text"
                        className="form-control me-2"
                        value={item.text}
                        onChange={(e) => {
                          const updatedItems = [...list.items];
                          updatedItems[index].text = e.target.value;
                          setList({ ...list, items: updatedItems });
                        }}
                      />
                      <input
                        type="text"
                        className="form-control me-2"
                        value={item.image}
                        onChange={(e) => {
                          const updatedItems = [...list.items];
                          updatedItems[index].image = e.target.value;
                          setList({ ...list, items: updatedItems });
                        }}
                        placeholder="Image URL"
                      />
                      <img src={`/images/${item.image}`} alt="Item" width="40" height="40" className="rounded me-2" />
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteItem(item.id)}>🗑</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <h4>Add New Item</h4>
      <div className="input-group mb-3">
        <input type="text" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} className="form-control" placeholder="New item" />
        <input type="text" value={newItemImage} onChange={(e) => setNewItemImage(e.target.value)} className="form-control" placeholder="Image URL" />
        <button onClick={handleAddItem} className="btn btn-primary">Add Item</button>
      </div>

      <button onClick={handleSave} className="btn btn-success">Save</button>
    </div>
  );
};

export default EditList;
