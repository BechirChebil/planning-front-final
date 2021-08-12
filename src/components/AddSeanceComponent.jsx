import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';
import SeanceService from '../services/SeanceService';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import moment from 'moment';

const DATE_TIME_FORMAT = 'yyyy-MM-DD HH:mm';

class AddSeanceComponent extends Component {



    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, //step 2
            titre: '',
            objectif: '',
            indicationTuteur: '',
            indicationEtudiant: '',

            date: '',
            creneau: '',
            //planning: null,
            // plannings: []
        }

        this.changeTitreHandler = this.changeTitreHandler.bind(this);
        this.changeObjectifHandler = this.changeObjectifHandler.bind(this);
        this.changeIndicationTuteurHandler = this.changeIndicationTuteurHandler.bind(this);
        this.changeIndicationEtudiantHandler = this.changeIndicationEtudiantHandler.bind(this);

        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeCreneauHandler = this.changeCreneauHandler.bind(this);


        this.saveOrUpdateSeance = this.saveOrUpdateSeance.bind(this);
    }



    componentDidMount() {
        PlanningService.getPlannings().then((res) => {
            this.setState({ plannings: res.data })
        })
        if (this.state.id === -1) {
            return
        } else {
            SeanceService.getSeanceById(this.state.id).then((res) => {
                let seance = res.data;
                this.setState({
                    titre: seance.titre,
                    objectif: seance.objectif,
                    indicationTuteur: seance.indicationTuteur,
                    indicationEtudiant: seance.indicationEtudiant,
                    date: seance.date,
                    creneau: seance.creneau,
                    //planning: seance.planning.id
                });
            });
        }

    }




    saveOrUpdateSeance = (p) => {
        // let planning_obj = { id: this.state.planning }
        p.preventDefault();
        let seance = {
            titre: this.state.titre, objectif: this.state.objectif, indicationTuteur: this.state.indicationTuteur,
            indicationEtudiant: this.state.indicationEtudiant, date: this.state.date, creneau: this.state.creneau//, planning: planning_obj
        };
        console.log('seance => ' + JSON.stringify(seance));

        if (this.state.id >= 1) {

            SeanceService.updateSeance(seance, this.state.id).then(res => {
                this.props.history.push('/seances/');

            });
        } else {
            console.log('seance => ' + seance);
            SeanceService.addSeance(seance).then(res => {
                this.props.history.push('/seances/');
            });
        }


    }


    changeTitreHandler = (event) => {
        this.setState({ titre: event.target.value });
    }

    changeObjectifHandler = (event) => {
        this.setState({ objectif: event.target.value });
    }

    changeIndicationTuteurHandler = (event) => {
        this.setState({ indicationTuteur: event.target.value });
    }

    changeIndicationEtudiantHandler = (event) => {
        this.setState({ indicationEtudiant: event.target.value });
    }


    changeCreneauHandler = (event) => {
        this.setState({ creneau: event.target.value });
    }

    changeDateHandler = (value) => {
        console.log(value);
        const formattedDateTime = moment(value).format(DATE_TIME_FORMAT);
        this.setState({ date: formattedDateTime });
    }

    // changePlanningHandler = (event) => {
    //     this.setState({ planning: event.target.value });
    // }

    cancel() {
        this.props.history.push('/seances');
    }

    getTitle() {
        if (this.state.id >= 1) {
            return <h3 className="text-center">Update Seance</h3>
        } else {
            return <h3 className="text-center">Add Seance</h3>
        }
    }



    render() {
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
                                        <label>Objectif:</label>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Objectif"
                                            style={{ width: 590 }}
                                            className="form-control"
                                            value={this.state.objectif} onChange={this.changeObjectifHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>indication Tuteur:</label>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="indication Tuteur"
                                            style={{ width: 590 }}
                                            className="form-control"
                                            value={this.state.indicationTuteur} onChange={this.changeIndicationTuteurHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>indication Etudiant:</label>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="indication Etudiant"
                                            style={{ width: 590 }}
                                            className="form-control"
                                            value={this.state.indicationEtudiant} onChange={this.changeIndicationEtudiantHandler}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label>Creneau:</label>
                                        <select className="form-select" value={this.state.creneau} onChange={this.changeCreneauHandler}>
                                            <option value="" disabled selected>Select creneau</option>
                                            <option value="matin">matin</option>
                                            <option value="midi">midi</option>
                                        </select>

                                    </div>
                                    {/* <div className="form-group">
                                        <label>Planning:</label><br></br>

                                        <select className="form-select" value={this.state.planning} onChange={this.changePlanningHandler}>
                                            <option value="" disabled selected>Select planning</option>
                                            {this.state.plannings.map((planning) => (
                                                <option value={planning.id}>{planning.titre}</option>
                                            ))}
                                        </select>

                                    </div> */}
                                    <div className="form-group">
                                        <label>Date:</label>
                                        {/* <input type="datetime-local" placeholder="yyyy-MM-dd HH:mm" name="date" className="form-control"
                                            value={this.state.date} onChange={this.changeDateHandler} /> */}
                                        <div>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    inputFormat='yyyy-MM-dd HH:mm'
                                                    renderInput={(props) => <TextField {...props} />}
                                                    //label="DateTimePicker"

                                                    className="form-time"
                                                    value={this.state.date}
                                                    onChange={(newValue) => this.changeDateHandler(newValue)}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <br></br>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateSeance}>Save</button>
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

export default AddSeanceComponent;