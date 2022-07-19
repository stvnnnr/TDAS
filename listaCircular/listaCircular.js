//Clase nodo de la lista circular, unicamente lleva su valor y un apuntador siguiente
class nodo {
    constructor(objetoValor) {
        this.valor = objetoValor;//En objeto valor puede ir lo que sea, ya sea un string o un objeto.
        this.siguiente = null;//Siguiente apunta a nulo siempre, solo se declara para irlo enlazando.
    }
}

//Clase lista circular, lleva su declaracion inicial y sus metodos.
class listaCircular {
    constructor() {
        this.cabeza = null;//Su cabeza o inicio apunta hacía nulo al declararlo.
        this.contador = 0;//Un contador que nos servirá para metodos futuros.
    }

    insertar(objeto) {//Metodo insertar al final de la lista
        if (this.cabeza == null) {//Revisamos si la cabeza es nula. Si lo es, agregamos un nuevo nodo en ella, lo enlazamos y le sumamos uno al contador.
            this.cabeza = new nodo(objeto);
            this.cabeza.siguiente = this.cabeza
            this.contador = this.contador + 1;
        } else {//Si la cabeza si existe, recorremos la lista hasta el numero de elementos que tenga el contador y llegaremos al final
            var actual = this.cabeza
            if (this.contador == 1) {//Si el contador es 1, es porque solo está la cabeza y le agregamos al siguiente y simpre enlazamos el ultimo con la cabeza.
                var tempo = new nodo(objeto)
                actual.siguiente = tempo
                tempo.siguiente = this.cabeza
                this.contador = this.contador + 1
            } else {//El contador es mayor a 1, entonces hay mas elementos que la cabeza y reccorremos el numero de elementos hasta llegar al final
                var actual = this.cabeza
                for (let index = 0; index < (this.contador - 1); index++) {
                    actual = actual.siguiente
                }
                //LLegamos al ultimo y le agregamos el siguiente y ese lo conectamos con la cabeza.
                var tempo = new nodo(objeto)
                actual.siguiente = tempo
                tempo.siguiente = this.cabeza
                this.contador = this.contador + 1
            }
        }
    }

    recorrer() {//Metodo recorrer, para comprobar que realizamos la correcta inserción, imprimimos en consola del navegador.
        var actual = this.cabeza;
        for (let i = 0; i < (this.contador); i++) {//Recorremos uno por uno e imprimimos su valor en consola, continuando hasta completar el número de elementos.
            console.log(actual.valor);
            actual = actual.siguiente;
        }
        console.log(this.contador);//Imprimimos el número de elementos que contiene la lista.
    }

    graficar() {//Gráficaremos usando graphviz y una herramienta virtual llamada d3, generamos un dot.
        var codigodot = "digraph G{\nlabel=\"listaCircular\";\nnode [shape=box];\n";//Inicio del dot
        var temporal = this.cabeza
        //Declaramos las variables iniciales que nos serviran para poder gráficar.
        var conexiones = "";//Como se conectaran los nodos.
        var nodos = "";//Cada uno de los nodos.
        var numnodo = 0;//El número de nodo actual para la etiqueta del dot.
        for (let index = 0; index < (this.contador); index++) {//Usamos un for las veces de elemntos que existe, para agregar los nodos y las conexiones.
            nodos += "N" + numnodo + "[label=\"" + temporal.valor + "\"" + "];\n"//Creamos los nodos, con su valor.
            if (temporal.siguiente != this.cabeza) {//Agregamos los nodos normales, como que fuera lista simple, sin que el siguiente sea cabeza.
                var auxnum = numnodo + 1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            } else {//Else es porque el siguiente es cabeza y apuntamos el ultimo nodo al nodo 0 (la cabeza).
                var auxnum = numnodo + 1
                conexiones += "N" + (numnodo) + " -> N" + 0 + ";\n"
            }
            temporal = temporal.siguiente
            numnodo++;
        }
        codigodot += nodos + "\n"//Agregamos los nodos al dot
        codigodot += "{rank=same;\n" + conexiones + "}\n\n}"
        console.log(codigodot)//Imprimirmos el dot en consola para revisarlo
        if (document.getElementById("divi")) {
            d3.select('#divi').graphviz()
                // Le damos altura y ancho a la gráfica, con el zoom(false) le decimos que no se mueva y con el fit(true) que se adapte al tamaño del div.
                .width(400)
                .height(400)
                .zoom(false)
                .fit(true)
                .renderDot(codigodot)
        }
    }
}
var lista = new listaCircular();
lista.insertar("Juan Alberto");
lista.insertar("Beto Carlos");
lista.insertar("José Luis");
lista.recorrer()
console.log("-----------------------------------------")
lista.graficar()