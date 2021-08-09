const sendButton = document.getElementById("post_button")
const textInput = document.getElementById("title")
const pictureInput = document.getElementById("picture")
const commentInput = document.getElementById("comment")
const male = document.getElementById("man")
const female = document.getElementById("woman")

sendButton.addEventListener("click", () => {

    console.log("clicked")

    // 送信の処理
    fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f/latest", {
        method: "GET"
    })
        .then(r => r.json())
        .then((j) => {
            console.log(j)
            let titles = j
            let bigID = -99999
            let flag = 0 //未選択

            if(male.checked){
                flag = 1 //男
            }else if(female.checked){
                flag = 2 //女
            }
            
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
                dislike: 0,
                gender: flag
            }
            titles.push(task)

            fetch("https://api.jsonbin.io/b/6110a49bd5667e403a3c118f", {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(titles)
            })
                .then((_) => {
                    location.href = 'index.html'
                })

        })
})

