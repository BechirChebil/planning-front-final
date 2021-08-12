import React, { Component } from 'react';
import SeanceService from '../services/SeanceService';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import PhaseService from '../services/PhaseService';


class ViewSeanceComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            seance: {}
        }

        this.editSeance = this.editSeance.bind(this);

        this.addPhase = this.addPhase.bind(this);
        this.editPhase = this.editPhase.bind(this);
        this.deletePhase = this.deletePhase.bind(this);
    }

    async componentDidMount() {
        await SeanceService.getSeanceById(this.state.id).then(res => {
            this.setState({ seance: res.data });
            this.state.seance.phases.map(e => console.log(e.titre));
        })
        PhaseService.getPhases().then((res) => {
            this.setState({ phases: res.data })
        })
    }

    addPhase(id) {
        this.props.history.push(`/Add2Phase/${id}`);
    }

    editPhase(id) {
        this.props.history.push(`/UpdatePhase/${id}`);
    }

    deletePhase(id) {
        PhaseService.deletePhase(id).then(res => {
            this.setState({ phases: this.state.phases.filter(phase => phase.id !== id) });
        })
        window.location.reload(false);
    }

    viewPhase(id) {
        this.props.history.push(`/ViewPhase/${id}`);

    }

    editSeance(id) {
        this.props.history.push(`/AddSeance/${id}`);
    }

    retour() {
        this.props.history.goBack();
    }

    render() {
        const { seance } = this.state;
        // console.log(seance.planning);
        // let planning_obj = { id: this.state.seance.planning }
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">View seance details</h3>
                    <div className="card-body">

                        <div className="row">
                            <label>Titre: </label>
                            <input className="form-control" disabled
                                value={seance.titre} />

                        </div>

                        <div className="row">
                            <label>Objectif: </label>
                            <TextareaAutosize
                                value={seance.objectif}
                                disabled
                                //aria-label="empty textarea"

                                style={{ width: 1000 }}
                                className="form-control"
                            />
                        </div>

                        <div className="row">
                            <label>Creneau: </label>
                            <input className="form-control" disabled
                                value={seance.creneau} />

                        </div>

                        <div className="row">
                            <label>Date: </label>
                            <input className="form-control" disabled
                                value={seance.date} />
                        </div>
                        <div className="row">
                            <label>indication Tuteur:</label>
                            <input className="form-control" disabled
                                value={seance.indicationTuteur} />
                        </div>

                        <div className="row">
                            <label>indication Etudiant: </label>
                            <input className="form-control" disabled
                                value={seance.indicationEtudiant} />
                        </div>

                        {/* <div className="row">
                            <label>Planning_id: </label>
                            <input className="form-control" disabled
                                value={seance.planning ? seance.planning.titre : 'None'} />
                            <div></div>
                        </div> */}
                    </div>
                </div>

                <center style={{ margin: "30px" }}>
                    <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginRight: "100px" }} >Retour</button>
                    <button style={{ marginLeft: "100px" }} onClick={() => this.editSeance(seance.id)} className="btn btn-info">Update</button>
                </center>
                <h2 className="text-center">List Phase</h2>
                <button className="btn btn-primary" onClick={() => this.addPhase(seance.id)}>Add Phase</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Discription</th>
                                <th>Rendu</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                {/* <th>Seance id</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.seance.titre != null ? this.state.seance.phases.map(
                                    phase =>
                                        <tr key={phase.id}>
                                            <td>{phase.titre} </td>
                                            <td>{phase.discription} </td>
                                            <td style={{ maxWidth: "200px" }}>{phase.rendu} </td>
                                            <td>{phase.startTime} </td>
                                            <td>{phase.endTime} </td>
                                            {/* <td>{phase.seance.id} </td> */}
                                            <td>
                                                <button onClick={() => this.editPhase(phase.id)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        this.deletePhase(phase.id)
                                                }} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewPhase(phase.id)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                ) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewSeanceComponent;