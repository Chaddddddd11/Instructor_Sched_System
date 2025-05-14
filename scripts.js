// scripts.js

let instructors = JSON.parse(localStorage.getItem('instructors')) || [];
let schedule = JSON.parse(localStorage.getItem('schedule')) || [];

function displayInstructors(instructorsList) {
  const instructorListDiv = document.getElementById("instructor-list");
  instructorListDiv.innerHTML = '';
  instructorsList.forEach(instructor => {
    const instructorDiv = document.createElement("div");
    instructorDiv.innerHTML = `${instructor.name} - ${instructor.subject}`;
    instructorListDiv.appendChild(instructorDiv);
  });
}

function searchInstructors() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredInstructors = instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(searchTerm) || 
    instructor.subject.toLowerCase().includes(searchTerm)
  );
  displayInstructors(filteredInstructors);
}

document.getElementById("enrollment-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("instructor-name").value;
  const subject = document.getElementById("subject").value;
  const availability = {
    Monday: document.getElementById("monday").checked,
    Tuesday: document.getElementById("tuesday").checked,
    Wednesday: document.getElementById("wednesday").checked,
    Thursday: document.getElementById("thursday").checked,
    Friday: document.getElementById("friday").checked
  };

  const newInstructor = { name, subject, availability };
  instructors.push(newInstructor);
  localStorage.setItem('instructors', JSON.stringify(instructors));

  displayInstructors(instructors);
});

document.getElementById("schedule-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const instructorName = document.getElementById("instructor").value;
  const day = document.getElementById("day").value;
  const time = document.getElementById("time").value;
  
  const conflict = schedule.some(entry => entry.day === day && entry.time === time);
  
  if (conflict) {
    alert("Conflict! This time slot is already taken.");
  } else {
    const newSchedule = { instructorName, day, time };
    schedule.push(newSchedule);
    localStorage.setItem('schedule', JSON.stringify(schedule));
    alert("Schedule updated successfully!");
  }
});

function uploadCSV() {
  const file = document.getElementById("csv-file").files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const data = event.target.result.split("\n");
    data.forEach(line => {
      const [name, subject] = line.split(",");
      instructors.push({ name, subject });
    });
    localStorage.setItem('instructors', JSON.stringify(instructors));
    displayInstructors(instructors);
  };
  reader.readAsText(file);
}

function exportToCSV() {
  const csvContent = "data:text/csv;charset=utf-8,Name,Subject,Availability\n";
  const rows = instructors.map(instructor => 
    `${instructor.name},${instructor.subject},${JSON.stringify(instructor.availability)}`
  );
  const fileContent = csvContent + rows.join("\n");
  const encodedUri = encodeURI(fileContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "instructors.csv");
  link.click();
}

// Call the function to display instructors on page load
displayInstructors(instructors);
