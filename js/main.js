/* Open menu */
document.getElementsByClassName("hamburger")[0].addEventListener('click', function() {
    document.getElementsByClassName('open-menu-container')[0].classList.toggle("open")
})
/* Close menu */
document.getElementsByClassName("mobile-close")[0].addEventListener('click', function() {
    document.getElementsByClassName('open-menu-container')[0].classList.toggle("open")
})
/* Appointment */
const createAppointment = (info) => {

    let appointmentMessage = document.querySelector('.appointment-message');

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {
            'Content-Type': "application/json",
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(resJson => {
        console.log(resJson);
        appointmentMessage.classList.add("send")
        appointmentMessage.innerText = `Dziękujemy ${resJson.appointment.name} za zapisanie się do City Spa!`
    })
    .catch((error) => {
        console.error(error)
    })
}
/* Form validation */
document.getElementById("appointment-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let appointmentMessage = document.querySelector('.appointment-message');
    let formFields = document.getElementsByClassName("form-field");
    let complete = false;
    let info = {
        name: document.getElementById("appointment-name").value,
        email: document.getElementById("appointment-email").value,
        service: document.getElementById("appointment-service").value,
        phone: document.getElementById("appointment-phone").value,
        date: document.getElementById("appointment-date").value,
        time: document.getElementById("appointment-time").value,
        message: document.getElementById("appointment-message").value
    }

    for (let i = 0; i < formFields.length; i++) {
        if(formFields[i].value === '') {
            complete = false;
            formFields[i].classList.add("error");
        } else {
            complete = true;
            formFields[i].classList.remove("error");
        }
        
    }

    if(complete) {
        createAppointment(info);
    } else {
        appointmentMessage.classList.add("error");
        appointmentMessage.innerText = "Brakuje kilka szczegółów!"
    }
})