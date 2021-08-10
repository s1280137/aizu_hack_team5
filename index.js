const taskListContainer = document.getElementById("tasks")

const allGender = document.getElementById('gender-all')
const man = document.getElementById('gender-man')
const woman = document.getElementById('gender-woman')

allGender.addEventListener("click", () => {
  fake_update(0)
})
man.addEventListener("click", () => {
  fake_update(1)
})
woman.addEventListener("click", () => {
  fake_update(2)
})

function fake_update(gender) {
  while (taskListContainer.firstChild !== null) {
    taskListContainer.removeChild(taskListContainer.firstChild)
  }

  // loading print

  const loading = document.createElement("div")
  loading.textContent = "読み込んでいます..."

  taskListContainer.appendChild(loading)

  setTimeout(() => { update(gender) }, 1500) // 3秒待つ
}

function update(gender) {

  let tasks = []

  taskListContainer.innerHTML = "";

  fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f/latest")
    .then(r => r.json())
    .then(j => {
      tasks = j

      tasks = tasks.sort(function (a, b) {
        if (a.like < b.like) {
          return 1;
        } else {
          return -1;
        }
      })

      if (gender === 1) {
        //男だけをtasksからとってくる
        tasks = tasks.filter(tasks => tasks.gender === 1)
      } else if (gender === 2) {
        //女だけをtasksからとってくる
        tasks = tasks.filter(tasks => tasks.gender === 2)
      }

      for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i]

        const likeButton = document.createElement("input")
        likeButton.type = "button"
        likeButton.value = "ZUZU!"

        const dislikeButton = document.createElement("input")
        dislikeButton.type = "button"
        dislikeButton.value = "ダメかも..."

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
        const genderP = document.createElement("p")
        genderP.className = "genderP"

        const img = document.createElement("img")
        img.className = "imgP"

        // タグ設定
        taskP.textContent = task.title
        commentP.textContent = "コメント:" + task.comment
        likeP.textContent = task.like + " zuzu"
        dislikeP.textContent = task.dislike + " ダメかも"
        genderP.textContent = task.gender == 0 ? "無性" : task.gender == 1 ? "男性" : "女性"
        taskContainer.id = task.id
        img.src = task.img
        img.width = 216


        likeButton.addEventListener("click", () => {
          // いいねの処理

          likeButton.disabled = true
          setTimeout(() => {
            likeButton.disabled = false
            fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f/latest", {
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

                fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f/", {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify(data)
                })
              })
          }, 1000) // 3秒待つ


        })


        dislikeButton.addEventListener("click", () => {
          // ダメかも...の処理
          dislikeButton.disabled = true
          setTimeout(() => {
            dislikeButton.disabled = false
            fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f/latest", {
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

                fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f/", {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify(data)
                })
              })
          }, 1000) // 3秒待つ

        })
        other.appendChild(taskP)
        other.appendChild(commentP)
        other.appendChild(likeP)
        other.appendChild(likeButton)
        other.appendChild(dislikeP)
        other.appendChild(dislikeButton)
        other.appendChild(genderP)
        picture.appendChild(img)

        flexer.appendChild(picture)
        flexer.appendChild(other)
        taskListContainer.appendChild(flexer)
      }
    })
}
fake_update(0)