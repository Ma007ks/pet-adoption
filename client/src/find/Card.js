import React, { Component } from 'react';

class Card extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.text = props.info.name;
    this.state.age = props.info.age;
    this.state.sex = props.info.sex;
    this.state.bio = props.info.bio;
    this.state.photoId = props.info.photo;
    this.state.imageData = '';

    this.loadPhoto();
  }

  loadPhoto = () => {
    if (!this.state.photoId) {
      return;
    }

    fetch('/api/photo/' + this.state.photoId)
      .then((res) => res.json())
      .then((data) => {
        var base64Flag = 'data:' + data.img.contentType + ';base64,';
        var imageStr = this.arrayBufferToBase64(data.img.data.data);
        this.setState({ imageData: base64Flag + imageStr });
      })
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    let cardContent;

    let photoContent;
    if (this.state.imageData) {
      photoContent = (<img src={this.state.imageData} className="photo-box mb-2" alt=""></img>);
    }
    else {
      photoContent = '';
    }

    cardContent = (
      <div className="mb-3">
        {photoContent}
        <p className="card-text">
          Name: {this.state.text}
        </p>
        <p className="card-text">
          Sex: {this.state.sex}
        </p>
        <p className="card-text">
          Age: {this.state.age}
        </p>
        <p className="card-text">
          Bio: {this.state.bio}
        </p>
      </div>
    );


    let seeButton;

    seeButton = (<a href="#" onClick={() => { }} className="btn btn-outline-success task-save-button">Посмотреть</a>);

    return (
      <div className="col-md-5 col-lg-5" style={{ width: '25rem' }}>
        <div className="card">
          <div className="card-body col-xs-1" align="center">
            {cardContent}
            <div>
              {seeButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;