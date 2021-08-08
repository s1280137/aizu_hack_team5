const taskListContainer = document.getElementById("tasks")
let tasks = []

function update() {

  while (taskListContainer.firstChild !== null) {
    taskListContainer.removeChild(taskListContainer.firstChild)
  }
  fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2/latest")
    .then(r => r.json())
    .then(j => {
      tasks = j

      tasks.sort(function (a, b) {
        if (a.like < b.like) {
          return 1;
        } else {
          return -1;
        }
      })

      for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i]

        const taskContainer = document.createElement("div")
        taskContainer.className = "taskContainer"

        const flexer = document.createElement("div")
        flexer.className = "flexer"

        const picture = document.createElement("div")
        picture.className = "picture"

        const other = document.createElement("div")
        other.className = "other"


        const taskP = document.createElement("p")
        taskP.className = "titleP"
        const commentP = document.createElement("p")
        commentP.className = "commentP"
        const likeP = document.createElement("p")
        likeP.className = "likeP"
        const dislikeP = document.createElement("p")
        dislikeP.className = "dislikeP"

        const img = document.createElement("img")
        img.className = "imgP"

        // タグ設定
        taskP.textContent = task.title
        commentP.textContent = "コメント:" + task.comment
        likeP.textContent = task.like + " zuzu"
        dislikeP.textContent = task.dislike + " ダメかも"
        taskContainer.id = task.id
        img.src = task.img
        img.width = 216

        const likeButton = document.createElement("input")
        likeButton.type = "button"
        likeButton.value = "ZUZU!"

        const dislikeButton = document.createElement("input")
        dislikeButton.type = "button"
        dislikeButton.value = "ダメかも..."

        const hoge1 = document.getElementById('gender-all')
        const hoge2 = document.getElementById('gender-man')
        const hoge3 = document.getElementById('gender-woman')

        hoge1.addEventListener("click", () => {
            document.getElementById('gender-man').style.display = "";
            document.getElementById('gender-woman').style.display = "";
        })
        hoge2.addEventListener("click", () => {
            document.getElementById('gender-man').style.display = "";
            document.getElementById('gender-woman').style.display = "none";
        })
        hoge3.addEventListener("click", () => {
            document.getElementById('gender-man').style.display = "none";
            document.getElementById('gender-woman').style.display = "";
        })


        likeButton.addEventListener("click", () => {
          // いいねの処理
          fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2/latest", {
            method: "GET"
          })
            .then(r => r.json())
            .then((data) => {
              for (let j = 0; j < data.length; j++) {
                if (data[j].id === task.id) {
                  data[j].like++
                  likeP.textContent = data[j].like + " zuzu"
                }
              }

              fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2/", {
                method: "PUT",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(data)
              })
                // .then(() => {
                //   update()
                // })

            })
        })


        dislikeButton.addEventListener("click", () => {
          // ダメかも...の処理
          fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2/latest", {
            method: "GET"
          })
            .then(r => r.json())
            .then((data) => {
              for (let j = 0; j < data.length; j++) {
                if (data[j].id === task.id) {
                  data[j].dislike++
                  dislikeP.textContent = data[j].dislike + " ダメかも"
                }
              }

              console.log(data);

              fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2/", {
                method: "PUT",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(data)
              })
                // .then(() => {
                //   update()
                // })
            })
        })
        other.appendChild(taskP)
        other.appendChild(commentP)
        other.appendChild(likeP)
        other.appendChild(likeButton)
        other.appendChild(dislikeP)
        other.appendChild(dislikeButton)
        picture.appendChild(img)

        flexer.appendChild(picture)
        flexer.appendChild(other)
        taskListContainer.appendChild(flexer)
      }
    })
}
update()