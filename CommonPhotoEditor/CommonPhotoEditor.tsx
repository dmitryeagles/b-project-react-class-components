import { useEffect, useState } from 'react';
import './CommonPhotoEditor.css';
import PhotoEditor from './forkLib/PhotoEditor';

type CommonPhotoEditorProps = {
  img: string
  size?: number
  file?: File
  sendPhoto: (photo: string) => void
  sendFile: (file: File) => void
  isShow: boolean
  onClose: (value: boolean)=>void
  type: string
}

export default function CommonPhotoEditor(props: CommonPhotoEditorProps) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSaveImage = (editedFile: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(editedFile);
    fileReader.onload = (e) => {
      if (e.target != null) {
        if (e.target.result != null) {
          if (typeof (e.target.result) == 'string') {
            props.sendPhoto(e.target.result)
          }
        }
      }
    }
    setFile(editedFile);
    props.sendFile(editedFile)
  };


  useEffect(()=>{
    if(props.isShow == true ){
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [props.isShow])

  useEffect(()=>{
    if(props.file){
      setFile(props.file)
    }
  }, [props.file])

  return (
    <div>
      <PhotoEditor
        open={showModal}
        onClose={()=>{props.onClose(false); setShowModal(false)}}
        file={file}
        onSaveImage={handleSaveImage}
        downloadOnSave={false}
        img={props.img}
      />
    </div>
  );
}