import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { Label } from "../../ui/components";
import "react-toastify/dist/ReactToastify.css";

export const EditarPaciente = () => {
    const { pacienteId } = useParams();
    const navigate = useNavigate();

    const {
        nombre,
        apellido,
        cui,
        telefono,
        correo,
        edad,
        genero,
        fecha_ingreso,
        onInputChange,
        setFormState,
    } = useForm({
        nombre: "",
        apellido: "",
        cui: "",
        telefono: "",
        correo: "",
        edad: "",
        genero: "",
        fecha_ingreso: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/MediCare/patient/${pacienteId}`)
        .then((response) => response.json())
        .then((data) => {
            setFormState(data.paciente);
            console.log(data.paciente) // Carga los datos del paciente en el formulario
        })
        .catch((error) => console.error("Error al obtener el paciente:", error));
    }, [pacienteId, setFormState]);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const onEditSubmit = async (event) => {
        event.preventDefault();


        try {
        const response = await fetch(
            `http://localhost:3000/MediCare/updatepaciente/${pacienteId}`,
            {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre,
                apellido,
                cui,
                telefono,
                correo,
                edad
            }),
            }
        );

        if (response.ok) {
            notifySuccess("Paciente actualizado con éxito");
            setTimeout(() => navigate("/"), 1000); 
        } else {
            notifyError("Error al actualizar el paciente");
        }
        } catch (error) {
        notifyError("Error de conexión con el servidor");
        }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="bg-bg-200 max-w-md w-full p-10 rounded-md">
          <div className="flex justify-between mb-3">
            <h1 className="text-2xl font-bold">Editar Paciente</h1>
          </div>

          <form>
            <div className="flex items-center justify-center">
              <div className="flex flex-col mr-3">
                <Label htmlFor="nombre">Nombre:</Label>
                <input
                  type="text"
                  className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                  name="nombre"
                  value={nombre}
                  onChange={onInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="apellido">Apellido:</Label>
                <input
                  type="text"
                  className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                  name="apellido"
                  value={apellido}
                  onChange={onInputChange}
                  placeholder="Apellido"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col mr-3">
                <Label htmlFor="cui">CUI:</Label>
                <input
                  type="text"
                  className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                  name="cui"
                  value={cui}
                  onChange={onInputChange}
                  placeholder="CUI"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="telefono">Teléfono:</Label>
                <input
                  type="tel"
                  className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                  name="telefono"
                  value={telefono}
                  onChange={onInputChange}
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <Label htmlFor="email">Correo electrónico:</Label>
            <input
              type="email"
              className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
              name="email"
              value={correo}
              onChange={onInputChange}
              placeholder="example@mail.com"
            />

            <Label htmlFor="edad">Edad:</Label>
            <input
              type="number"
              className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
              name="edad"
              value={edad}
              onChange={onInputChange}
              placeholder="Edad"
            />


            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 hover:bg-primary200 rounded-md my-1 w-full text-text100 font-semibold"
                onClick={onEditSubmit}
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
