import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocalState } from "../../hooks/useLocalState";
import { apiUrl } from "../../../assets/utils/index";
import MyModal from "../MyModal/MyModal";

import "./LaboCard.scss";

function LaboCard(props) {
  const { laboId, title, description, image, link, btnTxt, deleteTxt } = props;

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userType, setUserType] = useLocalState("", "userType");
  const [showModalLaboDeleted, setShowModalLaboDeleted] = useState(false);

  // Link al que redirigirá cada LaboCard
  const linkTo = link + laboId;
  
  const navigate = useNavigate(); // para redireccionar

  // DELETE LABOS
  async function handleDeleteLabo() {
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ labId: laboId, type: userType }),
    };
    const response = await fetch(`${apiUrl}/lab/deleteLab`, config);
    const data = await response.json();
    console.log("data: ", data);

    // Recargo la página
    window.location.reload()
  }

  return (
    <>
      <Card className="laboCard">
        <img src={image} alt={image} height="300"></img>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div>Labo ID: {laboId}</div>
          <Card.Text>{description}</Card.Text>
          <Link to={linkTo}>
            <Button variant="primary">{btnTxt}</Button>
          </Link>
          <span style={{padding: "10px"}}/>
          <Button 
            variant="danger" 
            onClick={() => setShowModalLaboDeleted(true)}
          >
            {deleteTxt}
          </Button>
        </Card.Body>
      </Card>
      <MyModal 
          show={showModalLaboDeleted} 
          setShow={setShowModalLaboDeleted} 
          title="¿Desea eliminar el laboratorio?"
          description={title}
          description2={`ID: ${laboId}`}
          handleClick={() => handleDeleteLabo()}
      />
    </>
  );
}

export default LaboCard;
