from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    imageUrl = db.Column(db.Text, nullable=False)
    caption = db.Column(db.Text)

    user = db.relationship("User", back_populates="posts")
    likes = db.relationship("Like", back_populates="post", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "imageUrl": self.imageUrl,
            "caption": self.caption,
            "user_prof_pic": self.user.profile_pic,
            "user_prof_username": self.user.username,
            "user_id": self.user.id,
            "likes": len(self.likes),
            "likes_list": [like.to_dict() for like in self.likes],
            "comments": [comment.to_dict() for comment in self.comments],
        }
