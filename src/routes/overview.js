import {React, useState, useEffect, useRef} from "react";
import {Endpoint} from '../types/index'
import {Card, Button, Row, Col, Container, Badge} from 'react-bootstrap'
import $ from "jquery";
import CircleIcon from '@mui/icons-material/Circle';
import WifiIcon from '@mui/icons-material/Wifi';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function Overview() {
  const [devices, setDevices] = useState(null);
  const [ltenetwork, setLTENetwork] = useState(null);
  const [fivegnetwork, setfiveGNetwork] = useState(null);
  const [totaldevices, setTotalDevices] = useState(null);
  const [datausage, setDataUsage] = useState(null);
  const LTEStrengthIndicator = useRef(null);
  const FiveGStrengthIndicator = useRef(null);
  const TotalDevices = useRef(null);
  const isOnlineOffline = useRef(null);
  const EthernetStatus = useRef(null);
  //const WifiStatus = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);

  useEffect(() => {
    if ({isLoading, isLoading2}) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        setLoading2(false);
      });
    }
    getStatus();
    getNetwork();
    //getStatistics();
    async function getStatus() {
        try {
          let response = await fetch(Endpoint.STATUS);
          let data = await response.json();
          //const HostName = data.device_cfg.map(name => name.HostName);
          const Devices = data.device_app_status.map(function(data) {
            return {
              SerialNumber: data.SerialNumber,
              HardwareVersion: data.HardwareVersion,
              SoftwareVersion: data.SoftwareVersion,
              UpTime: data.UpTime,
            }
          });
          const InterfaceType = data.device_cfg.map(function(data) {
            return {
              Type: data.InterfaceType,
            }
          });
          let countEthernet = 0;
          let countWireless = 0;
          for (let i = 0; i < InterfaceType.length; i++) {
            if (InterfaceType[i].Type === 'Ethernet') countEthernet++;
            else if(InterfaceType[i].Type === '802.11' || '802.11n' || '802.11ac') countWireless++;
          }
          let setcount = [{
            Ethernet: countEthernet,
            Wireless: countWireless,
            Total: data.device_cfg.length
          }];
          TotalDevices.current = data.device_cfg.length;
          setDevices(Devices);
          setTotalDevices(setcount);
         } catch(error) {
          console.error(error);
        }
      }
      async function getNetwork() {
        try {
          let response = await fetch(Endpoint.NETWORK);
          let data = await response.json();
          //console.log(data)
          if(data.ethernet_stats[0].Enable !== 1) {
            EthernetStatus.current = 0
          }
          else {
            EthernetStatus.current = 1
          }
          const LTENetwork = data.cell_LTE_stats_cfg.map(function(data) {
            return {
              Band: data.stat.Band,
              RSRPCurrent: data.stat.RSRPCurrent,
              SNRCurrent: data.stat.SNRCurrent,
              RSRQCurrent: data.stat.RSRQCurrent,
              RSRPStrengthIndexCurrent: data.stat.RSRPStrengthIndexCurrent,
            }
          });
          LTEStrengthIndicator.current = data.cell_LTE_stats_cfg[0].stat.RSRPStrengthIndexCurrent;
          const FiveGNetwork = data.cell_5G_stats_cfg.map(function(data) {
            return {
              Band: data.stat.Band,
              RSRPCurrent: data.stat.RSRPCurrent,
              SNRCurrent: data.stat.SNRCurrent,
              RSRQCurrent: data.stat.RSRQCurrent,
              RSRPStrengthIndexCurrent: data.stat.RSRPStrengthIndexCurrent,
            }
          });
          FiveGStrengthIndicator.current = data.cell_5G_stats_cfg[0].stat.RSRPStrengthIndexCurrent;
          const DataUsage = data.cellular_stats.map(function(data) {
            return {
              Download: data.BytesReceived,
              Upload: data.BytesSent
            }
          });
          isOnlineOffline.current = data.connection_status[0].ConnectionStatus;
          setLTENetwork(LTENetwork);
          setfiveGNetwork(FiveGNetwork);
          setDataUsage(DataUsage);
         } catch(error) {
          console.error(error);
        }
      }
      // async function getStatistics() {
      //   try {
      //     let response = await fetch(Endpoint.STATISTICS);
      //     let data = await response.json();
      //     //console.log(data)
      //     if(data.WLAN[0].Enable !== 1) {
      //       WifiStatus.current = 0
      //     }
      //     else {
      //       WifiStatus.current = 1
      //     }
      //    } catch(error) {
      //     console.error(error);
      //   }
      // }
      const interval=setInterval(()=>{
        getStatus();
        getNetwork();
        //getStatistics();
       },1000)
      return()=>clearInterval(interval)
      
      
  }, [isLoading, isLoading2]);
  const handleClick = () => setLoading(true);
  const handleClick2 = () => setLoading2(true);

  function sformat(s) {
    var fm = [
          Math.floor(s / 60 / 60 / 24), // DAYS
          Math.floor(s / 60 / 60) % 24, // HOURS
          Math.floor(s / 60) % 60, // MINUTES
          s % 60 // SECONDS
    ];
    const test = $.map(fm, function(v) { 
      return {
        dd: v,
        HH: v,
        mm: v,
        ss: v
      }
    });
    let dd = 'd '
    let HH = 'h '
    let mm = 'm '
    let ss = 's '
    return(test[0].dd + dd + test[1].HH + HH + test[2].mm + mm + test[3].ss + ss)
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function checkStatus(input) {
  if(input <= 0) return 'Offline     '
  else if(input > 0) return 'Online     '
}
function checkStatusColor(input) {
  if(input <= 0) return 'red'
  else if(input > 0) return '78FF25'
}
const LTENetworkStatus = [];
const FiveGNetworkStatus = [];
for(let i=0; i<5; i++) {
  if(i<LTEStrengthIndicator.current) {
    LTENetworkStatus.push(<CircleIcon key={i} style={{color: '78FF25'}} fontSize='xx-small'></CircleIcon>)
  }
  else {
    LTENetworkStatus.push(<CircleIcon key={i} fontSize='xx-small'></CircleIcon>)
  }
}
for(let i=0; i<5; i++) {
  if(i<FiveGStrengthIndicator.current) {
    FiveGNetworkStatus.push(<CircleIcon key={i} style={{color: '78FF25'}} fontSize='xx-small'></CircleIcon>)
  }
  else {
    FiveGNetworkStatus.push(<CircleIcon key={i} fontSize='xx-small'></CircleIcon>)
  }
}


    return (
      <>
        <h1 style={{textAlign: 'center', color: "white"}}>Overview</h1>
        <Container>
        <Row xxl={3}>
    <Col md={2} lg={3}>
      <Card
      bg={'Secondary'.toLowerCase()}
      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: 'auto' }}
      className="mb-2"
      >
        <Card.Body>
          <Card.Title><b><u>Gateway</u></b>
          <h6 style={{float: 'right'}}>{checkStatus(isOnlineOffline.current)}<CircleIcon style={{color: checkStatusColor(isOnlineOffline.current)}} fontSize='xx-small'/></h6>
          </Card.Title>
          <Card.Text as='div'>
          {devices && (
              <div className="devices">
                {/* loop over the devices */}
                {devices.map((devices, index) => (
                <div key={index}>
            <h6>Serial Number: <b style={{float: 'right'}}>{devices.SerialNumber}</b></h6>
            <h6>Hardware Version: <b style={{float: 'right'}}>{devices.HardwareVersion}</b></h6>
            <h6>Software Version: <b style={{float: 'right'}}>{devices.SoftwareVersion}</b></h6>
            <h6>Uptime: <b style={{float: 'right'}}>{sformat(devices.UpTime)}</b></h6>
            </div>
                ))}
                </div>
                )}  
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} lg={3}>
    <Card
      bg={'Secondary'.toLowerCase()}
      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: "auto" }}
      className="mb-2"
      >
        <Card.Body>
            <Card.Title><b><u>LTE Network</u></b>
              {/* <b style={{float: 'right'}}><CircleIcon style={{color: '78FF25'}} fontSize='small'/></b> */}
              {/* <h6 style={{float: 'right'}}>{LTEStrengthIndicator.current}</h6> */}
              <h6 style={{float: 'right'}}>
              {LTENetworkStatus}
              </h6>
            </Card.Title>
          <Card.Text as='div'>
          {ltenetwork && (
              <div className="ltenetwork">
                {/* loop over the devices */}
                {ltenetwork.map((ltenetwork, index) => (
                <div key={index}>
            <h6>Band: <b style={{float: 'right'}}>{ltenetwork.Band}</b></h6>
            <h6>RSRP: <b style={{float: 'right'}}>{ltenetwork.RSRPCurrent} dBm</b></h6>
            <h6>SNR: <b style={{float: 'right'}}>{ltenetwork.SNRCurrent} dB</b></h6>
            <h6>RSRQ: <b style={{float: 'right'}}>{ltenetwork.RSRQCurrent} dB</b></h6>
            </div>
                ))}
                </div>
                )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} lg={3}>
    <Card
      bg={'Secondary'.toLowerCase()}
      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: "auto" }}
      className="mb-2"
      >
        <Card.Body>
            <Card.Title>
              <b><u>5G Network</u></b>
              <h6 style={{float: 'right'}}>
                {FiveGNetworkStatus}
              </h6>
            </Card.Title>
          <Card.Text as='div'>
          {fivegnetwork && (
              <div className="fivegnetwork">
                {/* loop over the devices */}
                {fivegnetwork.map((fivegnetwork, index) => (
                <div key={index}>
            <h6>Band: <b style={{float: 'right'}}>{fivegnetwork.Band}</b></h6>
            <h6>RSRP: <b style={{float: 'right'}}>{fivegnetwork.RSRPCurrent} dBm</b></h6>
            <h6>SNR: <b style={{float: 'right'}}>{fivegnetwork.SNRCurrent} dB</b></h6>
            <h6>RSRQ: <b style={{float: 'right'}}>{fivegnetwork.RSRQCurrent} dB</b></h6>
            </div>
                ))}
                </div>
                )}  
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} lg={3}>
    <Card
      bg={'Secondary'.toLowerCase()}
      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: "auto" }}
      className="mb-2"
      >
        <Card.Body>
            <Card.Title>
              <b><u>Devices</u></b>
              {/* <b style={{float: 'right'}}>Test</b> */}
            </Card.Title>
          <Card.Text as='div'>
          {totaldevices && (
              <div className="totaldevices">
                {/* loop over the devices */}
                {totaldevices.map((totaldevices, index) => (
                <div key={index}>
                  <h6><WifiIcon></WifiIcon>     Wifi: <b style={{float: 'right'}}>{totaldevices.Wireless}</b>
                  </h6>
                  <h6><SettingsEthernetIcon></SettingsEthernetIcon>     Ethernet: <b style={{float: 'right'}}>{totaldevices.Ethernet}</b>
                    </h6>
            </div>
                ))}
                </div>
                )}  
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg"
                    href="/devices"
                    onClick={!isLoading ? handleClick : null}
                    >{isLoading ? 'Loading…' : 'View Devices'} <Badge pill bg="primary">{TotalDevices.current}</Badge>
                    </Button>
