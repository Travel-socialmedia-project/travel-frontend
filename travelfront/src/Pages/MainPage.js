import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

function MainPage() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg'
        alt='...'
      >
        <h5>Welcome to Travel Social</h5>
        <p>looking to share your unforgettable travel experiences with loved ones? Build a digital travel album to showcase your adventures and relive your favorite moments. </p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
        alt='...'
      >
        <h5>Login and join your friends</h5>
        <p>By tagging that special in your collecion, give them acess to upload and download photos from that memorable travel </p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg'
        alt='...'
      >
        <h5>Upload Photos</h5>
        <p> And don't forget to give credit to the travel agency that provided you with the best experience</p>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}
export default MainPage;
