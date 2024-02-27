const addTodo = document.getElementById('addTodo');
const btntext = 'ADD';
const todoName = document.getElementById('todoName');
const recordDisplay = document.getElementById('record');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('todoName');

if (objStr != null) {
    userArray = JSON.parse(objStr);
}
DisplayInfo();

todoName.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // addTodo.onclick = () => {
        if (todoName.value === '') {
            alert("You must have to write something!!!");
        }
        else {
            const name = todoName.value;
            if (edit_id != null) {
                //edit
                userArray.splice(edit_id, 1, { 'name': name })
            } else {
                //insert

                userArray.push({ 'name': name });
            }

            SaveInfo(userArray);

            todoName.value = '';

            addTodo.innerText = btntext;
        }
        // }
    }
});

addTodo.onclick = () => {
    if (todoName.value === '') {
        alert("You must have to write something!!!");
    }
    else {
        const name = todoName.value;
        if (edit_id != null) {
            //edit
            userArray.splice(edit_id, 1, { 'name': name })
        } else {
            //insert

            userArray.push({ 'name': name });
        }

        SaveInfo(userArray);

        todoName.value = '';

        addTodo.innerText = btntext;
    }
}




function SaveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('todoName', str);
    DisplayInfo();
}

function DisplayInfo() {


    let statement = '';
    userArray.forEach((user, i) => {
        statement += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white mx-2 btn-info fa fa-edit" onclick='EditInfo(${i})'></i>
         <i class="btn text-white btn-danger fa fa-trash-o" onclick='DeleteInfo(${i})'></i> </i></td>
    </tr>`
    });

    recordDisplay.innerHTML = statement;
    addTodo.innerText = btntext;
}

function DeleteInfo(id) {

    let a = confirm("Do you really want to delete this todo???")
    if (a) {
        userArray.splice(id, 1);
        SaveInfo(userArray);
        DisplayInfo();
    }
}

function EditInfo(id) {
    edit_id = id;
    todoName.value = userArray[id].name;
    addTodo.innerText = 'EDIT'

}