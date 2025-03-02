import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ListController from "../controllers/ListController";
import { AuthContext } from "../contexts/AuthContext";

const ViewList = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedList = ListController.getListById(parseInt(id));
    setList(fetchedList);
    setLoading(false);
  }, [id]);

  if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (!list) return <p className="text-center text-danger">List not found.</p>;

  return (
    <div className="container">
      <h1>{list.title}</h1>
      <p><strong>Category:</strong> {list.category} / {list.subcategory}</p>
      <p><strong>Tags:</strong> {list.tags.join(", ")}</p>
      <p><strong>Created on:</strong> {new Date(list.createdAt).toLocaleDateString()}</p>

      <h3>Items</h3>
      <ul className="list-group">
        {list.items.map(item => (
          <li key={item.id} className="list-group-item">{item.text}</li>
        ))}
      </ul>

      {user?.id === list.ownerId && (
        <button className="btn btn-warning mt-3" onClick={() => window.location.href=`/edit/${list.id}`}>
          Edit List
        </button>
      )}
    </div>
  );
};

export default ViewList;

