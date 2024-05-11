-- CreateTable
CREATE TABLE "Catagory" (
    "catagory_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "catagory_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "book_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_title" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "buplish_date" DATETIME NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "unit_price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "author_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "account_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shipping" (
    "shipping_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street_no" TEXT NOT NULL,
    "building_no" INTEGER NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    CONSTRAINT "Shipping_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "UserAccount" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "bank_account_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" DECIMAL NOT NULL,
    "account_No" INTEGER NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    CONSTRAINT "BankAccount_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "UserAccount" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_quantity" INTEGER NOT NULL,
    "book_id_fk" INTEGER NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    CONSTRAINT "Order_book_id_fk_fkey" FOREIGN KEY ("book_id_fk") REFERENCES "Book" ("book_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "UserAccount" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookCatagory" (
    "book_catagory_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id_fk" INTEGER NOT NULL,
    "catagory_id_fk" INTEGER NOT NULL,
    CONSTRAINT "BookCatagory_book_id_fk_fkey" FOREIGN KEY ("book_id_fk") REFERENCES "Book" ("book_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookCatagory_catagory_id_fk_fkey" FOREIGN KEY ("catagory_id_fk") REFERENCES "Catagory" ("catagory_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookAuthor" (
    "book_author_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author_id_fk" INTEGER NOT NULL,
    "book_id_fk" INTEGER NOT NULL,
    CONSTRAINT "BookAuthor_book_id_fk_fkey" FOREIGN KEY ("book_id_fk") REFERENCES "Book" ("book_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookAuthor_author_id_fk_fkey" FOREIGN KEY ("author_id_fk") REFERENCES "Author" ("author_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
