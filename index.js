//light control
const profileImageBox = document.querySelectorAll('.profileImageBox')
for(profileImage in profileImageBox){
    let lightOn = true
    if(profileImage<profileImageBox.length){
        const index = parseInt(profileImage)
        profileImageBox[index].children[0].addEventListener('click',()=>{
            if(lightOn == true){
                profileImageBox[index].children[0].src = "./icon/lightOff.png"
                profileImageBox[index].children[1].children[1].style.opacity = "1"
                lightOn = false
            }else{
                profileImageBox[index].children[0].src = "./icon/lightOn.png"
                profileImageBox[index].children[1].children[1].style.opacity = "0"
                lightOn = true
            }
        })
    }
}

//music control
const musicListSrc = ['fong/fourtour', 'fong/lovesong', 'fong/threetour','fong/noodles', 'yu/finallysaid', 'yu/transition', 'yu/warm', 'yu/howcanforgetyou', 'jsheon/youwillneverknow', 'jsheon/speciallymade', 'jsheon/ballad', 'jsheon/no', '9m88/aimhigh', '9m88/loverain', '9m88/walkingtowardsme', '9m88/tellme', 'karencici/sorrymama', 'karencici/ihateyou1000', 'karencici/dododo', 'karencici/sorrynotsorry']
const musicListName = ['四人遊', 'Love Song', '三人遊', '麵麵', '終於說出口', '過渡期', '慣性取暖', '怎麼忘記了你','別問很可怕', '壞蛋特調', '輸情歌', '不良示範', 'Aim High', '愛情雨', '朝我的方向走來', 'Tell Me', 'Sorry Mama', 'ihateyou1000', 'Do Do Do', 'Sorry Not Sorry' ]
const musicListSinger = ['方大同', '方大同', '方大同', '方大同', '小宇', '小宇', '小宇', '小宇', 'J.Sheon', 'J.Sheon', 'J.Sheon', 'J.Sheon', '9m88', '9m88', '9m88', '9m88', 'Karencici', 'Karencici', 'Karencici', 'Karencici' ]
const myMusic = document.getElementById('myMusic')
const audio = document.getElementById('audio')
const headphones = document.querySelectorAll('.headphone')
console.log(myMusic.children[1].children[2].children[0])
for(headphone in headphones){
    let currentPlaying = 0
    if(headphone<headphones.length){
        const index = parseInt(headphone)
        headphones[index].addEventListener('click',()=>{
            myMusic.children[0].style.right = "-100px"
            myMusic.children[1].style.transform = "translateX(0%)"
            myMusic.children[1].children[0].innerHTML = `${musicListName[index]}`
            myMusic.children[1].children[1].innerHTML = `${musicListSinger[index]}`
            myMusic.children[1].children[2].children[0].src = `./${musicListSrc[index]}.mp3`
            audio.play()
        })
    }
}
myMusic.children[0].addEventListener('click',()=>{
    myMusic.children[0].style.right = "-100px"
    myMusic.children[1].style.transform = "translateX(0%)"
})
const musicBoxHide = document.getElementById('musicBoxHide')
musicBoxHide.addEventListener('click',()=>{
    myMusic.children[1].style.transform = "translateX(150%)"
    myMusic.children[0].style.right = "20px"
})

//menu control
const menu = document.getElementById('menu')
const outerWrap = document.getElementById('outerWrap')
outerWrap.addEventListener('scroll', ()=>{
    if( outerWrap.scrollTop > 1444){
        menu.style.visibility = "visible"
        menu.style.opacity = "1"
    }else{
        menu.style.visibility = "hidden"
        menu.style.opacity = "0"
    }
})

