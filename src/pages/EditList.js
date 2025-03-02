import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListController from "../controllers/ListController";
import { AuthContext } from "../contexts/AuthContext";

const EditList = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedList = ListController.getListById(parseInt(id));
    setList(fetchedList);
    setLoading(false);
  }, [id]);

  // ✅ Definir los estados siempre, con valores por defecto
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");

  const [status, setStatus] = useState("draft");
  const [permissions, setPermissions] = useState("private");
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    if (list) {
      setTitle(list.title);
      setCategory(list.category);
      setSubcategory(list.subcategory);
      setTags(list.tags.join(", "));
      setStatus(list.status);
      setPermissions(list.permissions);
      setVisibility(list.visibility);
    }
  }, [list]);

  if (loading) {
    return <p className="text-center text-primary">Loading...</p>;
  }

  if (!list) {
    return <p className="text-center text-danger">List not found.</p>;
  }

  if (list.ownerId !== user?.id) {
    return <p className="text-center text-danger">You do not have permission to edit this list.</p>;
  }

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
    navigate("/dashboard"); // ✅ Redirige al usuario después de guardar
  };
  

  return (
    <div className="container">
      <h2>Edit List</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control mb-2" placeholder="Title" />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control mb-2" placeholder="Category" />
      <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="form-control mb-2" placeholder="Subcategory" />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="form-control mb-2" placeholder="Tags (comma-separated)" />

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

      <button onClick={handleSave} className="btn btn-success">Save</button>
    </div>
  );
};

export default EditList;

