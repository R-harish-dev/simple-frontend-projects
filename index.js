//this refer userinput and ratiobox
const baseSize = document.getElementById("baseSizer");
const selectBox = document.getElementById("selectRatio"); 
const tableBox = document.querySelector("table tbody");//this refer table tag table body element
let storeBox = []; //store all fontsize for rendering

//intial render fontsize ui function
function renderSizeUi() {
    tableBox.innerHTML = "";// whenever call this fucntion remove the table-->(tbody) innerhtml previous html values.
    storeBox = [];//whenever call this fucntion remove the array previous values.
    let size = baseSize.value.trim(); //get value from the user typing...
    let ratio = selectBox.value;// fontscale ratio (this typography calculation rule for better fontsizes)
    //check input's
    let fontsize; //fontsize store variable

     //if input is empty and if base value contain zero only execute this block
    if (baseSize.value == "" || baseSize.value == 0) {
        for (let i = 1; i <= 6; i++) { //loop 6 times for h1 to h6.
            fontsize = Math.floor(16 * Math.pow(ratio, i));//calculation formula
            storeBox.unshift(fontsize);//unshift store last value as first in the array for large to small size rendering.
        }
    }
    //if input not an empty and if base value not contain zero only execute this block
    else {
        for (let i = 1; i <= 6; i++) {
            fontsize = Math.floor(size * Math.pow(ratio, i));
            storeBox.unshift(fontsize);
        }

    }
    //this fucntion has storebox array as a parameter value for rendering purpose.
    renderArrayBaseUi(storeBox);
}

//size render and show display in your screen.
function renderArrayBaseUi(storeBox) {
    for (let i = 0; i < storeBox.length; i++) {
        let tr = document.createElement("tr"); //create each iteration table row as call short tr.
        tr.innerHTML = `<td>${storeBox[i]}:00 Px</td><td style="font-size:${storeBox[i]}px">Hello World</td>`  //tr innerhtml add table data for size and textcontent.
        tableBox.appendChild(tr); //tablebox refer from html tag table body.therefore tr  append to the tbody.
    }
}
baseSize.addEventListener('input', renderSizeUi) //every time user type somthing rendersize ui function call
selectBox.addEventListener('change', renderSizeUi)//user selection base ratio update in rendersize ui function call
renderSizeUi(); //this call for once when document loaded