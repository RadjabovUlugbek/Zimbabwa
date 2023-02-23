let api = products
let template = renderElement("template").content
let fav_templ = renderElement(".favaurite_par").content
let ul_parent = renderElement(".parrots-wrapper")
let local_par = renderElement(".local_par")
let parent_clone = renderElement(".parent_clone")
let local_star = []
let input_name = renderElement(".name")
let input_from = renderElement("#from")
let input_to = renderElement("#to")
let from_width = renderElement("#from_width")
let to_width = renderElement("#to_width")
let from_height = renderElement("#from_height")
let to_height = renderElement("#to_height")
let selectSort = renderElement("#sortby")
let count = renderElement(".count span")
let date = new Date()
let secondForm = renderElement(".secondForm")
let create_name = renderElement("#parrot-title")
let create_price = renderElement("#price")
let create_date = renderElement("#parrot-date")
let create_width = renderElement("#parrot_width")
let create_height = renderElement("#parrot_height")
function handleStar(e) {
    let getStar = Number(e.target.dataset.id)
    for (let i = 0; i < api.length; i++) {
        if (api[i].id === getStar) {
            if (!local_star.includes(api[i])) {
                local_star = [...local_star, api[i]]
                window.localStorage.setItem("api", JSON.stringify(local_star))
                let parse = JSON.parse(window.localStorage.getItem("api"))
                getLocal(parse)
            }
        }
    }
}
function handleRemove(e) {
    let id = e.target.dataset.id - 0
    let parse = JSON.parse(window.localStorage.getItem("api"))
    parse.map((item, index) => {
        if (item.id === id) {
            parse.splice(index, 1)
            window.localStorage.setItem("api", JSON.stringify(parse))
            let parent = e.target.parentNode
            parent.remove()
            local_render(parse)
        }
    })
}
function local_render(arr) {
    return arr
}
function getLocal(arr) {
    let result = local_render(JSON.parse(window.localStorage.getItem("api")))
    if (result.length > 0) {
        local_par.innerHTML = null
        result.map(item => {
            let template_local = renderElement(".favaurite_par").content
            let clone = template_local.cloneNode(true)
            let name = clone.querySelector(".parent_clone h3")
            name.textContent = item.title
            let remove_btn = clone.querySelector(".remove")
            remove_btn.addEventListener("click", handleRemove)
            remove_btn.dataset.id = item.id
            local_par.appendChild(clone)
        })
    }
}
getLocal()
function renders(e) {
    ul_parent.innerHTML = null
    if (e.length > 0) {
        count.textContent = e.length
        e.forEach(item => {
            let clone = template.cloneNode(true)
            let img = clone.querySelector("img")
            img.src = item.img
            let name = clone.querySelector(".card-title")
            name.textContent = item.title
            let narx = clone.querySelector(".fw-bold mark")
            narx.textContent = "$ " + item.price
            let widthHeight = clone.querySelector(".bg-success")
            widthHeight.textContent = item.sizes.width + " x " + item.sizes.height
            let birthDate = clone.querySelector(".birthDate")
            let star_parent = clone.querySelector(".star")
            star_parent.dataset.id = item.id
            star_parent.addEventListener("click", handleStar)
            birthDate.textContent = item.birthDate
            ul_parent.appendChild(clone)
        })
    } else {
        error()
    }
}
let error = () => {
    let h1 = creteTag("h1")
    h1.innerHTML = "Topilmadi !"
    h1.style.color = "red"
    ul_parent.appendChild(h1)
}
renders(api)
let form = renderElement("form")
window.addEventListener("click", (e) => {
    if (e.target.matches(".delete_zimbabwa")) {
        let del_btn = e.target.parentNode
        let parent = del_btn.parentNode
        let par = parent.parentNode
        par.remove()
    }
})
let birth = (dats) => {
    let date = new Date(dats)
    return date
}
let select = {
    name(a, b) {
        if (a.title < b.title) {
            return -1
        } else {
            return 1
        }
    }, price_low(a, b) {
        if (a.price < b.price) {
            return -1
        } else {
            return 1
        }
    }, price_hi(a, b) {
        if (a.price < b.price) {
            return 1
        } else {
            return -1
        }
    }, birth_hi(a, b) {
        if (birth(a.birthDate) < birth(b.birthDate)) {
            return -1
        } else {
            return 1
        }
    }, birth_low(a, b) {
        if (birth(a.birthDate) > birth(b.birthDate)) {
            return -1
        } else {
            return 1
        }
    }
}
let filter = []
function handleSub(e) {
    e.preventDefault()
    let regex = new RegExp(input_name.value, "gi")
    if (input_name.value !== "all") {
        filter = products.filter((item) => item.title.match(regex))
    } else if (input_name.value === "all") {
        filter = products
    } else if (input_from.value !== null && input_to.value !== null) {
        filter = products.filter((item) => item.price > input_from.value)
        filter = filter.filter((item) => item.price < input_to.value)
    } else if (from_width.value !== null || to_width.value !== null) {
        filter = products.filter((item) => item.sizes.width > from_width.value)
        filter = filter.filter((item) => item.sizes.width < to_width.value)
    } else if (from_height.value !== null || to_height.value !== null) {
        filter = products.filter((item) => item.sizes.height > from_height.value)
        filter = filter.filter((item) => item.sizes.height < to_height.value)
    }
    if (selectSort.value !== null) {
        filter = products.sort(select[selectSort.value])
        console.log(selectSort.value);
        console.log(filter);
    }
    renders(filter)
}
form.addEventListener("submit", handleSub)
let imgs = [
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAds32_wnkoPRZcuM5B3QwojkduIGwfz_T3A&usqp=CAU",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jMU4BWPpkmiWyD6upNaZczq-2NIUVKkGRA&usqp=CAU",

       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5stUE8a0H-bBcVxUDMnXRAnv2-jUFDdVIpQ&usqp=CAU"
]

var randomNum = Math.floor(Math.random() * imgs.length);
let randomImg = imgs[randomNum]

function handleSecond(e) {
    e.preventDefault()
    let results = [
        {
            id: 1,
            title: create_name.value,
            img: randomImg,
            price: create_price.value,
            birthDate: create_date.value,
            sizes: {
                width: create_width.value,
                height: create_height.value,
            },
            isFavorite: false,
            features: ""
        },
    ]
    for (let i = 0; i < results.length; i++) {
        api = [...api, results[i]]
    }
    renders(api)
}
secondForm.addEventListener("submit", handleSecond)