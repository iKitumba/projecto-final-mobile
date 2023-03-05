import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { formatPeriodo } from "./formatPeriodo";

export const useHtmlToPrint = function ({ aluno, notas }) {
  let notasTableRows = "";
  let totalDeMedias = 0;

  for (let nota of notas) {
    notasTableRows += `
    <tr style="border: 1px solid black">
    <td style="border: 1px solid black; padding: 4px">${
      nota.disciplina.titulo.length <= 37
        ? nota.disciplina.titulo
        : nota.disciplina.diminuitivo
    }</td>
    <td style="border: 1px solid black; padding: 4px">${nota.nota_1}</td>
    <td style="border: 1px solid black; padding: 4px">${nota.nota_2}</td>
    <td style="border: 1px solid black; padding: 4px">${nota.nota_3}</td>
    <td style="border: 1px solid black; padding: 4px">${nota.media}</td>
  </tr>`;
    totalDeMedias += nota.media;
  }
  const mediaFinal = Math.round(totalDeMedias / notas.length);
  const date = format(new Date(), "'Aos' d ' De ' MMMM yyyy", {
    locale: pt,
  });

  return `<!DOCTYPE html>
  <html lang="pt">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Boletim</title>
    </head>
    <body
      style="margin: 0; padding: 0; box-sizing: border-box; font-family: serif"
    >
      <div
        style="
          width: 297.5px;
          height: 421px;
          background: rgb(255, 255, 255);
          display: flex;
          flex-direction: column;
          padding: 12px;
          border: 1px solid black;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 14px;
          "
        >
          <!-- <img src="./logo.svg" alt="" style="align-self: center" /> -->
          <div
            style="
              font-size: 14px;
              font-family: sans-serif;
              letter-spacing: 2px;
              font-weight: bold;
              align-self: center;
            "
          >
            <span style="color: #ee1943">IM</span
            ><span style="color: #e3d52c">TA</span
            ><span style="color: #1eafe4">TIC</span>
          </div>
          <p
            style="
              align-self: center;
              font-size: 8px;
              font-weight: normal;
              margin: 0 auto;
              text-transform: uppercase
            "
          >
            CURSO ${aluno.turma.curso.titulo}
          </p>
          <p
            style="
              align-self: center;
              font-size: 10px;
              font-weight: 300;
              margin: 0 auto;
              font-weight: normal;
            "
          >
            BOLETIM DE NOTAS
          </p>
        </div>
  
        <div style="display: flex; flex-direction: column; gap: 4px">
          <div style="font-size: 10px">
            <span>Nome:</span>
            <strong>${aluno.nome_completo}</strong>
          </div>
          <div style="font-size: 10px">
            <span>Classe:</span>
            <strong>${aluno.turma.classe}</strong>
  
            <span>Turno:</span>
            <strong>${formatPeriodo({ periodo: aluno.turma.turno })}</strong>
          </div>
        </div>
        <strong style="margin: 10px auto; font-size: 10px; align-self: center">${
          notas[0].trimestre
        } TRIMESTRE</strong> 
        <table style="border: 1px solid black; border-collapse: collapse">
          <thead
            style="
              border: 1px solid black;
              font-size: 8px;
              font-weight: bold;
              background: #ccc;
            "
          >
            <tr style="border: 1px solid black">
              <td style="border: 1px solid black; padding: 8px">DISCIPLINAS</td>
              <td style="border: 1px solid black; padding: 8px">MAC</td>
              <td style="border: 1px solid black; padding: 8px">NPP</td>
              <td style="border: 1px solid black; padding: 8px">PT</td>
              <td style="border: 1px solid black; padding: 8px">MT</td>
            </tr>
          </thead>
          <tbody style="border: 1px solid black; font-size: 8px">
          ${notasTableRows}

            <tr style="border: 1px solid black">
              <td style="border: 1px solid black; padding: 8px" colspan="5">
                <span
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <span style="font-size: 8px">${date}</span>
                  <span style="font-size: 10px">
                    <span>Média Final:</span>
                    <strong>${mediaFinal}</strong>
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
  
  `;
};
