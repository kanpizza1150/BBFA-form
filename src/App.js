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
import RegisterForm from './registerForm'

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
  flex-direction: column;
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
    thaiName: '',
    engName: '',
    address: '',
    tel: '',
    memberNo: '',
    memberType: '',
    farmName: '',
  })
  const [cattle, setCattle] = useState({
    name: '',
    id: '',
    regNo: '',
    owner: '',
    ownerTel: '',
    breeder: '',
    association: '',
    dob: '',
    gender: '',
    color: '',
    inseminationType: '', //AI,RI
    birthWeight: '',
    breathWidth: '',
    lastMilkDate: '',
    lastMilkWeight: '',
    lastMilkBreathWidth: '',
    hipLength: '',
    sireName: '',
    sireId: '',
    damName: '',
    damId: '',
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
    type: '', //self,paternity, maternity, parent
    selfType: '', //blood,tail,semen
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
      <RadioGroup aria-labelledby='label' value={dna[key]} onChange={(e) => handleDnaChanges(key, e)}>
        <FormControlLabel value='blood' control={<Radio />} label='เลือด' />
        <FormControlLabel value='tail' control={<Radio />} label='ขนหาง' />
        <FormControlLabel value='semen' control={<Radio />} label='น้ำเชื้อ' />
        <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
      </RadioGroup>
    </>
  )

  const renderForm = () => {
    return (
      <PageContainer>
        <FormWrapper>
          <h3>1.</h3>
          <div>
            {cattleImg && <img src={cattleImg} alt='' style={{ width: '500px', height: '250px' }} />}
            <Button variant='height' component='label'>
              {cattleImg ? (
                <>✅อัพโหลดรูปสำเร็จ คลิกเพื่อแก้ไขรูป</>
              ) : (
                <>
                  <FileUploadIcon />
                  อัพโหลดรูปโคที่ส่งจดทะเบียนแบบเต็มตัว
                </>
              )}
              <input type='file' hidden onChange={(e) => handleUploadCattleImage(e)} />
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
            <TextField label='ที่อยู่' value={personal.address} onChange={(e) => handlePersonalChanges('address', e)} />
            <TextField label='เบอร์โทรศัพท์' value={personal.tel} onChange={(e) => handlePersonalChanges('tel', e)} />
            <FormLabel id='label'>ประเภทสมาชิก</FormLabel>
            <RadioGroup
              aria-labelledby='label'
              value={personal.memberType}
              onChange={(e) => handlePersonalChanges('memberType', e)}>
              <FormControlLabel value='extraordinary' control={<Radio />} label='วิสามัญ' />
              <FormControlLabel value='ordinary' control={<Radio />} label='สามัญ' />
              <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
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
            <div>
              {farmLogo && <img src={farmLogo} alt='' style={{ width: '50xp', height: '25px' }} />}

              <Button variant='height' component='label'>
                {farmLogo ? (
                  <>✅อัพโหลดรูปสำเร็จ คลิกเพื่อแก้ไขรูป</>
                ) : (
                  <>
                    <FileUploadIcon />
                    อัพโหลดเครื่องหมายฟาร์ม
                  </>
                )}
                <input type='file' hidden onChange={(e) => handleUploadFarmLogoImage(e)} />
              </Button>
            </div>

            <TextField label='หมายเลขประจำตัวโค' value={cattle.id} onChange={(e) => handleCattleChanges('id', e)} />
            <TextField label='ชื่อโค' value={cattle.name} onChange={(e) => handleCattleChanges('name', e)} />
          </div>
        </FormWrapper>
      </PageContainer>
    )
  }

  const [activeForm, setActiveForm] = useState('form') //form05,form11,form

  const pageRef = useRef(null)

  const twoFormPrintButton = React.useCallback(() => {
    return <Button variant='outlined'>🖨 พิมพ์</Button>
  }, [])

  const pageStyle = `
  @page  
  { 
    margin: 0mm;
    size: A4;
    margin: 11mm 17mm 17mm 17mm;
  }
  @print {
    @page :footer {
        display: none
    }

    @page :header {
        display: none
    }
  }
`

  const toggleForms = () => {
    switch (activeForm) {
      case 'form':
        return renderForm()
      case 'form05':
        return (
          <>
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
                  onChange={(e) => handleCattleChanges('association', e)}>
                  <FormControlLabel value='bbfa' control={<Radio />} label='BBFA' />
                  <FormControlLabel value='tbba' control={<Radio />} label='TBBA' />
                  <FormControlLabel value='bba' control={<Radio />} label='BBA' />
                  <FormControlLabel value='tabba' control={<Radio />} label='TABBA' />
                  <FormControlLabel value='livestock' control={<Radio />} label='กรมปศุสัตว์' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
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
                  onChange={(e) => handleCattleSemenChanges('inseminationType', e)}>
                  <FormControlLabel value='RI' control={<Radio />} label='ผสมจริง' />
                  <FormControlLabel value='AI' control={<Radio />} label='ผสมเทียม' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
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
                  onChange={(e) => handleChildChanges('gender', e)}>
                  <FormControlLabel value='male' control={<Radio />} label='ผู้' />
                  <FormControlLabel value='female' control={<Radio />} label='เมีย' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
                </RadioGroup>
                <TextField label='วันเกิดลูกโค' value={child.dob} onChange={(e) => handleChildChanges('dob', e)} />
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
                <TextField label='เกิดเมื่อ' value={lastChild.dob} onChange={(e) => handleLastChildChanges('dob', e)} />
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
            <PreviewWrapper>
              <ReactToPrint
                content={() => pageRef.current}
                documentTitle={`BBFA-05-${cattle.name}`}
                pageStyle={pageStyle}
                removeAfterPrint
                trigger={twoFormPrintButton}
              />
              <PageContent ref={pageRef}>
                <TransferForm
                  cattleImg={cattleImg}
                  farmLogo={farmLogo}
                  personal={personal}
                  cattle={cattle}
                  cattleSemen={cattleSemen}
                  child={child}
                  lastChild={lastChild}
                />
              </PageContent>
            </PreviewWrapper>
          </>
        )
      case 'form11':
        return (
          <>
            <FormWrapper>
              <h3>6.</h3>
              <div>
                <FormLabel id='label'>ประเภทการตรวจ DNA</FormLabel>
                <RadioGroup aria-labelledby='label' value={dna.type} onChange={(e) => handleDnaChanges('type', e)}>
                  <FormControlLabel value='self' control={<Radio />} label='เก็บข้อมูลเฉพาะตัว' />
                  <FormControlLabel value='paternity' control={<Radio />} label='ตรวจ พ่อ-ลูก' />
                  <FormControlLabel value='maternity' control={<Radio />} label='ตรวจ แม่-ลูก ' />
                  <FormControlLabel value='parent' control={<Radio />} label='ตรวจ พ่อ-แม่-ลูก' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
                </RadioGroup>
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>7.</h3>
              <div>
                <p>ข้อมูลตัวอย่างทดสอบ</p>
                <p>7.1 เก็บข้อมูลเฉพาะตัว/ลูกโค</p>
                {dnaSampleType('selfType')}
                <p>7.2 แม่พันธุ์</p>
                <TextField label='ชื่อแม่พันธุ์' value={dna.damName} onChange={(e) => handleDnaChanges('damName', e)} />
                <TextField
                  label='หมายเลขประจำาตัวโค'
                  value={dna.damId}
                  onChange={(e) => handleDnaChanges('damId', e)}
                />
                <TextField label='เลขทะเบียนโค' value={dna.damId} onChange={(e) => handleDnaChanges('damReg', e)} />
                {dnaSampleType('damType')}
                <p>7.3 พ่อพันธุ์</p>
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
                <TextField label='เลขทะเบียนโค' value={dna.sireId} onChange={(e) => handleDnaChanges('sireReg', e)} />
                {dnaSampleType('sireType')}
              </div>
            </FormWrapper>
            <PreviewWrapper>
              <ReactToPrint
                content={() => pageRef.current}
                documentTitle={`BBFA-11-${cattle.name}`}
                pageStyle={pageStyle}
                removeAfterPrint
                trigger={twoFormPrintButton}
              />
              <PageContent ref={pageRef}>
                <DnaForm cattleImg={cattleImg} cattle={cattle} farmLogo={farmLogo} personal={personal} dna={dna} />
              </PageContent>
            </PreviewWrapper>
          </>
        )
      case 'form03':
        return (
          <>
            <FormWrapper>
              <h3>9.</h3>
              <TextField
                label='วัน/เดือน/ปี เกิด'
                value={cattle.dob}
                onChange={(e) => handleCattleChanges('dob', e)}
                placeholder='DD/MM/YYYY'
              />
            </FormWrapper>
            <FormWrapper>
              <h3>10.</h3>
              <div>
                <p>เพศ</p>
                <RadioGroup
                  aria-labelledby='label'
                  value={cattle.gender}
                  onChange={(e) => handleCattleChanges('gender', e)}>
                  <FormControlLabel value='male' control={<Radio />} label='ผู้' />
                  <FormControlLabel value='female' control={<Radio />} label='เมีย' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
                </RadioGroup>
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>11.</h3>
              <div>
                <p>สี</p>
                <RadioGroup
                  aria-labelledby='label'
                  value={cattle.color}
                  onChange={(e) => handleCattleChanges('color', e)}>
                  <FormControlLabel value='red' control={<Radio />} label='แดง' />
                  <FormControlLabel value='grey' control={<Radio />} label='เทา' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
                </RadioGroup>
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>12.</h3>
              <div>
                <p>การผสมพันธุ์</p>
                <RadioGroup
                  aria-labelledby='label'
                  value={cattle.inseminationType}
                  onChange={(e) => handleCattleChanges('inseminationType', e)}>
                  <FormControlLabel value='RI' control={<Radio />} label='ผสมจริง' />
                  <FormControlLabel value='AI' control={<Radio />} label='ผสมเทียม' />
                  <FormControlLabel value='' control={<Radio />} label='ไม่เลือก' />
                </RadioGroup>
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>13.</h3>
              <div>
                <TextField
                  label='น้ำหนัก'
                  value={cattle.birthWeight}
                  onChange={(e) => handleCattleChanges('birthWeight', e)}
                />
                <TextField
                  label='รอบอก'
                  value={cattle.breathWidth}
                  onChange={(e) => handleCattleChanges('breathWidth', e)}
                />
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>14.</h3>
              <div>
                <TextField
                  label='วันที่หย่านม'
                  value={cattle.lastMilkDate}
                  onChange={(e) => handleCattleChanges('lastMilkDate', e)}
                  placeholder='DD/MM/YYYY'
                />
                <TextField
                  label='น้ำหนัก'
                  value={cattle.lastMilkWeight}
                  onChange={(e) => handleCattleChanges('lastMilkWeight', e)}
                />
                <TextField
                  label='รอบอก'
                  value={cattle.lastMilkBreathWidth}
                  onChange={(e) => handleCattleChanges('lastMilkBreathWidth', e)}
                />
                <TextField
                  label='ความสูงของสะโพก'
                  value={cattle.hipLength}
                  onChange={(e) => handleCattleChanges('hipLength', e)}
                />
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>15.</h3>
              <div>
                <TextField
                  label='ชื่อพ่อพันธุ์'
                  value={cattle.sireName}
                  onChange={(e) => handleCattleChanges('sireName', e)}
                />
                <TextField
                  label='เลขทะเบียนพ่อพันธุ์โค'
                  value={cattle.sireId}
                  onChange={(e) => handleCattleChanges('sireId', e)}
                />
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>16.</h3>
              <div>
                <TextField
                  label='ชื่อแม่พันธุ์'
                  value={cattle.damName}
                  onChange={(e) => handleCattleChanges('damName', e)}
                />
                <TextField
                  label='เลขทะเบียนแม่พันธุ์โค'
                  value={cattle.damId}
                  onChange={(e) => handleCattleChanges('damId', e)}
                />
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>17.</h3>
              <div>
                <TextField
                  label='ชื่อผู้ปรับปรุงพันธ์(Breeder)'
                  value={cattle.breeder}
                  onChange={(e) => handleCattleChanges('breeder', e)}
                />
              </div>
            </FormWrapper>
            <FormWrapper>
              <h3>18.</h3>
              <div>
                <TextField
                  label='เจ้าของโค(Owner)'
                  value={cattle.owner}
                  onChange={(e) => handleCattleChanges('owner', e)}
                />
              </div>
            </FormWrapper>
            <PreviewWrapper>
              <ReactToPrint
                content={() => pageRef.current}
                documentTitle={`BBFA-03-${cattle.name}`}
                pageStyle={pageStyle}
                removeAfterPrint
                trigger={twoFormPrintButton}
              />
              <PageContent ref={pageRef}>
                <RegisterForm cattleImg={cattleImg} cattle={cattle} farmLogo={farmLogo} personal={personal} dna={dna} />
              </PageContent>
            </PreviewWrapper>
          </>
        )
      default:
        return <></>
    }
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <div>
            <Button variant={activeForm === 'form' ? 'contained' : 'outlined'} onClick={() => setActiveForm('form')}>
              กรอกข้อมูลทั่วไป (เจ้าของ+โค)✏️
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant={activeForm === 'form03' ? 'contained' : 'outlined'}
              onClick={() => setActiveForm('form03')}>
              📖 BBFA-03: แบบฟอร์มการจดทะเบียนโคบราห์มันพันธ์ุแท้
            </Button>
            <Button
              variant={activeForm === 'form05' ? 'contained' : 'outlined'}
              onClick={() => setActiveForm('form05')}>
              📖 BBFA-05: แบบฟอร์มการเปลี่ยนเจ้าของโค และขอโอนย้ายสมาคม โคบราห์มันพันธุ์แท้
            </Button>
            <Button
              variant={activeForm === 'form11' ? 'contained' : 'outlined'}
              onClick={() => setActiveForm('form11')}>
              📖 BBFA-11: แบบฟอร๋มการส่งตรวจ DNA
            </Button>
          </div>

          {toggleForms()}
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
