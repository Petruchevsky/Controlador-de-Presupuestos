import React, { useState } from "react";
import Mensaje from "./Mensaje";

function NuevoPresupuesto({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto <= 0) {
      setMensaje("No es un presupuesto válido");
      return;
    }
    setMensaje("");
    setIsValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" action="">
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>
          <input
            value={presupuesto}
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu Presupuesto"
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input onClick={handlePresupuesto} type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
}

export default NuevoPresupuesto;
