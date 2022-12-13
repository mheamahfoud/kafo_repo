import React, { Component } from "react";
import RichTextEditor from "react-rte";

export default class MyStatefulEditor extends Component {
  value = RichTextEditor.createValueFromString(this.props.markup, "html");
  state = {
    value: this.value
  };

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
    return <RichTextEditor value={this.state.value} onChange={this.onChange}  />;
  }
}
