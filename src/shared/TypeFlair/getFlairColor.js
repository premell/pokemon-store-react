const getFlairColor = (type) => {
  let flairColor;
  switch (type) {
    case "normal":
      flairColor = "#A8A878";
      break;
    case "fire":
      flairColor = "#F08030";
      break;
    case "water":
      flairColor = "#6890F0";
      break;
    case "grass":
      flairColor = "#78C850";
      break;
    case "electric":
      flairColor = "#F8D030";
      break;
    case "ice":
      flairColor = "#98D8D8";
      break;
    case "fighting":
      flairColor = "#C03028";
      break;
    case "poison":
      flairColor = "#A040A0";
      break;
    case "ground":
      flairColor = "#E0C068";
      break;
    case "flying":
      flairColor = "#A890F0";
      break;
    case "psychic":
      flairColor = "#F85888";
      break;
    case "bug":
      flairColor = "#A8B820";
      break;
    case "rock":
      flairColor = "#B8A038";
      break;
    case "ghost":
      flairColor = "#705898";
      break;
    case "dark":
      flairColor = "#705848";
      break;
    case "dragon":
      flairColor = "#7038F8";
      break;
    case "steel":
      flairColor = "#B8B8D0";
      break;
    case "fairy":
      flairColor = "#F0B6BC";
      break;
    default:
      flairColor = "#808080";
  }
  return flairColor;
};

export default getFlairColor;
