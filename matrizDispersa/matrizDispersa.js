class nodoCabecera {
    constructor(id) {
        this.id = id
        this.siguiente = null
        this.anterior = null
        this.pass = null
    }
    getPass() {
        return this.pass
    }
    setPass(pass) {
        this.pass = pass
    }
}
class listaCabecera {
    constructor(clase) {
        this.cabeza = null
        this.final = null
        this.clase = clase
        this.contador = 0
    }
    insertarCabecita(nodo) {
        this.contador = this.contador + 1
        if (this.cabeza == null) {
            this.cabeza = nodo
            this.final = nodo
        } else {
            if (nodo.id < this.cabeza.id) {
                nodo.siguiente = this.cabeza
                this.cabeza.anterior = nodo
                this.cabeza = nodo
            } else if (nodo.id > this.final.id) {
                this.final.siguiente = nodo
                nodo.anterior = this.final
                this.final = nodo
            } else {
                var aux = this.cabeza
                while (aux != null) {
                    if (nodo.id < aux.id) {
                        nodo.siguiente = aux
                        nodo.anterior = aux.anterior
                        aux.anterior.siguiente = nodo
                        aux.anterior = nodo
                        break
                    } else if (nodo.id > aux.id) {
                        aux = aux.siguiente
                    } else {
                        break
                    }
                }
            }
        }
    }
    recorrer() {
        var aux = this.cabeza
        while (aux != null) {
            console.log("cabecera", this.clase, aux.id)
            aux = aux.siguiente
        }
    }
    getcabecera(id) {
        var aux = this.cabeza
        while (aux != null) {
            if (id == aux.id) {
                return aux
            }
            aux = aux.siguiente
        }
        return null
    }
}
class nodo {
    constructor(x, y, valor) {
        this.x = x
        this.y = y
        this.valor = valor
        this.izquierda = null
        this.derecha = null
        this.arriba = null
        this.abajo = null
    }
    setArriba(arriba) {
        this.arriba = arriba
    }
    getArriba() {
        return this.arriba
    }
    setAbajo(abajo) {
        this.abajo = abajo
    }
    getAbajo() {
        return this.abajo
    }
    setIzquierda(izquierda) {
        this.izquierda = izquierda
    }
    getIzquierda() {
        return this.izquierda
    }
    setDerecha(derecha) {
        this.derecha = derecha
    }
    getDerecha() {
        return this.derecha
    }
}
export class matrizDisperza {
    constructor() {
        this.nivel = 0
        this.filas = new listaCabecera("fila")
        this.columnas = new listaCabecera("columna")
    }

    insertar(x, y, valor) {
        var nodoNuevo = new nodo(x, y, valor)
        var nodoX = this.filas.getcabecera(x)
        var nodoY = this.columnas.getcabecera(y)

        if (nodoX == null) {
            nodoX = new nodoCabecera(x)
            this.filas.insertarCabecita(nodoX)
        }

        if (nodoY == null) {
            nodoY = new nodoCabecera(y)
            this.columnas.insertarCabecita(nodoY)
        }

        var xx = nodoX.getPass()
        if (xx == null) {
            nodoX.setPass(nodoNuevo)
        } else {
            var xxUno = nodoX.getPass()
            if (nodoNuevo.y < xxUno.y) {
                nodoNuevo.setDerecha(xxUno)
                nodoX.getPass().setIzquierda(nodoNuevo)
                nodoX.setPass(nodoNuevo)
            } else {
                var aux = nodoX.getPass()
                while (aux != null) {
                    if (nodoNuevo.y < aux.y) {
                        nodoNuevo.setDerecha(aux)
                        nodoNuevo.setIzquierda(aux.getIzquierda())
                        aux.getIzquierda().setDerecha(nodoNuevo)
                        aux.setIzquierda(nodoNuevo)
                        break
                    } else if (nodoNuevo.x == aux.x && nodoNuevo.y == aux.y) {
                        break
                    } else {
                        if (aux.getDerecha() == null) {
                            aux.setDerecha(nodoNuevo)
                            nodoNuevo.setIzquierda(aux)
                            break
                        } else {
                            aux = aux.getDerecha()
                        }
                    }
                }
            }
        }

        var yy = nodoY.getPass()
        if (yy == null) {
            nodoY.setPass(nodoNuevo)
        } else {
            var yyUno = nodoY.getPass()
            if (nodoNuevo.x < yyUno.x) {
                nodoNuevo.setAbajo(yyUno)
                nodoY.getPass().setArriba(nodoNuevo)
                nodoY.setPass(nodoNuevo)
            } else {
                var temporal = nodoY.getPass()
                while (temporal != null) {
                    if (nodoNuevo.x < temporal.x) {
                        nodoNuevo.setAbajo(temporal)
                        nodoNuevo.setArriba(temporal.getArriba())
                        temporal.getArriba().setAbajo(nodoNuevo)
                        temporal.setArriba(nodoNuevo)
                        break
                    } else if (nodoNuevo.x == temporal.x && nodoNuevo.y == temporal.y) {
                        break
                    } else {
                        if (temporal.getAbajo() == null) {
                            temporal.setAbajo(nodoNuevo)
                            nodoNuevo.setArriba(temporal)
                            break
                        } else {
                            temporal = temporal.getAbajo()
                        }
                    }
                }
            }
        }
    }

    recorerrFilas(fila) {
        var inicio = this.filas.getcabecera(fila)
        if (inicio == null) {
            console.log("Esa fila no existe chato")
            return null
        }
        var aux = inicio.getPass()
        while (aux != null) {
            console.log(aux.valor)
            aux = aux.getDerecha()
        }
    }

