const dSeed = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORL9D'
const dAddress = 'MRDVKCDQAPYQOJEQTUWDMNYZKDUDBRNHJWV9VTKTCUUYQICLPFBETMYYVKEPFCXZE9EJZHFUWJZVEWUCWSGDUVMOYD'
const navMap = new Map();
navMap.set('/', { curP: '/', pageTitle: '1- Please choose your file to be signed or verified', prev: null, next: '/node'})
      .set('/node', { curP: '/node', pageTitle: '2- Please Select your Node to connect to', prev: '/', next: '/sign'})
      .set('/sign', {curP: '/sign', pageTitle: '3- Sign Document (Optional if you have already signed a document)', prev: '/node', next: '/verif'})
      .set('/verif', {curP: '/verif', pageTitle: '4- Verify Document', prev: '/sign', next: null})

export {
  dSeed,
  dAddress,
  navMap
}
