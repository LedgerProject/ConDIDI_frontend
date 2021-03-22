import React, { Component } from 'react';
import QRCode from 'qrcode.react'; 
import { Dialog, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'; 

class QrDialogue extends Component {

    constructor(props){
        super(props); 

        this.state={
            qr: '', 
            qrOpen: true, 
            google: 'www.google.com'
            
        }; 

        this.loadData = this.loadData.bind(this); 
        this.handleQrOpen = this.handleQrOpen.bind(this); 
        this.handleQrClose = this.handleQrClose.bind(this); 

    }

    componentDidMount = () => {
        this.loadData(); 
    }

    loadData = () => {

        this.setState({
            qr: this.props.qr, 
        })
        
    }

    handleQrOpen = () => { 
        this.setState({ qrOpen: true})
    }

    handleQrClose = () => { 
        this.setState({ qrOpen: false})
        this.props.closeQr();
    }

    

    render() {
        return (

            <div>
                <Dialog
                    open={this.state.qrOpen}
                    onClose={this.handleQrClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Scan QR Code</DialogTitle>

                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                            Use your Jolocom Wallet to scan this QR Code and log into ConDIDi. 
                        </DialogContentText>

                        <QRCode value={this.state.qr} level='H' size={256} />                            
                    </DialogContent>
                </Dialog>
            </div>

        )
    }

}

export default QrDialogue; 