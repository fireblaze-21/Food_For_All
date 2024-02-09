
var cardTexts = document.querySelectorAll('.card-text');
var wordLimit = 40; // Adjust the desired word limit here

cardTexts.forEach(function(cardText) {
  var fullText = cardText.textContent.trim();
  var words = fullText.split(' ');
  var limitedText = words.slice(0, wordLimit).join(' ');
  
  cardText.textContent = limitedText+".....";
});
// const canvas = document.getElementById('circle');
// const context = canvas.getContext('2d');

// const radius = 30;
// const lineWidth = 10;
// const percentage = 10;
// const startAngle = -Math.PI / 2;
// const endAngle = ((percentage / 100) * Math.PI * 2) + startAngle;

// context.lineWidth = lineWidth;
// context.strokeStyle = '#007bff';

// context.beginPath();
// context.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
// context.stroke();
var getlist=document.querySelectorAll('#get');
// console.log(getlist);
var setlist=document.querySelectorAll('#set');
// console.log(setlist);
var per=document.querySelectorAll('#percentage');
// console.log(per);
var canvas=document.querySelectorAll('#circle');
// console.log(canvas);
// var cir=document.querySelectorAll('#circle');
// console.log(cir);
var context=[];
for(var i=0;i<canvas.length;i++)
{
  const cont = canvas[i].getContext('2d');
 context.push(cont);
}
// console.log(context);
for(var i=0;i<getlist.length;i++)
{
  var a=getlist[i].textContent;
  var b=setlist[i].textContent;
  var l=Math.round((a/b)*100);
  // console.log(l);
  per[i].innerHTML=l+'%';
  const radius = 30;
const lineWidth = 10;
const percentage = l;
const startAngle = -Math.PI / 2;
const endAngle = ((percentage / 100) * Math.PI * 2) + startAngle;
const consti = canvas[i].getContext('2d');
consti.lineWidth = lineWidth;
consti.strokeStyle = '#007bff';

consti.beginPath();
consti.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
consti.stroke();
}
// drop down menu script
var menu = document.getElementById("menu");
menu.style.maxHeight = "0px";
function togglemenu() {
    if (menu.style.maxHeight == "0px") {
        menu.style.maxHeight = "390px";
    }
    else {
        menu.style.maxHeight = "0px";
    }
}
// const circles = document.querySelectorAll('.circle');
// console.log("hjhb");
// circles.forEach(circle => {
//   const context = circle.getContext('2d');
//   console.log("hjhb");
//   const radius = 45;
//   const lineWidth = 10;
//   const percentage = 9;
//   const startAngle = -Math.PI / 2;
//   const endAngle = ((percentage / 100) * Math.PI * 2) + startAngle;
//   console.log(percentage);
//   context.lineWidth = lineWidth;
//   context.strokeStyle = '#007bff';

//   context.beginPath();
//   context.arc(circle.width / 2, circle.height / 2, radius, startAngle, endAngle);
//   context.stroke();
// });