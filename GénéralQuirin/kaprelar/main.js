let num = prompt("saisissez un nombre à 3 chiffre");

function kaprekar(num){
    
    s1 = parseInt(num.split("").sort().join(""));
    s2 = parseInt(num.split("").sort(function(a,b){return b-a}).join(""));
    n = (s1 > s2) ? s1 -s2 : s2 - s1;
    if(n === parseInt(num)){
        return n;
    } else {
        console.log(n);
        return kaprekar(new String(n));
    }
}


kaprekar(num);