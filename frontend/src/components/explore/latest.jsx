import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import "../explore/modal.scss";


const Latest = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/explore`);
        const sortedImages = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setImages(sortedImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await axios.get('/download', {
        params: { imageUrl },
        responseType: 'blob',
      });
  
      const blob = response.data;
      const blobUrl = URL.createObjectURL(blob);
      const filename = 'image.png';
  
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };
  
  return (
    <div className="main">
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.image_url} alt="All generated photos" onClick={() => handleImageClick(image)}/>
        </div>
      ))}


<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Image Modal"
  className="photo-details-modal"
  overlayClassName="custom-modal-overlay"
>
  {selectedImage && (
    <div>
      <img src={selectedImage.image_url} alt="All generated photos" />
      <br />
      <>
      <img src={require('../explore/download-icon.png')} alt="Download" 
      onClick={() => handleDownload(selectedImage.image_url)} className="download-icon"
        />
      </>
      <button className="photo-details-modal--close-button" type="button" onClick={closeModal} >
        <img src={require('../explore/close-icon.png')} alt="Close" />
      </button>
    </div>
  )}
</Modal>




    </div>
  );
};

export default Latest;
