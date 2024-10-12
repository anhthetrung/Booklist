package data_access

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

type Book struct {
	Name   string `json:"name"`
	Author string `json:"author"`
	ID     string `json:"id"`
}

func ConnectToDatabase() {
	// Capture connection properties.
	cfg := mysql.Config{
		// User:   os.Getenv("DBUSER"),
		// Passwd: os.Getenv("DBPASS"),
		User:   "root",
		Passwd: "0123456789@aA",
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "booklists",
	}
	// Get a database handle.
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
}

func AllBooks() ([]Book, error) {
	ConnectToDatabase()
	defer db.Close()

	rows, err := db.Query("SELECT id,name,author FROM books")
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.

	var books []Book
	for rows.Next() {
		var book Book
		if err := rows.Scan(&book.ID, &book.Name, &book.Author); err != nil {
			return nil, fmt.Errorf("%v", err)
		}
		books = append(books, book)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("%v", err)
	}
	return books, nil
}

func GetBookById(id string) (string, error) {
	ConnectToDatabase()
	defer db.Close()

	var image string

	row := db.QueryRow("SELECT imagePath FROM books WHERE id = ?", id)
	if err := row.Scan(&image); err != nil {
		if err == sql.ErrNoRows {
			return image, fmt.Errorf("bookById %v: no such book", id)
		}
		return image, fmt.Errorf("bookById %v: %v", id, err)
	}
	fmt.Println(image)
	return image, nil
}
