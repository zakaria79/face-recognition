import React, { Component } from 'react';
import './ExpressionsRecognition.css';

class ExpressionsRecognition extends Component {
  constructor() {
    super();
    this.state = { video: null };
  }

  componentDidMount() {
    const video = document.getElementById('video');
    this.setState({ ...this.state, video });

    Promise.all([
      window.faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
      window.faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
      window.faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
      window.faceapi.nets.faceExpressionNet.loadFromUri('/weights'),
    ]).then(this.startVideo());

    video.addEventListener('play', () => {
      const canvas = window.faceapi.createCanvasFromMedia(video);
      document.getElementById('camera').append(canvas);
      const displaySize = {
        width: video.width,
        height: video.height,
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
  }

  startVideo = () => {
    window.navigator.getUserMedia(
      {
        video: {},
      },
      stream => (this.state.video.srcObject = stream),
      err => console.log(err),
    );
  };

  render() {
    return (
      <div className="ExpressionsRecognition">
        <h1>Reconnaissance des émotions</h1>
        <div
          id="camera"
          style={{
            margin: '0',
            padding: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <div>
            <video
              id="video"
              width={350}
              height={270}
              autoPlay
              muded="true"></video>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpressionsRecognition;
