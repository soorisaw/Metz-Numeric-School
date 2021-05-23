const listeConteneur = document.querySelectorAll('.conteneur');
const listeContenu = document.querySelectorAll('.conteneur .contenu');
const contenuGhost = document.querySelector('.contenu-ghost');

let clone = null;
let contenuCible = null;
let conteneurCible = null;

let mousePositionXOnClick = null;
let mousePositionYOnClick = null;

listeContenu.forEach((contenu) => {
    contenu.addEventListener('mousedown', (e) => {

        mousePositionXOnClick = e.offsetX;
        mousePositionYOnClick = e.offsetY;

        document.body.style.userSelect = 'none';

        contenuCible = contenu;
        clone = contenu.cloneNode(true);
        contenuCible.classList.add('element-cible');
        clone.classList.add('element-drag');

        clone.style.left = (e.pageX - mousePositionXOnClick) + 'px';
        clone.style.top = (e.pageY - mousePositionYOnClick) + 'px';

        document.body.appendChild(clone);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', drop);

        listeConteneur.forEach(conteneur => {

            Array.from(conteneur.children).forEach(contenu =>
                contenu.classList.add('conteneur-child-on-drag'));

            if (conteneur != contenu.parentElement) {
                conteneur.addEventListener('mouseenter', dragOverConteneur);
                conteneur.addEventListener('mouseout', dragOutConteneur);
            }
        });
    })
})

function dragOverConteneur(e) {
    conteneurCible = e.srcElement;
    contenuGhost.classList.remove('hidden');
    conteneurCible.appendChild(contenuGhost);
};

function dragOutConteneur(e) {
    conteneurCible = null;
    contenuGhost.classList.add('hidden');
    document.body.appendChild(contenuGhost);
};

function drag(e) {
    clone.style.left = (e.pageX - mousePositionXOnClick) + 'px';
    clone.style.top = (e.pageY - mousePositionYOnClick) + 'px';
};

function drop(e) {
    document.removeEventListener('mousemove', drag);
    document.body.removeChild(clone);
    contenuCible.classList.remove('element-cible');
    clone = null;
    document.removeEventListener('mouseup', drop);
    document.body.style.userSelect = 'auto';

    listeConteneur.forEach(conteneur => {

        Array.from(conteneur.children).forEach(contenu =>
            contenu.classList.remove('conteneur-child-on-drag'));

        conteneur.removeEventListener('mouseenter', dragOverConteneur);
        conteneur.removeEventListener('mouseout', dragOutConteneur);

    });

    if (conteneurCible != null) {
        conteneurCible.appendChild(contenuCible);
    }

    conteneurCible = null;
    contenuGhost.classList.add('hidden');
    document.body.appendChild(contenuGhost);
};