    recorerrColumnas(columna) {
        var inicio = this.columnas.getcabecera(columna)
        if (inicio == null) {
            console.log("Esa fila no existe chato")
            return null
        }
        var aux = inicio.getPass()
        while (aux != null) {
            console.log(aux.valor)
            aux = aux.getAbajo()
        }
    }

    graficar() {
        var texto = "digraph G{\nnode[shape=box, width=0.7, height=0.7, fontname=\"Arial\", fillcolor=\"white\", style=filled]\nedge[style = \"bold\"]\n"
        texto += "node[label = \"Conexiones\" fillcolor=\"Red\" pos = \"-1,1!\"]raiz;"
        texto += "label = \"matrizDispersa\"  \nfontname=\"Arial Black\" \nfontsize=\"25pt\" \n"
        var pivot = this.filas.cabeza
        var xMoment = 0
        while (pivot != null) {
            texto += "\nnode[label=\"F" + pivot.id + "\" fillcolor=\"none\" pos=\"-1,-" + xMoment + "!\" shape=box]x" + pivot.id + ";"
            pivot = pivot.siguiente
            xMoment++
        }
        pivot = this.filas.cabeza
        while (pivot.siguiente != null) {
            texto += "\nx" + pivot.id + "->x" + pivot.siguiente.id + ";"
            texto += "\nx" + pivot.id + "->x" + pivot.siguiente.id + "[dir=back];"
            pivot = pivot.siguiente
        }
        texto += "\nraiz->x" + this.filas.cabeza.id + ";"
        var pivotDos = this.columnas.cabeza
        var yMoment = 0
        while (pivotDos != null) {
            texto += "\nnode[label=\"C" + pivotDos.id + "\" fillcolor=\"none\" pos=\"" + yMoment + ",1!\" shape=box]y" + pivotDos.id + ";"
            pivotDos = pivotDos.siguiente
            yMoment++
        }
        var pivpiv = this.columnas.cabeza
        while (pivpiv.siguiente != null) {
            texto += "\ny" + pivpiv.id + "->y" + pivpiv.siguiente.id + ";"
            texto += "\ny" + pivpiv.id + "->y" + pivpiv.siguiente.id + "[dir=back];"
            pivpiv = pivpiv.siguiente
        }
        texto += "\nraiz->y" + this.columnas.cabeza.id + ";"
        var pivote = this.filas.cabeza
        var x = 0
        while (pivote != null) {
            var pivotNodo = pivote.pass
            while (pivotNodo != null) {
                var pivoteY = this.columnas.cabeza
                var yNodo = 0
                while (pivoteY != null) {
                    if (pivoteY.id == pivotNodo.y) {
                        break
                    }
                    yNodo++
                    pivoteY = pivoteY.siguiente
                }
                if (pivotNodo.valor != "") {
                    texto += "\nnode[label=\"" + pivotNodo.valor + "\" fillcolor=\"white\" pos=\"" + yNodo + ",-" + x + "!\" shape=box]i" + pivotNodo.x + "_" + pivotNodo.y + ";"
                } else {
                    texto += "\nnode[label=\"\" fillcolor=\"white\" pos=\"" + yNodo + ",-" + x + "!\" shape=box]i" + pivotNodo.x + "_" + pivotNodo.y + ";"
                }
                pivotNodo = pivotNodo.derecha
            }
            pivotNodo = pivote.pass
            while (pivotNodo != null) {
                if (pivotNodo.derecha != null) {
                    texto += "\ni" + pivotNodo.x + "_" + pivotNodo.y + "->i" + pivotNodo.derecha.x + "_" + pivotNodo.derecha.y + ";"
                    texto += "\ni" + pivotNodo.x + "_" + pivotNodo.y + "->i" + pivotNodo.derecha.x + "_" + pivotNodo.derecha.y + "[dir=back];"
                }
                pivotNodo = pivotNodo.derecha
            }
            texto += "\nx" + pivote.id + "->i" + pivote.pass.x + "_" + pivote.pass.y + ";"
            texto += "\nx" + pivote.id + "->i" + pivote.pass.x + "_" + pivote.pass.y + "[dir=back];"
            pivote = pivote.siguiente
            x++
        }
        var pivotito = this.columnas.cabeza
        while (pivotito != null) {
            var nodox = pivotito.pass
            while (nodox != null) {
                if (nodox.abajo != null) {
                    texto += "\ni" + nodox.x + "_" + nodox.y + "->i" + nodox.abajo.x + "_" + nodox.abajo.y + ";"
                    texto += "\ni" + nodox.x + "_" + nodox.y + "->i" + nodox.abajo.x + "_" + nodox.abajo.y + "[dir=back];"
                }
                nodox = nodox.abajo
            }
            texto += "\ny" + pivotito.id + "->i" + pivotito.pass.x + "_" + pivotito.pass.y + ";"
            texto += "\ny" + pivotito.id + "->i" + pivotito.pass.x + "_" + pivotito.pass.y + "[dir=back];"
            pivotito = pivotito.siguiente
        }
        texto += "\n}"
        console.log(texto)
        d3.select("#divi").graphviz()
            .width(1400)
            .height(1400)
            .engine('neato')
            .renderDot(texto)
    }
}

export var matrix = new matrizDisperza()
matrix.insertar(1, 1, "A")
matrix.insertar(2, 1, "P")
matrix.insertar(2, 2, "U")
matrix.insertar(2, 3, "T")
matrix.insertar(2, 4, "A")
matrix.insertar(3, 3, "C")
matrix.insertar(4, 4, "D")
matrix.graficar()