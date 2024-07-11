import React, { useEffect, useRef, useState } from "react";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import image1 from "../../assets/CarouselImages/to READIFY (1).png";
import image2 from "../../assets/CarouselImages/to READIFY (2).png";
import image3 from "../../assets/CarouselImages/to READIFY.png";

const images = [image1, image2, image3];

const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null); // Reference for autoplay

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    if (carouselContainer) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [carouselRef]);

  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${(images[currentImageIndex])})`,
    //  {images.map((image, index) => (
    //   <img key={index} src={image} alt={`Image ${index + 1} description`} />
    // ))}
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
  };

  return (
    <Box sx={{ position: "relative", marginBottom: "60px" }} ref={carouselRef}>
      <Card sx={{ maxWidth: 1024, maxHeight: 256 }}>
        <CardMedia
          component="img"
          image={(images[currentImageIndex])}
          alt="Carousel Image"
          style={backgroundImageStyle}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {images.map((_, index) => (
            <IconButton
              key={`${index}-${(images[index])}`}
              onClick={() => handleDotClick(index)}
            >
              <Box
                component="span"
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-color)",
                }}
              />
            </IconButton>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default ImageCarousel;
