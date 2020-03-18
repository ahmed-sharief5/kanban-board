function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(event, el) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    el.appendChild(document.getElementById(data));
    console.log(data);
}

class KanbanDashboard {
    constructor() {
        this._task = new Map();
        this._taskContainer = document.querySelector(".dd");
        this._taskList = document.querySelector(".planned");
        this._taskInput = document.querySelector(".taskInput");
        this._saveButton = document.querySelector(".saveTask");
        this.bindEvents();
    }

    bindEvents () {
        this._taskInput.onkeyup = (e) => {
            if (e.keyCode ===13) {
                this.addTask(e.target.value);
                this._taskInput.value = "";
            }
        }

        this._taskList.onmouseup = (e) => {
            let id = e.target.getAttribute("data-key");
        }
        this._saveButton.onclick = this.clean.bind(this);
    }
    
    addTask(text = "Blank Task") {
        let id = Date.now() + "";
        this._task.set(id, {
            id: id,
            text: text
        });
        this.render();
    }
    clean() {
        this.render();
    }
    template(item, id) {
        return (`<li class="dd-item" data-id="1" id="task${id}" draggable="true" ondragstart="drag(event)">
                    <h3 class="title dd-handle">${this._taskInput}<i class="material-icons">edit</i></h3>
                </li>`);
    }
    render() {
        let _taskElements = [];
        this._task.forEach((item, key) => {
            _taskElements.push(this.template(item, key))
        });

        this._taskList.innerHTML = _taskElements.join(" ")
    }

}

if (document.addEventListener) {
    const List = new KanbanDashboard();
}