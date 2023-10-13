import React from "react";
import Button from "../components/Button";
import Steganography from "../helpers/Steganography";

export default class ImageDecrypt extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.steganObj = null;
    this.state = {
      isUploaded: false,
      hiddenText: "",
    };
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var self = this;
    var file = event.target.files[0];
    const canvas = this.canvasRef.current;
    var reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
          self.steganObj = new Steganography(context, img);
          let hiddenText = self.steganObj.GetHiddenContent();
          self.setState({ hiddenText: hiddenText, isUploaded: true });
        } catch (e) {
          self.setState({ haveError: true, isUploaded: true });
        }
      };
    };
    reader.readAsDataURL(file);
  }

  replaceURLWithHTMLLinks(text) {
    //eslint-disable-next-line
    var exp =
      /(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return { __html: text.replace(exp, "<a target='_blank' href='$1'>$1</a>") };
  }

  render() {
    let canvasStyle = this.state.isUploaded
      ? { height: "auto" }
      : { height: "0px" };
    return (
      <div className="CryptHolder">
        <h2>Decode Image</h2>
        <p>Upload your image to decode it.</p>
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
          <div className="HiddenText">
            Decoded message:{" "}
            <div
              className="HiddenTextContainer"
              dangerouslySetInnerHTML={this.replaceURLWithHTMLLinks(
                this.state.hiddenText
              )}
            ></div>{" "}
          </div>
        )}
        <Button
          text="Upload"
          size="big"
          onClick={() => {
            this.upload.click();
          }}
        ></Button>
        <subtitle>This can take a while if your image is too large.</subtitle>
        {this.state.haveError && (
          <div className="ErrorPanel">
            Oh! Something happened. It might be because your image is corrupted
            or we messed up something. Either way, you can't use this image.
          </div>
        )}
      </div>
    );
  }
}
