const dSeed = 'abcdef123456789abcdef123456789abcdef123456789abcdef123456789abcd'
const dAddress = 'MRDVKCDQAPYQOJEQTUWDMNYZKDUDBRNHJWV9VTKTCUUYQICLPFBETMYYVKEPFCXZE9EJZHFUWJZVEWUCWSGDUVMOYD'
const legacyPermanode =  'https://nodes.iota.cafe:443' // 'https://chronicle.iota.org/api'
const navMap = new Map();
navMap.set('/', { pageN: 0, curP: '/', pageTitle: '1- Please Choose Your File to Be Signed or Verified', prev: null, next: '/node'})
      .set('/node', { pageN: 1, curP: '/node', pageTitle: '2- Please Select Your Node to Connect To', prev: '/', next: '/sign'})
      .set('/sign', { pageN: 2, curP: '/sign', pageTitle: '3- Sign Document (Optional if You Already Have Signed a Document)', prev: '/node', next: '/verify'})
      .set('/verify', { pageN: 3, curP: '/verify', pageTitle: '4- Verify Document', prev: '/sign', next: null})

export {
  dSeed,
  dAddress,
  legacyPermanode,
  navMap
}
