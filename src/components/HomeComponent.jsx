import React, { Component } from 'react';

class HomeComponent extends Component {

    cancel() {
        this.props.history.push('/phases');
    }
    cancel1() {
        this.props.history.push('/seances');
    }
    cancel2() {
        this.props.history.push('/plannings');
    }
    historique() {
        this.props.history.push('/plannings');
    }
    render() {
        return (
            <div style={{ margin: "10px" }}>
                <center>
                    <button className="btn btn-danger" onClick={this.cancel2.bind(this)} style={{ margin: "10px", width: "200px" }}>PLANNING</button>
                    <button className="btn btn-danger" onClick={this.cancel1.bind(this)} style={{ margin: "10px", width: "200px" }}>SEANCE</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "10px", width: "200px" }}>PHASE</button>
                    <button className="btn btn-danger" onClick={this.historique.bind(this)} style={{ margin: "10px", width: "200px" }}>HISTORIQUE</button>
                </center>
            </div>
        );
    }
}

export default HomeComponent;