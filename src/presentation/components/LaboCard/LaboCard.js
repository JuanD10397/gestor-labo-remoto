import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocalState } from "../../hooks/useLocalStorage";

import "./LaboCard.scss";

function LaboCard(props) {
  const { laboId, title, description, image } = props;

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  return (
    <Card className="laboCard">
      <img src={image} alt={image} height="300"></img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>Labo ID {laboId}</div>
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
        <Link to={`/laboratories/${laboId}`}>
          <Button variant="primary">Entrar</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default LaboCard;
