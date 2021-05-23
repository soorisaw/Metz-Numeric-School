function Palindrome()
{
    let entree = prompt("Veillez saisir votre mot").toLowerCase();
    let entree_1 = [...entree].reverse().join('');
    
    if (entree === "") {
        console.log('Veuillez saisir un mot d\'abord');
    }
    
    else if (entree === entree_1) {
        console.log(entree + ' est un palindrome');
    }
    
    else {
        console.log(entree + ' n\'est pas un palindrome');
    }

}

Palindrome();
