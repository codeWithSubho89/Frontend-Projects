let filters ={
    brightness: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value:0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value:0,
        min: 0,
        max: 20,
        unit: "px"
    },
    greyScale: {
        value:0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }

}
const canvas = document.querySelector('#image-canvas')
const ctx = canvas.getContext('2d');
const imageFile = document.querySelector('#image-input')
const reserBtn = document.querySelector('#reset-btn')
const downloadBtn = document.querySelector('#download-btn')
let image = null;

function createFilterElement(name,value,min,max,unit){
    const div = document.createElement('div');
    div.classList.add('filter');
    const p = document.createElement('p');
    p.textContent = name;
    const input = document.createElement('input');
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id= name;

    div.appendChild(p)
    div.appendChild(input)

     input.addEventListener('input',(e)=>{
        filters[name].value = input.value
        applyFilters()
    })

    return div;
}

function renderFilters(){
    Object.keys(filters).forEach(filter=>{
    const filterArea = document.querySelector('.filters')
    const {value,min,max,unit} = filters[filter]
    filterArea.appendChild(createFilterElement(filter,value,min,max,unit))
})
}
renderFilters()


imageFile.addEventListener('change',(e)=>{
    const files = e.target.files;
    document.querySelector('.placeholder-image').style.display="none";
    
    const img = new Image();
    img.src = URL.createObjectURL(files[0]);

    img.onload = () =>{
        image = img;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0);
    }
})

function applyFilters(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
                  blur(${filters.blur.value}${filters.blur.unit})
                  contrast(${filters.contrast.value}${filters.contrast.unit})
                  grayscale(${filters.greyScale.value}${filters.greyScale.unit})
                  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
                  invert(${filters.invert.value}${filters.invert.unit})
                  opacity(${filters.opacity.value}${filters.opacity.unit})
                  saturate(${filters.saturation.value}${filters.saturation.unit})
                  sepia(${filters.sepia.value}${filters.sepia.unit})`.trim()
    ctx.drawImage(image,0,0)
}
reserBtn.addEventListener('click',()=>{
    filters ={
    brightness: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value:0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value:0,
        min: 0,
        max: 20,
        unit: "px"
    },
    greyScale: {
        value:0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }

    }
    applyFilters()
    const filterArea = document.querySelector('.filters')
    filterArea.innerHTML =""
    createFilterElement()
    renderFilters()
   
})

downloadBtn.addEventListener('click',()=>{
    const a = document.createElement('a');
    a.download ="edited-img.jpg"
    a.href = canvas.toDataURL()
    a.click()
})

const filterPresets = {
    // RESET
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        greyScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    // 📸 VINTAGE / OLD STYLE
    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        sepia: 40,
        hueRotation: 8
    },

    oldSchool: {
        brightness: 105,
        contrast: 85,
        saturation: 70,
        sepia: 60
    },

    retro: {
        brightness: 115,
        contrast: 95,
        saturation: 75,
        hueRotation: 12,
        sepia: 30
    },

    fadedFilm: {
        brightness: 120,
        contrast: 80,
        saturation: 65
    },

    // 🎭 DRAMATIC / CINEMATIC
    drama: {
        brightness: 95,
        contrast: 150,
        saturation: 130
    },

    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 120,
        hueRotation: 200
    },

    moody: {
        brightness: 90,
        contrast: 140,
        saturation: 110
    },

    noir: {
        greyScale: 100,
        contrast: 150,
        brightness: 90
    },

    // 🌞 WARM / COLD TONES
    warmGlow: {
        brightness: 108,
        contrast: 110,
        saturation: 125,
        hueRotation: 10
    },

    summer: {
        brightness: 115,
        contrast: 105,
        saturation: 140
    },

    coolTone: {
        brightness: 95,
        contrast: 110,
        saturation: 110,
        hueRotation: 190
    },

    icy: {
        brightness: 100,
        contrast: 120,
        saturation: 90,
        hueRotation: 210
    },

    // ⚫ BLACK & WHITE VARIANTS
    blackAndWhite: {
        greyScale: 100,
        contrast: 120
    },

    highContrastBW: {
        greyScale: 100,
        contrast: 160,
        brightness: 95
    },

    softBW: {
        greyScale: 100,
        contrast: 90,
        brightness: 110
    },

    // ✨ ARTISTIC / CREATIVE
    dreamy: {
        brightness: 110,
        contrast: 90,
        saturation: 120,
        blur: 3
    },

    pastel: {
        brightness: 115,
        contrast: 85,
        saturation: 110
    },

    softLight: {
        brightness: 105,
        contrast: 95,
        saturation: 105
    },

    // 🔥 STRONG EFFECTS
    bleach: {
        brightness: 120,
        contrast: 130,
        saturation: 60
    },

    inverted: {
        invert: 100
    },

    sepiaStrong: {
        sepia: 80,
        brightness: 105
    }
};

Object.keys(filterPresets).forEach(preset=>{
    const button = document.createElement('button')
    const presetContainer = document.querySelector('.preset-comtainer')
    button.classList.add('btn')
    button.textContent = preset;
    presetContainer.appendChild(button)

    button.addEventListener('click',()=>{
        const filter = filterPresets[preset]
        Object.keys(filter).forEach(name=>{
            filters[name].value = filter[name]
        })
        applyFilters()
        const filterArea = document.querySelector('.filters')
        filterArea.innerHTML =""
        createFilterElement()
        renderFilters()    
    })
})