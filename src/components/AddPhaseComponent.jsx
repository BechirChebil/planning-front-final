import React, { Component } from 'react';
import PhaseService from '../services/PhaseService';
import SeanceService from '../services/SeanceService';
//let seance_obj = { id: this.state.seance }



class AddPhaseComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, //step 2
            titre: '',
            discription: '',
            rendu: '',
            startTime: '',
            endTime: '',
            seance: null,
            seances: []
            //selectedDateM: new Date("2018-01-01T00:00:00.000Z"),
        }

        this.changeTitreHandler = this.changeTitreHandler.bind(this);
        this.changediscriptionHandler = this.changediscriptionHandler.bind(this);
        this.changeRenduHandler = this.changeRenduHandler.bind(this);
        this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
        this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
        this.changeSeanceHandler = this.changeSeanceHandler.bind(this);

        this.saveOrUpdatePhase = this.saveOrUpdatePhase.bind(this);
    }

    componentDidMount() {
        //////////////////
        SeanceService.getSeances().then((res) => {
            this.setState({ seances: res.data })
        })
        //////////////////////
        if (this.state.id === -1) {
            return
        } else {
            PhaseService.getPhaseById(this.state.id).then((res) => {
                let phase = res.data;
                this.setState({
                    titre: phase.titre,
                    discription: phase.discription,
                    rendu: phase.rendu,
                    startTime: phase.startTime,
                    endTime: phase.endTime,
                    seance: phase.seance.id
                });
            })
        }
    }



    saveOrUpdatePhase = (p) => {
        let seance_obj = { id: this.state.seance }
        p.preventDefault();
        let phase = {
            titre: this.state.titre, discription: this.state.discription, rendu: this.state.rendu,
            startTime: this.state.startTime, endTime: this.state.endTime, seance: seance_obj
        };
        console.log('phase => ' + JSON.stringify(phase));

        if (this.state.id == -1) {
            console.log('phase => ' + phase);

            PhaseService.addPhase(phase).then(res => {
                this.props.history.push('/phases/');

            });
        } else {

            PhaseService.updatePhase(phase, this.state.id).then(res => {
                this.props.history.push('/phases/');
            });
        }


    }



    changeTitreHandler = (event) => {
        this.setState({ titre: event.target.value });
    }

    changediscriptionHandler = (event) => {
        this.setState({ discription: event.target.value });
    }

    changeRenduHandler = (event) => {
        this.setState({ rendu: event.target.value });
    }

    changeStartTimeHandler = (event) => {
        this.setState({ startTime: event.target.value });
    }

    changeEndTimeHandler = (event) => {
        this.setState({ endTime: event.target.value });
    }

    changeSeanceHandler = (event) => {
        this.setState({ seance: event.target.value });
    }







    cancel() {
        this.props.history.push('/phases');
    }

    getTitle() {
        if (this.state.id >= 1) {
            return <h3 className="text-center">Update Phase</h3>
        } else {
            return <h3 className="text-center">Add Phase</h3>
        }
    }


    render() {
        //let seances =SeanceService.getSeances();

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Titre:</label>
                                        <input placeholder="titre" name="titre" className="form-control"
                                            value={this.state.titre} onChange={this.changeTitreHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>discription:</label>
                                        <input placeholder="discription" name="discription" className="form-control"
                                            value={this.state.discription} onChange={this.changediscriptionHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Rendu:</label>
                                        <input placeholder="rendu" name="rendu" className="form-control"
                                            value={this.state.rendu} onChange={this.changeRenduHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Start Time:</label>

                                        <input placeholder="HH:mm" name="startTime" className="form-control"
                                            value={this.state.startTime} onChange={this.changeStartTimeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>End Time:</label>
                                        <input placeholder="HH:mm" name="endTime" className="form-control"
                                            value={this.state.endTime} onChange={this.changeEndTimeHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Seance:</label><br></br>
                                       
                                        <select className="form-select" value={this.state.seance} onChange={this.changeSeanceHandler}>
                                        <option value="" disabled selected>Select seance</option>
                                            {this.state.seances.map((seance) => (
                                                <option value={seance.id}>{seance.titre}</option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <br></br>

                                    <button className="btn btn-success" onClick={this.saveOrUpdatePhase}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddPhaseComponent;