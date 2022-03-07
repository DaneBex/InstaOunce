from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        user_id = 3, post_id = 1, comment="Me and my family saw that in Alaska last year!"
    )

    db.session.add(comment1)


    db.session.commit()
