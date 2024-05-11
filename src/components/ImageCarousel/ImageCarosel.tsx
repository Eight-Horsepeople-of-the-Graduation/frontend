import React, { useEffect, useRef, useState } from "react";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import { Images } from "../../Types/Images.types";
import { dummyImages } from "../../dummyData";

const ImageCarousel: React.FC<Images> = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null); // Reference for autoplay

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    if (carouselContainer) {
      // Move autoplay logic inside useEffect for controlled execution
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dummyImages.length);
      }, 3000); // Adjust interval as needed

      // Cleanup function to clear interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [carouselRef]); // Dependency on carouselRef

  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${dummyImages[currentImageIndex].url})`, // Template literal for string interpolation
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
  };

  return (
      <Box sx={{ position: "relative", marginBottom: "60px" }} ref={carouselRef}>
        <Card sx={{ maxWidth: 1024, maxHeight: 256 }}>
          <CardMedia
            component="img"
            image={dummyImages[currentImageIndex].url} // Access image URL using interface
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
            {dummyImages.map((_, index) => (
              <IconButton
                key={`${index}-${dummyImages[index].url}`} // Descriptive key
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
