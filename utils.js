async function draw(dot) {
    const viz = new Viz();
    const container = document.getElementById("graph");
    const graph = await viz.renderSVGElement(dot);
    container.innerHTML = "";
    container.appendChild(graph);
    const l = container.getElementsByClassName("node");
    for (n of l) {
	const name = n.firstElementChild.innerHTML;
	install(n, name);
    }
}

const abro = "ABRO := (A[clock] | B[clock] | R[clock] | O[clock]) \\ [s, k];\n\
one := #clock. one[clock];\n\
A   := ?k:[?k]. one[clock] + ?a:[?k, ?a]. !s:[!s]. one[clock] + #clock:[?k, ?a]. A[clock];\n\
B   := ?k:[?k]. one[clock] + ?b:[?k, ?b]. !s:[!s]. one[clock] + #clock:[?k, ?a]. B[clock];\n\
R   := ?r:[?r]. R'[clock] + tau:[?r]. #clock. R[clock];\n\
R'  := !k. R'[clock] + #clock:[!k]. ABRO[clock];\n\
O   := ?k:[?k]. one[clock] + ?s:[?k]. O'[clock] + #clock:[?k, ?s]. O[clock];\n\
O'  := ?k:[?k]. one[clock] + ?s:[?k]. O''[clock] + #clock:[?k, ?s]. O'[clock];\n\
O'' := ?s:[?k]. O''[clock] + !o:[!o, ?s]. one[clock];\n\
ABRO[clock]";

const memory = "cell := ?r:[?w]. cell[clock] + ?w. cell[clock] + #clock:[?r,?w]. cell[clock];\n\
one := #clock. one[clock];\n\
reader1 := !r. one[clock];\n\
reader2 := #clock. !r. one[clock];\n\
writer := !w. one[clock];\n\
(reader1[clock] | reader2[clock] | writer[clock] | cell[clock]) \\ [r, w] / [clock]";

const keyboard = "one1 := #c1. one1[c1];\n\
one2 := #c2. one2[c2];\n\
getStr := ?enter:[?enter]. !str:[!str]. one1[c1] + ?key:[?key, ?enter]. #c1. getStr[c1];\n\
main := ?str:[?str]. one2[c2] + #c2:[?str]. main[c2];\n\
getStr[c1] | main[c2]"

const anbn = "an_bn := ?a.(?b : [!a]. 0_[] | an_bn[]) + tau : [?a]. 0_[];\n\
\n\
an_bn[]"

const simple = "!a : [!a]. 0_[] | ?a : [?a]. 0_[]"

const examples = { abro: abro, memory: memory, keyboard: keyboard, simple: simple, anbn: anbn };

function change() {
    const v = document.getElementById("examples").value;
    document.getElementById('parsing').value = examples[v];
}
