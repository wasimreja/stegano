<h1 align="center">Stegano</h1>

<p align="center">
	<a href="https://github.com/wasimreja/stegano/stargazers">
		<img alt="Stargazers" src="https://img.shields.io/github/stars/wasimreja/stegano?style=for-the-badge&color=C9CBFF&labelColor=302D41"></a>
	<a href="https://github.com/wasimreja/stegano/forks">
		<img alt="Releases" src="https://img.shields.io/github/forks/wasimreja/stegano?style=for-the-badge&&color=F2CDCD&&labelColor=302D41"/></a>
	<a href="https://github.com/wasimreja/stegano/issues">
		<img alt="Issues" src="https://img.shields.io/github/issues/wasimreja/stegano?style=for-the-badge&color=B5E8E0&labelColor=302D41"></a>
</p>

<p align="center">
Stegano is a steganography application which uses LSB Steganography to encode text into image files.
</p>

---

## 📝 Introduction

Steganography is the practice of concealing a secret message within an ordinary message or file, without anyone else being aware that there is a hidden message. The goal of steganography is to hide the existence of the message, so that it can be transmitted undetected. Unlike cryptography, which relies on encryption to make a message unreadable to anyone who doesn't have the key, steganography does not alter the message in any way. Instead, it hides the message within the data of another file, such as an image or audio file, by subtly changing certain bits of information. Steganography can be used for a variety of purposes, from covert communication to digital watermarking, and has been used throughout history in various forms.

Our steganography application provides a user-friendly interface for users to hide text messages inside images using the LSB technique. It also allows users to decode text from an encoded image to retrieve hidden messages.

## 🌱 Implementation

### Working Diagram
<img src="https://media.geeksforgeeks.org/wp-content/uploads/2-72.png">

### Encryption Algorithm
- Begin
- Input: Cover_Image, Secret_Message;
- Transfer Secret_Message into Text;
- Convert Text to Binary_Codes;
- Set BitsPerUnit to Zero;
- Encode Message to Binary_Codes;
- Add by 2 unit for bitsPerUnit;
- Output: Stego_Image;
- End

### Decryption Algorithm
- Begin
- Input: Stego_Image
- Calculate BitsPerUnit;
- Decode All_Binary_Codes;
- Shift by 2 unit for bitsPerUnit;
- Convert Binary_Codes to Text;
- Open Text;
- Output Secret_Message;
- End

## ✨ Features

- Hide text messages inside images using LSB steganography.
- Decode hidden text from an encoded image.
- Support for multiple image formats (e.g., PNG, JPEG).
- Intuitive and responsive user interface built with React JS.

## 🛠️ Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/wasimreja/stegano.git

# Go into the repository
$ cd stegano

# Install dependencies
$ npm install

# Run the app
$ npm start
```

---

<p align="center"><a href="https://github.com/wasimreja/stegano/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=302d41&colorB=b7bdf8"/></a></p>
