import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListController from "../controllers/ListController";
import CommentController from "../controllers/CommentController"; // ✅ Se añadió la importación
import { AuthContext } from "../contexts/AuthContext";

const ViewList = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState(""); // ✅ Se añadió el estado

  useEffect(() => {
    const fetchedList = ListController.getListById(parseInt(id));
    setList(fetchedList);
    setLoading(false);
  }, [id]);

  const handleAddComment = () => {
    if (!commentText.trim() || !user) return;
    CommentController.addComment(list.id, user.id, user.username, commentText);
    setList(ListController.getListById(parseInt(id))); // ✅ Actualizar lista tras agregar comentario
    setCommentText(""); // ✅ Limpiar campo de comentario
  };

  const handleDeleteComment = (commentId) => {
    if (!user || list.ownerId !== user.id) return;
    CommentController.deleteComment(list.id, commentId, user.id);
    setList(ListController.getListById(parseInt(id)));
  };

  const handleLikeComment = (commentId) => {
    if (!user) return;
    CommentController.toggleLikeComment(list.id, commentId, user.id);
    setList(ListController.getListById(parseInt(id)));
  };

  const handleDislikeComment = (commentId) => {
    if (!user) return;
    CommentController.toggleDislikeComment(list.id, commentId, user.id);
    setList(ListController.getListById(parseInt(id)));
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (!list) return <p className="text-center text-danger">List not found.</p>;

  return (
    <div className="container">
      <h2>{list.title}</h2>
      <p>{list.description}</p>

      <h4>Items</h4>
      <ul className="list-group mb-3">
        {list.items.map(item => (
          <li key={item.id} className="list-group-item">
            <img src={`/images/${item.image}`} alt={item.text} width="40" height="40" className="me-2" />
            {item.text}
          </li>
        ))}
      </ul>

      <h4>Comments</h4>
      <ul className="list-group mb-3">
        {list.comments.map(comment => (
          <li key={comment.id} className="list-group-item">
            <div>
              <strong>{comment.username}:</strong> {comment.text}
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button onClick={() => handleLikeComment(comment.id)} className="btn btn-sm btn-outline-primary me-2">
                  👍 {comment.likes.length}
                </button>
                <button onClick={() => handleDislikeComment(comment.id)} className="btn btn-sm btn-outline-secondary">
                  👎 {comment.dislikes.length}
                </button>
              </div>
              {user?.id === list.ownerId && (
                <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-sm btn-danger">
                  🗑 Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {user && (
        <div className="input-group mb-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="form-control"
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment} className="btn btn-primary">Post</button>
        </div>
      )}
    </div>
  );
};

export default ViewList;

