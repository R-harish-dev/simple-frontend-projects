// ---condition checking-----
var numericExpression=/^[0-9]+$/; if(elem.value.match(numericExpression));
var alphaExp=/^[a-zA-Z]+$/; if(elem.value.match(alphaExp));
var alphaExp=/^[0-9, a-z a-z, 0-9, A-Z A-Z, - 0-9 . ]+$/; if(elem.value.match(alphaExp));
var emailExp=/^[0-9 a-z . a-z 0-9]+\@[a-z]+\.[a-z]{2,4}$/; if(elem.value.match(emailExp));