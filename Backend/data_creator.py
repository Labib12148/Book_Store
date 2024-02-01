import pandas as pd

# Manually creating a dataset of top 50 best-selling books based on online research
# Note: This is a hypothetical dataset for demonstration purposes

data = {
    # Book Titles
    "bookTitle": [
        "A Tale of Two Cities", #1
        "The Little Prince", #2
        "Harry Potter and the Philosopher's Stone", #3
        "And Then There Were None", #4
        "Dream of the Red Chamber", #5
        "The Hobbit", #6
        "She: A History of Adventure", #7
        "The Da Vinci Code", #8
        "Harry Potter and the Chamber of Secrets", #9
        "Harry Potter and the Prisoner of Azkaban", #10
        "Harry Potter and the Goblet of Fire", #11
        "Harry Potter and the Order of the Phoenix", #12
        "Harry Potter and the Half-Blood Prince", #13
        "Harry Potter and the Deathly Hallows", #14
        "The Alchemist", #15
        "The Catcher in the Rye", #16
        "The Bridges of Madison County", #17
        "One Hundred Years of Solitude", #18
        "Lolita", #19
        "Heidi", #20
        "1984", #21
        "Anne of Green Gables", #22
        "Black Beauty", #23
        "The Name of the Rose", #24
        "The Eagle Has Landed", #25
        "Watership Down", #26
        "Charlotte's Web", #27
        "The Ginger Man", #28
        "The Tale of Peter Rabbit", #29
        "Jonathan Livingston Seagull", #30
        "A Message to Garcia", #31
        "To Kill a Mockingbird", #32
        "Flowers in the Attic", #33
        "Cosmos", #34
        "Sophie's World", #35
        "Angels & Demons", #36
        "Kane and Abel", #37
        "The Girl with the Dragon Tattoo", #38
        "Gone with the Wind", #39
        "The Great Gatsby", #40
        "Pride and Prejudice", #41
        "Jane Eyre", #42
        "Wuthering Heights", #43
        "Animal Farm" #44
    ],
    # Book Authors
    "bookAuthor": [
        "Charles Dickens", #1
        "Antoine de Saint-Exupery", #2
        "J. K. Rowling", #3
        "Agatha Christie", #4
        "Cao Xueqin", #5
        "J. R. R. Tolkien", #6
        "H. Rider Haggard", #7
        "Dan Brown", #8
        "J. K. Rowling", #9
        "J. K. Rowling", #10
        "J. K. Rowling", #11
        "J. K. Rowling", #12
        "J. K. Rowling", #13
        "J. K. Rowling", #14
        "Paulo Coelho", #15
        "J. D. Salinger", #16
        "Robert James Waller", #17
        "Gabriel García Márquez", #18
        "Vladimir Nabokov", #19
        "Johanna Spyri", #20
        "George Orwell", #21
        "Lucy Maud Montgomery", #22
        "Anna Sewell", #23
        "Umberto Eco", #24
        "Jack Higgins", #25
        "Richard Adams", #26
        "E. B. White", #27
        "J. P. Donleavy", #28
        "Beatrix Potter", #29
        "Richard Bach", #30
        "Eric Carle", #31
        "Elbert Hubbard", #32
        "Harper Lee", #33
        "V. C. Andrews", #34
        "Carl Sagan", #35
        "Jostein Gaarder", #36
        "Jeffrey Archer", #37
        "Stieg Larsson", #38
        "Margaret Mitchell", #39
        "F. Scott Fitzgerald", #40
        "Jane Austen", #41
        "Charlotte Brontë", #42
        "Emily Brontë", #43
        "George Orwell" #44
    ],

    "isbn": [
        "9781401493174",  #1 (A Tale of Two Cities)
        "9783150093199",  #2 (The Little Prince)
        "9780747532699",  #3 (Harry Potter and the Philosopher's Stone)
        "9780060809910",  #4 (And Then There Were None)
        "9787539948591",  #5 (Dream of the Red Chamber)
        "9780547928227",  #6 (The Hobbit)
        "9780554313403",  #7 (She: A History of Adventure)
        "9780307474278",  #8 (The Da Vinci Code)
        "9780747542162",  #9 (Harry Potter and the Chamber of Secrets)
        "9780747546290",  #10 (Harry Potter and the Prisoner of Azkaban)
        "9780747549550",  #11 (Harry Potter and the Goblet of Fire)
        "9780747551003",  #12 (Harry Potter and the Order of the Phoenix)
        "9780747581086",  #13 (Harry Potter and the Half-Blood Prince)
        "9780545010221",  #14 (Harry Potter and the Deathly Hallows)
        "9780722532934",  #15 (The Alchemist)
        "9780316769480",  #16 (The Catcher in the Rye)
        "9780553225310",  #17 (The Bridges of Madison County)
        "9780140239136",  #18 (One Hundred Years of Solitude)
        "9780679723165",  #19 (Lolita)
        "9780143106312",  #20 (Heidi)
        "9780452284234",  #21 (1984)
        "9780141321035",  #22 (Anne of Green Gables)
        "9780141321035",  #23 (Black Beauty)
        "9780743477116",  #24 (The Name of the Rose)
        "9780451203875",  #25 (The Eagle Has Landed)
        "9780743251344",  #26 (Watership Down)
        "9780061124952",  #27 (Charlotte's Web)
        "9780802130116",  #28 (The Ginger Man)
        "9780723247708",  #29 (The Tale of Peter Rabbit)
        "9780380005239",  #30 (Jonathan Livingston Seagull)
        "9780916884019",  #31 (A Message to Garcia)
        "9780061124952",  #32 (To Kill a Mockingbird)
        "9780671729414",  #33 (Flowers in the Attic)
        "9780345331359",  #34 (Cosmos)
        "9780374530716",  #35 (Sophie's World)
        "9781416524793",  #36 (Angels & Demons)
        "9780312429270",  #37 (Kane and Abel)
        "9780307949486",  #38 (The Girl with the Dragon Tattoo)
        "9780684830681",  #39 (Gone with the Wind)
        "9780140567669",  #40 (The Great Gatsby)
        "9781840228174",  #41 (Pride and Prejudice)
        "9780141439587",  #42 (Jane Eyre)
        "9780553212587",  #43 (Wuthering Heights)
        "9780451526342"   #44 (Animal Farm) 
    ],

        "year_Of_Publication": [
        1859,  #1 (A Tale of Two Cities)
        1943,  #2 (The Little Prince)
        1997,  #3 (Harry Potter and the Philosopher's Stone)
        1939,  #4 (And Then There Were None)
        1754,  #5 (Dream of the Red Chamber)
        1937,  #6 (The Hobbit)
        1887,  #7 (She: A History of Adventure)
        2003,  #8 (The Da Vinci Code)
        1998,  #9 (Harry Potter and the Chamber of Secrets)
        1999,  #10 (Harry Potter and the Prisoner of Azkaban)
        2000,  #11 (Harry Potter and the Goblet of Fire)
        2003,  #12 (Harry Potter and the Order of the Phoenix)
        2005,  #13 (Harry Potter and the Half-Blood Prince)
        2007,  #14 (Harry Potter and the Deathly Hallows)
        1988,  #15 (The Alchemist)
        1951,  #16 (The Catcher in the Rye)
        1992,  #17 (The Bridges of Madison County)
        1967,  #18 (One Hundred Years of Solitude)
        1955,  #19 (Lolita)
        1881,  #20 (Heidi)
        1949,  #21 (1984)
        1908,  #22 (Anne of Green Gables)
        1877,  #23 (Black Beauty)
        1980,  #24 (The Name of the Rose)
        1975,  #25 (The Eagle Has Landed)
        1972,  #26 (Watership Down)
        1952,  #27 (Charlotte's Web)
        1954,  #28 (The Ginger Man)
        1902,  #29 (The Tale of Peter Rabbit)
        1970,  #30 (Jonathan Livingston Seagull)
        1899,  #31 (A Message to Garcia)
        1960,  #32 (To Kill a Mockingbird)
        1979,  #33 (Flowers in the Attic)
        1980,  #34 (Cosmos)
        1991,  #35 (Sophie's World)
        2000,  #36 (Angels & Demons)
        1979,  #37 (Kane and Abel)
        2005,  #38 (The Girl with the Dragon Tattoo)
        1936,  #39 (Gone with the Wind)
        1925,  #40 (The Great Gatsby)
        1813,  #41 (Pride and Prejudice)
        1847,  #42 (Jane Eyre)
        1847,  #43 (Wuthering Heights)
        1945   #44 (Animal Farm)
    
    ], 
    "publisher" : [
        "Chapman & Hall", #1 (A Tale of Two Cities)
        "Reynal & Hitchcock", #2 (The Little Prince)
        "Bloomsbury", #3 (Harry Potter and the Philosopher's Stone)
        "Collins Crime Club", #4 (And Then There Were None)
        "Red Chamber", #5 (Dream of the Red Chamber)
        "Allen & Unwin", #6 (The Hobbit)
        "Longmans", #7 (She: A History of Adventure)
        "Doubleday", #8 (The Da Vinci Code)
        "Bloomsbury", #9 (Harry Potter and the Chamber of Secrets)
        "Bloomsbury", #10 (Harry Potter and the Prisoner of Azkaban)
        "Bloomsbury", #11 (Harry Potter and the Goblet of Fire)
        "Bloomsbury", #12 (Harry Potter and the Order of the Phoenix)
        "Bloomsbury", #13 (Harry Potter and the Half-Blood Prince)
        "Bloomsbury", #14 (Harry Potter and the Deathly Hallows)
        "HarperCollins", #15 (The Alchemist)
        "Little, Brown", #16 (The Catcher in the Rye)
        "Warner Books", #17 (The Bridges of Madison County)
        "Harper & Row", #18 (One Hundred Years of Solitude)
        "Olympia Press", #19 (Lolita)
        "Gotha: Perthes", #20 (Heidi)
        "Pocket Books", #21 (1984)
        "Secker & Warburg", #22 (Anne of Green Gables)
        "Jarrold & Sons", #23 (Black Beauty)
        "Bompiani", #24 (The Name of the Rose)
        "Collins", #25 (The Eagle Has Landed)
        "Rex Collings", #26 (Watership Down)
        "Macmillan", #27 (Charlotte's Web)
        "Harper & Brothers", #28 (The Ginger Man)
        "Olympia Press", #29 (The Tale of Peter Rabbit)
        "Frederick Warne & Co", #30 (Jonathan Livingston Seagull)
        "Philomel Books", #31 (A Message to Garcia)
        "Roycrofters", #32 (To Kill a Mockingbird)
        "J. B. Lippincott & Co.", #33 (Flowers in the Attic)
        "Simon & Schuster", #34 (Cosmos)
        "Random House", #35 (Sophie's World)
        "Berlingske", #36 (Angels & Demons)
        "Pocket Books", #37 (Kane and Abel)
        "Works Publishing", #38 (The Girl with the Dragon Tattoo)
        "Hodder & Stoughton", #39 (Gone with the Wind)
        "Norstedts Förlag", #40 (The Great Gatsby)
        "Macmillan Publishers", #41 (Pride and Prejudice)
        "Little, Brown", #42 (Jane Eyre)
        "Secker & Warburg", #43 (Wuthering Heights)
        "Charles Scribner's Sons" #44 (Animal Farm)

    ],
"imageUrlM": [
    "https://m.media-amazon.com/images/I/81mdfotgQyL._SL1500_.jpg", #1 (A Tale of Two Cities)
    "https://m.media-amazon.com/images/I/41Su1GeNc8L._SL1500_.jpg", #2 (The Little Prince)
    "https://m.media-amazon.com/images/I/81Vuk+qsXRL._SL1500_.jpg", #3 (Harry Potter and the Philosopher's Stone)
    "https://m.media-amazon.com/images/I/71D92Fx-zvL._SL1500_.jpg", #4 (And Then There Were None)
    "https://m.media-amazon.com/images/I/818uRo-OE0L._SL1500_.jpg", #5 (Dream of the Red Chamber)
    "https://m.media-amazon.com/images/I/71UZKQ3-wCL._SL1500_.jpg", #6 (The Hobbit)
    "https://m.media-amazon.com/images/I/81lqijBVAyL._SL1500_.jpg", #7 (She: A History of Adventure)
    "https://m.media-amazon.com/images/I/815WORuYMML._SL1500_.jpg", #8 (The Da Vinci Code)
    "https://m.media-amazon.com/images/I/A15suNB9arL._SL1500_.jpg", #9 (Harry Potter and the Chamber of Secrets)
    "https://m.media-amazon.com/images/I/81MO-eLWljL._SL1500_.jpg", #10 (Harry Potter and the Prisoner of Azkaban)
    "https://m.media-amazon.com/images/I/81oDIELFcYL._SL1500_.jpg", #11 (Harry Potter and the Goblet of Fire)
    "https://m.media-amazon.com/images/I/81mJvVbhiYL._SL1500_.jpg", #12 (Harry Potter and the Order of the Phoenix)
    "https://m.media-amazon.com/images/I/81Lzfv+0aKL._SL1500_.jpg", #13 (Harry Potter and the Half-Blood Prince)
    "https://m.media-amazon.com/images/I/81RL6mNsSkL._SL1500_.jpg", #14 (Harry Potter and the Deathly Hallows)
    "https://m.media-amazon.com/images/I/41-dcStCV6L._SL1500_.jpg", #15 (The Alchemist)
    "https://m.media-amazon.com/images/I/71nXPGovoTL._SL1500_.jpg", #16 (The Catcher in the Rye)
    "https://m.media-amazon.com/images/I/81rpCuu7zVL._SL1500_.jpg", #17 (The Bridges of Madison County)
    "https://m.media-amazon.com/images/I/71IWwBoDNsL._SL1500_.jpg", #18 (One Hundred Years of Solitude)
    "https://m.media-amazon.com/images/I/51ngYPvLibL._SL1500_.jpg", #19 (Lolita)
    "https://m.media-amazon.com/images/I/51vFTRHtooL._SL1500_.jpg", #20 (Heidi)
    "https://m.media-amazon.com/images/I/71sOSrd+JxL._SL1500_.jpg", #21 (1984)
    "https://m.media-amazon.com/images/I/61dh-HpnYPL._SL1500_.jpg", #22 (Anne of Green Gables)
    "https://m.media-amazon.com/images/I/51UwrM6U7iS._SL1500_.jpg", #23 (Black Beauty)
    "https://m.media-amazon.com/images/I/819SFV6rfRL._SL1500_.jpg", #24 (The Name of the Rose)
    "https://m.media-amazon.com/images/I/91MVxKz67RL._SL1500_.jpg", #25 (The Eagle Has Landed)
    "https://m.media-amazon.com/images/I/81rvh0Dna0L._SL1500_.jpg", #26 (Watership Down)
    "https://m.media-amazon.com/images/I/51bVa2D5ReL._SL1500_.jpg", #27 (Charlotte's Web)
    "https://m.media-amazon.com/images/I/61GlwiuTRnL._SL1500_.jpg", #28 (The Ginger Man)
    "https://m.media-amazon.com/images/I/61ASCNFMAlL._SL1500_.jpg", #29 (The Tale of Peter Rabbit)
    "https://m.media-amazon.com/images/I/71Nomlj8kCL._SL1500_.jpg", #30 (Jonathan Livingston Seagull)
    "https://m.media-amazon.com/images/I/5171SP0MZVL._SL1500_.jpg", #31 (A Message to Garcia)
    "https://m.media-amazon.com/images/I/81aY1lxk+9L._SL1500_.jpg", #32 (To Kill a Mockingbird)
    "https://m.media-amazon.com/images/I/81Yh6Lz3nPL._SL1500_.jpg", #33 (Flowers in the Attic)
    "https://m.media-amazon.com/images/I/91Cnrbd3JwL._SL1500_.jpg", #34 (Cosmos)
    "https://m.media-amazon.com/images/I/61i85x-cGSL._SL1000_.jpg", #35 (Sophie's World)
    "https://m.media-amazon.com/images/I/71U17PxlH7L._SL1500_.jpg", #36 (Angels & Demons)
    "https://m.media-amazon.com/images/I/81A+Ft0bakL._SL1500_.jpg", #37 (Kane and Abel)
    "https://m.media-amazon.com/images/I/61Qs-hoZ-TL._SL1500_.jpg", #38 (The Girl with the Dragon Tattoo)
    "https://m.media-amazon.com/images/I/818AlgMAMXL._SL1500_.jpg", #39 (Gone with the Wind)
    "https://m.media-amazon.com/images/I/71uyfT7RfFL._SL1500_.jpg", #40 (The Great Gatsby)
    "https://m.media-amazon.com/images/I/71+NGGc4GmS._SL1500_.jpg", #41 (Pride and Prejudice)
    "https://m.media-amazon.com/images/I/91zU70Aw9IS._SL1500_.jpg", #42 (Jane Eyre)
    "https://m.media-amazon.com/images/I/81unikMK30L._SL1500_.jpg", #43 (Wuthering Heights)
    "https://m.media-amazon.com/images/I/71je3-DsQEL._SL1500_.jpg"  #44 (Animal Farm)
]


}


# Creating a DataFrame
df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
csv_file_path = "C:/Users/labib/OneDrive/Desktop/Website/Project_1/RandomWebsite/Backend/best_selling_books.csv"
df.to_csv(csv_file_path, index=False)

csv_file_path
