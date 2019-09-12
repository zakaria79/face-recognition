import React, { Component } from 'react';
import './ExpressionsRecognition.css';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

class ExpressionsRecognition extends Component {
  constructor() {
    super();
    this.state = {
      cam: false
    };
  }

  componentDidMount() {

    Promise.all([
      window.faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
      window.faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
      window.faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
      window.faceapi.nets.faceExpressionNet.loadFromUri('/weights'),
    ]).then(this.setState({cam: true}));


  }

  onCameraStart = () => {
    const video = document.querySelector('video');

    // if(true) return;

    if (!video) {
      return;
    }

    video.addEventListener('play', () => {
      const canvas = window.faceapi.createCanvasFromMedia(video);
      document.getElementById('camera2').append(canvas);
      const displaySize = {
        width: '640',
        height: '480',
      };
      window.faceapi.matchDimensions(canvas, displaySize);
      window.setInterval(async () => {
        const detections = await window.faceapi
          .detectAllFaces(video, new window.faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = window.faceapi.resizeResults(
          detections,
          displaySize,
        );
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        window.faceapi.draw.drawDetections(canvas, resizedDetections);
        window.faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        window.faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 1000);
    });
  };

  render() {
    return (
      <div id="camera2" className="ExpressionsRecognition">
        <h1>Reconnaissance des émotions</h1>
        {this.state.cam && (
            <Camera
              onCameraStart={this.onCameraStart}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              idealResolution = {{width: 640, height: 480}}
            />
        )}
      </div>
    );
  }
}

export default ExpressionsRecognition;
