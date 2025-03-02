import React, { useState, useContext } from "react";
import ListController from "../controllers/ListController.js";
import ListComponent from "../components/ListComponent.js";
import { AuthContext } from "../contexts/AuthContext.js";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState(ListController.getListsByUser(user?.id));
  const [newListTitle, setNewListTitle] = useState("");

  const handleCreateList = () => {
    if (!user) return;
    const newList = ListController.createList(newListTitle, user.id);
    setLists([...lists, newList]);
    setNewListTitle("");
  };

  const handleDeleteList = (listId) => {
    ListController.deleteList(listId, user.id);
    setLists(ListController.getListsByUser(user.id));
  };

  const handleLikeList = (listId) => {
    ListController.toggleLikeList(listId, user.id);
    setLists([...ListController.getListsByUser(user.id)]);
  };

  const handleDislikeList = (listId) => {
    ListController.toggleDislikeList(listId, user.id);
    setLists([...ListController.getListsByUser(user.id)]);
  };

  return (
    <div>
      <h1 className="text-center">My Lists</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New list title"
          className="form-control"
        />
        <button onClick={handleCreateList} className="btn btn-primary">Create</button>
      </div>

      <div className="mt-4">
        {lists.length === 0 ? (
          <p className="text-center">No lists available.</p>
        ) : (
          lists.map(list => (
            <ListComponent
              key={list.id}
              list={list}
              onDelete={handleDeleteList}
              onLike={handleLikeList}
              onDislike={handleDislikeList}
              page="dashboard"
            />
          ))
        )}
      </div>


    </div>
  );
};

export default Dashboard;
