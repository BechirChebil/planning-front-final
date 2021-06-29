import React, { Component } from 'react';

class HomeComponent extends Component {

    cancel(){
        this.props.history.push('/phases');
    }
    cancel1(){
        this.props.history.push('/seances');
    }
    cancel2(){
        this.props.history.push('/plannings');
    }
    render() {
        return (
            <div>
               <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"450px"}}>PHASE</button>
                <button className="btn btn-danger" onClick={this.cancel1.bind(this)} style={{marginLeft:"10px"}}>SEANCE</button>
               <button className="btn btn-danger" onClick={this.cancel2.bind(this)} style={{marginLeft:"10px"}}>PLANNING</button>


            </div>
        );
    }
}

export default HomeComponent;