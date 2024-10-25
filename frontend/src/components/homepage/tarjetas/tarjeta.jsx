import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Tarjeta.css'

function Tarjeta({datos}) {
  return (
    <Card style={{ width: '18rem',backgroundColor:datos.fondo }} className='tarjeta-homepage tarjeta'>
      <Card.Img variant="top" src={datos.img} style={{ display:datos.display }} />
      <Card.Body>
        <Card.Title style={{color:datos.colorTexto }}>{datos.titulo}</Card.Title>
        <Card.Text style={{color:datos.colorTexto }}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" >{datos.boton}</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;