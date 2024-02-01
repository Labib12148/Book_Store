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
user_ids = [
    128584, 14729, 73411, 43744, 130479, 31673, 203255, 195567, 49770, 18975,
    82308, 25444, 255885, 105346, 19247, 46433, 273574, 218866, 73085, 274134,
    145435, 123993, 147258, 88588, 179388, 20358, 62037, 105459, 146622, 193336,
    21080, 97555, 9474, 138758, 243451, 221382, 208040, 181717, 172815, 247342,
    56892, 117149, 270881, 193555, 251195, 102538, 49691, 201031, 275333, 171095,
]

# Randomly generate ratings for each user and book
data = []
for user_id in user_ids:
    selected_books = random.sample(isbn_numbers, 25)
    user_ratings = [random.choice([ 1, 2, 3, 4, 5]) for _ in range(25)]
    for isbn, rating in zip(selected_books, user_ratings):
        data.append([user_id, isbn, rating])

# Create a DataFrame
df = pd.DataFrame(data, columns=['User-ID', 'ISBN', 'Book-Rating'])

# Save to CSV
df.to_csv('user_ratings.csv', index=False)
