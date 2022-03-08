from app.models import db, Post


def seed_posts():
    p1 = Post(
        user_id=1, imageUrl='https://images.unsplash.com/photo-1646282014691-620f9af448a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', caption='Iceberg straight ahead!')
    p2 = Post(
        user_id=1, imageUrl='https://images.unsplash.com/photo-1645904836022-17bf58ad21c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Morning fog')
    p3 = Post(
        user_id=1, imageUrl='https://images.unsplash.com/photo-1645037201328-de8b1b048993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Checkout the mountains')
    p4 = Post(
        user_id=2, imageUrl='https://images.unsplash.com/photo-1645651758223-32f82d99c43d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Somebody is going to die on this walk...')
    p5 = Post(
        user_id=2, imageUrl='https://images.unsplash.com/photo-1635176594802-47012d05932b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', caption='Moving at the speed of light')
    p6 = Post(
        user_id=3, imageUrl='https://images.unsplash.com/photo-1645027979535-e71366388599?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Let\'s go to the Paramount tonight')
    p7 = Post(
        user_id=3, imageUrl='https://images.unsplash.com/photo-1644929771938-44387fe50e66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fF9oYi1kbDRRLTRVfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Race you to the top!')
    p8 = Post(
        user_id=4, imageUrl='https://images.unsplash.com/photo-1630370447856-d0343305e234?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', caption='Breakfast for one.')
    p9 = Post(
        user_id=4, imageUrl='https://images.unsplash.com/photo-1644939160448-3e23e8e97b8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Lunchtime!')
    p10 = Post(
        user_id=5, imageUrl='https://images.unsplash.com/photo-1645382883577-e7a09cc1f014?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHJuU0tESHd3WVVrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='House')
    p11 = Post(
        user_id=5, imageUrl='https://images.unsplash.com/photo-1646361700146-855e94bb6ce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60', caption='Pick a taxi, any taxi.')
    p12 = Post(
        user_id=5, imageUrl='https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60', caption='Give us our treats human!')
    p13 = Post(
        user_id=6, imageUrl='https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='I can\'t figure out this bug.')
    p14 = Post(
        user_id=6, imageUrl='https://images.unsplash.com/photo-1646442412837-bd9683f90f93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', caption='Ocean waves')
    p15 = Post(
        user_id=7, imageUrl='https://images.unsplash.com/flagged/photo-1575597255483-55f2afb6f42c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', caption='Brooklyn Bridge')
    p16 = Post(
        user_id=7, imageUrl='https://images.unsplash.com/photo-1631899214712-f7afebed4a82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', caption='Get to the Vespa!')
    p17 = Post(
        user_id=7, imageUrl='https://images.unsplash.com/photo-1644867753999-ed8762236948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDkyfHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Very red bike')
    p18 = Post(
        user_id=4, imageUrl='https://images.unsplash.com/photo-1645894096014-51dddfdd027a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fENEd3V3WEpBYkV3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Creepy eyeball')
    p19 = Post(
        user_id=4, imageUrl='https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60', caption='My other car is a piece crap.')
    p20 = Post(
        user_id=5, imageUrl='https://images.unsplash.com/photo-1644447295446-19b7e712a895?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDYzfHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Burger time')


    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
