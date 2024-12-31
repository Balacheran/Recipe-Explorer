import React, { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ image, onCrop }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const cropper = new Cropper(imageElement, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      ready: function () {
        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
          onCrop(blob);
        }, 'image/jpeg');
      },
    });

    return () => {
      cropper.destroy();
    };
  }, [image, onCrop]);

  return <img ref={imageRef} src={URL.createObjectURL(image)} alt="Source" style={{ display: 'none' }} />;
};

export default ImageCropper;
