const sendButton = document.getElementById("post_button")
const textInput = document.getElementById("title")
const pictureInput = document.getElementById("picture")
const commentInput = document.getElementById("comment")
const male = document.getElementById("man")
const female = document.getElementById("woman")

sendButton.addEventListener("click", () => {

    console.log("clicked")

    // 送信の処理
    fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2/latest", {
        method: "GET"
    })
        .then(r => r.json())
        .then((j) => {
            console.log(j)
            let titles = j
            let bigID = -99999
            let flag = 0

            if(male.checked){
                flag = 1
            }else if(female.checked){
                flag = 2
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

            fetch("https://api.jsonbin.io/b/610505d7046287097ea3e8c2", {
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

