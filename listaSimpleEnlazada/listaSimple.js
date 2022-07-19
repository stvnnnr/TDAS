//Clase nodo de la lista simple, unicamente lleva su valor y un apuntador siguiente
class nodo {
    constructor(objetoValor) {
        this.valor = objetoValor;//En objeto valor puede ir lo que sea, ya sea un string o un objeto.
        this.siguiente = null;//Siguiente apunta a nulo siempre, solo se declara para irlo enlazando.
    }
}

//Clase lista simple, lleva su declaracion inicial y sus metodos.
class listaSimple {
    constructor() {
        this.cabeza = null;//Su cabeza o inicio apunta hacía nulo al declararlo.
        this.contador = 0;//Un contador que nos servirá para metodos futuros.
    }

    insertar(objeto) {//Metodo insertar al final de la lista
        if (this.cabeza == null) {//Revisamos si la cabeza es nula. Si lo es, agregamos un nuevo nodo en ella y le sumamos uno al contador.
            this.cabeza = new nodo(objeto);
            this.contador = this.contador + 1;
        } else {//Si la cabeza si existe, recorremos la lista hasta que el siguiente sea nulo, eso quiere decir que llegamos al final
            var actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            //Encontramos el final y agregamos un nodo al siguiente y tambien sumamos uno al contador
            actual.siguiente = new nodo(objeto);
            this.contador = this.contador + 1;
        }
    }

    recorrer() {//Metodo recorrer, para comprobar que realizamos la correcta inserción, imprimimos en consola del navegador.
        var actual = this.cabeza;
        while (actual != null) {//Recorremos uno por uno e imprimimos su valor en consola, continuando con el siguiente hasta encontrar un siguiente nulo, quiere decir que termina la lista.
            console.log(actual.valor);
            actual = actual.siguiente;
        }
        console.log(this.contador);//Imprimimos el número de elementos que contiene la lista.
    }

    ordenarAlfa() {//Metodo para ordenar alfabéticamente la lista, Bubble sort.
        for (let i = 1; i < this.contador; i++) {//Usamos un doble for, para recorrer la lista el número de veces de elementos que existen.
            var actual = this.cabeza
            for (let j = 0; j < (this.contador + 1); j++) {
                //Parseamos los valores, pasandolos a minusculas y quitandoles espacios para evitar traslapes etc.
                var tempo = this.hacerChiquitos(actual.valor)
                if (actual.siguiente != null) {
                    var tempoSiguiente = this.hacerChiquitos(actual.siguiente.valor)
                }
                if (actual.siguiente != null && tempo > tempoSiguiente) {
                    //Revisamos que el siguiente exista y si el actual es mayor al siguiente, los intercambiamos.
                    //Si fuera un objeto, luego del valor agregarias el atributo, tipo: actual.valor.nombre .
                    var temporalActual = actual.valor
                    var temporalSiguiente = actual.siguiente.valor
                    actual.valor = temporalSiguiente
                    actual.siguiente.valor = temporalActual
                    actual = actual.siguiente
                }
            }
        }
        this.recorrer()//Recorremos para revisar que fue correcto el ordenamiento.
    }

    hacerChiquitos(valor) {
        var primeraFase = valor.toLocaleLowerCase()//Pasamos a minusculas todo el texto.
        var segundaFase = primeraFase.replace(/ /g, "")//Quitamos todos los espacios.
        return segundaFase
    }

    graficar() {//Gráficaremos usando graphviz y una herramienta virtual llamada d3, generamos un dot.
        if (this.cabeza != null) {//Si la cabeza no es nula, gráficamos lo existente.
            var codigodot = "digraph G{\nlabel=\"listaSimple\";\nnode [shape=box];\n";//Inicio del dot
            var temporal = this.cabeza
            //Declaramos las variables iniciales que nos serviran para poder gráficar.
            var conexiones = "";//Como se conectaran los nodos.
            var nodos = "";//Cada uno de los nodos.
            var numnodo = 0;//El número de nodo actual para la etiqueta del dot. 
            var conta = 0//El número de nodos para poder agregar las conexiones.
            for (let i = 0; i < (this.contador); i++) {
                nodos += "N" + numnodo + "[label=\"" + temporal.valor + "\" ];\n"//Agregamos el valor del nodo a la etiqueta.
                //Si el nodo fuera un objeto se agrega su atributo requerido, ejemplo: temporal.valor.nombre .
                temporal = temporal.siguiente
                numnodo++;
                conta++
            }
            var nume = 0//Variable auxiliar para las conexiones de los nodos.
            if (conta > 1) {//Si hay mas de un nodo, hacemos las conexiones, sino no.
                for (let j = 0; j < (conta-1); j++) {
                    var auxnum = nume + 1
                    conexiones += "N" + nume + " -> N" + auxnum + "[label=\"\"];\n"
                    nume++;
                }
            }
            codigodot += nodos + "\n"
            codigodot += "{rank=same;\n" + conexiones + "}\n\n}"//Agregamos el final al dot y ya está listo para renderizarlo.
            console.log(codigodot)//Puedes ver el dot generado en la consola del navegador.
            d3.select("#divi").graphviz()
        // Le damos altura y ancho a la gráfica, con el zoom(false) le decimos que no se mueva y con el fit(true) que se adapte al tamaño del div.
                .width(400)
                .height(400)
                .zoom(false)
                .fit(true)
                .renderDot(codigodot)
        }
    }

}
var lista = new listaSimple();
lista.insertar("Juan Alberto");
lista.insertar("Beto Carlos");
lista.insertar("José Luis");
lista.recorrer()
console.log("-----------------------------------------")
lista.ordenarAlfa()
lista.graficar()