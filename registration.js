document.addEventListener('DOMContentLoaded', function() {
    let referrers = document.getElementById('refer');
    let other = new Option('Other', 0, true, true);
    let newDefault1 = new Option('Not Referred', null, true, true);
    referrers.add(other);
    referrers.add(newDefault1);

    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
        data.forEach(referrer => {
            let option = new Option(referrer.name, referrer.id);
            referrers.add(option);
        });
    });
 }, false);

function formValidation()
{
let uname = document.registration.username;

let uemail = document.registration.email;

let ref = document.registration.refer;

let referrer = document.registration.referrerName;

if(ValidateName(uname))
{
    if(ValidateEmail(uemail))
    {
        if(ref.value != 0){
            fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: uname.value,
                email: uemail.value,
                referrer: ref.value
             })
            })
            .then(response => {
                console.log(response);
                alert('Form Succesfully Submitted');
            });
        } else {
            if(ValidateName(referrer))
            {
                fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: uname.value,
                    email: uemail.value,
                    referrer: referrer.value
                })
                })
                .then(response => {
                    console.log(response);
                    alert('Form Succesfully Submitted');
                });
            } else {
                alert('Referrer\'s can only contain alphabet characters, spaces, hyphens, or apostrophes');
                referrer.focus();
            }
        }
    } else {
        alert("You have entered an invalid email address!");
        uemail.focus();
    }
} else {
    alert('Username can only contain alphabet characters, spaces, hyphens, or apostrophes');
    uname.focus();
}
return false;
}

function enableReferrer() {
    let selection = document.registration.refer;
    let referrer = document.registration.referrerName;
    if (selection.value == 0) {
        referrer.disabled = false;
    } else {
        referrer.disabled = true;
    }
}

function ValidateName(name)
{ 
    let value = /^[A-Za-z'\- ]+$/;
    if(name.value.match(value))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateEmail(uemail)
{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.value.match(mailformat))
    {
        return true;
    }
    else
    {
        return false;
    }
}