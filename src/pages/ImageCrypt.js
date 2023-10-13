import React from "react";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import canvasToImage from "canvas-to-image";
import Steganography from "../helpers/Steganography";

export default class ImageCrypt extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.steganObj = null;
    this.state = {
      isUploaded: false,
      maxCharCount: 100,
      disableTextarea: false,
      userContent: "",
    };
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var self = this;
    var file = event.target.files[0];
    const canvas = this.canvasRef.current;
    var reader = new FileReader();
    // Reader loaded
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      // Image loaded
      img.onload = () => {
        // Resize canvas with image
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0); // Draw image to make it visible
        self.setState({ isLoading: true }, () => {
          self.steganObj = new Steganography(context, img); // Init your Steganography object
          let charSizeMax = self.steganObj.CalculateByteSize(); // Calculate bytes
          // Beware. We are using base64 to avoid issues with UTF8 chars. This adds up 1.37 times more size. We are calculation that
          self.setState({
            maxCharCount: Math.floor(charSizeMax / (8 * 1.37)),
            isUploaded: true,
            isLoading: false,
          });
        });
      };
    };
    reader.readAsDataURL(file);
  }

  // This is the heavy-work function. It interacts with Stegan object.
  saveCanvas() {
    var self = this;
    self.setState({ isLoading: true }, () => {
      // TODO: Turn this into a worker function so that it won't block UI. Or.. well.. upload it to server or something
      let resObj = this.steganObj.HideDataInContext(this.state.userContent);
      const canvasSave = this.canvasRef.current;
      const context = canvasSave.getContext("2d");
      for (var c = 0; c < resObj.image.width; c++) {
        for (var r = 0; r < resObj.image.height; r++) {
          context.putImageData(new ImageData(resObj.data[c][r], 1, 1), c, r); // We want to save this to canvas again. So that we can do stuff.
        }
      }
      canvasToImage(canvasSave, {
        name: "ImageCrypted",
        type: "png",
        quality: 1,
      });
      self.setState({ isLoading: false, disableTextarea: true });
    });
  }

  onTextInputChange(text) {
    this.setState({ userContent: text });
  }

  render() {
    let canvasStyle = this.state.isUploaded
      ? { height: "auto" }
      : { height: "0px" };

    return (
      <div className="CryptHolder">
        <h2>Encode Image</h2>
        <p>Upload your image to hide text in it.</p>

        {this.state.isUploaded && (
          <Button
            size="big"
            text="Reupload"
            onClick={() => {
              this.upload.click();
            }}
          ></Button>
        )}
        {!this.state.isUploaded && (
          <Button
            size="big"
            text="Upload"
            onClick={() => {
              this.upload.click();
            }}
          ></Button>
        )}
        <canvas
          className="ImageCanvas"
          ref={this.canvasRef}
          style={canvasStyle}
        />
        <input
          id="fileUploadInput"
          type="file"
          accept="image/png, image/jpeg"
          ref={(ref) => (this.upload = ref)}
          style={{ display: "none" }}
          onChange={this.onChangeFile.bind(this)}
        />
        {this.state.isUploaded && (
          <span style={{ display: "contents" }}>
            <TextArea
              isDisabled={this.state.disableTextarea}
              textMaxLength={this.state.maxCharCount}
              onInput={this.onTextInputChange.bind(this)}
            />
            <Button
              text="Download"
              secondary
              onClick={() => {
                this.saveCanvas();
              }}
            ></Button>
            <subtitle>
              This can take a while if your image is too large.
            </subtitle>
          </span>
        )}
      </div>
    );
  }
}
