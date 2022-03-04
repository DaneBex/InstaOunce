from .db import db

class FollowTable(db.Model):
    __tablename__ = 'follow_table'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    followingId = db.Column(db.Integer, db.ForeignKey("users.id") , nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "followingId": self.followingId
        }
