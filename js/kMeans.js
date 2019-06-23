const kMeans = {

    //Dados a serem agrupados
    dataSet: [],
    
    //Quantidade de centroids aleatorios
    k: 0,

    //inicializando array de centroids
    centroids: new Array(this.k),

    //Inicializando array de clusters
    cluster: new Array(this.k),

    //Callback recursivo para realizar agrupamento
    callback: () => {},

    //Metodo para criar os centroids aleatoriamente
    criarCentroidsAleatorios: function () {
        let arrayAleatorio = this.dataSet.slice(0)

        let self = this

        arrayAleatorio.sort(function () {
            return (Math.floor(Math.random() * self.dataSet.length))
        })

        this.centroids = arrayAleatorio.slice(0, this.k)
    },

    adicionaERemoveCentroidsCluster: function () {
        this.clusterTwo = new Array(this.k)

        //Definindo array temporario
        let arrayTemporario = []
        for (let i = 0; i < this.dataSet[0].length; i++) {
            arrayTemporario.push(0)
        }

        //Definindo array de dados com base no array temporario
        //E na quantidade de centroids que o agrupamento deve ter
        let arrayDataSet = []
        for (let i = 0; i < this.k; i++) {
            arrayDataSet[i] = (arrayTemporario.slice(0))
        }

        for (i in this.dataSet) {
            let arrayAtual = this.dataSet[i].slice(0)
            let indice = this.atribuirCentroid(arrayAtual)
            
            if (!this.cluster[indice]) this.cluster[indice] = []
            this.cluster[indice].push(arrayAtual)

            for (let i = 0; i < arrayAtual.length; i++) {
                //mantendo a soma do cluster
                arrayDataSet[indice][i] += arrayAtual[i]
            }
        }

        //calculando os valores medios para cada cluster
        let distancia, maximo = 0
        for (let i = 0; i < this.k; i++) {
            
            let tamanhoCluster = 0
            if (this.cluster[i]) tamanhoCluster = this.cluster[i].length

            for (chave in arrayDataSet[i]) {
                arrayDataSet[i][chave] = arrayDataSet[i][chave] / tamanhoCluster
            }

            distancia = this.distanciaEuclidiana(arrayDataSet[i], this.centroids[i])
            if (distancia > maximo) maximo = distancia
        }

        if (maximo <= 0.5) return this.callback(null, this.cluster, this.centroids)
        
        for (chave in arrayDataSet) {
            this.centroids[chave] = arrayDataSet[chave].slice(0)
        }

        this.adicionaERemoveCentroidsCluster(arrayDataSet)
    },


    atribuirCentroid: function (ponto) {
        let minimo = Infinity, respostaPosicao = 0

        //Percorrendo o array de centroids
        //Calculando a distancia euclidiana
        //Retornando a posicao
        for (i in this.centroids) {
            let resultadoDistancia = this.distanciaEuclidiana(ponto, this.centroids[i])
            
            if (resultadoDistancia < minimo) {
                minimo = resultadoDistancia
                respostaPosicao = i
            }
        }
        return respostaPosicao
    },

    //Metodo que calcula a distancia euclidiana
    distanciaEuclidiana: function (vetorUm, vetorDois) {
        let total = 0

        for (chave in vetorUm) {
            if (chave != 0) total += Math.pow(
                vetorDois[chave] - vetorUm[chave], 2
            )
        }

        return Math.sqrt(total)
    },

    iniciar: function () {
        this.criarCentroidsAleatorios()
        this.adicionaERemoveCentroidsCluster()
        return {
            cluster: this.cluster,
            totalClusters: this.cluster.length,
            totalDados: this.dataSet.length
        }
    }
}