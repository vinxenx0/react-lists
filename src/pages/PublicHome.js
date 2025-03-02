import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ListController from "../controllers/ListController";
import ListComponent from "../components/ListComponent";
import { AuthContext } from "../contexts/AuthContext";

const PublicHome = () => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLists = () => {
      setLoading(true);
      const publicLists = ListController.getLatestPublicLists(page * 5);
      setLists(publicLists);
      setLoading(false);
    };

    fetchLists();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLike = (listId) => {
    if (!user) return;
    ListController.toggleLikeList(listId, user.id);
    setLists([...ListController.getLatestPublicLists()]); // ✅ Se actualiza el estado
  };

  const handleDislike = (listId) => {
    if (!user) return;
    ListController.toggleDislikeList(listId, user.id);
    setLists([...ListController.getLatestPublicLists()]);
  };

  const handleFollow = (listId) => {
    if (!user) return;
    ListController.toggleFollowList(listId, user.id);
    setLists([...ListController.getLatestPublicLists()]);
  };

  return (
    <div className="container p-4">
      <h1 className="text-center">Discover Lists</h1>
      <p className="text-center">Explore and engage with the latest public lists.</p>

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

      <h2 className="mt-5">Latest Public Lists</h2>
      <div className="mt-4">
        {lists.length === 0 ? (
          <p className="text-center">No public lists available.</p>
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

      {loading && <p className="text-center text-secondary">Loading more lists...</p>}
    </div>
  );
};

export default PublicHome;
