document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let labels = [];
    document.getElementsByName("labels[]").forEach((label) => {
      labels.push(label.value);
    });

    let grupos = {};
    labels.forEach((label) => {
      document.getElementsByName(label).forEach((radio) => {
        if (radio.checked) {
          grupos[label] = radio.value;
        }
      });
    });

    let properties_grupos = {};
    labels.forEach((label) => {
      properties_grupos[label] = {
        select: { name: grupos[label] },
      };
    });

    let nickname = document.querySelector('[name="nickname"]').value;

    let body = {
      payload: {
        properties: {
          nickname: {
            title: [{ text: { content: nickname } }],
          },
          ...properties_grupos,
        },
      },
    };

    fetch(CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta do servidor:", data);
        alert("Dados enviados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
      });
  });
