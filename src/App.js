import styled from '@emotion/styled'
import {
  Button,
  createTheme,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import TransferForm from './transferForm'
import ReactToPrint from 'react-to-print'
import DnaForm from './dnaForm'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '5px',
        },
      },
    },
  },
})

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  width: 100%;
`
const FormWrapper = styled.div`
  display: flex;
  padding: 10px;
  width: 50vw;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 10px 0;
  div {
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-row-gap: 10px;
    margin-left: 5px;
    width: 100%;
  }
`
const PageContent = styled.div`
  transform-origin: 0 0;
  transform: scale(0.7);
  max-height: 1240px;
`
const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const App = () => {
  const [cattleImg, setCattleImg] = useState()
  const [farmLogo, setFarmLogo] = useState()
  const [personal, setPersonal] = useState({
    thaiName: 'กานต์พิชชา นกดำ',
    engName: 'Kanpichcha Nokdam',
    address: '39 ม.10 ต.ห้วยกระเจา อ.ห้วยกระเจา จ.กาญจนบุรี 71170',
    tel: '064-5454615',
    memberNo: '3575',
    memberType: 'ordinary',
    farmName: 'K39 Ranch',
  })
  const [cattle, setCattle] = useState({
    name: '',
    id: '',
    regNo: '',
    owner: 'ยอดชาย แก้วเรือง',
    ownerTel: '085-0981111',
    breeder: 'YK ฟาร์ม ฟาร์มเครือข่าย กรมปศุสัตว์',
    association: 'livestock',
  })
  const [cattleSemen, setCattleSemen] = useState({
    id: '',
    name: '',
    inseminationType: '',
    date: '',
  })
  const [child, setChild] = useState({
    gender: '',
    dob: '',
    sire: '',
    sireReg: '',
  })
  const [lastChild, setLastChild] = useState({
    dob: '',
    sire: '',
    association: '',
    regNo: '',
  })
  const [dna, setDna] = useState({
    type: 'self', //paternity, maternity, parent
    selfType: 'blood', //tail,semen
    sireName: '',
    damName: '',
    sireId: '',
    damId: '',
    sireReg: '',
    damReg: '',
    sireType: '', //tail,semen
    damType: '', //tail,semen
  })

  const handlePersonalChanges = (name, e) => {
    setPersonal((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const handleCattleChanges = (name, e) => {
    setCattle((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const handleCattleSemenChanges = (name, e) => {
    setCattleSemen((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const handleChildChanges = (name, e) => {
    setChild((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const handleLastChildChanges = (name, e) => {
    setLastChild((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const handleDnaChanges = (name, e) => {
    setDna((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const handleUploadCattleImage = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    setCattleImg(url)
  }
  const handleUploadFarmLogoImage = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    setFarmLogo(url)
  }

  const dnaSampleType = (key) => (
    <>
      <FormLabel id='label'>ชนิดของตัวอย่างส่งตรวจ</FormLabel>
      <RadioGroup
        aria-labelledby='label'
        value={dna[key]}
        onChange={(e) => handleDnaChanges(key, e)}
      >
        <FormControlLabel value='blood' control={<Radio />} label='เลือด' />
        <FormControlLabel value='tail' control={<Radio />} label='ขนหาง' />
        <FormControlLabel value='semen' control={<Radio />} label='น้ำเชื้อ' />
      </RadioGroup>
    </>
  )

  const renderForm = () => {
    return (
      <PageContainer>
        <FormWrapper>
          <h3>1.</h3>
          <div>
            <Button variant='height' component='label'>
              <FileUploadIcon />
              อัพโหลดรูปโคที่ส่งจดทะเบียนแบบเต็มตัว{cattleImg && '✅'}
              <input
                type='file'
                hidden
                onChange={(e) => handleUploadCattleImage(e)}
              />
            </Button>
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>2.</h3>
          <div>
            <TextField
              label='ชื่อสมาชิกผู้รับโอน ไทย'
              value={personal.thaiName}
              onChange={(e) => handlePersonalChanges('thaiName', e)}
            />
            <TextField
              label='ชื่อสมาชิกผู้รับโอน อังกฤษ'
              value={personal.engName}
              onChange={(e) => handlePersonalChanges('engName', e)}
            />
            <TextField
              label='ที่อยู่'
              value={personal.address}
              onChange={(e) => handlePersonalChanges('address', e)}
            />
            <TextField
              label='เบอร์โทรศัพท์'
              value={personal.tel}
              onChange={(e) => handlePersonalChanges('tel', e)}
            />
            <FormLabel id='label'>ประเภทสมาชิก</FormLabel>
            <RadioGroup
              aria-labelledby='label'
              value={personal.memberType}
              onChange={(e) => handlePersonalChanges('memberType', e)}
            >
              <FormControlLabel
                value='extraordinary'
                control={<Radio />}
                label='วิสามัญ'
              />
              <FormControlLabel
                value='ordinary'
                control={<Radio />}
                label='สามัญ'
              />
            </RadioGroup>
            <TextField
              label='เลขที่สมาชิก'
              value={personal.memberNo}
              onChange={(e) => handlePersonalChanges('memberNo', e)}
            />
            <TextField
              label='ชื่อฟาร์ม'
              value={personal.farmName}
              onChange={(e) => handlePersonalChanges('farmName', e)}
            />
            <Button variant='height' component='label'>
              <FileUploadIcon />
              อัพโหลดเครื่องหมายฟาร์ม
              {farmLogo && '✅'}
              <input
                type='file'
                hidden
                onChange={(e) => handleUploadFarmLogoImage(e)}
              />
            </Button>
            <TextField
              label='ชื่อโค'
              value={cattle.name}
              onChange={(e) => handleCattleChanges('name', e)}
            />
            <TextField
              label='หมายเลขประจำตัวโค'
              value={cattle.id}
              onChange={(e) => handleCattleChanges('id', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>3.</h3>
          <div>
            <TextField
              label='ชื่อผู้โอน(เจ้าของเดิม)'
              value={cattle.owner}
              onChange={(e) => handleCattleChanges('owner', e)}
            />
            <TextField
              label='เบอร์โทรศัพท์'
              value={cattle.ownerTel}
              onChange={(e) => handleCattleChanges('ownerTel', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>4.</h3>
          <div>
            <TextField
              label='ชื่อผู้ปรับปรุงพันธ์(Breeder)'
              value={cattle.breeder}
              onChange={(e) => handleCattleChanges('breeder', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>5.</h3>
          <div>
            <FormLabel id='label'>แหล่งที่มาของโค</FormLabel>
            <RadioGroup
              aria-labelledby='label'
              value={cattle.association}
              onChange={(e) => handleCattleChanges('association', e)}
            >
              <FormControlLabel value='bbfa' control={<Radio />} label='BBFA' />
              <FormControlLabel value='tbba' control={<Radio />} label='TBBA' />
              <FormControlLabel value='bba' control={<Radio />} label='BBA' />
              <FormControlLabel
                value='tabba'
                control={<Radio />}
                label='TABBA'
              />
              <FormControlLabel
                value='livestock'
                control={<Radio />}
                label='กรมปศุสัตว์'
              />
            </RadioGroup>
            <TextField
              label='เลขทะเบียนโค'
              value={cattle.regNo}
              onChange={(e) => handleCattleChanges('regNo', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>6.</h3>
          <div>
            <p>ข้อมูลโคเพศเมียที่จะโอนตั้งท้องหรือผสมแล้ว</p>
            <RadioGroup
              aria-labelledby='label'
              value={cattleSemen.inseminationType}
              onChange={(e) => handleCattleSemenChanges('inseminationType', e)}
            >
              <FormControlLabel
                value='RI'
                control={<Radio />}
                label='ผสมจริง'
              />
              <FormControlLabel
                value='AI'
                control={<Radio />}
                label='ผสมเทียม'
              />
            </RadioGroup>
            <TextField
              label='ผสมเมื่อวันที่'
              value={cattleSemen.date}
              onChange={(e) => handleCattleSemenChanges('date', e)}
              placeholder='วว/ดด/ปปปป'
            />
            <TextField
              label='ชื่อพ่อโคที่ใช้ผสม'
              value={cattleSemen.name}
              onChange={(e) => handleCattleSemenChanges('name', e)}
            />
            <TextField
              label='หมายเลขทะเบียนพ่อโคพ่อพันธ์ุ'
              value={cattleSemen.id}
              onChange={(e) => handleCattleSemenChanges('id', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>7.</h3>
          <div>
            <p>ข้อมูลลูกโคติดแม่</p>
            <FormLabel id='label'>เพศ</FormLabel>
            <RadioGroup
              aria-labelledby='label'
              value={child.gender}
              onChange={(e) => handleChildChanges('gender', e)}
            >
              <FormControlLabel value='male' control={<Radio />} label='ผู้' />
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='เมีย'
              />
            </RadioGroup>
            <TextField
              label='วันเกิดลูกโค'
              value={child.dob}
              onChange={(e) => handleChildChanges('dob', e)}
            />
            <TextField
              label='ชื่อโคพ่อพันธุ์ที่ใช้ผสม'
              value={child.sire}
              onChange={(e) => handleChildChanges('sire', e)}
            />
            <TextField
              label='หมายเลขทะเบียนโคพ่อพันธุ์'
              value={child.sireReg}
              onChange={(e) => handleChildChanges('sireReg', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>8.</h3>
          <div>
            <p>ข้อมูลลูกโคที่จดทะเบียนแล้วตัวสุดท้าย</p>
            <TextField
              label='เกิดเมื่อ'
              value={lastChild.dob}
              onChange={(e) => handleLastChildChanges('dob', e)}
            />
            <TextField
              label='จดทะเบียนกับสมาคม'
              value={lastChild.association}
              onChange={(e) => handleLastChildChanges('association', e)}
            />
            <TextField
              label='หมายเลขทะเบียนโค'
              value={lastChild.regNo}
              onChange={(e) => handleLastChildChanges('regNo', e)}
            />
          </div>
        </FormWrapper>
        <FormWrapper>
          <h3>DNA</h3>
          <div>
            <FormLabel id='label'>ประเภทการตรวจ DNA</FormLabel>
            <RadioGroup
              aria-labelledby='label'
              value={dna.type}
              onChange={(e) => handleDnaChanges('type', e)}
            >
              <FormControlLabel
                value='self'
                control={<Radio />}
                label='เก็บข้อมูลเฉพาะตัว'
              />
              <FormControlLabel
                value='paternity'
                control={<Radio />}
                label='ตรวจ พ่อ-ลูก'
              />
              <FormControlLabel
                value='maternity'
                control={<Radio />}
                label='ตรวจแม่ -ลูก '
              />
              <FormControlLabel
                value='parent'
                control={<Radio />}
                label='ตรวจ พ่อ -แม่-ลูก'
              />
            </RadioGroup>
            {dnaSampleType('selfType')}

            <p>พ่อพันธุ์</p>
            <TextField
              label='ชื่อพ่อพันธุ์'
              value={dna.sireName}
              onChange={(e) => handleDnaChanges('sireName', e)}
            />
            <TextField
              label='หมายเลขประจำาตัวโค'
              value={dna.sireId}
              onChange={(e) => handleDnaChanges('sireId', e)}
            />
            <TextField
              label='เลขทะเบียนโค'
              value={dna.sireId}
              onChange={(e) => handleDnaChanges('sireReg', e)}
            />
            {dnaSampleType('sireType')}

            <p>แม่พันธุ์</p>
            <TextField
              label='ชื่อแม่พันธุ์'
              value={dna.damName}
              onChange={(e) => handleDnaChanges('damName', e)}
            />
            <TextField
              label='หมายเลขประจำาตัวโค'
              value={dna.damId}
              onChange={(e) => handleDnaChanges('damId', e)}
            />
            <TextField
              label='เลขทะเบียนโค'
              value={dna.damId}
              onChange={(e) => handleDnaChanges('damReg', e)}
            />
            {dnaSampleType('damType')}
          </div>
        </FormWrapper>
      </PageContainer>
    )
  }
  const [showForm, setShowForm] = useState(true)
  const [showForm05, setShowForm05] = useState(false)
  const [showForm11, setShowForm11] = useState(false)
  const [ShowBothFrom, setShowBothFrom] = useState(false)

  const handleShowForm = () => {
    setShowForm(true)
    setShowForm05(false)
    setShowForm11(false)
    setShowBothFrom(false)
  }
  const handleShowForm05 = () => {
    setShowForm(false)
    setShowForm05(true)
    setShowForm11(false)
    setShowBothFrom(false)
  }
  const handleShowForm11 = () => {
    setShowForm(false)
    setShowForm05(false)
    setShowForm11(true)
    setShowBothFrom(false)
  }
  const handleShowBothForm = () => {
    setShowForm(false)
    setShowForm05(false)
    setShowForm11(false)
    setShowBothFrom(true)
  }
  const pageRef = useRef(null)

  const twoFormPrintButton = React.useCallback(() => {
    return <Button variant='outlined'>🖨 พิมพ์</Button>
  }, [])

  const pageStyle = `
  @page  
  { 
    margin: 0mm;
  }
