import React, { useEffect, useState } from 'react'
import dnaTestForm from './dnaTestForm.png'
import { Stage, Layer, Image, Text, Line, Group } from 'react-konva'

const DnaForm = ({ cattleImg, personal, cattle, farmLogo, dna }) => {
  const [image, setImage] = useState()
  const [cattleImage, setCattleImage] = useState()
  const [farmImage, setFarmImage] = useState()
  const stageRef = React.useRef(null)
  const handleMouseDown = ({ evt }) => {
    console.log('e', evt)
  }

  useEffect(() => {
    loadImage(dnaTestForm, setImage)
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
      <Line points={[940, 803, 1000, 803]} {...commonLineProps} />
    ) : (
      <Line points={[880, 803, 930, 803]} {...commonLineProps} />
    )

  const checkItem = (x, y) => {
    return (
      <Group>
        <Line points={[x, y, x + 35, y + 40]} {...commonLineProps} />
        <Line points={[x, y + 40, x + 35, y]} {...commonLineProps} />
      </Group>
    )
  }
  const sampleType = (type, y) => {
    let firstX = 109
    let tempY = y
    switch (type) {
      case 'blood':
        return checkItem(firstX, y)
      case 'tail':
        firstX += 325
        tempY = y + 5
        return checkItem(firstX, tempY)
      case 'semen':
        firstX += 648
        tempY = y + 5
        return checkItem(firstX, tempY)
      default:
        return
    }
  }

  const renderFormType = () => {
    switch (dna.type) {
      case 'self':
        return checkItem(110, 900)
      case 'paternity':
        return checkItem(348, 905)
      case 'maternity':
        return checkItem(604, 905)
      case 'parent':
        return checkItem(830, 905)
      default:
        return
    }
  }
  return (
    <Stage width={1240} height={1754} ref={stageRef}>
      <Layer onMouseDown={handleMouseDown}>
        <Image x={0} y={0} width={1240} height={1754} image={image} />
        <Image x={140} y={235} width={680} height={380} image={cattleImage} />
        <Text text={personal.thaiName} x={400} y={670} {...commonTextProps} />
        <Text text={personal.engName} x={450} y={710} {...commonTextProps} />
        <Text text={personal.address} x={150} y={750} {...commonTextProps} />
        <Text text={personal.tel} x={220} y={790} {...commonTextProps} />
        <Text text={personal.memberNo} x={1040} y={790} {...commonTextProps} />
        {memberType}
        <Text text={personal.farmName} x={210} y={830} {...commonTextProps} />
        <Image x={988} y={820} width={50} height={25} image={farmImage} />

        {renderFormType()}
        <Text text={cattle.name} x={396} y={1025} {...commonTextProps} />
        <Text text={cattle.id} x={870} y={1010} {...commonTextProps} />
        <Text text={cattle.regNo} x={1072} y={1025} {...commonTextProps} />
        {sampleType(dna.selfType, 1098)}

        <Text text={dna.sireName} x={230} y={1180} {...commonTextProps} />
        <Text text={dna.sireId} x={870} y={1165} {...commonTextProps} />
        <Text text={dna.sireReg} x={1072} y={1180} {...commonTextProps} />
        {sampleType(dna.sireType, 1257)}

        <Text text={dna.sireName} x={230} y={1340} {...commonTextProps} />
        <Text text={dna.sireId} x={870} y={1325} {...commonTextProps} />
        <Text text={dna.sireReg} x={1072} y={1340} {...commonTextProps} />
        {sampleType(dna.damType, 1414)}

        <Text text={personal.thaiName} x={530} y={1615} {...commonTextProps} />
      </Layer>
    </Stage>
  )
}

export default DnaForm
