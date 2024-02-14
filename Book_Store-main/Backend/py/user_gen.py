import csv
from faker import Faker

def generate_fake_user():
    fake = Faker()
    first_name = fake.first_name()
    email = f"{first_name.lower()}{fake.random_number(digits=3)} @gmail.com"
    password = f"{first_name.lower()}{fake.random_number(digits=3)}"

    return first_name, email, password

def save_to_csv(users, filename='users.csv'):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['First_Name', 'Email', 'Password']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for user in users:
            writer.writerow({'First_Name': user[0], 'Email': user[1], 'Password': user[2]})

if __name__ == "__main__":
    num_users = 50

    fake_users = [generate_fake_user() for _ in range(num_users)]
    save_to_csv(fake_users)

    print(f"{num_users} fake users generated and saved to users.csv.")
