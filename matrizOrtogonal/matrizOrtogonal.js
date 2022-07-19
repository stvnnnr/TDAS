class nodo {
    constructor(objeto) {
        this.objeto = objeto;
        this.anterior = null;
        this.siguiente = null;
        this.arriba = null;
        this.abajo = null;
    }
}

export class matrizOrtogonal {
    constructor(filas, columnas) {
        this.cabeza = null;
        this.filas = filas
        this.columnas = columnas
        this.contadorC = 0
        this.contadorF = 0
    }

    insertar(objeto) {
        if (this.cabeza == null) {
            // metemos la cabeza
            this.cabeza = new nodo(objeto);
            this.contadorC = this.contadorC + 1;
            this.contadorF = this.contadorF + 1;
        } else {
            var actual = this.cabeza
            if (this.contadorF == 1) {
                // Estamos en la primera fila
                while (actual.siguiente) {
                    actual = actual.siguiente
                }
                if (this.contadorC != this.columnas) {
                    // Estamos en las columnas
                    this.contadorC = this.contadorC + 1
                    var libUno = new nodo(objeto)
                    actual.siguiente = libUno
                    libUno.anterior = actual
                } else {
                    // Llegamos a la ultima columna, regresamos y bajamos
                    while (actual.anterior) {
                        actual = actual.anterior
                    }
                    var libUno = new nodo(objeto)
                    actual.abajo = libUno
                    libUno.arriba = actual
                    this.contadorC = 1
                    this.contadorF = this.contadorF + 1
                }
            } else {
                // Estamos en las siguientes filas y siguientes columnas
                while (actual.abajo) {
                    actual = actual.abajo
                }
                while (actual.siguiente) {
                    actual = actual.siguiente
                }
                if (this.contadorC != this.columnas) {
                    // Seguimos en lass columnas de las filas
                    this.contadorC = this.contadorC + 1
                    var libUno = new nodo(objeto)
                    actual.siguiente = libUno
                    libUno.anterior = actual
                    var arrib = actual.arriba.siguiente
                    libUno.arriba = arrib
                    arrib.abajo = libUno
                } else {
                    // Topamos las columnas y volvemos a la primera y bajamos
                    while (actual.anterior) {
                        actual = actual.anterior
                    }
                    var libUno = new nodo(objeto)
                    actual.abajo = libUno
                    libUno.arriba = actual
                    this.contadorC = 1
                    this.contadorF = this.contadorF + 1
                }
            }
        }
    }

    recorrer() {
        var actual = this.cabeza;
        for (let i = 1; i < (this.filas + 1); i++) {
            for (let j = 1; j < (this.columnas + 1); j++) {
                if (actual != null) {
                    console.log(actual.objeto)
                    if (actual.siguiente != null) {
                        actual = actual.siguiente
                    }
                }
            }
            while (actual.anterior) {
                actual = actual.anterior
            }
            actual = actual.abajo
        }
    }

    buscarRemplazar(fila, columna, objetoNuevo) {
        var actual = this.cabeza
        for (let i = 0; i < columna - 1; i++) {
            actual = actual.siguiente
        }
        for (let j = 0; j < fila - 1; j++) {
            actual = actual.abajo
        }
        actual.objeto = objetoNuevo
    }

    pintar() {
        let lista = "."
        var actual = this.cabeza
        for (let i = 1; i < (this.filas + 1); i++) {
            for (let j = 1; j < (this.columnas + 1); j++) {
                if (actual != null) {
                    if (actual.objeto) {
                        var linea = "<TD bgcolor=\"coral\">" + actual.objeto + "</TD>\n"
                    } else {
                        var linea = "<TD bgcolor=\"none\">" + "        " + "</TD>\n"
                    }
                    lista = lista + "," + linea
                    if (actual.siguiente != null) {
                        actual = actual.siguiente
                    }
                }
            }
            while (actual.anterior) {
                actual = actual.anterior
            }
            actual = actual.abajo
        }
        lista = lista.split(".,")[1]
        // console.log(lista)
        return (lista)
    }

    graficar() {
        if (this.cabeza != null) {
            var codigodot = "digraph G{size=\"13\"\n node [shape=box,width= 1.3,height=1]\n subgraph cluster_p{\nedge[dir=\"both\"]\n";
            var actual = this.cabeza
            var conexionesHorizontales = "";
            var conexionesVerticales = "";
            var nodos = "";
            var numnodo = 0;
            for (let i = 1; i < (this.filas + 1); i++) {
                var otraExtra = "{rank=same;";
                for (let j = 1; j < (this.columnas + 1); j++) {
                    var varextra = "";
                    if (actual.objeto) {
                        nodos += "N" + numnodo + "[label=\"" + actual.objeto + "\",group=0]\n"
                        otraExtra += "N" + numnodo + ","
                        if (actual.abajo != null) {
                            var auxaux = numnodo + 25
                            varextra = "N" + numnodo + " -> N" + auxaux + "\n"
                        }
                        if (actual.siguiente != null) {
                            var auxnum = numnodo + 1
                            conexionesHorizontales += "N" + numnodo + " -> N" + auxnum + "\n"
                            conexionesHorizontales += varextra
                            actual = actual.siguiente
                        }
                    } else {
                        nodos += "N" + numnodo + "[label=\"" + "    " + "\",group=0]\n"
                        otraExtra += "N" + numnodo + ","
                        if (actual.abajo != null) {
                            var auxaux = numnodo + 25
                            conexionesHorizontales += "N" + numnodo + " -> N" + auxaux + "\n"
                        }
                        if (actual.siguiente != null) {
                            actual = actual.siguiente
                            var auxnum = numnodo + 1
                            conexionesHorizontales += "N" + numnodo + " -> N" + auxnum + "\n"
                        }
                    }

                    numnodo++;
                }
                var str2 = otraExtra.substring(0, otraExtra.length - 1);
                str2 += "}\n"
                nodos += str2
                while (actual.anterior) {
                    actual = actual.anterior
                }
                if (actual.abajo != null) {
                    actual = actual.abajo
                }
            }
            codigodot += nodos + "\n"
            codigodot += "\n" + conexionesHorizontales + "\n}}"
            console.log(codigodot)
            if (document.getElementById("divi")) {
                d3.select('#divi').graphviz()
                    .width(1400)
                    .height(1400)
                    .zoom(false)
                    .fit(true)
                    .renderDot(codigodot)
            }
        } else {
            console.log("Esta vacia")
        }
    }
}
var matrizOrtogonalNueva = new matrizOrtogonal(25, 25);//La creamos de 25 x 25
for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
        matrizOrtogonalNueva.insertar("")//Con un doble for, la rellenamos de vacios, solo para crear los espacios.
    }
}
//para meter tus valores es con la funcion:
matrizOrtogonalNueva.buscarRemplazar(1,1,"JAJAJAJ")//Así, empieza en 1,1

matrizOrtogonalNueva.graficar()