let expect = require('chai').expect

function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}


describe('RGB to HEX', function () {
    it('should return #FF9EAA for (255, 158, 170)',function () {
        expect(rgbToHexColor(255, 158, 170)).to.equal('#FF9EAA')
    })

    it('should return #000000 for (0, 0, 0)',function () {
        expect(rgbToHexColor(0, 0, 0)).to.equal('#000000')
    })

    it('should return #FFFFFF for (255, 255, 255)',function () {
        expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF')
    })

    it('should return undefined for (0, -1, 0)',function () {
        expect(rgbToHexColor(0, -1, 0)).to.equal(undefined)
    })

    it('should return undefined for (0, 0, 256)',function () {
        expect(rgbToHexColor(0, 0, 256)).to.equal(undefined)
    })

    it('should return undefined for (2.25, 0, 0)',function () {
        expect(rgbToHexColor(2.25, 0, 0)).to.equal(undefined)
    })

    it('should return undefined for ("5", [3], {8:9})',function () {
        expect(rgbToHexColor("5", [3], {8:9})).to.equal(undefined)
    })

})
