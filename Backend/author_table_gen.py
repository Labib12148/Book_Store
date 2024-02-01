import csv

# List of authors
authors = [
    "Charles Dickens", "Antoine de Saint-Exupery", "J. K. Rowling", "Agatha Christie", 
    "Cao Xueqin", "J. R. R. Tolkien", "H. Rider Haggard", "Dan Brown", 
    "J. K. Rowling", "J. K. Rowling", "J. K. Rowling", "J. K. Rowling", "J. K. Rowling", "J. K. Rowling", 
    "Paulo Coelho", "J. D. Salinger", "Robert James Waller", "Gabriel GarcÃ­a MÃ¡rquez", 
    "Vladimir Nabokov", "Johanna Spyri", "George Orwell", "Lucy Maud Montgomery", 
    "Anna Sewell", "Umberto Eco", "Jack Higgins", "Richard Adams", 
    "E. B. White", "J. P. Donleavy", "Beatrix Potter", "Richard Bach", "Eric Carle", 
    "Elbert Hubbard", "Harper Lee", "V. C. Andrews", "Carl Sagan", 
    "Jostein Gaarder", "Jeffrey Archer", "Stieg Larsson", "Margaret Mitchell", 
    "F. Scott Fitzgerald", "Jane Austen", "Charlotte BrontÃ«", "Emily BrontÃ«", 
    "George Orwell"
]

# Remove duplicates and create a set
unique_authors = set(authors)

# Generate unique IDs for each author
author_ids = {author: f"A{idx + 1:03}" for idx, author in enumerate(unique_authors)}

# Write to CSV
csv_file = 'unique_authors_with_ids.csv'
with open(csv_file, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["authorId", "bookAuthor"])  # Write header
    writer.writerows([[author_ids[author], author] for author in unique_authors])  # Write unique authors with IDs

print(f"Unique authors with IDs written to {csv_file}")
