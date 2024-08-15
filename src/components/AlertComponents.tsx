import { Slide, Alert, AlertTitle, AlertColor } from "@mui/material";
import { Component } from "react";

class AlertComponents extends Component {

    constructor(
        private type: AlertColor,
        private alert:boolean,
        private message:string,
        private title:string | undefined
    ) {
        super({});
    }

    render() {
        return (
            <Slide in={this.alert} direction="left">
                <Alert color={this.type} sx={{ position: 'absolute', top: 20, right: '20px' }}>
                    <AlertTitle>{this.title}</AlertTitle>
                    {this.message}
                </Alert>
            </Slide>
        );
    }
}

export default AlertComponents;