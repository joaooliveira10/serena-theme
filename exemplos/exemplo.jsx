import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import * as UI from "./ui";

const TAMANHOS = ["p", "m", "g"];

/** @param {{ titulo: string, itens?: string[] }} props */
export default function Painel({ titulo, itens = [], ...resto }) {
  const [aberto, setAberto] = useState(false);
  const total = itens.length;
  useEffect(() => {
    document.title = `${titulo} (${total})`;
  }, [titulo, total]);

  if (!itens.length) return <p className="vazio">Nada aqui</p>;

  return (
    <>
      <UI.Cabecalho nivel={2} {...resto} aria-label="cabeçalho" data-total={total}>
        {titulo}&nbsp;&amp; mais
      </UI.Cabecalho>
      <ul style={{ padding: 0, margin: "4px 0" }} hidden={!aberto}>
        {itens.map((item, i) => (
          <li key={item} onClick={() => setAberto((a) => !a)}>
            {i + 1}. {item} {aberto ? <strong>sim</strong> : null}
          </li>
        ))}
      </ul>
      <Fragment key="rodape">
        <svg:rect width="10" xlink:href="#a" />
        <input type="checkbox" checked={aberto} disabled />
      </Fragment>
      {/* comentário JSX */}
    </>
  );
}

Painel.propTypes = { titulo: PropTypes.string.isRequired };