//my stamp control
const myStamp = document.getElementById('myStamp')
const myStampCard = document.getElementById('myStampCard')
const myStampCardClose = document.getElementById('myStampCardClose')
const myStampAlert = document.getElementById('myStampAlert')
let stampCardOpen = false
myStamp.addEventListener('mouseover', ()=>{
    myStamp.src = "./icon/myStampHover.png"
})
myStamp.addEventListener('mouseout', ()=>{
    myStamp.src = "./icon/myStamp.png"
})
myStamp.addEventListener('click', ()=>{
    myStampCard.style.visibility = "visible"
    myStampCard.style.opacity = "1"
    myStampAlert.innerText = "--你手上沒有拿印章ㄟ--"
    allStampCollected()
})
myStampCardClose.addEventListener('click',()=>{
    myStampCard.style.visibility = "hidden"
    myStampCard.style.opacity = "0"
    stampCardOpen = false
})


//stamp stop control
const stampList = ['welcome', 'fong', 'yu', 'jsheon', '9m88', 'karencici']
let stampHave = [false, false, false, false, false, false]
const stampStops = document.querySelectorAll('.stampStop')
const stampPlace = document.getElementById('stampPlace')
const stampCard = document.getElementById('stampCard')
const myStampCardDownload = document.getElementById('myStampCardDownload')
let stampPositionX = 0
let stampPositionY = 0
let stampStyle = document.createElement('style')
document.head.append(stampStyle)
let CurrentStampStop = 0
for(stamp in stampStops){
    if(stamp<stampStops.length){
        const index = parseInt(stamp)
        stampStops[index].addEventListener('click',()=>{
            myStampAlert.innerText = "--把滑鼠點在你想蓋章的地方--"
            myStampCard.style.visibility = "visible"
            myStampCard.style.opacity = "1"
            stampCardOpen = true
            CurrentStampStop = index
        })
    }
}
stampPlace.addEventListener('click',(e)=>{
    console.log('here in')
    if(stampCardOpen == true && stampHave[CurrentStampStop] ==false){
        stampPositionX = e.x
        stampPositionY = e.y
        stampStyle.innerHTML += `
            .stampStyle${CurrentStampStop}{
            top:${stampPositionY}px;
            left:${stampPositionX}px;
            }`
        document.head.style.innerHTML = stampStyle.innerHTML
        const img = document.createElement('img')
        img.src =  `./icon/${stampList[CurrentStampStop]}.png`
        img.classList.add('stampStyle')
        img.classList.add(`stampStyle${CurrentStampStop}`)
        myStampCard.append(img)
        stampHave[CurrentStampStop] = true
    }else if(stampCardOpen == true && stampHave[CurrentStampStop] ==true){
        myStampAlert.innerText = "--這個好像蓋過了--"
    }else if(stampCardOpen == false){
        myStampAlert.innerText = "--你手上沒有拿印章ㄟ--"
    }
    allStampCollected()
})
stampCard.addEventListener('click',()=>{
    if(stampCardOpen == true && stampHave[CurrentStampStop] ==false){
        myStampAlert.innerText = "--蓋那邊會超出去ヽ(#`Д´)ﾉ--"
    }else if(stampCardOpen ==false){
        myStampAlert.innerText = "--你手上沒有拿印章ㄟ--"
    }
})

function allStampCollected(){
    let stampNumber = 0
    console.log(stampHave)
    stampHave.forEach((value)=>{
        if(value == true) stampNumber++
    })
    if(stampNumber == 6){
        myStampCardComplete.style.display = "block"
    }
}

//music video room control
const mvRooms = document.querySelectorAll('.mvRoom')
const iframe =document.getElementsByTagName('iframe')
console.log(iframe)
const youtube = document.getElementById('youtubeMV')
const mv = document.getElementById('mv')
const mvBackground = document.getElementById('mvBackground')
let currentRoom = 0
for(room in mvRooms){
    if(room < mvRooms.length){
        const index = parseInt(room)
        mvRooms[index].addEventListener('click', ()=>{
            currentRoom = index
            mv.style.display = "block"
            iframe[currentRoom].style.display = "block"
        })
    }
}

mvBackground.addEventListener('click',()=>{
    iframe[currentRoom].src = iframe[currentRoom].src
    iframe[currentRoom].style.display = "none"
    mv.style.display = "none"
})