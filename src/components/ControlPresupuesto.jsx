import React, { useEffect, useState } from "react";
import {
  interpolateGreens,
  interpolateYlOrRd,
  interpolateOranges,
  interpolateReds,
} from "d3-scale-chromatic";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ControlPresupuesto({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos,
}) {
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    setGastado(totalGastado);

    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);

    const valorPorcentaje = ((totalDisponible * 100) / presupuesto).toFixed(0);
    setTimeout(() => {
      setPorcentaje(valorPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    const opciones = {
      style: "currency",
      currency: "CLP",
    };
    return Number(cantidad).toLocaleString("es-CL", opciones);
  };

  const getColor = (porcentaje) => {
    if (porcentaje >= 100) {
      return interpolateGreens(0.7);
    } else if (porcentaje >= 50) {
      return interpolateGreens(porcentaje / 130);
    } else if (porcentaje >= 30) {
      return interpolateYlOrRd(1 - porcentaje / 65);
    } else if (porcentaje >= 15) {
      return interpolateOranges(1 - porcentaje / 85);
    } else {
      return interpolateReds(1 - porcentaje / 40);
    }
  };
  const color = getColor(porcentaje);

  const handleReset = () => {
    const resultado = confirm(
      "¿Seguro que desear reiniciar Presupuesto y Gastos?"
    );
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            textColor: porcentaje < 0 ? "red" : color,
            fontWeight: "bold",
            pathColor: color,
          })}
          value={porcentaje}
          text={`Te Queda un ${porcentaje}%`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={handleReset}>
          Resetear App
        </button>

        <p>
          <span>Presupuesto: {""} </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""} `}>
          <span>Disponible:{""} </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:{""} </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;
