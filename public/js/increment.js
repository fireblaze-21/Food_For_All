let valueDisplays = document.querySelectorAll(".num");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  console.log(endValue);
  let steps=Math.min(endValue,600);
  let duration = interval/steps;
  let increment=Math.ceil(endValue/steps);
//   if(endValue > 100) 
//    increment=11;
  console.log(duration);
  let counter = setInterval(function () {
    valueDisplay.textContent = startValue;
    if(endValue-startValue<=11)
    {
        startValue+=(endValue-startValue);
         valueDisplay.textContent = startValue;
    }
    if (startValue == endValue) {
      clearInterval(counter);
    }
    startValue += increment;
  }, duration);
});