import React from "react";
import Check from "./Check";

export default class StateFile extends React.Component {

    render() {
        return (<div className='flex'>
            <Check checked={this.props.checks.formatOk} text='Format du fichier' />
            <Check checked={this.props.checks.structureOk} text='Structure du fichier' />
            <Check checked={this.props.checks.dataOk} text='Données valides' />
        </div>);
    }
}