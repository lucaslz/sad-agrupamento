let resultadoKMeans = []

const uploadDados = () => {

    $('#formulario').submit(false)
    if (validarInputVario()) return false

    //Pegando os dados
    let arquivo = document.getElementById("arquivoDados").files[0]
    let qtdeK = document.getElementById("qtdeCluster").value
    
    //Limpando os inputs
    document.getElementById("arquivoDados").value = ""
    document.getElementById("qtdeCluster").value = 0


    const reader = new FileReader()

    reader.onload = function(fileLoadedEvent){
        let textFromFileLoaded = fileLoadedEvent.target.result
        let dados = tratarDados(textFromFileLoaded)
        kMeans.dataSet = dados.dados
        kMeans.k = qtdeK
        resultadoKMeans = kMeans.iniciar()
    };

    reader.onerror = error => refect(error)
    reader.readAsText(arquivo, "UTF-8")
}

const tratarDados = (dados) => {
    let linhas = dados.split("\n"), newArray = [], newArrayNormal = [] , labels = [], labelsGroup = []

    for (let i = 0; i < linhas.length; i++) {
        newArray.push(linhas[i].split("  "))   
    }

    for (let i = 0; i < newArray.length; i++) {
        newArray[i].pop()
        newArray[i].shift()   
    }


    for (let i = 0; i < linhas.length; i++) {
        newArrayNormal.push(linhas[i].split("  "))   
    }

    for (let i = 0; i < newArrayNormal.length; i++) {
        labels.push(newArrayNormal[i][0])
    }
    
    for (let i = 0; i < newArrayNormal.length; i++) {
        let tamanho = newArrayNormal[i].length - 1  
        labelsGroup.push(newArrayNormal[i][tamanho])
    }

    return {
        dados: newArray,
        labels: labels,
        labelsGroup: labelsGroup
    }
}

const validarInputVario = () => {

    template = `
        <div class="modal fade" id="modalInputVazio" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title alert alert-danger text-center" id="myModalLabel">Atenção !</h4>
                    </div>
                    <div class="modal-body">
                        <p style="font-family:Arial, sans-serif, Georgia; color:#1E1E1E; font-size:1.5em;">Preencha os dados do formulário.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.getElementById("controle-modal").innerHTML = ""

    let inputOne = document.getElementById("arquivoDados").value
    let inputTwo = document.getElementById("qtdeCluster").value
    let controle = true

    if (inputOne == 0 && inputTwo == 0) {
        document.getElementById("controle-modal").innerHTML = template
    } else {
        controle = false
    }

    $('#modalInputVazio').modal('show')
    return controle
}
