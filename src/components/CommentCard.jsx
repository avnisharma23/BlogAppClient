function CommentCard({ OwnerId, comment }) {
  
    return (
      <div>
         <h4 className="comment commentName">{OwnerId.firstName}</h4>
        <p className="comment">{comment}</p>
        <br/>
      </div>
    );
  }
   
  export default CommentCard;