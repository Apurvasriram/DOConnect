import NavCard from "./NavCard";
import { cardDetails } from "../data";

const NavBoard = () => {
  return (
    <>
      {cardDetails.map((card, index) => (
        <NavCard
          key={index}
          title={card.title}
          body={card.body}
          buttonText={card.buttonText}
        />
      ))}
    </>
  );
};
export default NavBoard;
