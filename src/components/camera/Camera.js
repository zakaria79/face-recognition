import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const MyCamera = props => {
  const [uri, setUri] = useState(null);
  const [cam, setCam] = useState(false);
  const onTakePhoto = dataUri => {
    setUri(dataUri);
  };
  const handleCameraButton = e => {
    setCam(!cam);
  };
  return (
    <div className="Camera">
      <h1>Camera</h1>
      <div>
        <button onClick={handleCameraButton}>
          {cam ? 'Désactiver' : 'Activer'}
        </button>
      </div>
      {cam && (
        <div>
          {uri && (
            <div>
              <div style={{ width: '20%', margin: 'auto' }}>
                <img style={{ width: '100%' }} src={uri} alt="photo" />
                <div>
                  <a style={{ color: 'blue' }} href={uri} download="photo.png">
                    Télécharger
                  </a>
                </div>
              </div>
            </div>
          )}

          <div>
            <Camera
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              onTakePhoto={dataUri => onTakePhoto(dataUri)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCamera;
