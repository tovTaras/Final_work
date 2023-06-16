const buttons = document.querySelectorAll('.buttonLed');
const realTimeButton = document.querySelector(".realTime");
const createAlgorithm = document.querySelector(".createAlgorithm");
const onAll = document.querySelector(".onAll");
const offAll = document.querySelector(".offAll");
const sendAlgorithm = document.querySelector(".send")
const itemsContainer = document.getElementById("items_container");

let command_of_algorithm = [];
const EDIT_ALGORITHM_PREFIX = "algorithm-";

const itemTemplate = ({id, commands}) => `
<div id="${EDIT_ALGORITHM_PREFIX}${id}" class="fieldsForAlgorithms" >
     <div>
        <button class="algorithm" onclick="sendCommandToServer(${id})">Id: ${id}, commands: ${commands}</button>
     </div>
 </div>
`


const addItemToPage = ({id, commands}) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({id, commands})
    );
}


const renderItemsList = (items) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        console.log(item)
        addItemToPage(item)
    }
}


realTimeButton.addEventListener('click', () => {
    realTimeButton.classList.toggle('active');
    sendAlgorithm.setAttribute("disabled", "")
    if (realTimeButton.className === 'realTime') {
        offAllLed()
        sendCommandToServer("off_all")
    } else if (createAlgorithm.className === "createAlgorithm active") {
        createAlgorithm.classList.remove("active")
        sendCommandToServer("delete_start_algo")
        offAllLed()
    }
});
sendAlgorithm.addEventListener('click', () => {
    offAllLed()
    sendCommandToServer("activate_algo")
    createAlgorithm.classList.remove("active")
});


createAlgorithm.addEventListener('click', () => {
    realTimeButton.classList.remove("active")
    offAllLed()
    createAlgorithm.classList.toggle('active')
    if (createAlgorithm.className === "createAlgorithm active") {
        sendAlgorithm.removeAttribute('disabled')
        sendCommandToServer("start_algo")
    } else if (createAlgorithm.className === "createAlgorithm") {
        sendAlgorithm.classList.remove("active")
        sendAlgorithm.setAttribute('disabled', "")
        sendCommandToServer("delete_start_algo")
    }
    offAllLed()
});

onAll.addEventListener("click", () => {
    if (createAlgorithm.className === "createAlgorithm") {
        onAllLed()
    }
    sendCommandToServer("on_all")
})
offAll.addEventListener("click", () => {
    offAllLed()
    sendCommandToServer("off_all")
});


for (let button of buttons) {
    button.addEventListener('click', () => {
        if (realTimeButton.className === 'realTime active' || createAlgorithm.className === "createAlgorithm active"
        ) {
            button.classList.toggle('active');
        }
    });
}

function getDataFromLed(id) {
    const btn = document.getElementById(id);
    if (btn.className === 'buttonLed' && (realTimeButton.className === 'realTime active' ||
        createAlgorithm.className === "createAlgorithm active")) {
        sendCommandToServer("on_" + id)
    } else if (btn.className === 'buttonLed active' && (realTimeButton.className === 'realTime active' ||
        createAlgorithm.className === "createAlgorithm active")) {
        sendCommandToServer("off_" + id)
    }
}

getDataFromLed()


function offAllLed() {
    for (let button of buttons) {
        if (button.className === 'buttonLed active') {
            button.classList.remove('active')
        }
    }
}

function onAllLed() {
    for (let button of buttons) {
        button.classList.toggle('active')

    }
}


function sendCommandToServer(command) {
    command = command.toString()
    console.log(command)
    fetch("http://127.0.0.1:5000/receiver", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(command)
    }).then(function (response) {
        if (response.status !== 200) {
            console.log('Error');
        } else console.log(response)
    })

}

function getAllAlgorithm() {
    axios.get("http://127.0.0.1:5000/receiver")
        .then((response) => {
            command_of_algorithm = response.data;
            renderItemsList(command_of_algorithm)
        })
}


