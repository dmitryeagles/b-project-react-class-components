import { useEffect, useState } from 'react'
import { ReactPhotoEditor } from './components/ReactPhotoEditor'

type PhotoEditorProps = {
    file?: File
    open: boolean
    onClose: () => void
    onSaveImage: (image: File) => void
    downloadOnSave: boolean
    img: string
}

function PhotoEditor(props: PhotoEditorProps) {
  const [file, setFile] = useState<File | undefined>(props.file)
  const [img, setImg] = useState<string | undefined>(props.img)
  const [showModal, setShowModal] = useState<boolean>(props.open)

  const hideModal = () => {
    props.onClose()
    setShowModal(false)
  }
  const handleSaveImage = (editedFile: File) => {
    setFile(editedFile);
    props.onSaveImage(editedFile)
  };

  useEffect(()=> {
    if(props.file){
        setFile(props.file)
    }
  }, [props.file])

  useEffect(()=> {
    setShowModal(props.open)
  }, [props.open])
  
  useEffect(()=> {
    setImg(props.img)
  }, [props.img])

  return (
    <div>
      <ReactPhotoEditor
        open={showModal}
        img={img}
        onClose={hideModal}
        allowFlip={true}
        allowRotate={true}
        allowZoom={true}
        onSaveImage={handleSaveImage}
        downloadOnSave={props.downloadOnSave}
        modalWidth={'min-content'}
      />
    </div>
  )
}

export default PhotoEditor