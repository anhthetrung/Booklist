package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"example/data_access"
)

// getAlbums responds with the list of all albums as JSON.
func getBooks(c *gin.Context) {
	var books []data_access.Book
	var err error
	books, err = data_access.AllBooks()
	if err != nil {
		fmt.Println("%v", err)
	}

	// c.JSON(200, books)
	c.IndentedJSON(http.StatusOK, books)
}

func getBookById(c *gin.Context) {
	id := c.Param("id")

	imagePath, err := data_access.GetBookById(id)
	if err != nil {
		log.Fatal(err)
	}

	c.File(imagePath)
}

func main() {

	router := gin.Default()

	router.GET("/books", getBooks)

	router.GET("/images/:id", getBookById)

	router.Run("172.20.10.2:8080")
}
