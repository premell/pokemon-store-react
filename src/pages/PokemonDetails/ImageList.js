import "./PokemonDetails.css";
const ImageList = ({ images, currentImage, setPrimaryImage }) => {

  return (
    <div className="main_container_image_list">
      {images.map((image) => (
        <div
          className={`${currentImage.name === image.name ? "focused_image_list" : ""
            } image_card_image_list`}
        >
          <img
            onClick={() => setPrimaryImage(image)}
            className="small_image_image_list"
            src={image.url}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
