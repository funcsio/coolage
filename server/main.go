package main

import (
	"bytes"
	"coolage/validations"
	"fmt"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"log"
	"net/http"
	"os"
	"strconv"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
		fmt.Println("$PORT must be set", port)
	}
	http.HandleFunc("/", imageHandler)

	log.Println("Listening on " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}

func imageHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()

	var height uint64 = 10

	if val, ok := query["h"]; ok {
		convertedInt, _ := strconv.Atoi(val[0])
		height = validations.ValidateNumberUint64(uint64(convertedInt), 0, 10000)

	}

	var width uint64 = 10

	if val, ok := query["w"]; ok {
		convertedInt, _ := strconv.Atoi(val[0])
		width = validations.ValidateNumberUint64(uint64(convertedInt), 0, 10000)
	}

	var red uint8 = 0
	var green uint8 = 0
	var blue uint8 = 0
	var alpha uint8 = 255

	if val, ok := query["r"]; ok {
		convertedInt, _ := strconv.Atoi(val[0])
		red = uint8(validations.ValidateNumberUint64(uint64(convertedInt), 0, 255))
	}
	if val, ok := query["g"]; ok {

		convertedInt, _ := strconv.Atoi(val[0])
		green = uint8(validations.ValidateNumberUint64(uint64(convertedInt), 0, 255))
	}
	if val, ok := query["b"]; ok {

		convertedInt, _ := strconv.Atoi(val[0])
		blue = uint8(validations.ValidateNumberUint64(uint64(convertedInt), 0, 255))
	}
	if val, ok := query["a"]; ok {
		convertedInt, _ := strconv.Atoi(val[0])
		alpha = uint8(validations.ValidateNumberUint64(uint64(convertedInt), 0, 255))
	}

	// fmt.Println(height, width, red, green, blue, alpha)

	m := image.NewRGBA(image.Rect(0, 0, int(width), int(height)))
	userColor := color.RGBA{red, green, blue, alpha}
	// userColor := color.RGBA{0, 255, 0, 255}
	draw.Draw(m, m.Bounds(), &image.Uniform{userColor}, image.ZP, draw.Src)

	var img image.Image = m
	writeImage(w, &img)
}

// writeImage encodes an image 'img' in jpeg format and writes it into ResponseWriter.
func writeImage(w http.ResponseWriter, img *image.Image) {

	buffer := new(bytes.Buffer)
	if err := png.Encode(buffer, *img); err != nil {
		log.Println("unable to encode image.")
	}

	w.Header().Set("Content-Type", "image/png")
	w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
	if _, err := w.Write(buffer.Bytes()); err != nil {
		log.Println("unable to write image.")
	}
}
