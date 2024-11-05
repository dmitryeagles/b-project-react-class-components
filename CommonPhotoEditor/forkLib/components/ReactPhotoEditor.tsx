import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { ReactPhotoEditorProps } from './interface';
import './style.css';
import { useTranslation } from 'react-i18next';
import { BlueSmallButton, WhiteSmallButton } from '../../../CommonButtons/CommonButtons';
import styles from './ReactPhotoEditor.module.scss'
import { SIZEIMG } from '../../../../../StaticData/consts';


export const ReactPhotoEditor: React.FC<ReactPhotoEditorProps> = ({
	img,
	onSaveImage,
	allowColorEditing = true,
	allowFlip = true,
	allowRotate = true,
	allowZoom = true,
	downloadOnSave,
	open,
	onClose,
	modalHeight,
	modalWidth,
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [imageSrc, setImageSrc] = useState('');
	const [imageName, setImageName] = useState('');
	const [brightnessValue, setBrightnessValue] = useState(100);
	const [contrastValue, setContrastValue] = useState(100);
	const [saturateValue, setSaturateValue] = useState(100);
	const [grayscaleValue, setGrayscaleValue] = useState(0);
	const [rotate, setRotate] = useState(0);
	const [flipHorizontal, setFlipHorizontal] = useState(false);
	const [flipVertical, setFlipVertical] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [startZoom, setStartZoom] = useState(1);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [panStart, setPanStart] = useState<{ x: number; y: number; distance?: number } | null>(null);
	const [isDragging, setIsDragging] = useState(false);
  	const [scaleValue, setScaleValue] = useState<number>(1)

  const { t } = useTranslation();

  const handleMoveUp = () => {
    setOffsetY(!flipVertical ? offsetY - 80 : offsetY + 80)  
  }
  const handleMoveDown = () => {
    setOffsetY(!flipVertical ? offsetY + 80 : offsetY - 80 )
  }
  const handleMoveLeft = () => {
    setOffsetX(!flipHorizontal ? offsetX - 80 : offsetX + 80)
  }
  const handleMoveRight = () => {
    setOffsetX(!flipHorizontal ? offsetX + 80 : offsetX - 80)
  }
  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const distance = (event: React.TouchEvent<HTMLCanvasElement>) => {
    return Math.hypot(event.touches[0].pageX * 4 - event.touches[1].pageX * 4, event.touches[0].pageY * 4 - event.touches[1].pageY * 4);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (event.touches.length < 2) {
      const initialX = event.changedTouches[0].clientX * 4 - (flipHorizontal ? -offsetX : offsetX);
      const initialY = event.changedTouches[0].clientY * 4 - (flipVertical ? -offsetY : offsetY);
      setPanStart({ x: initialX, y: initialY });
    }
    if (event.touches.length === 2) {
      event.preventDefault();
      setStartZoom(zoom)
      setPanStart({ 
        x: (event.touches[0].pageX * 4 + event.touches[1].pageX * 4) / 2, 
        y: (event.touches[0].pageY * 4 + event.touches[1].pageY * 4) / 2, 
        distance: distance(event) 
      })
    }
	};


  const onTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    switch (event.touches.length) {
      case 1:
        if(panStart){
          event.preventDefault();
          const offsetXDelta = event.changedTouches[0].clientX * 4 - panStart!.x;
          const offsetYDelta = event.changedTouches[0].clientY * 4 - panStart!.y;
          setOffsetX(flipHorizontal ? -offsetXDelta : offsetXDelta);
          setOffsetY(flipVertical ? -offsetYDelta : offsetYDelta);
        }
        break;
      case 2:
        event.preventDefault();
        let scale: number;
        let deltaDistance = distance(event);

        scale = Number((deltaDistance / panStart?.distance!!).toFixed(2));

        if(scaleValue != scale){
          if(scale > scaleValue){
            setZoom((prev)=> startZoom * scale <= 4 ? startZoom * scale : prev)
          } else {
            setZoom((prev)=> startZoom * scale >= 0.25 ? startZoom * scale : prev)
          }
          
        }
        
        setScaleValue(scale)

        break;
    }     
	};

  const handlePointerDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDragging(true);
    const initialX = event.clientX * 4 - (flipHorizontal ? -offsetX : offsetX);
    const initialY = event.clientY * 4 - (flipVertical ? -offsetY : offsetY);
    setPanStart({ x: initialX, y: initialY });
  };
  const handlePointerUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const handlePointerMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault()
    if(isDragging && panStart){
      event.preventDefault();
      const offsetXDelta = event.clientX * 4 - panStart.x;
      const offsetYDelta = event.clientY * 4 - panStart.y;
      setOffsetX(flipHorizontal ? -offsetXDelta : offsetXDelta);
      setOffsetY(flipVertical ? -offsetYDelta : offsetYDelta);
    }
  };

	useEffect(() => {		
		if(img){
			setImageSrc(img);
			setImageName(img);
		}
	}, [open, img]);

	useEffect(() => {
		applyFilter();
	}, [
		img,
		open,
		imageSrc,
		rotate,
		flipHorizontal,
		flipVertical,
		zoom,
		brightnessValue,
		contrastValue,
		saturateValue,
		grayscaleValue,
		offsetX,
		offsetY,
	]);


	const applyFilter = () => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		const image = new Image();
		image.src = imageSrc;
    	let localZoom = 1

		if (image.width > image.height) {
			localZoom = SIZEIMG.MAX_HEIGHT / image.height;   
		}
		
		image.onload = () => {
			if (canvas && context) {
				const zoomedWidth = image.width * zoom;
				const zoomedHeight = image.height * zoom;
				const translateX = (image.width - zoomedWidth) / 2;
				const translateY = (image.height - zoomedHeight) / 2;
				canvas.width = image.width;
				canvas.height = image.width / 3 * 4;
				context.filter = getFilterString();
				context.save();
				if (rotate) {
					const centerX = canvas.width / 2;
					const centerY = canvas.height / 2;
					context.translate(centerX, centerY);
					context.rotate((rotate * Math.PI) / 180);
					context.translate(-centerX, -centerY);
				}
				if (flipHorizontal) {
					context.translate(canvas.width, 0);
					context.scale(-1, 1);
				}
				if (flipVertical) {
					context.translate(0, canvas.height);
					context.scale(1, -1);
				}
				context.translate(translateX, translateY);

				context.translate(offsetX, offsetY);

				context.scale(zoom, zoom);
				context.drawImage(image, 0, 0, image.width * localZoom, image.height * localZoom);

				context.restore();
			}
		};
	};

	const getFilterString = () => {
		return `brightness(${brightnessValue}%) contrast(${contrastValue}%) grayscale(${grayscaleValue}%) saturate(${saturateValue}%)`;
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement>,
		setValue: React.Dispatch<React.SetStateAction<number>>,
		min: number,
		max: number
	) => {
		const value = parseInt(event.target?.value);
		if (!isNaN(value) && value >= min && value <= max) {
			setValue(value);
		}
	};

	const handleZoomIn = () => {
		setZoom((prevZoom) => prevZoom + 0.05 <= 4 ? prevZoom + 0.05 : prevZoom);
	};
	
	const handleZoomOut = () => {
		setZoom((prevZoom) => prevZoom - 0.05  >= 0.25 ? prevZoom - 0.05 : prevZoom);
	};

	const renderInputs = [
		{
			name: t('rotate'),
			value: rotate,
			setValue: setRotate,
			min: -180,
			max: 180,
			type: 'range',
			id: 'rotateInput',
			'aria-labelledby': 'rotateInputLabel',
			hide: !allowRotate,
		},
	];

	const resetImage = () => {
		setBrightnessValue(100);
		setContrastValue(100);
		setSaturateValue(100);
		setGrayscaleValue(0);
		setRotate(0);
		setFlipHorizontal(false);
		setFlipVertical(false);
		setZoom(1);
		setOffsetX(0);
		setOffsetY(0);
	};

	const saveImage = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const fileExtension = (imageName.split('.').pop() || '').toLowerCase();
			let mimeType;
			switch (fileExtension) {
				case 'jpg':
				case 'jpeg':
					mimeType = 'image/jpeg';
					break;
				case 'png':
					mimeType = 'image/png';
					break;
				default:
					mimeType = 'image/png';
			}

			canvas.toBlob((blob) => {
				if (blob) {
					const editedFile = new File([blob], imageName, { type: blob.type });
					if (downloadOnSave) {
						const objectUrl = URL.createObjectURL(blob);
						const linkElement = document.createElement('a');
						linkElement.download = `${imageName}`;
						linkElement.href = objectUrl;
						linkElement.click();
						URL.revokeObjectURL(objectUrl);
					}
					onSaveImage(editedFile);
					if (onClose) {
						onClose();
					}
				}
				resetImage();
			}, mimeType);
		}
	};

	const closeEditor = () => {
		resetImage();
		if (onClose) {
			onClose();
		}
	};
	return (
		<>
			{open && (
				<>
					<div
						data-testid='photo-editor-main'
						id='photoEditorMainID'
						style={{overflow: 'hidden'}}
						className='photo-editor-main justify-center items-center flex fixed inset-0 z-50'
					>
						<div
							style={{
								height: modalHeight ?? 'auto',
								width: modalWidth ?? '40rem',
								padding: '20px',
                				paddingTop: '50px'
							}}
							id='photo-editor-modal'
							className={`relative shadow-lg max-sm:w-[22rem] bg-white dark:bg-[#1e1e1e]`}
						>
							<div>
								<div>
                  <svg 
                    width="200" 
                    height="300"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{position: 'absolute', left: '73px', top: '50px', transform: 'scale(1,0.87)', zIndex: '10', pointerEvents: 'none'}}
                  >
                    <path 
                      id="oval" 
                      d="m100,297c-53.8674,0 -97.5,-65.78453 -97.5,-146.99999c0,-81.21547 43.6326,-146.99999 97.5,-146.99999c53.8674,0 97.5,65.78453 97.5,146.99999c0,81.21547 -43.6326,146.99999 -97.5,146.99999z" 
                      opacity="undefined" 
                      stroke="#ff0000" 
                      fill="none"
                    />
                  </svg>
                  <div
                    style={{position: 'relative'}}
                  >
                    <canvas
                      className={`canvas border dark:border-gray-700 object-fit mx-auto ${styles.imgContainer}`}
                      data-testid='image-editor-canvas'
                      id='canvas'
                      ref={canvasRef}
                      onTouchMove={(e)=>{onTouchMove(e)}}
                      onTouchStart={(e)=>{onTouchStart(e)}}
					            onPointerMove={handlePointerMove}
                      onPointerDown={handlePointerDown}
                      onPointerLeave={handlePointerUp}
                      onPointerUp={handlePointerUp}
					            onWheel={handleWheel}
                      
                    />
                     <button
                        title='Move Left'
                        className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
                        onClick={handleMoveLeft}
                        aria-label='Move Left'
                        type='button'
                        style={{position: 'absolute', left: '2%', top: '50%', transform: 'translate(-50%, -50%)'}}
                      >
                        <svg 
                          width="30px" 
                          height="30px" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" 
                            fill="#0F0F0F"
                          />
                        </svg>
                      </button>

                      
                      <button
                        title='Move Right'
                        className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
                        onClick={handleMoveRight}
                        aria-label='Move Right'
                        type='button'
                        style={{position: 'absolute', right: '-10%', top: '50%', transform: 'translate(-50%, -50%)'}}
                      >
                        <svg 
                          width="30px" 
                          height="30px" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" 
                            fill="#0F0F0F"
                          />
                        </svg>
                      </button>

                      
                      <button
                        title='Move Up'
                        className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
                        onClick={handleMoveUp}
                        aria-label='Move Up'
                        type='button'
                        style={{position: 'absolute', left: '50%', top: '-6%', transform: 'translate(-50%, -50%)'}}
                      >
                        <svg 
                          width="30px" 
                          height="30px" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" 
                            fill="#0F0F0F"
                          />
                        </svg>
                      </button>
                      <button
                        title='Move Down'
                        className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
                        onClick={handleMoveDown}
                        aria-label='Move Down'
                        type='button'
                        style={{position: 'absolute', left: '50%', bottom: '-18%', transform: 'translate(-50%, -50%)'}}
                      >
                        <svg 
                          width="30px" 
                          height="30px" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" 
                            fill="#0F0F0F"
                          />
                        </svg>
                      </button>
                  </div>
                  {/* <div className='flex justify-center' style={{padding: '10px 0px'}}> */}
                  
                  {/* </div> */}
									<div 
                    className='items-center flex m-1 flex-col'
                    style={{minWidth: '300px', marginTop: '50px'}}
                  >
										<div className='flex flex-col bottom-12 gap-1 max-sm:w-72 w-11/12' style={{width: '100%'}}>
											{renderInputs.map(
												(input) =>
													!input.hide && (
														<div key={input.name} className='flex flex-row items-center'>
															<label
																id={`${input.name}InputLabel`}
                                style={{minWidth: '75px'}}
																className='text-xs font-medium text-gray-900 dark:text-white w-10'
															>
																{input.name[0].toUpperCase() + input.name.slice(1)}:{' '}
															</label>
															<input
																id={input.id}
																aria-labelledby={input['aria-labelledby']}
																type={input.type}
																value={input.value}
																step='1'
																onChange={(e) =>
																	handleInputChange(e, input.setValue, input.min, input.max)
																}
																min={input.min}
																max={input.max}
																className='ml-[1.7rem] w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700'
															/>
															<div
																//type='number'
																//aria-labelledby={input['aria-labelledby']}
																//value={input.value}
																// onChange={(e) =>
																// 	handleInputChange(e, input.setValue, input.min, input.max)
																// }
																//min={input.min}
																//max={input.max}
																className='w-14 ml-2 rounded-md text-right bg-gray-100 text-black'
															/>
                                {input.value}
														  </div>
													)
											)}
										</div>
									</div>
									<div className='flex justify-center'>
										<div className='mb-1 bottom-0 mt-2'>
											<button
												title={t('ResetPhoto')}
												className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
												onClick={resetImage}
												aria-label='Reset photo'
												type='button'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='lucide lucide-rotate-ccw dark:stroke-slate-200'
												>
													<path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
													<path d='M3 3v5h5' />
												</svg>
											</button>
											{allowFlip && (
												<div className='inline-block' data-testid='flip-btns'>
													<button
														className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
														onClick={() => setFlipHorizontal(!flipHorizontal)}
														type='button'
														title={t('FlipPhotoHorizontally')}
														aria-label='Flip photo horizontally'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
															className='lucide lucide-flip-horizontal dark:stroke-slate-200'
														>
															<path d='M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3' />
															<path d='M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3' />
															<path d='M12 20v2' />
															<path d='M12 14v2' />
															<path d='M12 8v2' />
															<path d='M12 2v2' />
														</svg>
													</button>
													<button
														className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
														onClick={() => setFlipVertical(!flipVertical)}
														type='button'
														title={t('FlipPhotoVertically')}
														aria-label='Flip photo vertically'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
															className='lucide lucide-flip-vertical dark:stroke-slate-200'
														>
															<path d='M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3' />
															<path d='M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3' />
															<path d='M4 12H2' />
															<path d='M10 12H8' />
															<path d='M16 12h-2' />
															<path d='M22 12h-2' />
														</svg>
													</button>
												</div>
											)}
											{allowZoom && (
												<div className='inline-block' data-testid='zoom-btns'>
													<button
														data-testid='zoom-in'
														type='button'
														className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
														onClick={handleZoomIn}
														title={t('ZoomIn')}
														aria-label='Zoom in'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
															className='lucide lucide-zoom-in dark:stroke-slate-200'
														>
															<circle cx='11' cy='11' r='8' />
															<line x1='21' x2='16.65' y1='21' y2='16.65' />
															<line x1='11' x2='11' y1='8' y2='14' />
															<line x1='8' x2='14' y1='11' y2='11' />
														</svg>
													</button>
													<button
														data-testid='zoom-out'
														type='button'
														className='mx-1 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-1'
														onClick={handleZoomOut}
														title={t('ZoomOut')}
														aria-label='Zoom out'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
															className='lucide lucide-zoom-out dark:stroke-slate-200'
														>
															<circle cx='11' cy='11' r='8' />
															<line x1='21' x2='16.65' y1='21' y2='16.65' />
															<line x1='8' x2='14' y1='11' y2='11' />
														</svg>
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
                
              <div className='flex justify-end p-2 rounded-t' style={{gap:'10px'}}>
								<WhiteSmallButton 
									variant="contained" 
									onClick={closeEditor}
									sx={{padding: '3px 15px', whiteSpace: 'nowrap', width: '100%'}}
									>
									{t('CloseBtnText')}
								</WhiteSmallButton>
								<BlueSmallButton 
									variant="contained"
									sx={{padding: '3px 15px', whiteSpace: 'nowrap', width: '100%'}}
									onClick={() => saveImage()}>
										{t('save')}
								</BlueSmallButton>
							</div>
							</div>
						</div>
					</div>
					<div className='opacity-75 fixed inset-0 z-40 bg-black'></div>
				</>
			)}
		</>
	);
};
