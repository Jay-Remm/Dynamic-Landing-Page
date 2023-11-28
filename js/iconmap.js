export const ICON_MAP = new Map()

// map codes are from the openweathermap api documentation
addMapping([800], 'sun')
addMapping([801, 802], 'cloud-sun')
addMapping([803, 804], 'cloud')
addMapping([701, 711, 721, 731, 741, 751, 761, 762, 771, 781], 'cloud-haze')
addMapping([300, 301, 302, 310, 311, 312, 313, 314, 321], 'cloud-rain')
addMapping([500, 501, 502, 503, 504, 511, 520, 521, 522, 531], 'cloud-rain-heavy')
addMapping([600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622], 'snow')
addMapping([200, 201, 202, 210, 211, 212, 221, 230, 231, 232], 'cloud-lightning-rain')

// helper function because alot of our map indexes are going to have the same icon value
function addMapping(values, icon) {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}