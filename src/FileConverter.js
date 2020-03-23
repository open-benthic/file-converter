import React, { PureComponent } from "react";

class HomePage extends PureComponent {
  state = {
    base64: true,
    multipleFiles: false
  };

  _logger = e => {
    console.log(e);
  };

  handleFiles = event => {
    if (this.state.base64) {
      this.convertFilesToBase64(event.target.files);
    } else {
      this._logger(event.target.files);
    }
  };

  convertFilesToBase64 = files => {
    let ef = files;
    if (this.state.multipleFiles) {
      let files = { base64: [], fileList: ef };
      for (var i = 0, len = ef.length; i < len; i++) {
        let reader = new FileReader();
        let f = ef[i];
        reader.onloadend = e => {
          files.base64.push(reader.result);
          if (files.base64.length === ef.length) {
            this._logger(files);
          }
        };
        reader.readAsDataURL(f);
      }
    } else {
      let files = { base64: "", fileList: ef };
      let f = ef[0];
      let reader = new FileReader();
      reader.onloadend = e => {
        files.base64 = reader.result;
        this._logger(files);
      };
      reader.readAsDataURL(f);
    }
  };

  render() {
    return <input type="file" onChange={this.handleFiles} />;
  }
}

export default HomePage;
