import { useState, useEffect } from 'react';
import {Endpoint} from '../types/index'
import {Card, Row, Col, Container} from 'react-bootstrap';

function Devices() {
  const [devices, setDevices] = useState(null);

  useEffect(() => {
    getData();
    async function getData() {
        try {
          let response = await fetch(Endpoint.STATUS);
          let data = await response.json();
          //const HostName = data.device_cfg.map(name => name.HostName);
          const Devices = data.device_cfg.map(function(data) {
            return {
              "HostName": data.HostName,
              "IPAddress": data.IPAddress,
              "MACAddress": data.MACAddress,
              "InterfaceType": data.InterfaceType,
              "AddressSource": data.AddressSource
            }
          });
          setDevices(Devices);
         } catch(error) {
          console.error(error);
        }
      }
      
  }, []);
    
  return (
    <div>
    <h2 style={{textAlign: "center", color: "white"}}>Devices</h2>
      {/* display hostname from the API */}
      <Container>
      <Row>
      {devices && (
              <div className="devices">
                {/* loop over the devices */}
                {devices.map((devices, index) => (
                <div key={index}>
        <Col>
                <Card
                  bg={'Secondary'.toLowerCase()}
                  text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                  style={{ 
                    minWidth: "auto",
                    alignSelf: 'flex-start'
                  }}
                  className="mb-2"
                  >
                    <Card.Body>
                      <Card.Text as='div'>
                       <h6>HostName: <b style={{float: 'right'}}>{devices.HostName}</b></h6>
                        <h6>IPAddress: <b style={{float: 'right'}}>{devices.IPAddress}</b></h6>
                        <h6>MACAddress: <b style={{float: 'right'}}>{devices.MACAddress}</b></h6>
                        <h6>InterfaceType: <b style={{float: 'right'}}>{devices.InterfaceType}</b></h6>
                        <h6>AddressSource: <b style={{float: 'right'}}>{devices.AddressSource}</b></h6>
                        </Card.Text>
                      </Card.Body>
                      </Card>
                </Col>    
                </div>
                ))}
                </div>
                )}      
                </Row>
                </Container>
    </div>
  )
}

export default Devices;