const fName = document.getElementById("first-name");
const lName = document.getElementById('last-name');
const phoneNumber = document.getElementById("tel-no");
const eMail = document.getElementById('mail');
const resAddress = document.getElementById('res-adr');
const comAddress = document.getElementById('comp-adr');
const flName = document.querySelectorAll("#first-name, #last-name");
const submitForm = document.querySelector("#ticket-form");


// Empty fields Validation
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("blur", function () {
        if (this.value.trim() === "") {
            this.nextElementSibling.innerHTML = "This field can not be empty";

        } else {
            this.nextElementSibling.innerHTML = "";
        }
    });
});

// Email Validation
eMail.addEventListener("input", function () {
    const infoSpan = this.parentElement.querySelector("#mail-info");
    if (!this.value.includes("@") || !this.value.includes(".")) {
        infoSpan.innerHTML = " Invalid email address, must contain @ and .";
    } else {
        infoSpan.innerHTML = "";
    }
    if (this.value.trim() === "") {
        infoSpan.innerHTML = "";
        return;
    }
});

// Validation for restricting non-letters for letter
flName.forEach(item => {
    item.addEventListener("keydown", function (event) {
        if (event.key.match(/[0-9\W\_\s]/)) {
            event.preventDefault();
        }
    });
})

// Validation for restricting letters for number
phoneNumber.addEventListener("keypress", function (event) {
    if (event.key.match(/[\D]/)) {
        event.preventDefault();
    }
});

let ticketNo = 0;

// Array to store ticket objects
const ticketsData = [];

// Form Submission
submitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Creating Object for each ticket and trimming
    const newTicketData = {
        firstName: fName.value.trim(),
        lastName: lName.value.trim(),
        phone: phoneNumber.value.trim(),
        email: eMail.value.trim(),
        resAddress: resAddress.value.trim(),
        comAddress: comAddress.value.trim()
    };

    // Checking for duplicate tickets
    const ticketDuplicate = ticketsData.some(ticket =>
        ticket.firstName === newTicketData.firstName &&
        ticket.lastName === newTicketData.lastName &&
        ticket.phone === newTicketData.phone &&
        ticket.email === newTicketData.email &&
        ticket.resAddress === newTicketData.resAddress &&
        ticket.comAddress === newTicketData.comAddress
    );

    /* if (ticketDuplicate) {
        alert("A ticket with this information already exists.");
        return;
    }
    

     // Validate if any fields are empty
     if (Object.values(newTicketData).some(value => value === "")) {
        alert("Please fill out all required fields.");
        return;
    } */

    // Validate if any fields are empty
    if (Object.values(newTicketData).some(value => value === "")) {
        showModal("Please fill out all required fields.");
        return;
    }
    // Validate if any field is duplicated
    if (ticketDuplicate) {
        showModal("A ticket with this information already exists.");
        return;
    }
    // To add ticket to the array
    ticketsData.push(newTicketData);
    // Incrementing Ticket No
    ticketNo++;

    /*  let inputArr = Array.from(document.querySelectorAll("input"));
     let checkInput = inputArr.some(item => item.value.length == 0);

     if (checkInput) {
         alert("Please fill out all required fields.");
     } else {
         ticketsData.push(newTicketData);
         ticketNo += 1; */

    // Cloning and retrieving ticket from object keys
    const ticketFormat = document.querySelector(".format");
    const newTicketFormat = ticketFormat.cloneNode(true);
    newTicketFormat.style.display = "inline-block";
    newTicketFormat.querySelector(".genName").innerHTML = `${newTicketData.firstName} ${newTicketData.lastName}`;
    newTicketFormat.querySelector(".emp-num").innerHTML = newTicketData.phone;
    newTicketFormat.querySelector(".emp-mail").innerHTML = newTicketData.email;
    newTicketFormat.querySelector(".emp-add").innerHTML = newTicketData.resAddress;
    newTicketFormat.querySelector(".comp-add").innerHTML = newTicketData.comAddress;
    newTicketFormat.querySelector(".id-no").innerHTML = ticketNo;

    document.querySelector(".ticket-row").appendChild(newTicketFormat);

    // Resetting form inputs (except company address)

    document.querySelectorAll("input").forEach(input => {
        if (input.id !== "comp-adr") {
            input.value = ""
        };
    });

    // To Clear validation messages
    document.querySelectorAll(".info").forEach(info => {
        info.innerHTML = "";
    });

    // To check Tciket Array
    console.log("Tickets Data:", ticketsData);
});



const formContainer = document.getElementById("form-container");
const toggleIcon = document.getElementById("toggle-icon");

toggleIcon.addEventListener("click", function () {
    if (formContainer.style.display === "none" || !formContainer.style.display) {
        // To show the form
        formContainer.style.display = "block";
        toggleIcon.classList.add("cancel");
        toggleIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    } else {
        // To hide the form
        formContainer.style.display = "none";
        toggleIcon.classList.remove("cancel");
        toggleIcon.innerHTML = '<i class="fa-regular fa-address-card"></i>';
    }
});

// Function to show the modal
function showModal(message) {
    const modal = document.getElementById("custom-modal");
    const modalText = document.getElementById("modal-text");

    modalText.textContent = message; // Set the modal message
    modal.style.display = "block"; // Show the modal
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("custom-modal");
    modal.style.display = "none"; // Hide the modal
}

// Event listener for closing the modal
document.getElementById("modal-close").addEventListener("click", closeModal);

// Close the modal when clicking outside the content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("custom-modal");
    if (event.target === modal) {
        closeModal();
    }
});