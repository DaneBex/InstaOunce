from app.models import db, Like

def seed_likes():
    like1 = Like(
        user_id=1, post_id=1
    )
    like2 = Like(
        user_id=3, post_id=1
    )

    db.session.add(like1)
    db.session.add(like2)

    db.session.commit()
