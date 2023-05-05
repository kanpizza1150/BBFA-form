/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import copyRequestForm from "./BBFA08.png"
import { Stage, Layer, Image, Text, Line } from "react-konva"

const RequestCopy = ({ cattleImg, personal, cattle, farmLogo,cattleLogo,dna }) => {
  const [image, setImage] = useState()
  const [cattleImage, setCattleImage] = useState()
  const [farmImage, setFarmImage] = useState()
  const [cattleLogoState, setCattleLogoState] = useState()
  const stageRef = React.useRef(null)
  const handleMouseDown = ({ evt }) => {
    console.log("e", evt)
  }


  useEffect(() => {
    loadImage(copyRequestForm, setImage)
    loadImage(cattleImg, setCattleImage)
    loadImage(farmLogo, setFarmImage)
    loadImage(cattleLogo, setCattleLogoState)
  }, [])

  const loadImage = (img, setter) => {
    const tempImage = new window.Image()
    tempImage.src = img
    tempImage.addEventListener("load", () => handleLoad(tempImage, setter))
  }
  const handleLoad = (tempImage, setter) => {
    setter(tempImage)
  }
  const FILL_COLOR = "#006B88"
  const commonTextProps = {
    fontSize: 21,
    fill: FILL_COLOR,
  }
  const commonLineProps = {
    strokeWidth: 2,
    stroke: FILL_COLOR,
  }
  const memberType =
    personal.memberType === "ordinary" ? (
      <Line points={[960, 842, 1020, 842]} {...commonLineProps} />
    ) : personal.memberType === "extraordinary" ? (
      <Line points={[900, 842, 950, 842]} {...commonLineProps} />
    ) : (
      <></>
    )

  return (
    <Stage width={1240} height={1754} ref={stageRef}>
      <Layer onMouseDown={handleMouseDown}>
        <Image x={0} y={0} width={1240} height={1754} image={image} />
        <Image x={79} y={233} width={730} height={425} image={cattleImage} />
        <Text text={personal.thaiName} x={450} y={710} {...commonTextProps} />
        <Text text={personal.engName} x={470} y={750} {...commonTextProps} />
        <Text text={personal.address} x={220} y={790} {...commonTextProps} />
        <Text text={personal.memberNo} x={1040} y={825} {...commonTextProps} />
        {memberType}
        <Text text={personal.tel} x={220} y={825} {...commonTextProps} />
        <Text text={personal.farmName} x={220} y={865} {...commonTextProps} />
        <Image x={988} y={852} width={50} height={35} image={farmImage} />

        <Text text={cattle.name} x={550} y={905} {...commonTextProps} />
        <Text text={cattle.id} x={690} y={945} {...commonTextProps} />
        <Text
          text={cattle.gender ? (cattle.gender === "female" ? "เมีย" : "ผู้") : ""}
          x={960}
          y={945}
          {...commonTextProps}
        />
        <Text
          text={cattle.color ? (cattle.color === "red" ? "แดง" : "เทา") : ""}
          x={1072}
          y={945}
          {...commonTextProps}
        />
        <Image x={350} y={930} width={50} height={35} image={cattleLogoState} />


        <Text text={personal.thaiName} x={530} y={1140} {...commonTextProps} />
      </Layer>
    </Stage>
  )
}

export default RequestCopy
