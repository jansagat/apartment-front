import firebase from 'firebase/app'
import 'firebase/storage'

async function getDownloadLinks (files) {
  if (files && files.length > 0) {
    let filesDownloadLinks = []
    const storageRef = firebase.storage().ref()
    try {
      for (let i = 0; i < files.length; i++) {
        let downloadLink = _cutParams(await storageRef.child(files[i]).getDownloadURL())
        filesDownloadLinks.push(downloadLink)
      }
      return filesDownloadLinks
    } catch (e) {
      console.error(e)
      return []
    }
  }
  return []
}

function _cutParams (url) {
  return url.replace(/&token(=[^&]*)?|^token(=[^&]*)?&?/, '')
}

export {
  getDownloadLinks
}
