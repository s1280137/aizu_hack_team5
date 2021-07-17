const taskListContainer = document.getElementById("tasks")
let tasks = []

function update() {
  while (taskListContainer.firstChild !== null) {
    taskListContainer.removeChild(taskListContainer.firstChild)
  }
  fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/latest")
    .then(r => r.json())
    .then(j => {
      tasks = j
      for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i]

        const taskContainer = document.createElement("div")
        taskContainer.className = "taskContainer"

        const taskP = document.createElement("p")
        const commentP = document.createElement("p")
        const likeP = document.createElement("p")
        const dislikeP = document.createElement("p")
        const img = document.createElement("img")

        taskP.textContent = task.title
        commentP.textContent = task.comment
        likeP.textContent = task.like + " likes"
        dislikeP.textContent = task.dislike + " dislikes"
        taskContainer.id = task.id
        img.src = task.img
        img.width = 200
        img.height = 200

        const likeButton = document.createElement("input")
        likeButton.type = "button"
        likeButton.value = "ZUZU!"

        const dislikeButton = document.createElement("input")
        dislikeButton.type = "button"
        dislikeButton.value = "ダメかも..."



        likeButton.addEventListener("click", () => {
          // いいねのしょり
          fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/latest", {
              method: "GET"
            })
            .then(r => r.json())
            .then((data) => {
              for (let j = 0; j < data.length; j++) {
                if (data[j].id === task.id) {
                  data[j].like++
                }
              }

              fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/", {
                method: "PUT",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(data)
              })
              .then(() => {
                update()
              })

            })
        })


        dislikeButton.addEventListener("click", () => {
          // 悪いねのしょり
          fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/latest", {
              method: "GET"
            })
            .then(r => r.json())
            .then((data) => {
              for (let j = 0; j < data.length; j++) {
                if (data[j].id === task.id) {
                  data[j].dislike++
                }
              }

              console.log(data);

              fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/", {
                method: "PUT",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(data)
              })
              .then(() => {
                update()
              })

            })
        })
        taskContainer.appendChild(taskP)
        taskContainer.appendChild(commentP)
        taskContainer.appendChild(likeP)
        taskContainer.appendChild(dislikeP)
        taskContainer.appendChild(img)
        taskContainer.appendChild(likeButton)
        taskContainer.appendChild(dislikeButton)
        taskListContainer.appendChild(taskContainer)
      }
    })
}
update()