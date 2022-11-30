import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./LaboCard.scss";

function LaboCard(props) {
  const { laboId, title, description, image } = props;

  return (
    <Card className="laboCard">
      <img src={image} alt={image} height="300"></img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>Labo ID {laboId}</div>
        <Link to={`/laboratories/${laboId}`}>
          <Button variant="primary">Entrar</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default LaboCard;
