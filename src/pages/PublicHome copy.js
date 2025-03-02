import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ListController from "../controllers/ListController";
import ListComponent from "../components/ListComponent";
import { AuthContext } from "../contexts/AuthContext";

const PublicHome = () => {
  const { user } = useContext(AuthContext);
  // const [lists, setLists] = useState(ListController.getLatestLists());
  const [lists, setLists] = useState(
    ListController.getLatestLists().filter(list => list.visibility === "public" && list.status === "published") 
  );
  
  /* const [lists, setLists] = useState(
    ListController.getLatestLists().filter(list => list.visibility === "public") // ✅ Solo listas públicas
  ); */
  

  const handleLike = (listId) => {
    if (!user) return;
    ListController.toggleLikeList(listId, user.id);
    setLists([...ListController.getLatestLists()]);
  };

  const handleDislike = (listId) => {
    if (!user) return;
    ListController.toggleDislikeList(listId, user.id);
    setLists([...ListController.getLatestLists()]);
  };

  const handleFollow = (listId) => {
    if (!user) return;
    ListController.toggleFollowList(listId, user.id);
    setLists([...ListController.getLatestLists()]);
  };


  return (
    <div className="container p-4">
      <h1 className="text-center">Welcome to List Manager</h1>
      <p className="text-center">Manage and share your lists with others.</p>

      {user ? (
        <div className="text-center">
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      ) : (
        <div className="text-center mt-4">
          <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
          <Link to="/register" className="btn btn-outline-success">Register</Link>
        </div>
      )}

      <h2 className="mt-5">Latest Lists</h2>
      <div className="mt-4">
        {lists.length === 0 ? (
          <p>No lists created yet.</p>
        ) : (
          lists.map(list => (
            <ListComponent
              key={list.id}
              list={list}
              onLike={handleLike}
              onDislike={handleDislike}
              onFollow={handleFollow}
              page="public" // ✅ Indicamos que es PublicHome
            />
          ))
        )}
      </div>

    </div>
  );
};

export default PublicHome;
