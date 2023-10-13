/* Start of outer functions */
function convertNumbertoByte(n) {
  if (n < 0 || n > 255 || n % 1 !== 0) {
    throw new Error(n + " does not fit in a byte");
  }
  return ("000000000" + n.toString(2)).substr(-8);
}

function convertNumbertoBigByte(n) {
  if (n < 0 || n > 4294967296 || n % 1 !== 0) {
    throw new Error(n + " does not fit in a 4294967296");
  }
  return ("00000000000000000000000000000000" + n.toString(2)).substr(-32);
}

function convertStringToBit(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += ("000000000" + input[i].charCodeAt(0).toString(2)).substr(-8);
  }
  return output;
}

function convertByteToNumber(numBin) {
  return parseInt(numBin, 2);
}

function changeLastSignificantBit(sourceByte, changeBit) {
  if (sourceByte.length !== 8) throw new Error("This is not a valid byte!");
  if (changeBit === undefined) return sourceByte;
  return sourceByte.substr(0, 7) + changeBit;
}

function binaryToWords(str) {
  if (str.match(/[10]{8}/g)) {
    var wordFromBinary = str
      .match(/([10]{8}|\s+)/g)
      .map(function (fromBinary) {
        return String.fromCharCode(parseInt(fromBinary, 2));
      })
      .join("");
    return wordFromBinary;
  }
}

/* End of outer functions */
export default class Steganography {
  rawImage = [];
  constructor(context, img) {
    this.currentImg = img;
    this.imageContext = context;
    console.log("Steganography created with raw data. Dimensions", context);
  }

  CalculateByteSize() {
    if (this.currentImg) {
      return this.currentImg.width * this.currentImg.height * 3;
    } else {
      throw new Error(
        "Function requires an image! Please check your constructor"
      );
    }
  }

  HideDataInContext(content) {
    this.CreateRawDataFromContext();
    let data = this.EmbedTextInsideRawData(content);
    return { data: data, image: this.currentImg };
  }

  CreateRawDataFromContext() {
    let rawData = [];
    for (var c = 0; c < this.currentImg.width; c++) {
      let singleColumn = [];
      for (var r = 0; r < this.currentImg.height; r++) {
        let imageData = this.imageContext.getImageData(c, r, 1, 1).data;
        singleColumn.push(imageData);
      }
      rawData.push(singleColumn);
    }
    this.rawImage = rawData;
  }

  EmbedTextInsideRawData(content) {
    if (!this.rawImage)
      throw new Error("Please call CreateRawDataFromContext() first!");
    if (content.length * 8 > this.CalculateByteSize()) {
      throw new Error("Can't do the operation! Text is too big");
    }
    content = btoa(unescape(encodeURIComponent(content)));
    console.log("Content length", content.length);
    /*  We will reserve 4 bytes (32 bit) for message length */
    let countForHeader = convertNumbertoBigByte(content.length);
    let contentBinaryString = convertStringToBit(content);
    contentBinaryString = countForHeader + contentBinaryString;
    let ptr = 0;
    for (var c = 0; c < this.rawImage.length; c++) {
      for (var r = 0; r < this.rawImage[0].length; r++) {
        for (let i = 0; i < 3; i++) {
          let rD = this.rawImage[c][r][i];
          this.rawImage[c][r][i] = convertByteToNumber(
            changeLastSignificantBit(
              convertNumbertoByte(rD),
              contentBinaryString[ptr]
            )
          );
          ptr++;
        }
        if (ptr >= contentBinaryString.length) {
          return this.rawImage;
        }
      }
    }
  }

  GetHiddenContent() {
    let sizeHeader = "";
    for (var c = 0; c < this.currentImg.width; c++) {
      for (var r = 0; r < this.currentImg.height; r++) {
        let imageData = this.imageContext.getImageData(c, r, 1, 1).data;
        for (let i = 0; i < 3; i++) {
          sizeHeader += convertNumbertoByte(imageData[i]).slice(-1);
          if (sizeHeader.length === 32) break;
        }
        if (sizeHeader.length === 32) break;
      }
      if (sizeHeader.length === 32) break;
    }

    let messageCharCount = convertByteToNumber(sizeHeader);
    let trc = -32; // Last 4 bytes
    let contentInBits = "";
    for (c = 0; c < this.currentImg.width; c++) {
      for (r = 0; r < this.currentImg.height; r++) {
        let imageData = this.imageContext.getImageData(c, r, 1, 1).data;
        for (let i = 0; i < 3; i++) {
          contentInBits += convertNumbertoByte(imageData[i]).slice(-1);
          trc++;
          if (trc >= messageCharCount * 8) break;
        }
        if (trc >= messageCharCount * 8) break;
      }
      if (trc >= messageCharCount * 8) break;
    }
    let content = decodeURIComponent(
      escape(atob(binaryToWords(contentInBits.substr(32))))
    );
    return content;
  }
}
