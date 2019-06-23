const header = () => {

    let headerTemplate = `
        <div class="row">
            <div class="col-sm-12">
                <div class="jumbotron">
                    <h1>SAD - Algoritmo de Agrupamento!</h1>
                    <p>Algoritmo desenvolvido para tratamento de dados.</p>
                </div>                    
            </div>
        </div>
        <ul class="nav nav-tabs">
            <li role="presentation" onclick="controleMenu('home')" id="home"><a href="#">Home</a></li>
            <li role="presentation" onclick="controleMenu('resultado')" id="resultado"><a href="#">Resultado</a></li>
        </ul>
        <br /><br />
    `
    document.getElementById("header").innerHTML = ""
    document.getElementById("header").innerHTML = headerTemplate
}

const home = () => {
    let homeTemplate =  `
        <div class="row">
            <div class="col-sm-12">
                <form class="form-horizontal" id="formulario">
                    <div class="form-group">
                        <label for="arquivoDados" class="col-sm-2 control-label">Arquivo de Dados: </label>
                        <div class="col-sm-10">
                            <input type="file" class="form-control" id="arquivoDados" name="arquivo[]" multiple>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="qtdeCluster" class="col-sm-2 control-label">Quantidade de Clusters: </label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="qtdeCluster" name="qtdeCluster" placeholder="0">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button onclick="uploadDados()" class="btn btn-primary">Acionar Algoritmo</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
    document.getElementById("corpo").innerHTML = ""
    document.getElementById("corpo").innerHTML = homeTemplate
}

const resultado = () => {
    
    let resultadoTemplate = "", padrao = ""

    resultadoTemplate =  `
        <div class="row">
            <div class="col-sm-12">
                <h1 class="text-center">Nenhum resultado disponível!</h1>
            </div>
        </div>
    `

    if (resultadoKMeans.length != 0) {
        let corpoTabela = "", conjuntoPontoDados = ""

        for (let i = 0; i < resultadoKMeans.cluster.length; i++) {
            for (let j = 0; j < resultadoKMeans.cluster[i].length; j++) {
                if (resultadoKMeans.cluster[i].length == (j - 1)) {
                    conjuntoPontoDados += JSON.stringify(resultadoKMeans.cluster[i][j])
                } else {
                    conjuntoPontoDados += JSON.stringify(resultadoKMeans.cluster[i][j]) + " | "
                }
            }

            conjuntoPontoDados.substr(0, conjuntoPontoDados.length - 7)
            corpoTabela += "<tr>" +
                "<td>" + "Cluster: " + i + "</td>" +
                "<td>" + conjuntoPontoDados + "</td>" +
            "</tr>"
        }

        padrao += "<div class='row'><div class='col-sm-12'>" +
                "<div class='table-responsive'>" +
                    "<table class='table table-hover text-center'>" +
                        "<caption class='text-center'>Resultado do algoritmo de agrupamento.</caption>" +
                        "<thead class='text-center'>" +
                            "<tr class='text-center'>" +
                                "<th class='text-center'>Cluster</th>" +
                                "<th class='text-center'>Dados</th>" +
                            "</tr>" +
                        "</thead>"+
                        "<tbody class='text-center'>" +
                            corpoTabela +
                        "</tbody>" +
                    "</table>" +
                "</div>" +
            "</div>" +
        "</div>"
    } else {
        padrao = resultadoTemplate
    }

    console.log(resultadoKMeans)
    document.getElementById("corpo").innerHTML = ""
    document.getElementById("corpo").innerHTML = padrao
}

const controleMenu = (nomeMenu) => {
    let testeMenu = document.getElementById(nomeMenu).classList.contains("active")
    if (testeMenu) return true

    if (nomeMenu == 'home') {
        document.getElementById("resultado").classList.remove("active")
    } else if (nomeMenu == 'resultado') {
        document.getElementById("home").classList.remove("active")
    }

    let menu = document.getElementById(nomeMenu)
    menu.classList.add("active")

    eval(nomeMenu)()
}

const initTemplate = () => {
    header()
    document.getElementById("home").classList.add("active")
    home()
}

initTemplate()