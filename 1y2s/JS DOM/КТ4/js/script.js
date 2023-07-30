let data = document.forms.namedItem("data_input")
    let thumbnail_banks = document.getElementById("thumbnail_banks")
    let thumbnail_type = document.getElementById("thumbnail_type")
    let thumbnail_number = document.getElementById("thumbnail_number")
    let thumbnail_holder = document.getElementById("thumbnail_holder")
    let thumbnail_date = document.getElementById("thumbnail_date")
    let banks_imgs = {
        'Сбербанк': 'sberbank.png',
        'ВТБ': 'vtb.png',
        'Райфайзен': 'rayfayzen.png'
    }
    let card_imgs = {
        'VISA': 'visa.png',
        'MasterCard': 'MasterCard.png',
        'МИР': 'mir.png'
    }
    data.addEventListener("input", (e) =>{
        let banks = data.elements.namedItem("banks")
        let cards = data.elements.namedItem("cards")
        let number = data.elements.namedItem("number")
        let holder = data.elements.namedItem("holder")
        let month = data.elements.namedItem("month")
        let year = data.elements.namedItem("year")
        changeBgImg(thumbnail_banks, banks_imgs[banks.value])
        changeBgImg(thumbnail_type, card_imgs[cards.value])
        if (hasOnlyDigits(number.value)){
            thumbnail_number.innerText = numberWithSpaces(number.value)
        } else {
            number.value = number.value.slice(0, -1)
        }
        if (hasOnlyLettersAndSpaces(holder.value)){
            holder.value = holder.value.toUpperCase()
            thumbnail_holder.innerText = holder.value
        } else {
            holder.value = holder.value.slice(0, -1)
            thumbnail_holder.innerText = holder.value
        }
        if (hasOnlyDigits(month.value)){
            thumbnail_date.firstElementChild.innerText = month.value.padStart(2, '0')
        } else {
            month.value = month.value.slice(0, -1)
        }
        if (hasOnlyDigits(year.value)){
            thumbnail_date.lastElementChild.innerText = year.value.padStart(2, '0')
        } else {
            year.value = year.value.slice(0, -1)
        }
    })
    data.addEventListener("submit", function(e) {
        e.preventDefault();
        let completedFields = {}
        for (let i = 0; i < data.elements.length; i++) {
            let el = data.elements[i];
            if (el.name) {
                completedFields[el.name] = false;
            }
        }
        let banks = data.elements.namedItem("banks").value
        let cards = data.elements.namedItem("cards").value
        let number = data.elements.namedItem("number").value
        let holder = data.elements.namedItem("holder").value
        let month = data.elements.namedItem("month").value
        let year = data.elements.namedItem("year").value
        if (!checkSelect(banks)) {
            completedFields["banks"] = false
            clearField("banks")
        } else {
            completedFields["banks"] = true
        }
        if (!checkSelect(cards)) {
            completedFields["cards"] = false
            clearField("cards")
        } else completedFields["cards"] = true
        if (!checkCardNumber(number)){
            completedFields["number"] = false
            clearField("number")
        } else completedFields["number"] = true
        if (!checkCardHolder(holder)){
            completedFields["holder"] = false
            clearField("holder")
        } else completedFields["holder"] = true
        if(!checkDate(month, year)) {
            completedFields["month"] = false
            completedFields["year"] = false
            clearField("month")
            clearField("year")
        } else {
            completedFields["month"] = true
            completedFields["year"] = true
        }
        if (Object.keys(completedFields).every(elem => completedFields[elem] == true)) {
            let cardData = []
            cardData.push(banks, cards, number, holder, month + '/' + year)
            addInfoToTable(cardData)
            clearAll()
        }
        else {
            alert("Надо корректно заполнить все поля")
        }
    })
    function addInfoToTable(arr){
        let table = document.getElementById("table")
        let row = table.insertRow()
        for(let i = 0; i < arr.length; i++){
            let cell = row.insertCell()
            cell.innerText = arr[i]
        }
    }
    let hasOnlyDigits = (v) => /^\d+$/.test(v)
    let hasOnlyLettersAndSpaces = (v) => {
        return /^[A-Za-z\s]*$/.test(v)
    }
    function checkSelect(selectedItem){
        if (selectedItem === ""){
            return false
        }
        return true
    }
    function checkCardNumber(number){
        if(number.length < 16 || number.length > 16){
            return false
        }
        return true
    }
    function checkCardHolder(holder){
        if(/^\s*$/.test(holder)){
            return false
        }
        return true
    }
    function checkDate(month, year){
        let now = new Date()
        if(Number(month) > 0 && Number(month) <= 12){
            if (Number(year) > now.getFullYear() % 100) {
                return true
            } else if (Number(month) >= now.getMonth() + 1 && Number(year) == now.getFullYear() % 100) {
                return true
            } else {
                return false
            }
        }
    }
    function clearField(field){
        data.elements.namedItem(field).value = ""
    }
    function clearAll(){
        document.querySelectorAll('input, select').forEach(el=>el.value = '')
        changeBgImg(thumbnail_banks, '')
        changeBgImg(thumbnail_type, '')
        thumbnail_number.innerText = '0000 0000 0000 0000'
        thumbnail_holder.innerText = ''
        thumbnail_date.firstElementChild.innerText = '00'
        thumbnail_date.lastElementChild.innerText = '00'
    }
    function numberWithSpaces(num) {
        return num.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ")
    }
    function changeBgImg(elem, img){
        elem.style.backgroundImage = `url('img/${img}')`
    }
    
    
