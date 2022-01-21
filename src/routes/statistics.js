//import { useHistory} from 'react-router-dom'
import React, {useState, useEffect} from "react"
import {Endpoint} from '../types/index'
import {Tab, Tabs, Table, Container} from 'react-bootstrap'


function Statistics() {
    const [lan, setLAN] = useState([]);
    const [wan, setWAN] = useState([]);
    const [twoGHz, setTwoGHz] = useState([]);

    useEffect(() => {
        getStatistics();
        async function getStatistics() {
            try {
                let response = await fetch(Endpoint.STATISTICS);
                let data = await response.json();
                //console.log(data)
                //console.log(data.WLAN)
                const LAN = data.LAN.map(function(data) {
                    return {
                        Enable: data.Enable,
                        SentByes: data.BytesSent,
                        ReceivedBytes: data.BytesReceived,
                        SentPackets: data.PacketsSent,
                        ReceivedPackets: data.PacketsReceived,
                        DiscardedSentPackets: data.DiscardPacketsSent,
                        DiscardedReceivedPackets: data.DiscardPacketsReceived,
                        SentErrors: data.ErrorsSent,
                        ReceivedErrors: data.ErrorsReceived,
                        MulticastSentPackets: data.MulticastPacketsSent,
                        MulticastReceivedPackets: data.MulticastPacketsReceived
                    }
                });
                const WAN = data.WAN[0].Service.map(function(data) {
                    return {
                    SentByes: data.EthernetBytesSent,
                    ReceivedBytes: data.EthernetBytesReceived,
                    SentPackets: data.EthernetPacketsSent,
                    ReceivedPackets: data.EthernetPacketsReceived,
                    SentErrors: data.EthernetErrorsSent,
                    ReceivedErrors: data.EthernetErrorsReceived,
                    DiscardPacketsSent: data.EthernetDiscardPacketsSent,
                    DiscardPacketsReceived: data.EthernetDiscardPacketsReceived
                    }
                });
                const twoGHz = data.WLAN.map(function(data) {
                    if(data.Enable === 1) {
                        return {
                            Type: data.Type,
                            Enable: data.Enable,
                            SSID: data.SSID,
                            SentByes: data.BytesSent,
                            ReceivedBytes: data.BytesReceived,
                            SentPackets: data.X_ASB_COM_PacketsSent,
                            ReceivedPackets: data.X_ASB_COM_PacketsReceived,
                            DiscardPacketsSent: data.DiscardPacketsSent,
                            DiscardPacketsReceived: data.DiscardPacketsReceived,
                            SentErrors: data.ErrorsSent
                        }
                    }
                    else {
                        return undefined;
                    }
                });
                const filtered = twoGHz.filter(function(x) {
                    return x !== undefined;
                });
                setLAN(LAN);
                setWAN(WAN);
                setTwoGHz(filtered);
                } catch(error) {
                console.error(error);
                }
            }
            const interval=setInterval(()=>{
            
            },1000)
            return()=>clearInterval(interval)  
        }, []);
        //console.log(twoGHz);

        function Status(index) {
            if(index === 0) { return 'Up'}
            else { return 'Down'}
        }
        function isUndefined(string) {
            if(string === undefined) { return 0 }
            else { return string }
        }

        return (
            <div>
                <Container>
                    <Tabs
                    defaultActiveKey="lan"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                    style={{justifyContent: 'center'}}
                    >
                        <Tab eventKey="lan" title="LAN">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style={{textAlign: 'center'}}>LAN1</th>
                                    <th style={{textAlign: 'center'}}>LAN2</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Status</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{Status(lan.Enable)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Bytes</td>
                                        {lan.map((lan, index)=> (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.SentByes}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Bytes</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.ReceivedBytes}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Packets</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.SentPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Packets</td>
                                        {lan.map((lan, index)=> (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.ReceivedPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Discarded Sent Packets</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{isUndefined(lan.DiscardPacketsSent)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Discarded Received Packets</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{isUndefined(lan.DiscardPacketsReceived)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Errors</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{isUndefined(lan.ErrorsSent)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Errors</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.ReceivedErrors}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Multicast Sent Packets</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.MulticastSentPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Multicast Received Packets</td>
                                        {lan.map((lan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{lan.MulticastReceivedPackets}</td>
                                        ))}
                                    </tr>
                                </tbody>
                        </Table>
                        </Tab>
                        <Tab eventKey="cellular" title="Cellular">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style={{textAlign: 'center'}}>WAN</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sent Bytes</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.SentByes}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Bytes</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.ReceivedBytes}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Packets</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.SentPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Packets</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.ReceivedPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Errors</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.SentErrors}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Errors</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.ReceivedErrors}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Discarded Sent Packets</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.DiscardPacketsSent}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Discarded Received Packets</td>
                                        {wan.map((wan, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{wan.DiscardPacketsReceived}</td>
                                        ))}
                                    </tr>
                                </tbody>
                        </Table>
                        </Tab>
                        <Tab eventKey="wlan" title="WLAN">
                            <Table striped bordered hover size="sm" style={{display: 'block', overflow: 'auto'}}>
                            <thead>
                                <tr>
                                    <th></th>
                                    {twoGHz.map((twoGHz, index) => (
                                    <th key={index} style={{textAlign: 'center'}}>{twoGHz.Type + 'Hz'}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SSID</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.SSID}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Bytes</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.SentByes}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Bytes</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.ReceivedBytes}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Packets</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.SentPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Received Packets</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.ReceivedPackets}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Discarded Sent Packets</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.DiscardPacketsSent}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Discarded Received Packets</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.DiscardPacketsReceived}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Sent Errors</td>
                                        {twoGHz.map((twoGHz, index) => (
                                            <td key={index} style={{textAlign: 'center'}}>{twoGHz.SentErrors}</td>
                                        ))}
                                    </tr>
                                </tbody>
                        </Table>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        )
    }

export default Statistics