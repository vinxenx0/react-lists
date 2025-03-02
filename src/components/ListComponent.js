import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FlashMessageContext } from "../contexts/FlashMessageContext";
import { Link } from "react-router-dom";

const ListComponent = ({ list, onDelete, onLike, onDislike, onFollow, page }) => {
  const { user } = useContext(AuthContext);
  const { showMessage } = useContext(FlashMessageContext);

  const handleLike = () => {
    if (!user) {
      showMessage("You must be logged in to like a list.");
      return;
    }
    onLike(list.id);
    showMessage(list.likes.includes(user.id) ? "You unliked this list." : "You liked this list.");
  };

  const handleDislike = () => {
    if (!user) {
      showMessage("You must be logged in to dislike a list.");
      return;
    }
    onDislike(list.id);
    showMessage(list.dislikes.includes(user.id) ? "You removed your dislike." : "You disliked this list.");
  };

  const handleFollow = () => {
    if (!user) {
      showMessage("You must be logged in to follow a list.");
      return;
    }
    onFollow(list.id);
    showMessage(list.followers.includes(user.id) ? "You unfollowed this list." : "You followed this list.");
  };


  return (
    <div className="card mb-3 position-relative">
      {user?.id === list.ownerId && ( // page === "public" && 
        <Link to={`/edit/${list.id}`} className="position-absolute top-0 end-0 m-2 text-dark">
          ✏️
        </Link>
      )}

      <img src={`/images/${list.image}`} className="card-img-top" alt="List Thumbnail" />
      <div className="card-body">
        <h5 className="card-title">{list.title}</h5>
        <p className="text-muted small">
          <i className={`bi ${list.status === "published" ? "bi-check-circle text-success" : "bi-pencil text-warning"} me-2`} title="Estado"></i>
          <i className={`bi ${list.permissions === "shared" ? "bi-people text-info" : "bi-person-lock text-danger"} me-2`} title="Permisos"></i>
          <i className={`bi ${list.visibility === "public" ? "bi-eye text-primary" : "bi-eye-slash text-secondary"} me-2`} title="Visibilidad"></i>
        </p>

        <p className="text-muted small">
          <i className="bi bi-list-task"></i> {list.items.length} ítems |
          <i className="bi bi-chat-left-text"></i> 0 comentarios |
          <i className="bi bi-person-plus"></i> {list.followers.length} seguidores
        </p>



        <p className="text-muted">By: {list.ownerId} | {list.category}
          / {list.subcategory} </p>
        <p className="text-muted">Tags: {list.tags.join(", ")}</p>
        <p className="text-muted">Created: {new Date(list.createdAt).toLocaleDateString()}</p>

        <div className="d-flex justify-content-between">
          <div>
            <button onClick={handleLike} className="btn btn-sm btn-outline-primary">
              👍 {list.likes.length}
            </button>
            <button onClick={handleDislike} className="btn btn-sm btn-outline-secondary">
              👎 {list.dislikes.length}
            </button>
          </div>
          {user?.id !== list.ownerId && (
            <button onClick={handleFollow} className="btn btn-sm btn-outline-info">
              🔔 {list.followers.length}
            </button>
          )}
          {page === "dashboard" && user?.id === list.ownerId && (
            <>
              <Link to={`/edit/${list.id}`} className="btn btn-warning btn-sm me-2">
                ✏️ Edit
              </Link>
              <button onClick={() => onDelete(list.id)} className="btn btn-danger btn-sm">
                🗑 Delete
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default ListComponent;