</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} lg={3}>
    <Card
      bg={'Secondary'.toLowerCase()}
      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: "auto" }}
      className="mb-2"
      >
        <Card.Body>
            <Card.Title>
              <b><u>Data Usage</u></b>
              {/* <b style={{float: 'right'}}>Test</b> */}
            </Card.Title>
          <Card.Text as='div'>
          {datausage && (
              <div className="datausage">
                {/* loop over the devices */}
                {datausage.map((datausage, index) => (
                <div key={index}>
            <h6>Download: <b style={{float: 'right'}}>{formatBytes(datausage.Download)}</b></h6>
            <h6>Upload: <b style={{float: 'right'}}>{formatBytes(datausage.Upload)}</b></h6>
            </div>
                ))}
                </div>
                )}  
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg"
                    href="/statistics"
                    onClick={!isLoading2 ? handleClick2 : null}
                    >{isLoading2 ? 'Loading…' : 'View Statistics'}
                  </Button>
                </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} lg={3}>
    <Card
      bg={'Secondary'.toLowerCase()}
      text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: "auto" }}
      className="mb-2"
      >
        <Card.Body>
            <Card.Title>
              <b><u>Status</u></b>
              {/* <b style={{float: 'right'}}>Test</b> */}
            </Card.Title>
          <Card.Text as='div'>
          {datausage && (
              <div className="datausage">
                {/* loop over the devices */}
                {datausage.map((datausage, index) => (
                <div key={index}>
            <h6><WifiIcon></WifiIcon>     Wifi: <div style={{float: 'right'}}>{checkStatus(isOnlineOffline.current)}<CircleIcon style={{color: checkStatusColor(isOnlineOffline.current)}} fontSize='xx-small'/></div></h6>
            <h6><SettingsEthernetIcon></SettingsEthernetIcon>     Ethernet: <div style={{float: 'right'}}>{checkStatus(EthernetStatus.current)}<CircleIcon style={{color: checkStatusColor(EthernetStatus.current)}} fontSize='xx-small'/></div></h6>
            </div>
                ))}
                </div>
                )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
</Row>
</Container>
      </>
    );
  }
  
  export default Overview