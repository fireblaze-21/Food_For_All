// Assuming you have a div element with the date value
const divElement = document.querySelectorAll('.idd');
divElement.forEach((element) => {
	const dateString = element.innerHTML;
	
	// Extract the date string in the format "Jul 28 2023"
	// const dateOnlyString = dateString.split(" ")[1] + " " + dateString.split(" ")[2] + " " + dateString.split(" ")[3];
	
	// Convert the date string to a Date object
	const dateObject = new Date(dateString);
	
	// Get the individual date components
	const day = dateObject.getDate();
	const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1
	const year = dateObject.getFullYear() % 100; // Get the last two digits of the year
	
	// Format the date as dd/mm/yy
	const formattedDate = `${day}/${month}/${year}`;
	
	// Output the formatted date
	// console.log(formattedDate);
	element.innerHTML=formattedDate;

})