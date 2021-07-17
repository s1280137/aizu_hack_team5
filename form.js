const sendButton = document.getElementById("post_button")
const textInput = document.getElementById("title")
const pictureInput = document.getElementById("picture")
const commentInput = document.getElementById("comment")

sendButton.addEventListener("click", () => {
    // 送信の処理
    fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/latest", {
        method: "GET"
    })
        .then(r => r.json())
        .then((j) => {
            console.log(j)
            let titles = j
            let bigID = -99999

            titles.forEach(d => {
                if (bigID < d.id) {
                    bigID = d.id
                }
            })
            const task = {
                id: bigID + 1,
                title: textInput.value,
                comment: commentInput.value,
                img: pictureInput.value,
                like: 0,
                dislike: 0
            }
            titles.push(task)

            fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1", {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(titles)
            })
            textInput.value = ""
            pictureInput.value = ""
            commentInput.value = ""

        })
})

