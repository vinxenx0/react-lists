import ListController from "./ListController";

class CommentController {
  addComment(listId, userId, username, text) {
    const list = ListController.getListById(listId);
    if (list) {
      const newComment = {
        id: Date.now(),
        userId,
        username,
        text,
        likes: [],
        dislikes: [],
        createdAt: new Date().toISOString(),
      };
      list.comments.push(newComment);
      ListController.saveLists();
    }
  }

  deleteComment(listId, commentId, userId) {
    const list = ListController.getListById(listId);
    if (list && list.ownerId === userId) {
      list.comments = list.comments.filter(comment => comment.id !== commentId);
      ListController.saveLists();
    }
  }

  toggleLikeComment(listId, commentId, userId) {
    const list = ListController.getListById(listId);
    if (list) {
      const comment = list.comments.find(comment => comment.id === commentId);
      if (comment) {
        if (comment.likes.includes(userId)) {
          comment.likes = comment.likes.filter(id => id !== userId);
        } else {
          comment.likes.push(userId);
          comment.dislikes = comment.dislikes.filter(id => id !== userId);
        }
        ListController.saveLists();
      }
    }
  }

  toggleDislikeComment(listId, commentId, userId) {
    const list = ListController.getListById(listId);
    if (list) {
      const comment = list.comments.find(comment => comment.id === commentId);
      if (comment) {
        if (comment.dislikes.includes(userId)) {
          comment.dislikes = comment.dislikes.filter(id => id !== userId);
        } else {
          comment.dislikes.push(userId);
          comment.likes = comment.likes.filter(id => id !== userId);
        }
        ListController.saveLists();
      }
    }
  }
}

export default new CommentController();
