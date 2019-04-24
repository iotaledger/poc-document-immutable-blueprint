const dSeed = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORL9D'
const dAddress = 'MRDVKCDQAPYQOJEQTUWDMNYZKDUDBRNHJWV9VTKTCUUYQICLPFBETMYYVKEPFCXZE9EJZHFUWJZVEWUCWSGDUVMOYD'
const navMap = new Map();
navMap.set('/', { curP: '/', pageTitle: '1- Please choose your file and the Tangle to connect to', prev: null, next: '/sign'})
      .set('/sign', {curP: '/sign', pageTitle: '2- Sign Document (Optional if you have already signed a document)', prev: '/', next: '/verif'})
      .set('/verif', {curP: '/verif', pageTitle: '3- Verify Document', prev: '/sign', next: null})

export {
  dSeed,
  dAddress,
  navMap
}
