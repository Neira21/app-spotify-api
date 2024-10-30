import PropType from 'prop-types'
import Styles from './AlbumImage.module.css'
const AlbumImage = ({uri}) => {

  AlbumImage.propTypes = {
    uri: PropType.string
  }


  return (
    <div className={`${Styles.albumImage}`}>
      <img src={uri} alt="album-art" className={`${Styles.albumImageArt}`} />
      <div>
        <img src={uri} alt="shadow" className={`${Styles.albumimageShadow}`} />
      </div>
    </div>
  )
}

export default AlbumImage