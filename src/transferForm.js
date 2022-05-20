import React, { useEffect, useState } from 'react'
import transferForm from './transferForm.png'
import { Stage, Layer, Image, Text, Line, Group } from 'react-konva'
import { Button } from '@mui/material'

const DnaForm = ({
  cattleImg,
  personal,
  cattle,
  farmLogo,
  cattleSemen,
  child,
  lastChild,
}) => {
  const [image, setImage] = useState()
  const [cattleImage, setCattleImage] = useState()
  const [farmImage, setFarmImage] = useState()
  const stageRef = React.useRef(null)
  const handleMouseDown = ({ evt }) => {
    console.log('e', evt)
  }

  useEffect(() => {
    loadImage(transferForm, setImage)
    loadImage(cattleImg, setCattleImage)
    loadImage(farmLogo, setFarmImage)
  }, [])

  const downloadURI = (uri, name) => {
    var link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    downloadURI(uri, `BBFA005-${cattle.name}`)
  }
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
      <Line points={[960, 825, 1020, 825]} {...commonLineProps} />
    ) : (
      <Line points={[900, 825, 950, 825]} {...commonLineProps} />
    )
  const associationCheck = () => {
    switch (cattle.association) {
      case 'livestock':
        return (
          <Group>
            <Line points={[945, 1047, 978, 1083]} {...commonLineProps} />
            <Line points={[945, 1083, 978, 1047]} {...commonLineProps} />
            <Text text={cattle.regNo} x={1100} y={1050} {...commonTextProps} />
          </Group>
        )
      case 'bbfa':
        return (
          <Group>
            <Line points={[122, 1043, 156, 1083]} {...commonLineProps} />
            <Line points={[122, 1083, 156, 1043]} {...commonLineProps} />
            <Text text={cattle.regNo} x={402} y={1050} {...commonTextProps} />
          </Group>
        )
      case 'tbba':
        return (
          <Group>
            <Line points={[532, 1043, 566, 1083]} {...commonLineProps} />
            <Line points={[532, 1083, 566, 1043]} {...commonLineProps} />
            <Text text={cattle.regNo} x={813} y={1050} {...commonTextProps} />
          </Group>
        )
      case 'bba':
        return (
          <Group>
            <Line points={[122, 1124, 156, 1164]} {...commonLineProps} />
            <Line points={[122, 1164, 156, 1124]} {...commonLineProps} />
            <Text text={cattle.regNo} x={402} y={1125} {...commonTextProps} />
          </Group>
        )
      case 'tabba':
        return (
          <Group>
            <Line points={[532, 1124, 566, 1164]} {...commonLineProps} />
            <Line points={[532, 1164, 566, 1124]} {...commonLineProps} />
            <Text text={cattle.regNo} x={838} y={1125} {...commonTextProps} />
          </Group>
        )
      default:
        break
    }
  }

  const inseminationDate = () => {
    const splited = cattleSemen.date.split('/')
    return (
      <Group>
        <Text text={splited[0]} x={980} y={1213} {...commonTextProps} />
        <Text text={splited[1]} x={1050} y={1213} {...commonTextProps} />
        <Text text={splited[2]} x={1110} y={1213} {...commonTextProps} />
      </Group>
    )
  }
  const insemination = () => {
    return cattleSemen.inseminationType === 'AI' ? (
      <Group>
        <Line points={[713, 1214, 743, 1253]} {...commonLineProps} />
        <Line points={[713, 1253, 743, 1214]} {...commonLineProps} />
        {inseminationDate()}
      </Group>
    ) : cattleSemen.inseminationType === 'RI' ? (
      <Group>
        <Line points={[120, 1205, 155, 1248]} {...commonLineProps} />
        <Line points={[120, 1248, 155, 1205]} {...commonLineProps} />
      </Group>
    ) : (
      <></>
    )
  }
  const childAlong = () => {
    const dateSplited = child.dob.split('/')
    return (
      <Group>
        <Text
          text={
            child.gender === 'male'
              ? 'ผู้'
              : child.gender === 'female'
              ? 'เมีย'
              : ''
          }
          x={295}
          y={1293}
          {...commonTextProps}
        />
        <Text text={dateSplited[0]} x={470} y={1293} {...commonTextProps} />
        <Text text={dateSplited[1]} x={540} y={1293} {...commonTextProps} />
        <Text text={dateSplited[2]} x={600} y={1293} {...commonTextProps} />
        <Text text={child.sire} x={865} y={1293} {...commonTextProps} />
        <Text text={child.sireReg} x={320} y={1330} {...commonTextProps} />
      </Group>
    )
  }
  const childLast = () => {
    const dateSplited = lastChild.dob.split('/')
    return (
      <Group>
        <Text text={dateSplited[0]} x={530} y={1370} {...commonTextProps} />
        <Text text={dateSplited[1]} x={600} y={1370} {...commonTextProps} />
        <Text text={dateSplited[2]} x={660} y={1370} {...commonTextProps} />
        <Text
          text={lastChild.association}
          x={900}
          y={1370}
          {...commonTextProps}
        />
        <Text text={lastChild.regNo} x={280} y={1410} {...commonTextProps} />
      </Group>
    )
  }

  return (
    <Stage width={1240} height={1754} ref={stageRef}>
      <Layer onMouseDown={handleMouseDown}>
        <Image x={0} y={0} width={1240} height={1754} image={image} />
        <Image x={82} y={215} width={725} height={425} image={cattleImage} />
        <Text text={personal.thaiName} x={400} y={690} {...commonTextProps} />
        <Text text={personal.engName} x={450} y={730} {...commonTextProps} />
        <Text text={personal.address} x={150} y={770} {...commonTextProps} />
        <Text text={personal.tel} x={220} y={810} {...commonTextProps} />
        <Text text={personal.memberNo} x={1040} y={810} {...commonTextProps} />
        {memberType}

        <Text text={personal.farmName} x={210} y={850} {...commonTextProps} />
        <Image x={988} y={840} width={50} height={25} image={farmImage} />
        <Text text={cattle.name} x={200} y={890} {...commonTextProps} />
        <Text text={cattle.id} x={980} y={890} {...commonTextProps} />
        <Text text={cattle.owner} x={270} y={925} {...commonTextProps} />
        <Text text={cattle.ownerTel} x={950} y={925} {...commonTextProps} />
        <Text text={cattle.breeder} x={330} y={970} {...commonTextProps} />
        {associationCheck()}
        {insemination()}
        <Text text={cattleSemen.name} x={360} y={1253} {...commonTextProps} />
        <Text text={cattleSemen.id} x={1000} y={1253} {...commonTextProps} />
        {childAlong()}
        {childLast()}
        <Text text={personal.thaiName} x={530} y={1528} {...commonTextProps} />
      </Layer>
    </Stage>
  )
}

export default DnaForm
