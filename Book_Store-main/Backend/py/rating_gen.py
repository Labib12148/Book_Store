import pandas as pd
import random

# List of ISBN numbers
isbn_numbers = [
    9781400000000, 9783150000000, 9780750000000, 9784860000000, 9787540000000,
    9784550000000, 9780551000000, 9780310000000, 9780751000000, 9780752000000,
    9780753000000, 9780754000000, 9780755000000, 9781550000000, 9785720000000,
    9780320000000, 9786550000000, 9787140000000, 9783680000000, 9786140000000,
    9785450000000, 9785140000000, 9785145000000, 9785740000000, 9780451000000,
    9786740000000, 9785860000000, 9780800000000, 9780720000000, 9780380000000,
    9780920000000, 9788160000000, 9780670000000, 9780350000000, 9780370000000,
    9781420000000, 9785310000000, 9789310000000, 9788680000000, 9785146000000,
    9781840000000, 9780140000000, 9788550000000, 9780450000000,
]

# List of User-IDs
user_names = [
    "Richard", "Stephanie", "Matthew", "Travis", "Mariah", "Stephen", "James", "Brittany", "Alexandra", "Elizabeth",
    "Jacqueline", "Jennifer", "Jason", "Melissa", "Jose", "Joseph", "Julia", "Vincent", "Donald", "Victor",
    "Billy", "Douglas", "Anthony", "Jessica", "Micheal", "Rebecca", "Andrew", "Christopher", "Chase", "Chelsea",
    "Tiffany", "Brian", "Valerie", "Cody", "David", "Anne", "Katie", "Laurie", "Ann", "Julia",
    "Donna", "Kevin", "Anna", "Steven", "Vincent", "Kathy", "Jennifer", "Kimberly", "Stephen", "David"

]

# Randomly generate ratings for each user and book
data = []
for user_names in user_names:
    selected_books = random.sample(isbn_numbers, 25)
    user_ratings = [random.choice([2, 2.5, 3, 3.5, 4, 4.5, 5]) for _ in range(20)]
    for isbn, rating in zip(selected_books, user_ratings):
        data.append([user_names, isbn, rating])

# Create a DataFrame
df = pd.DataFrame(data, columns=['User_Name', 'isbn', 'bookRating'])

# Save to CSV
df.to_csv('user_ratings.csv', index=False)
