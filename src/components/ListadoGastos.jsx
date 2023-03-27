import React from "react";
import Gasto from "./Gasto";

function ListadoGastos({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) {
  return (
    <div className="listado-gastos contenedor">
      <h4>
        {" "}
        {gastos.length
          ? "Deslizar Hacia la Derecha para Editar, Izquierda para Eliminar"
          : ""}
      </h4>

      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos"
              : "No hay Gastos en Esta Categoría"}{" "}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2> {gastos.length ? "Gastos" : "No hay Gastos Aún"} </h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ListadoGastos;
