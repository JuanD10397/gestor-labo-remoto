import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocalState } from "../../hooks/useLocalState";

import "./LaboCard.scss";

function LaboCard(props) {
  const { laboId, title, description, image, link, btnTxt } = props;

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  // Link al que redirigirá cada LaboCard
  const linkTo = link + laboId;

  return (
    <Card className="laboCard">
      <img src={image} alt={image} height="300"></img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>Labo ID: {laboId}</div>
        <Card.Text>{description}</Card.Text>
        {/* {userType === "teacher" ? (
          <Link to={`/laboratories/${laboId}`}>
            <Button variant="primary">Entrar</Button>
          </Link>
        ) : (
          userType === "student" && (
            <Link to={`/laboratories/${laboId}`}>
              <Button variant="primary">Entrar</Button>
            </Link>
          )
        )} */}
        <Link to={linkTo}>
          <Button variant="primary">{btnTxt}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default LaboCard;
