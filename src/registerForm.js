/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import registerForm from './registerForm.png'
import { Stage, Layer, Image, Text, Line } from 'react-konva'

const RegisterForm = ({ cattleImg, personal, cattle, farmLogo }) => {
  const [image, setImage] = useState()
  const [cattleImage, setCattleImage] = useState()
  const [farmImage, setFarmImage] = useState()
  const stageRef = React.useRef(null)
  const handleMouseDown = ({ evt }) => {
    console.log('e', { x: evt.offsetX, y: evt.offsetY })
  }

  useEffect(() => {
    loadImage(registerForm, setImage)
    loadImage(cattleImg, setCattleImage)
    loadImage(farmLogo, setFarmImage)
  }, [])

  const loadImage = (img, setter) => {
    const tempImage = new window.Image()
    tempImage.src = img
    tempImage.addEventListener('load', () => handleLoad(tempImage, setter))
  }
  const handleLoad = (tempImage, setter) => {
    setter(tempImage)
  }
  const FILL_COLOR = '#006B88'
  const commonTextProps = {
    fontSize: 21,
    fill: FILL_COLOR,
  }
  const commonLineProps = {
    strokeWidth: 2,
    stroke: FILL_COLOR,
  }
  const memberType =
    personal.memberType === 'ordinary' ? (
      <Line points={[940, 840, 1000, 840]} {...commonLineProps} />
    ) : personal.memberType === 'extraordinary' ? (
      <Line points={[880, 840, 930, 840]} {...commonLineProps} />
    ) : (
      <></>
    )
  const dob = cattle.dob.split('/')
  const lastMilkDate = cattle.lastMilkDate.split('/')

  return (
    <Stage width={1240} height={1754} ref={stageRef}>
      <Layer onMouseDown={handleMouseDown}>
        <Image x={0} y={0} width={1240} height={1754} image={image} />
        <Image x={90} y={235} width={770} height={420} image={cattleImage} />
        <Text text={personal.thaiName} x={440} y={705} {...commonTextProps} />
        <Text text={personal.engName} x={460} y={750} {...commonTextProps} />
        <Text text={personal.address} x={150} y={790} {...commonTextProps} />
        <Text text={personal.tel} x={220} y={825} {...commonTextProps} />
        <Text text={personal.memberNo} x={1040} y={825} {...commonTextProps} />
        {memberType}
        <Text text={personal.farmName} x={210} y={865} {...commonTextProps} />
        <Image x={1010} y={858} width={50} height={25} image={farmImage} />
        <Text text={cattle.name} x={200} y={905} {...commonTextProps} />
        <Text text={cattle.id} x={975} y={905} {...commonTextProps} />
        <Text text={dob[0]} x={259} y={945} {...commonTextProps} />
        <Text text={dob[1]} x={370} y={945} {...commonTextProps} />
        <Text text={dob[2]} x={460} y={945} {...commonTextProps} />
        <Text
          text={cattle.gender === 'male' ? 'ผู้' : cattle.gender === 'female' ? 'เมีย' : ''}
          x={630}
          y={945}
          {...commonTextProps}
        />
        <Text
          text={cattle.color === 'red' ? 'แดง' : cattle.color === 'grey' ? 'เทา' : ''}
          x={812}
          y={945}
          {...commonTextProps}
        />
        <Text
          text={cattle.inseminationType === 'AI' ? 'ผสมเทียม' : cattle.inseminationType === 'RI' ? 'ผสมจริง' : ''}
          x={1065}
          y={945}
          {...commonTextProps}
        />
        <Text text={cattle.birthWeight} x={265} y={985} {...commonTextProps} />
        <Text text={cattle.breathWidth} x={560} y={985} {...commonTextProps} />
        <Text text={lastMilkDate[0]} x={240} y={1025} {...commonTextProps} />
        <Text text={lastMilkDate[1]} x={340} y={1025} {...commonTextProps} />
        <Text text={lastMilkDate[2]} x={440} y={1025} {...commonTextProps} />
        <Text text={cattle.lastMilkWeight} x={625} y={1025} {...commonTextProps} />
        <Text text={cattle.lastMilkBreathWidth} x={920} y={1025} {...commonTextProps} />
        <Text text={cattle.hipLength} x={520} y={1065} {...commonTextProps} />

        <Text text={cattle.sireName} x={225} y={1105} {...commonTextProps} />
        <Text text={cattle.sireId} x={910} y={1105} {...commonTextProps} />

        <Text text={cattle.damName} x={225} y={1143} {...commonTextProps} />
        <Text text={cattle.damId} x={910} y={1143} {...commonTextProps} />
        
        <Text text={cattle.breeder} x={310} y={1180} {...commonTextProps} />
        <Text text={cattle.owner} x={310} y={1220} {...commonTextProps} />

        <Text text={personal.thaiName} x={530} y={1380} {...commonTextProps} />
      </Layer>
    </Stage>
  )
}

export default RegisterForm
