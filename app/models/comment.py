from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    comment = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment": self.comment,
            "user_username": self.user.username,
            "user_prof_pic": self.user.profile_pic
        }