`
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          {showForm && renderForm()}
          {(showForm05 || showForm11 || ShowBothFrom) && (
            <PreviewWrapper>
              <ReactToPrint
                content={() => pageRef.current}
                documentTitle={
                  showForm05
                    ? `BBFA-05-${cattle.name}`
                    : showForm11
                    ? `BBFA-11-${cattle.name}`
                    : `BBFA-05-11-${cattle.name}`
                }
                pageStyle={pageStyle}
                removeAfterPrint
                trigger={twoFormPrintButton}
              />
              <PageContent ref={pageRef}>
                {(showForm05 || ShowBothFrom) && (
                  <TransferForm
                    cattleImg={cattleImg}
                    farmLogo={farmLogo}
                    personal={personal}
                    cattle={cattle}
                    cattleSemen={cattleSemen}
                    child={child}
                    lastChild={lastChild}
                  />
                )}
                {(showForm11 || ShowBothFrom) && (
                  <DnaForm
                    cattleImg={cattleImg}
                    cattle={cattle}
                    farmLogo={farmLogo}
                    personal={personal}
                    dna={dna}
                  />
                )}
              </PageContent>
            </PreviewWrapper>
          )}
          <div>
            <Button
              variant={showForm05 ? 'contained' : 'outlined'}
              onClick={handleShowForm05}
            >
              📖 BBFA-05
            </Button>
            <Button
              variant={showForm11 ? 'contained' : 'outlined'}
              onClick={handleShowForm11}
            >
              📖 BBFA-11
            </Button>
            <Button
              variant={ShowBothFrom ? 'contained' : 'outlined'}
              onClick={handleShowBothForm}
            >
              📖 BBFA-05 & BBFA-11
            </Button>
          </div>
          <div>
            <Button
              variant={showForm ? 'contained' : 'outlined'}
              onClick={handleShowForm}
            >
              กรอกข้อมูล ✏️
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
