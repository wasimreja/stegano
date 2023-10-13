import React from "react";

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      textValue: "",
    };
  }

  onInputHandler(event) {
    this.setState(
      { textValue: event.target.value },
      this.props?.onInput(event.target.value)
    );
  }

  render() {
    return (
      <div className="TextareaParent">
        <textarea
          maxLength={this.props.textMaxLength}
          className={
            this.props.isDisabled
              ? "InputTextArea TextDisabled"
              : "InputTextArea"
          }
          type="text"
          placeholder="Your Secret Message"
          value={this.state.textValue}
          onInput={this.onInputHandler.bind(this)}
        />
      </div>
    );
  }
}
