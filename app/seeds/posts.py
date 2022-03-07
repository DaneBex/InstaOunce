from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id='2', imageUrl="https://i.natgeofe.com/n/d53dd4aa-56db-42b0-b17d-5bbef4f70fe8/narwhal.jpg", caption="Has anyone ever seen these things before?"
    )

    db.session.add(post1)


    db.session.commit()
