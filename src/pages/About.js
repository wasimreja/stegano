import React from "react";

export default class About extends React.Component {
  render() {
    return (
      <div className="AboutSection">
        <h2>About</h2>
        <h3>📝 Introduction</h3>
        <p>
          Steganography is the practice of concealing a secret message within an
          ordinary message or file, without anyone else being aware that there
          is a hidden message. The goal of steganography is to hide the
          existence of the message, so that it can be transmitted undetected.
          Unlike cryptography, which relies on encryption to make a message
          unreadable to anyone who doesn't have the key, steganography does not
          alter the message in any way. Instead, it hides the message within the
          data of another file, such as an image or audio file, by subtly
          changing certain bits of information. Steganography can be used for a
          variety of purposes, from covert communication to digital
          watermarking, and has been used throughout history in various forms.
          <br />
          <br />
          Our steganography application provides a user-friendly interface for
          users to hide text messages inside images using the LSB technique. It
          also allows users to decode text from an encoded image to retrieve
          hidden messages.
        </p>
        <h3>🌱 Implementation</h3>
        <p>
          The application converts the entire message to Base64 to avoid any
          conversion loss, then it converts it to bytes hence to its bits. Then,
          it gets each pixel, breaks each pixel into its channels (Red, Green,
          Blue and Alpha) and breaks down each channel into bits. Once this is
          done, rest is just replacing each bit with the message's bits.
          Depending on your image, this process can take a while. Once the
          process is completed, you can download the image.
        </p>
        <h3>✨ Features</h3>
        <p>
          <li>Hide text messages inside images using LSB steganography.</li>
          <li>Decode hidden text from an encoded image.</li>
          <li>Support for multiple image formats (e.g., PNG, JPEG).</li>
          <li>Intuitive and responsive user interface built with React JS.</li>
        </p>
      </div>
    );
  }
}
