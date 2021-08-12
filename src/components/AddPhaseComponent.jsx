import React, { Component } from 'react';
import PhaseService from '../services/PhaseService';
import SeanceService from '../services/SeanceService';
//let seance_obj = { id: this.state.seance }
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import moment from 'moment';

import DateTimePicker from '@material-ui/lab/DateTimePicker';

const DATE_TIME_FORMAT = 'yyyy-MM-DD HH:mm';
const DATE_TIME_FORMAT1 = 'yyyy-MM-DD HH:mm';
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
            //seance: null,
            // seances: []
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
                    //seance: phase.seance.id
                });
            })
        }
    }



    saveOrUpdatePhase = (p) => {
        // let seance_obj = { id: this.state.seance }
        p.preventDefault();
        let phase = {
            titre: this.state.titre, discription: this.state.discription, rendu: this.state.rendu,
            startTime: this.state.startTime, endTime: this.state.endTime, //seance: seance_obj
        };
        console.log('phase => ' + JSON.stringify(phase));

        if (this.state.id >= 1) {
            PhaseService.updatePhase(phase, this.state.id).then(res => {
                this.props.history.push('/phases/');
            });

        } else {
            console.log('phase => ' + phase);
            PhaseService.addPhase(phase).then(res => {
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


    changeStartTimeHandler = (value) => {
        console.log(value);
        const formattedDateTime = moment(value).format(DATE_TIME_FORMAT);
        this.setState({ startTime: formattedDateTime });
    }

    changeEndTimeHandler = (value) => {
        console.log(value);
        const formattedDateTime1 = moment(value).format(DATE_TIME_FORMAT1);
        this.setState({ endTime: formattedDateTime1 });
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
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="discription"

                                            className="form-control"
                                            value={this.state.discription} onChange={this.changediscriptionHandler}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>Rendu:</label>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="rendu"

                                            className="form-control"
                                            value={this.state.rendu} onChange={this.changeRenduHandler}
                                        />
                                    </div>

                                    <div className="form-group">

                                        <label>Start Time:</label>
                                        <br />
                                        <div>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    inputFormat='yyyy-MM-dd HH:mm'
                                                    renderInput={(props) => <TextField {...props} />}
                                                    //label="DateTimePicker"

                                                    className="form-time"
                                                    value={this.state.startTime}
                                                    onChange={(newValue) => this.changeStartTimeHandler(newValue)}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>End Time:</label>
                                        <div>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    inputFormat='yyyy-MM-dd HH:mm'
                                                    renderInput={(props) => <TextField {...props} />}
                                                    //label="DateTimePicker"

                                                    className="form-time"
                                                    value={this.state.endTime}
                                                    onChange={(newValue) => this.changeEndTimeHandler(newValue)}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>

                                    {/* <div className="form-group">
                                        <label>Seance:</label><br></br>

                                        <select className="form-select" value={this.state.seance} onChange={this.changeSeanceHandler}>
                                            <option value="" disabled selected>Select seance</option>
                                            {this.state.seances.map((seance) => (
                                                <option value={seance.id}>{seance.titre}</option>
                                            ))}
                                        </select>

                                    </div> */}
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