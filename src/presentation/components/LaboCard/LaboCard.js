import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";

import "./LaboCard.scss";

function LaboCard(props) {
  const { laboId, title, description, image, link, btnTxt, deleteTxt } = props;

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");

  // Link al que redirigirá cada LaboCard
  const linkTo = link + laboId;
  
  const navigate = useNavigate(); // para redireccionar

  const handleDeleteLab = async (event) =>{
    //TODO: En caso el profesor haya hecho clic, eliminar el lab
    //      En caso el estudiante haya hecho clic, retirarlo del lab
    console.log("Eliminando laboratorio");
    try {
      // let config = {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: laboId,
      // };

      // let res = await fetch(`${apiUrl}/deletelab`, config);
      // let data = await res.json();

      // console.log("data: ", data);
    }catch (error) {
      console.log(error);
    }
    navigate("/laboratories");
  }

  return (
    <Card className="laboCard">
      <img src={image} alt={image} height="300"></img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>Labo ID: {laboId}</div>
        <Card.Text>{description}</Card.Text>
        {/* Juan Diego, ¿Esta parte se puede borrar? */}

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
        <Button variant="danger" style={{margin:"10px"}} onClick={() => console.log("deleting")}>{deleteTxt}</Button>
      </Card.Body>
    </Card>
  );
}

export default LaboCard;
