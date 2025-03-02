import React, { useContext, useState } from "react";
import ListController from "../controllers/ListController";
import ListComponent from "../components/ListComponent";
import { AuthContext } from "../contexts/AuthContext";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [lists] = useState(ListController.getListsFollowedByUser(user?.id));

  return (
    <div className="container">
      <h2 className="text-center">Favorite Lists</h2>
      <div className="mt-4">
        {lists.length === 0 ? (
          <p className="text-center">You haven't followed any lists yet.</p>
        ) : (
          lists.map(list => (
            <ListComponent key={list.id} list={list} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
