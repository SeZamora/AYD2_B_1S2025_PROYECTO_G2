import Navbar from '../../ui/componets/NavUsuario';
import { useEffect, useState } from 'react';
import { CardEmpleado } from './../../ui/CardEmpleado';

export const UsuarioLibros = () => {
  const [libros, setLibros] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [opinion, setOpinion] = useState({
    calificacion: '',
    comentario: '',
    fecha: '', 
    cuenta_id_cuenta: '', // Ahora es editable por el usuario
    libros_id_libro: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3000/book/getallbooks`)
      .then((response) => response.json())
      .then((data) => {
        setLibros(data.books);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const filteredLibros = libros.filter((libro) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      libro.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
      libro.autor.toLowerCase().includes(lowerCaseSearchTerm) ||
      libro.genero.toLowerCase().includes(lowerCaseSearchTerm) ||
      libro.precio.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openModal = (libroId) => {
    setOpinion({
      ...opinion,
      libros_id_libro: libroId,
      fecha: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOpinion({
      ...opinion,
      [name]: value
    });
  };

  const handleSubmitOpinion = () => {
    // Convierte la fecha al formato adecuado para la base de datos
    const date = new Date(opinion.fecha);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // '2025-03-22 00:10:12'
  
    const opinionToSend = {
      ...opinion,
      fecha: formattedDate, // Asigna la fecha con el formato correcto
      calificacion: parseInt(opinion.calificacion, 10), // Convierte a entero
      cuenta_id_cuenta: parseInt(opinion.cuenta_id_cuenta, 10), // Convierte a entero
    };
  
    console.log('Enviando reseña:', opinionToSend);  // Depuración: Verifica los datos enviados
    
    fetch('http://localhost:3000/book/addResenia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opinionToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);  // Depuración: Verifica la respuesta del servidor
        if (data.success) {
          alert(data.message);
          setIsModalOpen(false);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error al guardar la opinión:', error);
      });
  };
  
  

  return (
    <>
      <div className="h-16">
        <Navbar />
      </div>
      <div className="d-flex justify-content-center" style={{ height: '20%', marginTop: '100px' }}>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por título, autor, género o precio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <span className="search-icon">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
      <h1 className="md:text-6xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent tracking-wide py-4 mt-16">
        Libros
      </h1>
      <div className="mt-2 grid grid-cols-3 p-4 gap-4">
        {filteredLibros.map((libro) => (
          <CardEmpleado key={`libro-${libro.id_libro}`}>
            <h1 className="text-3xl font-bold text-center">{libro.titulo}</h1>
            <br />
            <div className="flex">
              <label className="text-xl font-bold mr-2">Autor:</label>
              <h1 className="text-xl">{libro.autor}</h1>
            </div>
            <div className="flex">
              <label className="text-xl font-bold mr-2">Precio:</label>
              <h1 className="text-xl">Q {libro.precio}</h1>
            </div>
            <div className="flex">
              <label className="text-xl font-bold mr-2">Stock:</label>
              <h1 className="text-xl">{libro.stock}</h1>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                onClick={() => openModal(libro.id_libro)} 
              >
                Comentar y Calificar
              </button>
            </div>
          </CardEmpleado>
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2>Agregar Opinión</h2>
            <label htmlFor="cuenta_id_cuenta">ID de Cuenta</label>
            <input
              type="number"
              id="cuenta_id_cuenta"
              name="cuenta_id_cuenta"
              value={opinion.cuenta_id_cuenta}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <label htmlFor="calificacion">Calificación</label>
            <input
              type="number"
              id="calificacion"
              name="calificacion"
              value={opinion.calificacion}
              onChange={handleInputChange}
              min="1"
              max="5"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <label htmlFor="comentario">Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              value={opinion.comentario}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                height: '100px',
                resize: 'none',
              }}
            ></textarea>
            <div>
              <button
                onClick={handleSubmitOpinion}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '10px',
                }}
              >
                Enviar Opinión
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsuarioLibros;
