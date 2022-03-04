from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    imageUrl = db.Column(db.Text, nullable=False)
    caption = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "imageUrl": self.imageUrl,
            "caption": self.caption
        }
