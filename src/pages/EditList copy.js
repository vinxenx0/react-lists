import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListController from "../controllers/ListController";
import ItemController from "../controllers/ItemController";
import { AuthContext } from "../contexts/AuthContext";

const EditList = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItemText, setNewItemText] = useState("");

  // Estados individuales para los atributos de la lista
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [permissions, setPermissions] = useState("private");
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    const fetchedList = ListController.getListById(parseInt(id));
    if (fetchedList) {
      setList(fetchedList);
      setTitle(fetchedList.title);
      setCategory(fetchedList.category);
      setSubcategory(fetchedList.subcategory);
      setTags(fetchedList.tags.join(", "));
      setStatus(fetchedList.status);
      setPermissions(fetchedList.permissions);
      setVisibility(fetchedList.visibility);
    }
    setLoading(false);
  }, [id]);

  // Función para agregar un nuevo item
  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    ItemController.addItemToList(list.id, newItemText);
    setList(ListController.getListById(parseInt(id)));
    setNewItemText("");
  };

  // Función para editar un item
  const handleEditItem = (itemId, newText) => {
    ItemController.editItemInList(list.id, itemId, newText);
    setList(ListController.getListById(parseInt(id)));
  };

  // Función para eliminar un item
  const handleDeleteItem = (itemId) => {
    ItemController.removeItemFromList(list.id, itemId);
    setList(ListController.getListById(parseInt(id)));
  };

  // Guardar cambios en la lista
  const handleSave = () => {
    if (!list) return;
    list.title = title;
    list.category = category;
    list.subcategory = subcategory;
    list.tags = tags.split(",").map(tag => tag.trim());
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
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control mb-2" placeholder="Category" />
      <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="form-control mb-2" placeholder="Subcategory" />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="form-control mb-2" placeholder="Tags (comma-separated)" />

      {/* Estado, Permisos y Visibilidad */}
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select mb-2">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <select value={permissions} onChange={(e) => setPermissions(e.target.value)} className="form-select mb-2">
        <option value="shared">Shared</option>
        <option value="private">Only Me</option>
      </select>

      <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="form-select mb-2">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      <h4>Manage Items</h4>
      <ul className="list-group mb-3">
        {list.items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <input 
              type="text" 
              className="form-control me-2" 
              defaultValue={item.text} 
              onBlur={(e) => handleEditItem(item.id, e.target.value)}
            />
            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteItem(item.id)}>🗑</button>
          </li>
        ))}
      </ul>

      <div className="input-group mb-3">
        <input type="text" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} className="form-control" placeholder="New item" />
        <button onClick={handleAddItem} className="btn btn-primary">Add Item</button>
      </div>

      <button onClick={handleSave} className="btn btn-success">Save</button>
    </div>
  );
};

export default EditList;
