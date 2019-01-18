/**
 * no need canvas container
 * two ways export qrcode:canvas & dataURL
 * image logo url must be support cors (except local)
 * @author wzc0x0@gmail.com
 * @description generate qrcode with logo
 * @param logoSize don't over 0.3
 * @param bgColor
 * @param borderSize
 * @param borderRadius
 * @param logoSrc
 *
 * @deprecated canvas options
 * @param width
 * @param margin
 * @param color
 */


import Qrcode from 'qrcode'

const generateQrcode = async(text, options = {}) => {
    if (!text) return Promise.reject('text param can not null!');

    let defaults = {
        logoSize: 0.15,
        bgColor: '#ffffff',
        borderSize: 0.05,
        borderRadius: 8,
        logoSrc: "",
        canvasOptions: {
            width: 100,
            margin: 4,
            errorCorrectionLevel: getErrorCorrectionLevel(text),
            color: {
                dark: "#000000ff",
                light: "#fff" //white
                    // light: "#000" //transparent
            }
        }
    }

    let defaultOptions = Object.assign({}, defaults, options)

    let canvasDom = document.createElement('canvas')
    canvasDom.width = defaultOptions.canvasOptions.width
    canvasDom.height = defaultOptions.canvasOptions.width

    let canvas = await Qrcode.toCanvas(canvasDom, text, defaultOptions.canvasOptions)

    if (defaultOptions.logoSrc) {
        let { logoSize, borderSize, borderRadius, bgColor } = defaultOptions
        let canvasWidth = canvas.width
        let logoWidth = canvasWidth * logoSize
        let logoXY = canvasWidth * (1 - logoSize) / 2
        let logoBgWidth = canvasWidth * (logoSize + borderSize)
        let logoBgXY = canvasWidth * (1 - logoSize - borderSize) / 2

        let ctx = canvas.getContext('2d')
        canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius)
        ctx.fillStyle = bgColor
        ctx.fill()

        let image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = defaultOptions.logoSrc
        return new Promise((reslove, reject) => {
            image.onload = e => {
                ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
                reslove(canvas)
            }
            image.onerror = e => reject(e)
        })

    } else {
        return Promise.resolve(canvas)
    }
}


const canvasRoundRect = ctx => (x, y, w, h, r) => {
    const minSize = Math.min(w, h)
    if (r > minSize / 2) {
        r = minSize / 2
    }
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    return ctx
}

const getErrorCorrectionLevel = text => {
    if (text.length > 36) {
        return 'M'
    } else if (text.length > 16) {
        return 'Q'
    } else {
        return 'H'
    }
}

export default generateQrcode