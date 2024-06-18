var objetivos = [
  "Verificar a regular utilização de DMIs em cirurgias de coluna vertebral pelos prestadores do SUS.",
  "Verificar a implementação da Política Nacional de Atenção ao Portador de Doença Renal.",
  "Avaliar a eficiência do Hospital Sol e Lua em relação ao referencial básico de auditoria sobre eficiência hospitalar.",
  "Verificar a regularidade da execução do Programa Farmácia Popular do Brasil/PFPB.",
  "Avaliar as medidas implementadas pelo Gestor e o aprimoramento dos serviços no tratamento oncológico.",
  "Verificar o cumprimento das diretrizes da Política Nacional de Atenção Básica (Hipertensão/Diabetes).",
  "Avaliar a gestão e funcionamento do SAMU 192.",
];

var questoes = [
  "Houve cobrança irregular de OPME-DMI em cirurgias de coluna vertebral realizadas no Hospital Sol e Lua no período de 2012 a 2017?",
  "O gestor Estadual cumpre as responsabilidades previstas na Assistência Farmacêutica para garantir os medicamentos ao portador de DRC, em estágios 4 e 5?",
  "O Hospital Sol e Lua, no período de janeiro a dezembro de 2022, trabalhou a alta hospitalar com garantia da contrarreferência para a rede, de acordo com os protocolos assistenciais e diretrizes do Núcleo Interno de Regulação?",
  "Há compatibilidade no quantitativo entre as aquisições e as dispensações de medicamentos e/ou correlatos pela farmácia no período de janeiro a dezembro de 2023?",
  "Os estabelecimentos de saúde habilitados para a assistência de alta complexidade em oncologia têm respondido em tempo hábil a necessidade de tratamento dos pacientes diagnosticados com neoplasia maligna?",
  "As ações desenvolvidas pela SMS em relação à atenção aos hipertensos e diabéticos atendem as diretrizes (acesso, integralidade, coordenação do cuidado, longitudinalidade e estímulo à participação do usuário) da PNAB?",
  "A gestão financeira dos recursos destinados ao custeio do SAMU 192, no período de janeiro a dezembro de 2022, está sendo realizada corretamente com relação à execução dos recursos, cumprimento das contrapartidas estadual e municipal e prestação de contas?",
];

function printRows() {
  let obj_tds = [];
  let qst_tds = [];

  objetivos.forEach(function (v, i) {
    obj_tds.push(
      `
            <td>
                <div class="card card-1 card-obj" id="cardObj${i}" data-value="${i}">
                    <div class="card-body">
                        ${v}
                    </div>
                </div>
            </td>
            `
    );
  });

  obj_tds = obj_tds.sort(() => Math.random() - 0.5);

  questoes.forEach(function (v, i) {
    qst_tds.push(
      `
            <tr>
                ${obj_tds[i]}
                <td>
                    <div class="card card-2 qst-slot" data-value="" data-obj="">

                    </div>
                </td>
                <td>
                    <div class="card card-3" >
                        <div class="card-body">
                           ${v}
                        </div>
                    </div>
                </td>
            </tr>
            `
    );
  });

  $("tbody").html(qst_tds);

  $(".card-obj").draggable();

  $(".qst-slot").droppable({
    accept: ".card-obj",
    tolerance: "pointer",
    drop: function (event, ui) {
      if (!$(this).hasClass("qst-slot-filled")) {
        $(this).addClass("qst-slot-filled");
        ui.draggable.addClass("card-obj-filled");
      }

      let pos = $(this).offset();

      let wdt = $(this).width();

      ui.draggable.addClass("dragged");

      let id = ui.draggable.attr("id");
      $(this).attr("data-obj", "#" + id);
      $(this).attr("data-value", ui.draggable.data("value"));

      ui.draggable.css({
        top: pos.top + "px",
        left: pos.left + "px",
        width: wdt + "px"
      });
    },

    out: function (event, ui) {
      if ($(this).hasClass("qst-slot-filled")) {
        let drag_id = "#" + ui.draggable.attr("id");
        let btn_id = $(this).data("obj");

        if (drag_id == btn_id) {
          $(this).removeClass("qst-slot-filled");
          ui.draggable.removeClass("card-obj-filled");
        }
      }
    },
  });
}

printRows();

$("#verificar").click(function () {
  let isComplete = $(".qst-slot-filled").length == questoes.length;

  if (isComplete) {
    let acertos = 0;

    $(".qst-slot-filled").each(function (i) {
      console.log($(this), i);
      let r = $(this).data("value");

      let isCorrect = r == i;
      if (isCorrect) {
        $(this).addClass("right");
        acertos += 1;
      } else {
        $(this).addClass("wrong");
      }
    });

    if (acertos == questoes.length) {
      $("#rightModal").modal("show");
    } else {
      $("#wrongModal").modal("show");
    }
  }
});
